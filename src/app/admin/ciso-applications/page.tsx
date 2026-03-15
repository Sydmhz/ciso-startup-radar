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
import type { CisoApplication } from "@/lib/types";
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
import {
  Linkedin,
  Search,
  CheckCircle,
  XCircle,
  Eye,
  UserCheck,
  UserX,
} from "lucide-react";

const mockApplications: CisoApplication[] = [
  {
    id: "app-001",
    full_name: "Sarah Chen",
    title: "Chief Information Security Officer",
    company: "Fortinet",
    linkedin_url: "https://linkedin.com/in/sarachen",
    work_email: "sarah.chen@fortinet.com",
    certifications: ["CISSP", "CISM", "CCSP"],
    referral_source: "Industry conference",
    status: "pending",
    submitted_at: "2026-03-10T14:30:00Z",
    reviewed_at: null,
  },
  {
    id: "app-002",
    full_name: "Marcus Williams",
    title: "VP of Security",
    company: "CrowdStrike",
    linkedin_url: "https://linkedin.com/in/marcuswilliams",
    work_email: "m.williams@crowdstrike.com",
    certifications: ["CISSP", "CRISC"],
    referral_source: "Colleague referral",
    status: "approved",
    submitted_at: "2026-03-05T09:15:00Z",
    reviewed_at: "2026-03-06T11:00:00Z",
  },
  {
    id: "app-003",
    full_name: "Priya Patel",
    title: "CISO",
    company: "Zscaler",
    linkedin_url: "https://linkedin.com/in/priyapatel",
    work_email: "priya.patel@zscaler.com",
    certifications: ["CISM", "CISA", "CISSP"],
    referral_source: "LinkedIn",
    status: "pending",
    submitted_at: "2026-03-12T16:45:00Z",
    reviewed_at: null,
  },
  {
    id: "app-004",
    full_name: "James O'Brien",
    title: "Director of Information Security",
    company: "Palo Alto Networks",
    linkedin_url: null,
    work_email: "jobrien@paloaltonetworks.com",
    certifications: ["CISSP"],
    referral_source: null,
    status: "rejected",
    submitted_at: "2026-02-28T08:00:00Z",
    reviewed_at: "2026-03-01T10:30:00Z",
  },
  {
    id: "app-005",
    full_name: "Elena Vasquez",
    title: "Chief Security Officer",
    company: "SentinelOne",
    linkedin_url: "https://linkedin.com/in/elenavasquez",
    work_email: "elena.vasquez@sentinelone.com",
    certifications: ["CISSP", "CCISO", "CISM"],
    referral_source: "CISOStartupRadar website",
    status: "pending",
    submitted_at: "2026-03-14T11:20:00Z",
    reviewed_at: null,
  },
];

const statusStyles: Record<string, string> = {
  pending: "bg-amber-100 text-amber-800",
  approved: "bg-emerald-100 text-emerald-800",
  rejected: "bg-red-100 text-red-800",
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function CisoApplicationsPage() {
  const [applications, setApplications] =
    useState<CisoApplication[]>(mockApplications);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [detailApp, setDetailApp] = useState<CisoApplication | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState<{
    type: "approve" | "reject";
    ids: string[];
  } | null>(null);

  const filteredData = useMemo(() => {
    let data = applications;
    if (statusFilter !== "all") {
      data = data.filter((a) => a.status === statusFilter);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      data = data.filter(
        (a) =>
          a.full_name.toLowerCase().includes(q) ||
          a.company.toLowerCase().includes(q) ||
          a.work_email.toLowerCase().includes(q)
      );
    }
    return data;
  }, [applications, statusFilter, search]);

  const allSelected =
    filteredData.length > 0 &&
    filteredData.every((a) => selectedIds.has(a.id));

  function toggleSelectAll() {
    if (allSelected) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filteredData.map((a) => a.id)));
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
    const newStatus = type === "approve" ? "approved" : "rejected";
    const now = new Date().toISOString();
    setApplications((prev) =>
      prev.map((a) =>
        ids.includes(a.id)
          ? { ...a, status: newStatus as CisoApplication["status"], reviewed_at: now }
          : a
      )
    );
    setSelectedIds((prev) => {
      const next = new Set(prev);
      ids.forEach((id) => next.delete(id));
      return next;
    });
    toast.success(
      `${ids.length} application${ids.length > 1 ? "s" : ""} ${newStatus}`
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
      toast.error("No applications selected");
      return;
    }
    setConfirmAction({ type, ids });
  }

  function viewDetails(app: CisoApplication) {
    setDetailApp(app);
    setSheetOpen(true);
  }

  const columns: ColumnDef<CisoApplication>[] = [
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
      accessorKey: "full_name",
      header: "Full Name",
      cell: ({ row }) => (
        <span className="font-medium text-[#0A0A0A]">
          {row.original.full_name}
        </span>
      ),
    },
    {
      accessorKey: "company",
      header: "Company",
    },
    {
      accessorKey: "title",
      header: "Title",
      cell: ({ row }) => (
        <span className="max-w-[180px] truncate block">
          {row.original.title}
        </span>
      ),
    },
    {
      accessorKey: "work_email",
      header: "Work Email",
      cell: ({ row }) => (
        <span className="text-muted-foreground">{row.original.work_email}</span>
      ),
    },
    {
      id: "linkedin",
      header: "LinkedIn",
      cell: ({ row }) =>
        row.original.linkedin_url ? (
          <a
            href={row.original.linkedin_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-cta hover:text-blue-cta/80"
          >
            <Linkedin className="size-4" />
          </a>
        ) : (
          <span className="text-muted-foreground">--</span>
        ),
      size: 60,
    },
    {
      accessorKey: "certifications",
      header: "Certifications",
      cell: ({ row }) => (
        <div className="flex flex-wrap gap-1">
          {row.original.certifications.map((cert) => (
            <Badge
              key={cert}
              variant="secondary"
              className="text-[10px] font-medium"
            >
              {cert}
            </Badge>
          ))}
        </div>
      ),
    },
    {
      accessorKey: "referral_source",
      header: "Referral",
      cell: ({ row }) => (
        <span className="text-xs text-muted-foreground">
          {row.original.referral_source || "--"}
        </span>
      ),
    },
    {
      accessorKey: "submitted_at",
      header: "Date",
      cell: ({ row }) => (
        <span className="text-xs text-muted-foreground">
          {formatDate(row.original.submitted_at)}
        </span>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <Badge className={statusStyles[row.original.status]}>
          {row.original.status.charAt(0).toUpperCase() +
            row.original.status.slice(1)}
        </Badge>
      ),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const app = row.original;
        return (
          <div className="flex items-center gap-1">
            {app.status === "pending" && (
              <>
                <Button
                  variant="ghost"
                  size="icon-xs"
                  className="text-emerald-600 hover:bg-emerald-50 hover:text-emerald-700"
                  onClick={() => handleApprove(app.id)}
                  title="Approve"
                >
                  <CheckCircle className="size-3.5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon-xs"
                  className="text-red-600 hover:bg-red-50 hover:text-red-700"
                  onClick={() => handleReject(app.id)}
                  title="Reject"
                >
                  <XCircle className="size-3.5" />
                </Button>
              </>
            )}
            <Button
              variant="ghost"
              size="icon-xs"
              onClick={() => viewDetails(app)}
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
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-serif text-2xl text-[#0A0A0A]">
            CISO Applications
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Review and manage CISO membership applications.
          </p>
        </div>
      </div>

      {/* Filters & Bulk Actions */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by name, company, or email..."
            className="w-72 pl-8"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <Select
          value={statusFilter}
          onValueChange={(val) => { if (val) setStatusFilter(val); }}
        >
          <SelectTrigger className="w-36">
            <SelectValue placeholder="Filter status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>

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
                  No applications found.
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
        Showing {filteredData.length} of {applications.length} applications
      </div>

      {/* Detail Sheet */}
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent className="sm:max-w-lg">
          {detailApp && (
            <>
              <SheetHeader>
                <SheetTitle>{detailApp.full_name}</SheetTitle>
                <SheetDescription>Application details</SheetDescription>
              </SheetHeader>
              <div className="space-y-4 overflow-y-auto px-4 pb-4">
                <div className="space-y-3">
                  <DetailRow label="Title" value={detailApp.title} />
                  <DetailRow label="Company" value={detailApp.company} />
                  <DetailRow label="Work Email" value={detailApp.work_email} />
                  <DetailRow
                    label="LinkedIn"
                    value={
                      detailApp.linkedin_url ? (
                        <a
                          href={detailApp.linkedin_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-cta underline"
                        >
                          {detailApp.linkedin_url}
                        </a>
                      ) : (
                        "Not provided"
                      )
                    }
                  />
                  <DetailRow
                    label="Certifications"
                    value={
                      <div className="flex flex-wrap gap-1">
                        {detailApp.certifications.map((c) => (
                          <Badge
                            key={c}
                            variant="secondary"
                            className="text-xs"
                          >
                            {c}
                          </Badge>
                        ))}
                      </div>
                    }
                  />
                  <DetailRow
                    label="Referral Source"
                    value={detailApp.referral_source || "Not specified"}
                  />
                  <DetailRow
                    label="Submitted"
                    value={formatDate(detailApp.submitted_at)}
                  />
                  <DetailRow
                    label="Status"
                    value={
                      <Badge className={statusStyles[detailApp.status]}>
                        {detailApp.status.charAt(0).toUpperCase() +
                          detailApp.status.slice(1)}
                      </Badge>
                    }
                  />
                  {detailApp.reviewed_at && (
                    <DetailRow
                      label="Reviewed"
                      value={formatDate(detailApp.reviewed_at)}
                    />
                  )}
                </div>
                {detailApp.status === "pending" && (
                  <>
                    <Separator />
                    <div className="flex gap-2">
                      <Button
                        className="flex-1 bg-emerald-600 text-white hover:bg-emerald-700"
                        onClick={() => {
                          setSheetOpen(false);
                          handleApprove(detailApp.id);
                        }}
                      >
                        <CheckCircle className="size-4" />
                        Approve
                      </Button>
                      <Button
                        variant="destructive"
                        className="flex-1"
                        onClick={() => {
                          setSheetOpen(false);
                          handleReject(detailApp.id);
                        }}
                      >
                        <XCircle className="size-4" />
                        Reject
                      </Button>
                    </div>
                  </>
                )}
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
              {confirmAction?.type === "approve"
                ? "Approve Application"
                : "Reject Application"}
              {confirmAction && confirmAction.ids.length > 1 ? "s" : ""}
            </DialogTitle>
            <DialogDescription>
              {confirmAction?.type === "approve"
                ? `Are you sure you want to approve ${confirmAction.ids.length} application${confirmAction.ids.length > 1 ? "s" : ""}? This will grant CISO directory access.`
                : `Are you sure you want to reject ${confirmAction?.ids.length} application${confirmAction && confirmAction.ids.length > 1 ? "s" : ""}? The applicant${confirmAction && confirmAction.ids.length > 1 ? "s" : ""} will be notified.`}
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
