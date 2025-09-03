"use client";

import Actions from "@/app/(dashboard)/_components/actions";
import Overlay from "@/app/(dashboard)/_components/board-card/overlay";
import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { Poppins } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface InfoProps {
  boardId: string;
}

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

const TabSaparator = () => <div className="text-neutral-300 px-1.5">|</div>;

export default function Info({ boardId }: InfoProps) {
  const data = useQuery(api.board.get, {
    id: boardId as Id<"boards">,
  });

  return (
    <div className="absolute top-2 left-2 bg-white rounded-md px-2 h-12 flex items-center shadow-md z-50">
      {/* Logo + Board text */}
      <Hint label="go to boards" side="bottom" sideOffset={10}>
        <Button className="px-2" variant={"board"} asChild>
          <Link href={"/"}>
            <Image src="/logo.svg" alt="logo" width={40} height={40} />
            <span
              className={cn(
                "font-semibold text-xl ml-2 text-black",
                font.className
              )}
            >
              Board
            </span>
          </Link>
        </Button>
      </Hint>

      <TabSaparator />
      <Overlay />

      {/* Board Name (Actions) beside "Board" */}
      <Hint label="board actions" side="bottom" sideOffset={10}>
        <div className="ml-2">
          <Actions
            id={data?._id || ""}
            side="right"
            title={data?.title || ""}
            sideOffset={10}
            modal={false}
          >
            <Button variant="board" className="text-base font-normal px-2">
              {data?.title || "Untitled"}
            </Button>
          </Actions>
        </div>
      </Hint>
    </div>
  );
}
