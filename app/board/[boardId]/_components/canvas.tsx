"use client";

import { use, useCallback, useState } from "react";
import Info from "./info";
import Participants from "./participants";
import Toolbar from "./toolbar";
import { useSelf } from "@liveblocks/react/suspense";
import { CanvasMode, CanvasState } from "@/types/canvas";
import { useHistory, useCanRedo, useCanUndo , useMutation} from "@liveblocks/react/suspense";
import { CursorsPresence } from "./cousors-presence";
import { pointerEventToCanvasPoint } from "@/lib/utils";


const MAX_LAYERS = 100;
interface CanvasProps {
  boardId: string;
}

export default function Canvas({ boardId }: CanvasProps) {
  const info = useSelf((me) => me.info);
  const [canvasState, setCanvasState] = useState<CanvasState>({
    mode: CanvasMode.None,
  });

  const [camera, setCamera] = useState({ x: 0, y: 0 });

  const history = useHistory();
  const canUndo = useCanUndo();
  const canRedo = useCanRedo();

  const onWheel = useCallback((e: React.WheelEvent) => {
    
    setCamera((cam) => ({
      x: cam.x - e.deltaX,
      y: cam.y - e.deltaY,
    }))
  },[])

  const onPointerMove = useMutation(({setMyPresence}, e: React.PointerEvent) =>{
    e.preventDefault();
    const current = pointerEventToCanvasPoint(e,camera);
    

    setMyPresence({
      cursor: current,})
  },[])

  const onPointerLeave = useMutation(({setMyPresence}, e: React.PointerEvent) =>{
    e.preventDefault();
    setMyPresence({
      cursor: null})
  },[])

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
      <svg className="h-[100vh] w-[100vw]" onWheel={onWheel} onPointerMove={onPointerMove} onPointerLeave={onPointerLeave}>
        <g
          style={{
            transform: `translate(${camera.x}px, ${camera.y}px)`,
          }}
        >
          <CursorsPresence />
        </g>
      </svg>
    </main>
  );
}
