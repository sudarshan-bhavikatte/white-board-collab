"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface RenameDialogProps {
  children: React.ReactNode
  currentName: string
  onRename: (newName: string) => void
  title?: string
  description?: string
  disabled?: boolean
}

export function Rename({
  children,
  currentName,
  onRename,
  title = "Rename Item",
  description = "Enter a new name for this item.",
  disabled,
}: RenameDialogProps) {
  const [open, setOpen] = useState(false)
  const [newName, setNewName] = useState(currentName)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (newName.trim() && newName.trim() !== currentName) {
      onRename(newName.trim())
      setOpen(false)
    }
  }

  const handleCancel = () => {
    setNewName(currentName)
    setOpen(false)
  }

  const handleOpenChange = (newOpen: boolean) => {
    if (newOpen) {
      setNewName(currentName)
    }
    setOpen(newOpen)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="col-span-3"
                autoFocus

              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button type="submit" disabled={!newName.trim() || newName.trim() === currentName || disabled}>
              Rename
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
