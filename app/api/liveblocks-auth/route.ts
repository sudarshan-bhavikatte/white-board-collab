import { Liveblocks } from "@liveblocks/node";
import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";
import { auth, currentUser } from "@clerk/nextjs/server";

const liveblocks = new Liveblocks({
  secret: "sk_dev_zJNNZ86lwMQKbcGE_fW-6cB3BzJECw0GsFpZmJocVZczILSOONN0WnT5BWALgX9K",
});

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export async function POST(req : Request) {
    const authorization= await auth();
    const user = await currentUser();

    if(!authorization || !user){
        return new Response("Unauthorized", {status: 403})
    }

    const {room} = await req.json();
    const board = await convex.query(api.board.get, {id:room});

    if (board?.orgId !== authorization.orgId) {
        return new Response("unauthorized", { status: 403 });
    }

    const userInfo = {
        name : user.firstName!,
        picture : user.imageUrl!,
    };

    const session = liveblocks.prepareSession(
        user.id,
        {userInfo}
    )

    if (room) {
        session.allow(room, session.FULL_ACCESS);
    }

    const {status, body} = await session.authorize();
    return new Response(body, {status});
}