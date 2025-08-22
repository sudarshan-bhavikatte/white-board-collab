"use client"

import { use } from "react"
import { useOrganization } from "@clerk/nextjs"
import EmptyOrg from "./_components/empty-org"
import BoardList from "./_components/board-list"

interface DashboardPageProps {
  searchParams: Promise<{
    search?: string
    favorites?: string
  }>
}

export default function DashboardPage({ searchParams }: DashboardPageProps) {
  const { organization } = useOrganization()
  const params = use(searchParams) // ✅ unwrap the promise

  return (
    <div className="flex-1 h-full p-6">
      {!organization ? <EmptyOrg /> : <BoardList
      orgId = {organization.id}
      query={params}
      />}
    </div>
  )
}
