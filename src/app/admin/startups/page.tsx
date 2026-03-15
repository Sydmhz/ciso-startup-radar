"use client";

import React, { useState, useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  flexRender,
  type ColumnDef,
} from "@tanstack/react-table";
import { toast } from "sonner";
import type { Startup } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
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
import {
  Search,
  CheckCircle,
  XCircle,
  Eye,
  Star,
  UserCheck,
  UserX,
} from "lucide-react";

const mockStartups: Startup[] = [
  {
    id: "su-001",
    name: "CyberDefend AI",
    slug: "cyberdefend-ai",
    description:
      "AI-powered threat detection and incident response platform that leverages machine learning to identify sophisticated cyber threats in real-time across enterprise environments.",
    sector: "Threat Detection",
    funding_stage: "Series A",
    total_raised: "$12M",
    founding_year: 2023,
    hq: "San Francisco, CA",
    website: "https://cyberdefend.ai",
    founder_name: "Alex Rivera",
    founder_linkedin: "https://linkedin.com/in/alexrivera",
    vc_backers: ["Sequoia Capital", "Cyberstarts"],
    is_featured: false,
    is_approved: false,
    custom_fields: {},
    submitted_by: "alex@cyberdefend.ai",
    created_at: "2026-03-10T14:00:00Z",
  },
  {
    id: "su-002",
    name: "SecureVault Inc.",
    slug: "securevault",
    description:
      "Enterprise data encryption and key management solution providing zero-knowledge encryption for cloud workloads, with automated compliance reporting for SOC2, HIPAA, and PCI-DSS.",
    sector: "Data Security",
    funding_stage: "Series B",
    total_raised: "$42M",
    founding_year: 2021,
    hq: "Austin, TX",
    website: "https://securevault.com",
    founder_name: "Jordan Blake",
    founder_linkedin: "https://linkedin.com/in/jordanblake",
    vc_backers: ["Andreessen Horowitz", "YL Ventures"],
    is_featured: true,
    is_approved: true,
    custom_fields: {},
    submitted_by: "jordan@securevault.com",
    created_at: "2026-02-15T09:00:00Z",
  },
  {
    id: "su-003",
    name: "ZeroAccess Security",
    slug: "zeroaccess",
    description:
      "Next-gen zero-trust identity governance platform for mid-market and enterprise organizations, featuring continuous verification and adaptive access policies.",
    sector: "Identity & Access",
    funding_stage: "Seed",
    total_raised: "$4.5M",
    founding_year: 2024,
    hq: "New York, NY",
    website: "https://zeroaccess.co",
    founder_name: "Mei Lin Zhang",
    founder_linkedin: "https://linkedin.com/in/meilinzhang",
    vc_backers: ["CyberStarts", "Innovation Endeavors"],
    is_featured: false,
    is_approved: false,
    custom_fields: {},
    submitted_by: "meilin@zeroaccess.co",
    created_at: "2026-03-12T16:00:00Z",
  },
  {
    id: "su-004",
    name: "CloudShield Pro",
    slug: "cloudshield-pro",
    description:
      "Cloud-native application security platform providing runtime protection, vulnerability scanning, and compliance monitoring for multi-cloud Kubernetes environments.",
    sector: "Cloud Security",
    funding_stage: "Series A",
    total_raised: "$18M",
    founding_year: 2022,
    hq: "Seattle, WA",
    website: "https://cloudshieldpro.com",
    founder_name: "Daniel Okafor",
    founder_linkedin: "https://linkedin.com/in/danielokafor",
    vc_backers: ["Lightspeed Venture Partners", "Bessemer Venture Partners"],
    is_featured: false,
    is_approved: true,
    custom_fields: {},
    submitted_by: "daniel@cloudshieldpro.com",
    created_at: "2026-01-20T11:00:00Z",
  },
];

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function StartupsPage() {
  const [startups, setStartups] = useState<Startup[]>(mockStartups);
  const [search, setSearch] = useState("");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [detailStartup, setDetailStartup] = useState<Startup | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState<{
    type: "approve" | "reject";
    ids: string[];
  } | null>(null);

  const filteredData = useMemo(() => {
    if (!search.trim()) return startups;
    const q = search.toLowerCase();
    return startups.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        (s.founder_name?.toLowerCase() || "").includes(q) ||
        (s.sector?.toLowerCase() || "").includes(q)
    );
  }, [startups, search]);

  const allSelected =
    filteredData.length > 0 &&
    filteredData.every((s) => selectedIds.has(s.id));

  function toggleSelectAll() {
    if (allSelected) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filteredData.map((s) => s.id)));
    }
  }

  function toggleSelect(id: string) {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function executeAction(type: "approve" | "reject", ids: string[]) {
    setStartups((prev) =>
      prev.map((s) =>
        ids.includes(s.id)
          ? {
              ...s,
              is_approved: type === "approve",
              is_featured: type === "reject" ? false : s.is_featured,
            }
          : s
      )
    );
    setSelectedIds((prev) => {
      const next = new Set(prev);
      ids.forEach((id) => next.delete(id));
      return next;
    });
    toast.success(
      `${ids.length} startup${ids.length > 1 ? "s" : ""} ${type === "approve" ? "approved" : "rejected"}`
    );
    setConfirmAction(null);
  }

  function handleApprove(id: string) {
    setConfirmAction({ type: "approve", ids: [id] });
  }

  function handleReject(id: string) {
    setConfirmAction({ type: "reject", ids: [id] });
  }

  function handleBulkAction(type: "approve" | "reject") {
    const ids = Array.from(selectedIds);
    if (ids.length === 0) {
      toast.error("No startups selected");
      return;
    }
    setConfirmAction({ type, ids });
  }

  function toggleFeatured(id: string) {
    setStartups((prev) =>
      prev.map((s) => {
        if (s.id !== id) return s;
        if (!s.is_approved) {
          toast.error("Only approved startups can be featured");
          return s;
        }
        const newFeatured = !s.is_featured;
        toast.success(
          newFeatured
            ? `${s.name} is now featured`
            : `${s.name} removed from featured`
        );
        return { ...s, is_featured: newFeatured };
      })
    );
  }

  function viewDetails(startup: Startup) {
    setDetailStartup(startup);
    setSheetOpen(true);
  }

  const columns: ColumnDef<Startup>[] = [
    {
      id: "select",
      header: () => (
        <Checkbox
          checked={allSelected}
          onCheckedChange={toggleSelectAll}
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={selectedIds.has(row.original.id)}
          onCheckedChange={() => toggleSelect(row.original.id)}
        />
      ),
      size: 40,
    },
    {
      accessorKey: "name",
      header: "Company Name",
      cell: ({ row }) => (
        <span className="font-medium text-[#0A0A0A]">{row.original.name}</span>
      ),
    },
    {
      accessorKey: "founder_name",
      header: "Founder",
      cell: ({ row }) => (
        <span>{row.original.founder_name || "--"}</span>
      ),
    },
    {
      accessorKey: "sector",
      header: "Sector",
      cell: ({ row }) => (
        <Badge variant="secondary" className="text-xs">
          {row.original.sector || "Uncategorized"}
        </Badge>
      ),
    },
    {
      accessorKey: "funding_stage",
      header: "Funding Stage",
      cell: ({ row }) => (
        <span className="text-sm">{row.original.funding_stage || "--"}</span>
      ),
    },
    {
      accessorKey: "submitted_by",
      header: "Submitted By",
      cell: ({ row }) => (
        <span className="text-xs text-muted-foreground">
          {row.original.submitted_by || "--"}
        </span>
      ),
    },
    {
      accessorKey: "created_at",
      header: "Date",
      cell: ({ row }) => (
        <span className="text-xs text-muted-foreground">
          {formatDate(row.original.created_at)}
        </span>
      ),
    },
    {
      id: "status",
      header: "Status",
      cell: ({ row }) => (
        <Badge
          className={
            row.original.is_approved
              ? "bg-emerald-100 text-emerald-800"
              : "bg-amber-100 text-amber-800"
          }
        >
          {row.original.is_approved ? "Approved" : "Pending"}
        </Badge>
      ),
    },
    {
      id: "featured",
      header: "Featured",
      cell: ({ row }) => (
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleFeatured(row.original.id);
          }}
          className={`flex size-6 items-center justify-center rounded transition-colors ${
            row.original.is_featured
              ? "text-amber-500 hover:text-amber-600"
              : "text-muted-foreground/30 hover:text-muted-foreground/60"
          }`}
          title={row.original.is_featured ? "Remove from featured" : "Feature this startup"}
        >
          <Star
            className="size-4"
            fill={row.original.is_featured ? "currentColor" : "none"}
          />
        </button>
      ),
      size: 60,
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const startup = row.original;
        return (
          <div className="flex items-center gap-1">
            {!startup.is_approved && (
              <Button
                variant="ghost"
                size="icon-xs"
                className="text-emerald-600 hover:bg-emerald-50 hover:text-emerald-700"
                onClick={() => handleApprove(startup.id)}
                title="Approve"
              >
                <CheckCircle className="size-3.5" />
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon-xs"
              className="text-red-600 hover:bg-red-50 hover:text-red-700"
              onClick={() => handleReject(startup.id)}
              title="Reject"
            >
              <XCircle className="size-3.5" />
            </Button>
            <Button
              variant="ghost"
              size="icon-xs"
              onClick={() => viewDetails(startup)}
              title="View Details"
            >
              <Eye className="size-3.5" />
            </Button>
          </div>
        );
      },
    },
  ];

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div className="space-y-4">
      {/* Header */}
      <div>
        <h2 className="font-serif text-2xl text-[#0A0A0A]">Startups</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage startup submissions and featured listings.
        </p>
      </div>

      {/* Filters & Bulk Actions */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by name, founder, or sector..."
            className="w-72 pl-8"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {selectedIds.size > 0 && (
          <>
            <Separator orientation="vertical" className="h-6" />
            <span className="text-sm text-muted-foreground">
              {selectedIds.size} selected
            </span>
            <Button
              size="sm"
              className="bg-emerald-600 text-white hover:bg-emerald-700"
              onClick={() => handleBulkAction("approve")}
            >
              <UserCheck className="size-3.5" />
              Bulk Approve
            </Button>
            <Button
              size="sm"
              variant="destructive"
              onClick={() => handleBulkAction("reject")}
            >
              <UserX className="size-3.5" />
              Bulk Reject
            </Button>
          </>
        )}
      </div>

      {/* Table */}
      <div className="rounded-lg border border-[#E5E7EB] bg-white">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="py-12 text-center text-muted-foreground"
                >
                  No startups found.
                </TableCell>
              </TableRow>
            ) : (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div className="text-xs text-muted-foreground">
        Showing {filteredData.length} of {startups.length} startups
      </div>

      {/* Detail Sheet */}
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent className="sm:max-w-lg">
          {detailStartup && (
            <>
              <SheetHeader>
                <SheetTitle>{detailStartup.name}</SheetTitle>
                <SheetDescription>
                  {detailStartup.sector || "Cybersecurity Startup"}
                </SheetDescription>
              </SheetHeader>
              <div className="space-y-4 overflow-y-auto px-4 pb-4">
                <div className="space-y-3">
                  <DetailRow label="Slug" value={detailStartup.slug} />
                  <DetailRow
                    label="Description"
                    value={detailStartup.description || "No description"}
                  />
                  <DetailRow
                    label="Sector"
                    value={detailStartup.sector || "Not specified"}
                  />
                  <DetailRow
                    label="Funding Stage"
                    value={detailStartup.funding_stage || "Not specified"}
                  />
                  <DetailRow
                    label="Total Raised"
                    value={detailStartup.total_raised || "Undisclosed"}
                  />
                  <DetailRow
                    label="Founded"
                    value={
                      detailStartup.founding_year?.toString() || "Unknown"
                    }
                  />
                  <DetailRow
                    label="Headquarters"
                    value={detailStartup.hq || "Not specified"}
                  />
                  <DetailRow
                    label="Website"
                    value={
                      detailStartup.website ? (
                        <a
                          href={detailStartup.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-cta underline"
                        >
                          {detailStartup.website}
                        </a>
                      ) : (
                        "Not provided"
                      )
                    }
                  />
                  <DetailRow
                    label="Founder"
                    value={detailStartup.founder_name || "Not specified"}
                  />
                  <DetailRow
                    label="VC Backers"
                    value={
                      detailStartup.vc_backers &&
                      detailStartup.vc_backers.length > 0 ? (
                        <div className="flex flex-wrap gap-1">
                          {detailStartup.vc_backers.map((vc) => (
                            <Badge
                              key={vc}
                              variant="outline"
                              className="text-xs"
                            >
                              {vc}
                            </Badge>
                          ))}
                        </div>
                      ) : (
                        "None listed"
                      )
                    }
                  />
                  <DetailRow
                    label="Submitted By"
                    value={detailStartup.submitted_by || "Unknown"}
                  />
                  <DetailRow
                    label="Date"
                    value={formatDate(detailStartup.created_at)}
                  />
                  <DetailRow
                    label="Status"
                    value={
                      <Badge
                        className={
                          detailStartup.is_approved
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-amber-100 text-amber-800"
                        }
                      >
                        {detailStartup.is_approved ? "Approved" : "Pending"}
                      </Badge>
                    }
                  />
                  <DetailRow
                    label="Featured"
                    value={detailStartup.is_featured ? "Yes" : "No"}
                  />
                </div>

                <Separator />

                <div className="flex gap-2">
                  {!detailStartup.is_approved && (
                    <Button
                      className="flex-1 bg-emerald-600 text-white hover:bg-emerald-700"
                      onClick={() => {
                        setSheetOpen(false);
                        handleApprove(detailStartup.id);
                      }}
                    >
                      <CheckCircle className="size-4" />
                      Approve
                    </Button>
                  )}
                  <Button
                    variant="destructive"
                    className="flex-1"
                    onClick={() => {
                      setSheetOpen(false);
                      handleReject(detailStartup.id);
                    }}
                  >
                    <XCircle className="size-4" />
                    Reject
                  </Button>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>

      {/* Confirmation Dialog */}
      <Dialog
        open={confirmAction !== null}
        onOpenChange={(open) => {
          if (!open) setConfirmAction(null);
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {confirmAction?.type === "approve" ? "Approve" : "Reject"} Startup
              {confirmAction && confirmAction.ids.length > 1 ? "s" : ""}
            </DialogTitle>
            <DialogDescription>
              {confirmAction?.type === "approve"
                ? `Are you sure you want to approve ${confirmAction.ids.length} startup${confirmAction.ids.length > 1 ? "s" : ""}? They will appear in the public directory.`
                : `Are you sure you want to reject ${confirmAction?.ids.length} startup${confirmAction && confirmAction.ids.length > 1 ? "s" : ""}? This will remove them from the directory.`}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose render={<Button variant="outline" />}>
              Cancel
            </DialogClose>
            <Button
              className={
                confirmAction?.type === "approve"
                  ? "bg-emerald-600 text-white hover:bg-emerald-700"
                  : ""
              }
              variant={
                confirmAction?.type === "reject" ? "destructive" : "default"
              }
              onClick={() => {
                if (confirmAction) {
                  executeAction(confirmAction.type, confirmAction.ids);
                }
              }}
            >
              {confirmAction?.type === "approve" ? "Approve" : "Reject"}
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
