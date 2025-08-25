"use client";

import React from "react";
import Canvas from "./_components/canvas";
import { Room } from "@/components/room";
import CanvasLoading from "./_components/canvas-loading";

export default function BoardIdPage({ params }: { params: Promise<{ boardId: string }> }) {
  const { boardId } = React.use(params);

  return (
    <Room roomId={boardId} fallback={<CanvasLoading />}>
      <Canvas boardId={boardId} />
    </Room>
  );
}
