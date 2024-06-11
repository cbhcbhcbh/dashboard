"use client"

import * as React from "react"
import {
  AlertCircle,
  Archive,
  ArchiveX,
  File,
  Inbox,
  MessagesSquare,
  Search,
  Send,
  ShoppingCart,
  Trash2,
  Users2,
  ChevronRight,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"
import { Nav } from "@/components/ui/nav"
import { Button } from "./ui/button"

interface MailProps {
  defaultCollapsed?: boolean
}

export function SideNavbar({
  defaultCollapsed = false,
}: MailProps) {
  const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed)

  function toggleSidebar() {
    setIsCollapsed(!isCollapsed);
  }

  return (
    <div className="relative min-w-[80px] border-r px-3 pb-10 pt-24 ">
      <div className="absolute right-[-20px] top-7">
        <Button
          onClick={toggleSidebar}
          variant="secondary"
          className=" rounded-full p-2"
        >
          <ChevronRight />
        </Button>
      </div>
      <Separator />
      <Nav
        isCollapsed={isCollapsed}
        links={[
          {
            title: "Inbox",
            label: "128",
            icon: Inbox,
            variant: "default",
            href: "#",
          },
          {
            title: "Orders",
            label: "9",
            icon: File,
            variant: "ghost",
            href: "/orders",
          },
          {
            title: "Sent",
            label: "",
            icon: Send,
            variant: "ghost",
            href: "#",
          },
          {
            title: "Junk",
            label: "23",
            icon: ArchiveX,
            variant: "ghost",
            href: "#",
          },
          {
            title: "Trash",
            label: "",
            icon: Trash2,
            variant: "ghost",
            href: "#",
          },
          {
            title: "Archive",
            label: "",
            icon: Archive,
            variant: "ghost",
            href: "#",
          },
        ]}
      />
      <Separator />
      <Nav
        isCollapsed={isCollapsed}
        links={[
          {
            title: "Social",
            label: "972",
            icon: Users2,
            variant: "ghost",
            href: "#",
          },
          {
            title: "Updates",
            label: "342",
            icon: AlertCircle,
            variant: "ghost",
            href: "#",
          },
          {
            title: "Forums",
            label: "128",
            icon: MessagesSquare,
            variant: "ghost",
            href: "#",
          },
          {
            title: "Shopping",
            label: "8",
            icon: ShoppingCart,
            variant: "ghost",
            href: "#",
          },
          {
            title: "Promotions",
            label: "21",
            icon: Archive,
            variant: "ghost",
            href: "#",
          },
        ]}
      />
    </div>
  )
}