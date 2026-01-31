"use client";

import { ReactNode } from "react";
import { ConvexReactClient } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { useAuth, SignInButton } from "@clerk/nextjs";
import { Authenticated, Unauthenticated } from "convex/react";
import { Button } from "./ui/button";
import { LogIn } from "lucide-react";

if (!process.env.NEXT_PUBLIC_CONVEX_URL) {
  throw new Error("Missing NEXT_PUBLIC_CONVEX_URL in your .env file");
}

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL);

export default function ConvexClientProvider({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
      <Authenticated>{children}</Authenticated>
      <Unauthenticated>
        <div className="flex items-center justify-center h-screen">
          <SignInButton mode="modal">
            <Button
              variant="default"
              className="flex items-center gap-2 rounded-2xl px-5 py-2 shadow-md hover:shadow-lg transition-all"
            >
              <LogIn size={18} />
              <span>Sign In</span>
            </Button>
          </SignInButton>
        </div>
      </Unauthenticated>
    </ConvexProviderWithClerk>
  );
}
