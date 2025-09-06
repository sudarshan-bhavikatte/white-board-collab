"use client";

import { ReactNode } from "react";

import { LiveblocksProvider, RoomProvider, ClientSideSuspense } from "@liveblocks/react/suspense";
import { LiveMap , LiveObject, LiveList } from "@liveblocks/client";

import { Layer } from "@/types/canvas";
interface RoomProps {
  children: React.ReactNode;
  roomId: string;
  fallback : NonNullable<ReactNode> | null;
}

export const Room = ({
  children,
  roomId,
  fallback,
}: RoomProps) => {
  return (
    <LiveblocksProvider authEndpoint={"/api/liveblocks-auth"} throttle={16}>

    <RoomProvider id={roomId} initialPresence={{cursor : null,selection :[]}} initialStorage={{
      layers : new LiveMap<string, LiveObject<Layer>>([]),
      layerIds : new LiveList<string>([]),

    }}>
      <ClientSideSuspense fallback={fallback}>
        {() => children}
      </ClientSideSuspense>
    </RoomProvider>
    </LiveblocksProvider>
  );
};
