"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { toast } from "sonner";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useOrganization } from "@clerk/nextjs";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { useRouter } from "next/navigation";
export default function EmptyBoards() {
  const { organization } = useOrganization();
  const { pending } = useApiMutation(api.board.create);
  const create = useMutation(api.board.create);
  const router = useRouter();
  const onClick = async () => {
    if (!organization) return;
    await create({
      title: `Untitled`,
      orgId: organization.id,
    }).then((id) => {
      toast.success("board created");
      router.push(`/board/${id}}`)
    })
      .catch(() => toast.error("failed to create board"));
  };
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <Image src="/note.svg" alt="empty " width={100} height={100} />
      <h2 className="text-2xl font-semibold mt-6">create your first board</h2>
      <p className="text-black foreground">start by creating a new board.</p>
      <div className="mt-6 ">
        <Button size="lg" disabled={pending} onClick={onClick}>
          Create board
        </Button>
      </div>
    </div>
  );
}
