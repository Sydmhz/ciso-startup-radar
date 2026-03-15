"use client";

import React, { useState, useMemo } from "react";
import { toast } from "sonner";
import type { VenturePost } from "@/lib/types";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { CheckCircle, Trash2, Eye } from "lucide-react";

const typeStyles: Record<string, string> = {
  partner: "bg-blue-100 text-blue-800",
  board_seat: "bg-purple-100 text-purple-800",
  deal_flow: "bg-emerald-100 text-emerald-800",
};

const typeLabels: Record<string, string> = {
  partner: "Partner",
  board_seat: "Board Seat",
  deal_flow: "Deal Flow",
};

const mockPosts: VenturePost[] = [
  {
    id: "vp-001",
    posted_by: "jordan@securevault.com",
    type: "partner",
    title: "Strategic Security Partner for Enterprise Go-to-Market",
    description:
      "SecureVault is seeking a strategic partner with deep CISO relationships to help accelerate our enterprise go-to-market strategy. Ideal partner would have an established network of Fortune 500 CISOs and experience in data security or encryption markets. We offer competitive partnership terms including revenue sharing and co-selling opportunities. Our Series B momentum and Andreessen Horowitz backing provide strong tailwinds for the right partner.",
    company: "SecureVault Inc.",
    is_active: true,
    created_at: "2026-03-08T10:00:00Z",
  },
  {
    id: "vp-002",
    posted_by: "meilin@zeroaccess.co",
    type: "board_seat",
    title: "CISO Advisory Board Member - Zero Trust Identity",
    description:
      "ZeroAccess Security is looking for an experienced CISO to join our advisory board. We are building a next-gen zero-trust identity governance platform and need strategic guidance on product direction, enterprise security requirements, and compliance frameworks. The advisory role includes equity compensation and quarterly board meetings. Ideal candidate has experience with IAM/IGA in large-scale enterprise environments.",
    company: "ZeroAccess Security",
    is_active: true,
    created_at: "2026-03-11T14:30:00Z",
  },
  {
    id: "vp-003",
    posted_by: "daniel@cloudshieldpro.com",
    type: "deal_flow",
    title: "Series B Co-Investment Opportunity in Cloud Security",
    description:
      "CloudShield Pro is opening a limited co-investment opportunity in our upcoming Series B round. We are focused on cloud-native application security with strong traction in Kubernetes environments. Current ARR of $8M with 3x YoY growth. Seeking strategic investors with deep cybersecurity domain expertise and enterprise customer relationships. Minimum investment threshold applies. Existing investors include Lightspeed and Bessemer.",
    company: "CloudShield Pro",
    is_active: false,
    created_at: "2026-02-20T09:00:00Z",
  },
];

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function VenturePostsPage() {
  const [posts, setPosts] = useState<VenturePost[]>(mockPosts);
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [selectedPost, setSelectedPost] = useState<VenturePost | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [confirmRemove, setConfirmRemove] = useState<string | null>(null);

  const filteredPosts = useMemo(() => {
    if (typeFilter === "all") return posts;
    return posts.filter((p) => p.type === typeFilter);
  }, [posts, typeFilter]);

  function approvePost(id: string) {
    setPosts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, is_active: true } : p))
    );
    toast.success("Post approved and now active");
  }

  function removePost(id: string) {
    setPosts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, is_active: false } : p))
    );
    toast.success("Post removed from active listings");
    setConfirmRemove(null);
  }

  function viewPost(post: VenturePost) {
    setSelectedPost(post);
    setSheetOpen(true);
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div>
        <h2 className="font-serif text-2xl text-[#0A0A0A]">Venture Posts</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage partnership, board seat, and deal flow postings.
        </p>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3">
        <Select
          value={typeFilter}
          onValueChange={(val) => { if (val) setTypeFilter(val); }}
        >
          <SelectTrigger className="w-44">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="partner">Partner</SelectItem>
            <SelectItem value="board_seat">Board Seat</SelectItem>
            <SelectItem value="deal_flow">Deal Flow</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="rounded-lg border border-[#E5E7EB] bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Post Title</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Posted By</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPosts.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="py-12 text-center text-muted-foreground"
                >
                  No venture posts found.
                </TableCell>
              </TableRow>
            ) : (
              filteredPosts.map((post) => (
                <TableRow key={post.id}>
                  <TableCell className="max-w-[240px]">
                    <span className="block truncate font-medium text-[#0A0A0A]">
                      {post.title}
                    </span>
                  </TableCell>
                  <TableCell>{post.company || "--"}</TableCell>
                  <TableCell>
                    <Badge className={typeStyles[post.type]}>
                      {typeLabels[post.type]}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">
                    {post.posted_by || "--"}
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">
                    {formatDate(post.created_at)}
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={
                        post.is_active
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-muted text-muted-foreground"
                      }
                    >
                      {post.is_active ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      {!post.is_active && (
                        <Button
                          variant="ghost"
                          size="icon-xs"
                          className="text-emerald-600 hover:bg-emerald-50 hover:text-emerald-700"
                          onClick={() => approvePost(post.id)}
                          title="Approve"
                        >
                          <CheckCircle className="size-3.5" />
                        </Button>
                      )}
                      {post.is_active && (
                        <Button
                          variant="ghost"
                          size="icon-xs"
                          className="text-red-600 hover:bg-red-50 hover:text-red-700"
                          onClick={() => setConfirmRemove(post.id)}
                          title="Remove"
                        >
                          <Trash2 className="size-3.5" />
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="icon-xs"
                        onClick={() => viewPost(post)}
                        title="View Full Post"
                      >
                        <Eye className="size-3.5" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div className="text-xs text-muted-foreground">
        Showing {filteredPosts.length} of {posts.length} posts
      </div>

      {/* Full Post Sheet */}
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent className="sm:max-w-lg">
          {selectedPost && (
            <>
              <SheetHeader>
                <SheetTitle>{selectedPost.title}</SheetTitle>
                <SheetDescription>
                  {selectedPost.company || "Unknown Company"} &middot;{" "}
                  {typeLabels[selectedPost.type]}
                </SheetDescription>
              </SheetHeader>
              <div className="space-y-4 px-4 pb-4">
                <div className="space-y-3">
                  <DetailRow
                    label="Type"
                    value={
                      <Badge className={typeStyles[selectedPost.type]}>
                        {typeLabels[selectedPost.type]}
                      </Badge>
                    }
                  />
                  <DetailRow
                    label="Company"
                    value={selectedPost.company || "Not specified"}
                  />
                  <DetailRow
                    label="Posted By"
                    value={selectedPost.posted_by || "Unknown"}
                  />
                  <DetailRow
                    label="Date"
                    value={formatDate(selectedPost.created_at)}
                  />
                  <DetailRow
                    label="Status"
                    value={
                      <Badge
                        className={
                          selectedPost.is_active
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-muted text-muted-foreground"
                        }
                      >
                        {selectedPost.is_active ? "Active" : "Inactive"}
                      </Badge>
                    }
                  />
                </div>

                <Separator />

                <div className="space-y-1">
                  <span className="text-xs font-medium text-muted-foreground">
                    Full Description
                  </span>
                  <div className="rounded-lg bg-[#F9FAFB] p-4">
                    <p className="whitespace-pre-wrap text-sm leading-relaxed text-[#0A0A0A]">
                      {selectedPost.description || "No description provided."}
                    </p>
                  </div>
                </div>

                <Separator />

                <div className="flex gap-2">
                  {!selectedPost.is_active && (
                    <Button
                      className="flex-1 bg-emerald-600 text-white hover:bg-emerald-700"
                      onClick={() => {
                        approvePost(selectedPost.id);
                        setSelectedPost((prev) =>
                          prev ? { ...prev, is_active: true } : prev
                        );
                      }}
                    >
                      <CheckCircle className="size-4" />
                      Approve
                    </Button>
                  )}
                  {selectedPost.is_active && (
                    <Button
                      variant="destructive"
                      className="flex-1"
                      onClick={() => {
                        setSheetOpen(false);
                        setConfirmRemove(selectedPost.id);
                      }}
                    >
                      <Trash2 className="size-4" />
                      Remove
                    </Button>
                  )}
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>

      {/* Confirm Remove Dialog */}
      <Dialog
        open={confirmRemove !== null}
        onOpenChange={(open) => {
          if (!open) setConfirmRemove(null);
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Remove Post</DialogTitle>
            <DialogDescription>
              Are you sure you want to remove this venture post? It will no
              longer appear in the public listing. You can re-approve it later.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose render={<Button variant="outline" />}>
              Cancel
            </DialogClose>
            <Button
              variant="destructive"
              onClick={() => {
                if (confirmRemove) removePost(confirmRemove);
              }}
            >
              Remove Post
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function DetailRow({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs font-medium text-muted-foreground">
        {label}
      </span>
      <div className="text-sm text-[#0A0A0A]">{value}</div>
    </div>
  );
}
