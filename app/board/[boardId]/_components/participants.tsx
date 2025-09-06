"use client";

import { useOthers, useSelf } from "@liveblocks/react/suspense";
import UserAvater from "./user-avatar";
import { getRandomColor } from "@/lib/utils";

const MAX_USERS_TO_SHOW = 3;

export default function Participants() {

  const others = useOthers();
  const self = useSelf();
  const hasMoreUsers = others.length > MAX_USERS_TO_SHOW;
  console.log(others, self);
  return (
    <div className="fixed top-2 right-2 bg-white rounded-md h-12 px-3 flex items-center shadow-md z-50">
      <div className="flex gap-x-2 overflow-hidden">
          {others.slice(0, MAX_USERS_TO_SHOW).map((other) => (
            <UserAvater key={other.connectionId} src={other.info?.picture} name={other.info?.name} fallback={other.info?.name?.[0] || "A"}  borderColor={getRandomColor(other.connectionId)}/>
          ))}

          {self &&
            <UserAvater key={self.connectionId} src={self.info?.picture} name={`${self.info?.name} (You)`} fallback={self.info?.name?.[0] || "A"} 
              borderColor={getRandomColor(self.connectionId)}
            />
          }

          {hasMoreUsers && (
            <UserAvater name={`+${others.length - MAX_USERS_TO_SHOW}`} 
            fallback={`+${others.length - MAX_USERS_TO_SHOW}`}

            />
          )}
      </div>
    </div>
  );
}
