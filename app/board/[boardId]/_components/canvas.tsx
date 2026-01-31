"use client";

import React, { useCallback, useMemo, useState } from "react";
import Info from "./info";
import Participants from "./participants";
import Toolbar from "./toolbar";
import { useOthersMapped, useSelf, useStorage } from "@liveblocks/react/suspense";
import { CanvasMode, CanvasState, Color, LayerType, Point, Side, XYWH } from "@/types/canvas";
import { useHistory, useCanRedo, useCanUndo, useMutation } from "@liveblocks/react/suspense";
import { CursorsPresence } from "./cousors-presence";
import { colorToCss, findIntersectingRectangles, getRandomColor, penPointsToPathLayer, pointerEventToCanvasPoint, resizeBounds } from "@/lib/utils";
import { nanoid } from "nanoid"
import { LiveObject } from "@liveblocks/client";
import { LayerPreview } from "./layer-preview";
import { SelectionBox } from "./selection-box";
import { SelectionTools } from "./selectionTools";
import Path from "./Path";

const MAX_LAYERS = 100;
interface CanvasProps {
  boardId: string;
}

export default function Canvas({ boardId }: CanvasProps) {

  const layerIds = useStorage((root) => root.layerIds);
  const [canvasState, setCanvasState] = useState<CanvasState>({
    mode: CanvasMode.None,
  });

  const [camera, setCamera] = useState({ x: 0, y: 0 });
  const [lastUsedColor, setLastUsedColor] = useState<Color>({
    r: 252,
    g: 142,
    b: 42
  });

  const history = useHistory();
  const canUndo = useCanUndo();
  const canRedo = useCanRedo();
  const insertLayer = useMutation(
    (
      { storage, setMyPresence },
      layerType: LayerType.Ellipse | LayerType.Rectangle | LayerType.Text | LayerType.Note,
      position: Point

    ) => {
      const liveLayers = storage.get("layers")
      if (liveLayers.size >= MAX_LAYERS) {
        return;
      }

      const liveLayerIds = storage.get("layerIds");
      const layerId = nanoid();
      const layer = new LiveObject({
        type: layerType,
        x: position.x,
        y: position.y,
        height: 100,
        width: 100,
        fill: lastUsedColor
      });

      liveLayerIds.push(layerId);
      liveLayers.set(layerId, layer)

      setMyPresence({ selection: [layerId] }, { addToHistory: true });
      setCanvasState({ mode: CanvasMode.None })
    }
    , [lastUsedColor])


  const unselectLayers = useMutation(({ self, setMyPresence }) => {
    if (self.presence.selection.length > 0) {
      setMyPresence({ selection: [] }, { addToHistory: true })
    }
  }, [])


  const translateSelectedLayer = useMutation((
    { storage, self },
    point: Point
  ) => {
    if (canvasState.mode != CanvasMode.Translating) {
      return;
    }
    const offset = {
      x: point.x - canvasState.current.x,
      y: point.y - canvasState.current.y
    }

    const liveLayers = storage.get("layers");

    for (const layerId of self.presence.selection) {
      const layer = liveLayers.get(layerId);
      if (!layer) {
        continue;
      }
      layer.update({
        x: layer.get("x") + offset.x,
        y: layer.get("y") + offset.y
      })
    }

    setCanvasState({
      mode: CanvasMode.Translating,
      current: point
    })
  }, [
    canvasState
  ])


  const continueDrawing = useCallback((
    point: Point,
    e: React.PointerEvent,
    pencilDraft: [x: number, y: number, pressure: number][] | null,
    setMyPresence: (patch: Partial<Liveblocks["Presence"]>, options?: { addToHistory: boolean }) => void
  ) => {
    if (
      canvasState.mode !== CanvasMode.Pencil || pencilDraft == null
    ) {
      return;
    }

    setMyPresence({
      cursor: point,
      pencilDraft:
        pencilDraft.length === 1 &&
          pencilDraft[0][0] === point.x &&
          pencilDraft[0][1] === point.y
          ? pencilDraft
          : [...pencilDraft, [point.x, point.y, e.pressure || 0.5] as [number, number, number]]
    })
  }, [canvasState.mode])

  // No longer a mutation, will be called from onPointerUp
  const insertPathMutation = (
    storage: LiveObject<Liveblocks["Storage"]>,
    self: { presence: Liveblocks["Presence"] },
    setMyPresence: (patch: Partial<Liveblocks["Presence"]>, options?: { addToHistory: boolean }) => void
  ) => {
    const liveLayers = storage.get("layers");
    const { pencilDraft } = self.presence;

    if (
      pencilDraft == null ||
      pencilDraft.length < 2 ||
      liveLayers.size >= MAX_LAYERS
    ) {
      setMyPresence({ pencilDraft: null });
      return;
    }

    const id = nanoid();
    liveLayers.set(
      id,
      new LiveObject(penPointsToPathLayer(pencilDraft, lastUsedColor)),
    )

    const liveLayerIds = storage.get("layerIds");
    liveLayerIds.push(id);

    setMyPresence({ pencilDraft: null });
    setCanvasState({ mode: CanvasMode.Pencil });
  }

  // No longer a mutation, will be called from onPointerDown
  const startDrawingMutation = (
    setMyPresence: (patch: Partial<Liveblocks["Presence"]>, options?: { addToHistory: boolean }) => void,
    point: Point,
    pressure: number
  ) => {
    setMyPresence({
      pencilDraft: [
        [point.x, point.y, pressure || 0.5] as [number, number, number],
      ],
      penColor: lastUsedColor,
    })
  }

  const updateSelectionNet = useMutation((
    { storage, setMyPresence },
    current: Point,
    origin: Point
  ) => {
    const layers = storage.get("layers").toImmutable()
    setCanvasState({
      mode: CanvasMode.SelectionNet,
      origin,
      current,
    })

    const intersectingIds = findIntersectingRectangles(
      layerIds,
      layers,
      origin,
      current
    )

    setMyPresence({ selection: intersectingIds });

  }, [layerIds])


  const startMultiSelection = useCallback((
    current: Point,
    origin: Point
  ) => {

    if (Math.abs(current.x - origin.x) + Math.abs(current.y - origin.y) > 5) {
      setCanvasState({
        mode: CanvasMode.SelectionNet,
        origin,
        current,
      })
    }
  }, [])


  const resizeSelectedLayer = useMutation(
    (
      { storage, self },
      point: Point,

    ) => {
      if (canvasState.mode != CanvasMode.Resizing) {
        return;
      }

      const bounds = resizeBounds(
        canvasState.initialBounds,
        canvasState.corner,
        point
      );

      const liveLayers = storage.get("layers");
      const layer = liveLayers.get(self.presence.selection[0]);

      if (layer) {
        layer.update(bounds);

      }
    }, [canvasState]
  )

  const onResizeHandlePointerDown = useCallback(
    (
      corner: Side,
      initialBounds: XYWH
    ) => {
      history.pause();
      setCanvasState({
        mode: CanvasMode.Resizing,
        initialBounds,
        corner,
      })
    }, [history]
  )

  const onWheel = useCallback((e: React.WheelEvent) => {

    setCamera((cam) => ({
      x: cam.x - e.deltaX,
      y: cam.y - e.deltaY,
    }))
  }, [])

  const onPointerMove = useMutation(({ self, setMyPresence }, e: React.PointerEvent) => {
    e.preventDefault();
    const current = pointerEventToCanvasPoint(e, camera);

    if (canvasState.mode == CanvasMode.Pressing) {
      startMultiSelection(current, canvasState.origin);
    }

    else if (canvasState.mode == CanvasMode.SelectionNet) {
      updateSelectionNet(current, canvasState.origin);
    }
    else if (canvasState.mode == CanvasMode.Translating) {
      translateSelectedLayer(current);
    }

    else if (canvasState.mode == CanvasMode.Resizing) {
      resizeSelectedLayer(current);
    }
    else if (canvasState.mode == CanvasMode.Pencil) {
      continueDrawing(current, e, self.presence.pencilDraft, setMyPresence);
    } else {
      setMyPresence({
        cursor: current,
      })
    }

  }, [camera, canvasState, resizeSelectedLayer, translateSelectedLayer, continueDrawing, startMultiSelection, updateSelectionNet])

  const onPointerLeave = useMutation(({ setMyPresence }, e: React.PointerEvent) => {
    e.preventDefault();
    setMyPresence({
      cursor: null
    })
  }, [])


  const startDrawing = useMutation((
    { setMyPresence },
    point: Point,
    pressure: number
  ) => {
    startDrawingMutation(setMyPresence, point, pressure);
  }, [lastUsedColor])


  const onPointerDown = useCallback((
    e: React.PointerEvent
  ) => {
    const point = pointerEventToCanvasPoint(e, camera);

    if (canvasState.mode === CanvasMode.Inserting) {
      return;
    }

    if (canvasState.mode === CanvasMode.Pencil) {
      startDrawing(point, e.pressure);
      return;
    }

    setCanvasState({
      mode: CanvasMode.Pressing,
      origin: point,
    })
  }, [
    camera,
    canvasState.mode,
    setCanvasState,
    startDrawing
  ]);

  const onPointerUp = useMutation((
    { storage, self, setMyPresence },
    e
  ) => {
    const point = pointerEventToCanvasPoint(e, camera);

    if (
      canvasState.mode === CanvasMode.None ||
      canvasState.mode === CanvasMode.Pressing
    ) {
      unselectLayers();
      setCanvasState({
        mode: CanvasMode.None,
      })
    }

    else if (canvasState.mode === CanvasMode.Pencil) {
      insertPathMutation(storage, self, setMyPresence);
    }

    else if (canvasState.mode === CanvasMode.Inserting) {
      insertLayer(canvasState.layerType, point);
    }
    else {
      setCanvasState(
        {
          mode: CanvasMode.None,
        }
      )
    }
    history.resume()
  }, [setCanvasState, camera, canvasState, history, insertLayer, unselectLayers])

  const pencilDraft = useSelf((me) => me.presence.pencilDraft);
  const others = useOthersMapped((other) => ({
    pencilDraft: other.presence.pencilDraft,
    penColor: other.presence.penColor,
  }));

  const selections = useOthersMapped((other) => other.presence.selection);

  const layerIdsToColorSelection = useMemo(() => {
    const layerIdsToColorSelection: Record<string, string> = {};

    for (const user of selections) {
      const [connectionId, selection] = user;

      for (const layerId of selection) {
        layerIdsToColorSelection[layerId] = getRandomColor(connectionId);
      }
    }
    return layerIdsToColorSelection;
  }, [selections])

  const onLayerPointerDown = useMutation((
    { self, setMyPresence },
    e: React.PointerEvent,
    layerId: string
  ) => {
    if (
      canvasState.mode == CanvasMode.Inserting ||
      canvasState.mode == CanvasMode.Pencil
    ) {
      return;
    }

    history.pause();
    e.stopPropagation()

    const point = pointerEventToCanvasPoint(e, camera);

    if (!self.presence.selection.includes(layerId)) {
      setMyPresence({
        selection: [layerId]
      },
        {
          addToHistory: true
        })
    }
    setCanvasState({
      mode: CanvasMode.Translating,
      current: point,
    })
  }, [
    setCanvasState,
    camera,
    history,
    canvasState.mode
  ])

  return (
    <main className="h-full w-full absolute bg-neutral-100 touch-none">
      {/* Floating elements */}
      <Info boardId={boardId} />
      <Participants />
      <Toolbar
        canvasState={canvasState}
        setCanvasState={setCanvasState}
        canRedo={canRedo}
        canUndo={canUndo}
        undo={history.undo}
        redo={history.redo}
      />
      <SelectionTools
        camera={camera}
        setLastUsedColor={setLastUsedColor}
      />
      <svg className="h-[100vh] w-[100vw]" onWheel={onWheel} onPointerMove={onPointerMove} onPointerLeave={onPointerLeave} onPointerUp={onPointerUp} onPointerDown={onPointerDown}>
        <g
          style={{
            transform: `translate(${camera.x}px, ${camera.y}px)`,
          }}
        >
          {layerIds.map((layerId) => (
            <LayerPreview
              key={layerId}
              id={layerId}
              onLayerPointerDown={onLayerPointerDown}
              selectionColor={layerIdsToColorSelection[layerId]}
            />
          ))}
          <SelectionBox onResizeHandlePointerDown={onResizeHandlePointerDown} />
          {canvasState.mode === CanvasMode.SelectionNet && canvasState.current != null && (
            <rect className="fill-blue-500/5 stroke-blue-500
              stroke-1"
              x={Math.min(canvasState.origin.x, canvasState.current.x)}
              y={Math.min(canvasState.origin.y, canvasState.current.y)}
              width={Math.abs(canvasState.origin.x - canvasState.current.x)}
              height={Math.abs(canvasState.origin.y - canvasState.current.y)}
            />
          )}
          {pencilDraft != null && pencilDraft.length > 0 && (
            <Path
              points={pencilDraft}
              fill={colorToCss(lastUsedColor)}
              x={0}
              y={0}
              onPointerDown={() => { }}
            />
          )}
          {others.map(([key, other]) => {
            if (other.pencilDraft) {
              return (
                <Path
                  key={key}
                  x={0}
                  y={0}
                  points={other.pencilDraft}
                  fill={other.penColor ? colorToCss(other.penColor) : "#000"}
                  onPointerDown={() => { }}
                />
              )
            }
            return null;
          })}
          <CursorsPresence />
        </g>
      </svg>
    </main>
  );
}
