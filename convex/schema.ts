import { v } from "convex/values";
import { defineSchema, defineTable } from "convex/server";

const schema = defineSchema({
  boards: defineTable({
    title: v.string(),
    orgId: v.string(),
    authorId: v.string(),
    authorName: v.string(),
    imageUrl: v.string(), // use camelCase here for consistency
  })
    .index("by_org", ["orgId"])
    .searchIndex("search_title", {
      searchField: "title",   // ✅ lowercase key
      filterFields: ["orgId"],
    }),

    userFavorites: defineTable({
        boardId: v.id("boards"),
        userId: v.string(),
        orgId : v.string()
    })
    .index("by_user_org", ["userId" , "orgId"])
    .index("by_board", ["boardId"])
    .index("by_user_board",["userId", "boardId"])
    .index("by_user_board_org", ["userId", "boardId", "orgId"]) 
});

export default schema;
