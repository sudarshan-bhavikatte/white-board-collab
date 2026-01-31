"use client";

import { Circle, MousePointer2, Pencil, RectangleHorizontal, Redo, StickyNote, Type, Undo } from "lucide-react";
import ToolButton from "./tool-button";
import { CanvasMode, CanvasState, LayerType } from "@/types/canvas";


interface ToolbarProps {
  canvasState: CanvasState;
  setCanvasState: (newState: CanvasState) => void;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
}

export default function Toolbar({
  canvasState,
  setCanvasState,
  undo,
  redo,
  canUndo,
  canRedo
}: ToolbarProps) {
  return (
    <div className="fixed top-1/2 -translate-y-1/2 left-2 flex flex-col gap-y-4 z-10">
      <div className="bg-white rounded-md p-1.5 flex flex-col items-center shadow-md gap-y-1">
        <ToolButton
          label="Select"
          icon={MousePointer2}
          onClick={() => setCanvasState({
            mode: CanvasMode.None
          })}
          isActive={
            canvasState.mode === CanvasMode.None ||
            canvasState.mode === CanvasMode.Translating ||
            canvasState.mode === CanvasMode.SelectionNet ||
            canvasState.mode === CanvasMode.Resizing ||
            canvasState.mode === CanvasMode.Pressing
          }
        />
        <ToolButton
          label="Text"
          icon={Type}
          onClick={() => setCanvasState({
            mode: CanvasMode.Inserting,
            layerType: LayerType.Text
          })}
          isActive={
            canvasState.mode === CanvasMode.Inserting &&
            canvasState.layerType === LayerType.Text
          }

        />
        <ToolButton
          label="Sticky Note"
          icon={StickyNote}
          onClick={() => setCanvasState({
            mode: CanvasMode.Inserting,
            layerType: LayerType.Note
          })}
          isActive={
            canvasState.mode === CanvasMode.Inserting &&
            canvasState.layerType === LayerType.Note
          }

        />
        <ToolButton
          label="Rectangle"
          icon={RectangleHorizontal}
          onClick={() => setCanvasState({
            mode: CanvasMode.Inserting,
            layerType: LayerType.Rectangle
          })}
          isActive={
            canvasState.mode === CanvasMode.Inserting &&
            canvasState.layerType === LayerType.Rectangle
          }

        />
        <ToolButton
          label="Ellipse"
          icon={Circle}
          onClick={() => setCanvasState({
            mode: CanvasMode.Inserting,
            layerType: LayerType.Ellipse
          })}
          isActive={
            canvasState.mode === CanvasMode.Inserting &&
            canvasState.layerType === LayerType.Ellipse
          }

        />
        <ToolButton
          label="Pencil"
          icon={Pencil}
          onClick={() => setCanvasState({
            mode: CanvasMode.Pencil,
          })}
          isActive={
            canvasState.mode === CanvasMode.Pencil
          }

        />
      </div>
      <div className="bg-white rounded-md p-1.5 flex flex-col items-center shadow-md gap-y-1">
        <ToolButton
          label="Undo"
          icon={Undo}
          onClick={undo}
          isDisabled={!canUndo}
        />
        <ToolButton
          label="Redo"
          icon={Redo}
          onClick={redo}
          isDisabled={!canRedo}
        />
      </div>
    </div>
  );
}

// 6.22