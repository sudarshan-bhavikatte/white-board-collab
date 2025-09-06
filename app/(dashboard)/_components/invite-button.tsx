import { Plus } from "lucide-react";
import { OrganizationProfile } from "@clerk/nextjs";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { DialogTitle } from "@radix-ui/react-dialog";

export default function InviteButton() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Plus className="mr-2 h-4 w-4" />
          Invite members
        </Button>
      </DialogTrigger>
      <DialogContent className="p-0 bg-transparent border-none shadow-none max-w-[800px]">
        {/* ✅ Hidden title for accessibility */}
        <VisuallyHidden>
          <DialogTitle>Organization Profile</DialogTitle>
        </VisuallyHidden>

        <OrganizationProfile  routing="hash"/>
      </DialogContent>
    </Dialog>
  );
}
