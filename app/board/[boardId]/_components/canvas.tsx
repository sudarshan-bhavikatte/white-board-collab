"use client";

import { useState } from "react";
import Info from "./info";
import Participants from "./participants";
import Toolbar from "./toolbar";
import { useSelf } from "@liveblocks/react/suspense";
import { CanvasMode, CanvasState } from "@/types/canvas";
import { useHistory, useCanRedo, useCanUndo } from "@liveblocks/react/suspense";

interface CanvasProps {
  boardId: string;
}

export default function Canvas({ boardId }: CanvasProps) {
  const info = useSelf((me) => me.info);
  const [canvasState, setCanvasState] = useState<CanvasState>({
    mode : CanvasMode.None,
  })

  const history = useHistory();
  const canUndo = useCanUndo();
  const canRedo = useCanRedo();
  return (
    <main className="h-full w-full absolute bg-neutral-100 touch-none">
      {/* Floating elements */}
      <Info boardId={boardId} />
      <Participants />
      <Toolbar canvasState={canvasState} setCanvasState={setCanvasState} canRedo={canRedo} canUndo={canUndo} undo={history.undo} redo={history.redo} />
    </main>
  );
}
