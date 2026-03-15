"use client";

import React, { useState, useMemo } from "react";
import { toast } from "sonner";
import type { FounderMessage } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import {
  Mail,
  MailOpen,
  Reply,
  Eye,
} from "lucide-react";

const mockMessages: FounderMessage[] = [
  {
    id: "msg-001",
    sender_name: "Alex Rivera",
    sender_email: "alex@cyberdefend.io",
    company: "CyberDefend",
    message:
      "Hi team, I'd like to explore partnership opportunities with CISOStartupRadar. We've developed an AI-powered threat detection platform and believe our solution would resonate with your CISO community. Could we schedule a brief call to discuss featured listing options and potential co-marketing initiatives? We recently closed our Series A and are expanding our go-to-market strategy.",
    read: false,
    created_at: "2026-03-14T09:30:00Z",
  },
  {
    id: "msg-002",
    sender_name: "Jordan Blake",
    sender_email: "jordan@securevault.com",
    company: "SecureVault Inc.",
    message:
      "We noticed our startup listing has an outdated funding stage. We recently completed our Series B round ($42M) led by Andreessen Horowitz. Could you update our profile to reflect this? Also, we'd like to inquire about the enterprise tier features for our CISO advisory board members. Thanks!",
    read: true,
    created_at: "2026-03-11T14:15:00Z",
  },
  {
    id: "msg-003",
    sender_name: "Mei Lin Zhang",
    sender_email: "meilin@zeroaccess.co",
    company: "ZeroAccess Security",
    message:
      "I'm reaching out regarding the venture board seat posting feature. We're a seed-stage zero-trust startup and several of our investors are former CISOs. We'd love to post a board advisor opportunity. Could you walk me through the process and pricing? Our product focuses on identity governance and we think CISO input at the board level would be invaluable.",
    read: false,
    created_at: "2026-03-13T16:45:00Z",
  },
];

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function truncate(str: string, len: number) {
  return str.length > len ? str.slice(0, len) + "..." : str;
}

export default function MessagesPage() {
  const [messages, setMessages] = useState<FounderMessage[]>(mockMessages);
  const [tab, setTab] = useState<string>("all");
  const [selectedMessage, setSelectedMessage] =
    useState<FounderMessage | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);

  const filteredMessages = useMemo(() => {
    if (tab === "unread") return messages.filter((m) => !m.read);
    if (tab === "read") return messages.filter((m) => m.read);
    return messages;
  }, [messages, tab]);

  const unreadCount = messages.filter((m) => !m.read).length;

  function openMessage(msg: FounderMessage) {
    setSelectedMessage(msg);
    setSheetOpen(true);
  }

  function markAsRead(id: string) {
    setMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, read: true } : m))
    );
    if (selectedMessage?.id === id) {
      setSelectedMessage((prev) => (prev ? { ...prev, read: true } : prev));
    }
    toast.success("Message marked as read");
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div>
        <h2 className="font-serif text-2xl text-[#0A0A0A]">Messages</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Incoming messages from founders and startups.
        </p>
      </div>

      {/* Filter Tabs */}
      <Tabs value={tab} onValueChange={setTab}>
        <TabsList>
          <TabsTrigger value="all">
            All ({messages.length})
          </TabsTrigger>
          <TabsTrigger value="unread">
            Unread ({unreadCount})
          </TabsTrigger>
          <TabsTrigger value="read">
            Read ({messages.length - unreadCount})
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Table */}
      <div className="rounded-lg border border-[#E5E7EB] bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Sender Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Message Preview</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[60px]">View</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredMessages.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="py-12 text-center text-muted-foreground"
                >
                  No messages found.
                </TableCell>
              </TableRow>
            ) : (
              filteredMessages.map((msg) => (
                <TableRow
                  key={msg.id}
                  className={`cursor-pointer ${!msg.read ? "bg-blue-50/40" : ""}`}
                  onClick={() => openMessage(msg)}
                >
                  <TableCell>
                    <span
                      className={`${!msg.read ? "font-semibold text-[#0A0A0A]" : "text-[#0A0A0A]"}`}
                    >
                      {msg.sender_name || "Unknown"}
                    </span>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {msg.sender_email}
                  </TableCell>
                  <TableCell>{msg.company || "--"}</TableCell>
                  <TableCell className="max-w-[260px]">
                    <span className="text-muted-foreground">
                      {truncate(msg.message, 60)}
                    </span>
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">
                    {formatDate(msg.created_at)}
                  </TableCell>
                  <TableCell>
                    {msg.read ? (
                      <Badge className="bg-muted text-muted-foreground">
                        <MailOpen className="mr-1 size-3" />
                        Read
                      </Badge>
                    ) : (
                      <Badge className="bg-blue-cta/10 text-blue-cta">
                        <Mail className="mr-1 size-3" />
                        Unread
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon-xs"
                      onClick={(e) => {
                        e.stopPropagation();
                        openMessage(msg);
                      }}
                    >
                      <Eye className="size-3.5" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div className="text-xs text-muted-foreground">
        Showing {filteredMessages.length} of {messages.length} messages
      </div>

      {/* Message Detail Sheet */}
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent className="sm:max-w-lg">
          {selectedMessage && (
            <>
              <SheetHeader>
                <SheetTitle>
                  {selectedMessage.sender_name || "Unknown Sender"}
                </SheetTitle>
                <SheetDescription>
                  {selectedMessage.sender_email}
                  {selectedMessage.company &&
                    ` - ${selectedMessage.company}`}
                </SheetDescription>
              </SheetHeader>
              <div className="space-y-4 px-4 pb-4">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>{formatDate(selectedMessage.created_at)}</span>
                  {selectedMessage.read ? (
                    <Badge className="bg-muted text-muted-foreground">
                      Read
                    </Badge>
                  ) : (
                    <Badge className="bg-blue-cta/10 text-blue-cta">
                      Unread
                    </Badge>
                  )}
                </div>

                <Separator />

                <div className="rounded-lg bg-[#F9FAFB] p-4">
                  <p className="whitespace-pre-wrap text-sm leading-relaxed text-[#0A0A0A]">
                    {selectedMessage.message}
                  </p>
                </div>

                <Separator />

                <div className="flex gap-2">
                  {!selectedMessage.read && (
                    <Button
                      variant="outline"
                      onClick={() => markAsRead(selectedMessage.id)}
                    >
                      <MailOpen className="size-4" />
                      Mark as Read
                    </Button>
                  )}
                  <Button
                    className="bg-blue-cta text-white hover:bg-blue-cta/90"
                    onClick={() => {
                      window.location.href = `mailto:${selectedMessage.sender_email}?subject=Re: Message from ${selectedMessage.sender_name || "Founder"}`;
                    }}
                  >
                    <Reply className="size-4" />
                    Reply
                  </Button>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
