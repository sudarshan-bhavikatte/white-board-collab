"use client"

import Info from "./info"
import Participants from "./participants"
import Toolbar from "./toolbar"

interface CanvasProps {
    boardId:string
}
export default function Canvas({boardId}:CanvasProps) {
    return (
        <main className=" h-full w-full absoulete bg-neutral-100 touch-none">
                <Info/>
                <Participants/>
                <Toolbar/>
        </main>
    )
}