"use client";

import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DropdownMenuContentProps } from "@radix-ui/react-dropdown-menu";
import { Link2, Pen, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { api } from "@/convex/_generated/api";
import ConfirmModel from "./confirm-model";
import { Button } from "@/components/ui/button";
import { Rename } from "./rename";

interface ActionsProps {
  children: React.ReactNode;
  side?: DropdownMenuContentProps["side"];
  sideOffset?: DropdownMenuContentProps["sideOffset"];
  id: string;
  title: string;
  modal?: boolean;
}

export default function Actions({
  children,
  side,
  sideOffset,
  id,
  title,
  modal
}: ActionsProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const { mutate: removeMutate, pending: removePending } = useApiMutation(
    api.board.remove
  );
  const { mutate: updateMutate, pending: updatePending } = useApiMutation(
    api.board.update
  );

  const onCopyLink = () => {
    navigator.clipboard
      .writeText(`${window.location.origin}/board/${id}`)
      .then(() => toast.success("copied"))
      .catch(() => toast.error("failed to copy"));
  };

  const OnDelete = () => {
    removeMutate({ id })
      .then(() => {
        toast.success(
          <span>
            <span className="font-semibold text-red-600">Deleted</span>{" "}
            <span className="text-gray-700">{title}</span>
          </span>
        );
        setMenuOpen(false); // ✅ close dropdown after delete
      })
      .catch(() => toast.error("failed to delete"));
  };

  const onUpdate = (newTitle: string) => {
    updateMutate({ id, title: newTitle })
      .then(() => {
        toast.success(`Updated ${title} to ${newTitle}`);
        setMenuOpen(false); // ✅ close dropdown after rename
      })
      .catch(() => toast.error("failed to rename"));
  };

  return (
    <DropdownMenu open={menuOpen} onOpenChange={setMenuOpen} modal={modal}>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent
        onClick={(e) => e.stopPropagation()}
        side={side}
        sideOffset={sideOffset}
        className="w-60 z-50"
      >
        <DropdownMenuItem
          onClick={onCopyLink}
          className="p-3 cursor-pointer border-none hover:border-none flex fle-col justify-center"
        >
          <Link2 className="mr-2 h-4 w-4 " />
          Copy link
        </DropdownMenuItem>
        <Rename
          currentName={title}
          onRename={onUpdate}
          disabled={updatePending}
        >
          <Button
            variant={"ghost"}
            className="p-3 cursor-pointer border-none hover:border-none w-full "
          >
            <Pen className="mr-2 h-4 w-4 " />
            Rename
          </Button>
        </Rename>
        <ConfirmModel
          title="Confirm ?"
          description="Confirm to delete this board and its content permanently"
          disabled={removePending}
          onConfirm={OnDelete}
        >
          <Button
            variant={"ghost"}
            className="p-3 cursor-pointer text-red-500 border-none hover:border-none w-full hover:text-red-600"
          >
            <Trash2 className="mr-2 h-4 w-4 " />
            Delete
          </Button>
        </ConfirmModel>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
