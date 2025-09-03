"use client";

import Info from "./info";
import Participants from "./participants";
import Toolbar from "./toolbar";
import { useSelf } from "@liveblocks/react/suspense";

interface CanvasProps {
  boardId: string;
}

export default function Canvas({ boardId }: CanvasProps) {
  const info = useSelf((me) => me.info);

  return (
    <main className="h-full w-full absolute bg-neutral-100 touch-none">
      {/* Floating elements */}
      <Info boardId={boardId} />
      <Participants />
      <Toolbar />
    </main>
  );
}
