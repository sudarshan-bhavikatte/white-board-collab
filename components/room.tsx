"use client";

import { ReactNode } from "react";

import { LiveblocksProvider, RoomProvider, ClientSideSuspense } from "@liveblocks/react/suspense";

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
    // publicApiKey="pk_dev__UjEZuz4o7KUj2_EcEwcgkzwh40eDGigWP1OnWbH2_-etdk7n5n3-Mw2RMSbUcWP"
    <LiveblocksProvider authEndpoint={"/api/liveblocks-auth"} throttle={16}>

    <RoomProvider id={roomId} initialPresence={{cursor : null}}>
      <ClientSideSuspense fallback={fallback}>
        {() => children}
      </ClientSideSuspense>
    </RoomProvider>
    </LiveblocksProvider>
  );
};
