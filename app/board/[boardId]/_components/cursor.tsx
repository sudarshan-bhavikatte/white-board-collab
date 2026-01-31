"use client"

import { memo } from "react"
import { MousePointer2 } from "lucide-react"

import { getRandomColor } from "@/lib/utils"
import { useOther } from "@liveblocks/react/suspense"

interface CursorProps {
    connectionId: number,
}

export const Cursor = memo((
    { connectionId }: CursorProps
) => {

    const info = useOther(connectionId, (user) => user.info);
    const cursor = useOther(connectionId, (user) => user.presence.cursor);

    const name = info?.name || "Anonymous";

    if (!cursor) return null;

    const { x, y } = cursor;
    return (
        <foreignObject
            transform={`translate(${x} ${y})`}
            height={50}
            width={name.length * 10 + 24}
            className="relative drop-shadow-md pointer-events-none"
        >
            <MousePointer2 className="h-5 w-5" style={
                {
                    fill: getRandomColor(connectionId),
                    color: getRandomColor(connectionId),
                }
            } />
            <div className="absolute left-5 px-1.5 py-0.5 rounded-md text-xs text-white font-semibold"
                style={{
                    backgroundColor: getRandomColor(connectionId),
                }}
            >
                {name}
            </div>
        </foreignObject>
    )

})

Cursor.displayName = "Cursor";