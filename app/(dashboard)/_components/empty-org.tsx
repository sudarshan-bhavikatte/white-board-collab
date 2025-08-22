"use client"
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { CreateOrganization } from "@clerk/nextjs";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

import Image from "next/image";
 
export default function EmptyOrg() {
  return (
    <div className="h-full flex flex-col items-center justify-center">
      <Image
      src={"/empty.svg"} alt={"Empty Organization"}
      height={200}
      width={200}
      />
      <h2 className="text-2xl font-semibold mt-6">
        Welcome to Whiteboard!
      </h2>
      <p className="text-muted-foreground text-sm mt-2">
            Create a new organization or join an existing one.
      </p>
      <div className="mt-6">
        <Dialog>
            <DialogTrigger asChild>
                <Button size={"lg"}>
                    Create an organization
                </Button>
            </DialogTrigger>
            <DialogContent className="p-0 bg-transparent border-none max-w-[480px]">
              <VisuallyHidden>
          <DialogTitle>Organization Profile</DialogTitle>
        </VisuallyHidden>
              <CreateOrganization/>
            </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
