"use client"

import { memo } from "react"

import { useOthersConnectionIds } from "@liveblocks/react/suspense"
import { Cursor } from "./cursor"


const Cursors = () => {
    const connectionIds = useOthersConnectionIds()
    
    return (
        <>
            {connectionIds.map((id) => (
                <Cursor key={id} connectionId={id} />
            ))}
        </>
    )
}


export const CursorsPresence = memo(() => {
	return <Cursors />
})

CursorsPresence.displayName = "CursorsPresence"