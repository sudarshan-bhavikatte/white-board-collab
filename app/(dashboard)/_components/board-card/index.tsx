"use client";

import Image from "next/image";
import Link from "next/link";
import Overlay from "./overlay";
import { formatDistanceToNow } from "date-fns";
import { useAuth } from "@clerk/nextjs";
import Footer from "./footer";
import { Skeleton } from "@/components/ui/skeleton";
import Actions from "../actions";
import { MoreHorizontal } from "lucide-react";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";


interface BoardCardProps {
  id: string;
  title: string;
  authorName: string;
  authorId: string;
  createdAt: number;
  imageUrl: string;
  orgId: string;
  isFavorite: boolean;
}
export default function BoardCard({
  id,
  title,
  authorName,
  authorId,
  createdAt,
  imageUrl,
  orgId,
  isFavorite,
}: BoardCardProps) {
  const { userId } = useAuth();
  const authorLabel = userId === authorId ? "You" : authorName;
  const CreatedAtLabel = formatDistanceToNow(createdAt, { addSuffix: true });
  const {mutate : favoriteMutate,pending : favoritePending} = useApiMutation(api.board.favorite)
  const {mutate : unFavoriteMutate,pending : unFavoritePending} = useApiMutation(api.board.unFavorite)
  const toggleFavorite = () =>{
    if(isFavorite){
      unFavoriteMutate({id}).catch(()=> toast.error("failed to unfavorite board"))
    }
    else{
      favoriteMutate({id , orgId}).catch(()=> toast.error("failed to favorite board"))
    }
  }
  return (
    <Link href={`/board/${id}`} className="">
      <div className="group aspect-[100/127] border rounded-lg flex flex-col justify-between overflow-hidden">
        <div className="relative flex-1 bg-amber-50">
          <Image src={imageUrl} alt={title} fill className="odject-fit" />
          <Overlay />
          <Actions id={id} title={title} side="right">
            <button className="absolute right-1 top-1 opacity-0 group-hover:opacity-100 transition-opacity px-3 py-2 outline-none">
              <MoreHorizontal
                className="text-white opacity-75 hover:opacity-100 transition-opacity"
              />
            </button>
          </Actions>
        </div>
        <Footer
          isFavorite={isFavorite}
          title={title}
          authorLabel={authorLabel}
          createdAtLabel={CreatedAtLabel}
          onClick={toggleFavorite}
          disabled={favoritePending || unFavoritePending}
        />
      </div>
    </Link>
  );
}

BoardCard.Skeleton = function BoardCardSkeleton() {
  return (
    <div className="aspect-[100/127] rounded-lg overflow-hidden">
      <Skeleton className="h-full w-full"/>
    </div>
  );
};
