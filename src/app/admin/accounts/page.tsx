"use client";

import React, { useState, useMemo } from "react";
import { toast } from "sonner";
import type { Profile } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
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
import { Search, Check, X, Eye } from "lucide-react";

interface AccountWithSub extends Profile {
  subscription_tier: string | null;
}

const mockAccounts: AccountWithSub[] = [
  {
    id: "usr-001",
    email: "sarah.chen@fortinet.com",
    full_name: "Sarah Chen",
    role: "ciso",
    company: "Fortinet",
    linkedin_url: "https://linkedin.com/in/sarachen",
    verified: true,
    created_at: "2026-01-15T10:00:00Z",
    subscription_tier: null,
  },
  {
    id: "usr-002",
    email: "alex@cyberdefend.io",
    full_name: "Alex Rivera",
    role: "founder",
    company: "CyberDefend",
    linkedin_url: "https://linkedin.com/in/alexrivera",
    verified: true,
    created_at: "2026-02-01T14:30:00Z",
    subscription_tier: "founders",
  },
  {
    id: "usr-003",
    email: "jordan@securevault.com",
    full_name: "Jordan Blake",
    role: "founder_featured",
    company: "SecureVault Inc.",
    linkedin_url: "https://linkedin.com/in/jordanblake",
    verified: true,
    created_at: "2026-02-10T09:00:00Z",
    subscription_tier: "founders_featured",
  },
  {
    id: "usr-004",
    email: "admin@cisostartupradar.com",
    full_name: "Platform Admin",
    role: "admin",
    company: "CISOStartupRadar",
    linkedin_url: null,
    verified: true,
    created_at: "2025-12-01T08:00:00Z",
    subscription_tier: null,
  },
  {
    id: "usr-005",
    email: "meilin@zeroaccess.co",
    full_name: "Mei Lin Zhang",
    role: "founder",
    company: "ZeroAccess Security",
    linkedin_url: "https://linkedin.com/in/meilinzhang",
    verified: false,
    created_at: "2026-03-08T16:00:00Z",
    subscription_tier: "founders",
  },
];

const roleColors: Record<string, string> = {
  ciso: "bg-navy/10 text-navy",
  founder: "bg-emerald-100 text-emerald-800",
  founder_featured: "bg-amber-100 text-amber-800",
  enterprise: "bg-purple-100 text-purple-800",
  admin: "bg-red-100 text-red-800",
};

const roleLabels: Record<string, string> = {
  ciso: "CISO",
  founder: "Founder",
  founder_featured: "Featured Founder",
  enterprise: "Enterprise",
  admin: "Admin",
};

const tierLabels: Record<string, string> = {
  founders: "Founders",
  founders_featured: "Featured",
  enterprise: "Enterprise",
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function AccountsPage() {
  const [accounts, setAccounts] = useState<AccountWithSub[]>(mockAccounts);
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [selectedAccount, setSelectedAccount] =
    useState<AccountWithSub | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [editRole, setEditRole] = useState<string>("");

  const filteredAccounts = useMemo(() => {
    let data = accounts;
    if (roleFilter !== "all") {
      data = data.filter((a) => a.role === roleFilter);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      data = data.filter(
        (a) =>
          (a.email?.toLowerCase() || "").includes(q) ||
          (a.full_name?.toLowerCase() || "").includes(q) ||
          (a.company?.toLowerCase() || "").includes(q)
      );
    }
    return data;
  }, [accounts, roleFilter, search]);

  function openAccount(account: AccountWithSub) {
    setSelectedAccount(account);
    setEditRole(account.role);
    setSheetOpen(true);
  }

  function saveRoleChange() {
    if (!selectedAccount) return;
    if (editRole === selectedAccount.role) {
      toast.info("No changes to save");
      return;
    }
    setAccounts((prev) =>
      prev.map((a) =>
        a.id === selectedAccount.id
          ? { ...a, role: editRole as Profile["role"] }
          : a
      )
    );
    setSelectedAccount((prev) =>
      prev ? { ...prev, role: editRole as Profile["role"] } : prev
    );
    toast.success(
      `Role updated to ${roleLabels[editRole] || editRole} for ${selectedAccount.full_name}`
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div>
        <h2 className="font-serif text-2xl text-[#0A0A0A]">Accounts</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage user accounts, roles, and subscriptions.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by email, name, or company..."
            className="w-72 pl-8"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <Select
          value={roleFilter}
          onValueChange={(val) => { if (val) setRoleFilter(val); }}
        >
          <SelectTrigger className="w-44">
            <SelectValue placeholder="Filter by role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Roles</SelectItem>
            <SelectItem value="ciso">CISO</SelectItem>
            <SelectItem value="founder">Founder</SelectItem>
            <SelectItem value="founder_featured">Featured Founder</SelectItem>
            <SelectItem value="enterprise">Enterprise</SelectItem>
            <SelectItem value="admin">Admin</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="rounded-lg border border-[#E5E7EB] bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Email</TableHead>
              <TableHead>Full Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Verified</TableHead>
              <TableHead>Subscription</TableHead>
              <TableHead>Date Joined</TableHead>
              <TableHead className="w-[60px]">View</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAccounts.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={8}
                  className="py-12 text-center text-muted-foreground"
                >
                  No accounts found.
                </TableCell>
              </TableRow>
            ) : (
              filteredAccounts.map((account) => (
                <TableRow
                  key={account.id}
                  className="cursor-pointer"
                  onClick={() => openAccount(account)}
                >
                  <TableCell className="text-muted-foreground">
                    {account.email}
                  </TableCell>
                  <TableCell className="font-medium text-[#0A0A0A]">
                    {account.full_name || "--"}
                  </TableCell>
                  <TableCell>
                    <Badge className={roleColors[account.role]}>
                      {roleLabels[account.role]}
                    </Badge>
                  </TableCell>
                  <TableCell>{account.company || "--"}</TableCell>
                  <TableCell>
                    {account.verified ? (
                      <Check className="size-4 text-emerald-600" />
                    ) : (
                      <X className="size-4 text-red-400" />
                    )}
                  </TableCell>
                  <TableCell>
                    {account.subscription_tier ? (
                      <Badge variant="outline" className="text-xs">
                        {tierLabels[account.subscription_tier] ||
                          account.subscription_tier}
                      </Badge>
                    ) : (
                      <span className="text-xs text-muted-foreground">
                        Free
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">
                    {formatDate(account.created_at)}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon-xs"
                      onClick={(e) => {
                        e.stopPropagation();
                        openAccount(account);
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
        Showing {filteredAccounts.length} of {accounts.length} accounts
      </div>

      {/* Account Detail Sheet */}
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent className="sm:max-w-lg">
          {selectedAccount && (
            <>
              <SheetHeader>
                <SheetTitle>
                  {selectedAccount.full_name || "Unnamed User"}
                </SheetTitle>
                <SheetDescription>{selectedAccount.email}</SheetDescription>
              </SheetHeader>
              <div className="space-y-4 px-4 pb-4">
                <div className="space-y-3">
                  <DetailRow
                    label="Email"
                    value={selectedAccount.email}
                  />
                  <DetailRow
                    label="Full Name"
                    value={selectedAccount.full_name || "Not set"}
                  />
                  <DetailRow
                    label="Company"
                    value={selectedAccount.company || "Not set"}
                  />
                  <DetailRow
                    label="LinkedIn"
                    value={
                      selectedAccount.linkedin_url ? (
                        <a
                          href={selectedAccount.linkedin_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-cta underline"
                        >
                          {selectedAccount.linkedin_url}
                        </a>
                      ) : (
                        "Not provided"
                      )
                    }
                  />
                  <DetailRow
                    label="Verified"
                    value={
                      selectedAccount.verified ? (
                        <div className="flex items-center gap-1 text-emerald-600">
                          <Check className="size-3.5" /> Verified
                        </div>
                      ) : (
                        <div className="flex items-center gap-1 text-red-500">
                          <X className="size-3.5" /> Not verified
                        </div>
                      )
                    }
                  />
                  <DetailRow
                    label="Date Joined"
                    value={formatDate(selectedAccount.created_at)}
                  />
                </div>

                <Separator />

                {/* Role Change */}
                <div className="space-y-2">
                  <span className="text-xs font-medium text-muted-foreground">
                    Role
                  </span>
                  <Select value={editRole} onValueChange={(val) => { if (val) setEditRole(val); }}>
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ciso">CISO</SelectItem>
                      <SelectItem value="founder">Founder</SelectItem>
                      <SelectItem value="founder_featured">
                        Featured Founder
                      </SelectItem>
                      <SelectItem value="enterprise">Enterprise</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button
                    size="sm"
                    className="bg-blue-cta text-white hover:bg-blue-cta/90"
                    onClick={saveRoleChange}
                  >
                    Save Role Change
                  </Button>
                </div>

                <Separator />

                {/* Subscription Info */}
                <div className="space-y-2">
                  <span className="text-xs font-medium text-muted-foreground">
                    Subscription
                  </span>
                  <div className="rounded-lg border border-[#E5E7EB] p-3">
                    {selectedAccount.subscription_tier ? (
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">
                            {tierLabels[selectedAccount.subscription_tier] ||
                              selectedAccount.subscription_tier}
                          </Badge>
                          <span className="text-xs text-emerald-600">
                            Active
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Managed via Stripe
                        </p>
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        No active subscription (Free tier)
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
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
