"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  LayoutDashboard,
  ClipboardList,
  MessageSquare,
  Users,
  Upload,
  Rocket,
  Briefcase,
  LogOut,
  ShieldCheck,
} from "lucide-react";

const sidebarLinks = [
  {
    href: "/admin",
    label: "Dashboard",
    icon: LayoutDashboard,
    exact: true,
  },
  {
    href: "/admin/ciso-applications",
    label: "CISO Applications",
    icon: ClipboardList,
    badgeKey: "cisoApps" as const,
  },
  {
    href: "/admin/messages",
    label: "Messages",
    icon: MessageSquare,
    badgeKey: "messages" as const,
  },
  {
    href: "/admin/accounts",
    label: "Accounts",
    icon: Users,
  },
  {
    href: "/admin/directory-upload",
    label: "Directory Upload",
    icon: Upload,
  },
  {
    href: "/admin/startups",
    label: "Startups",
    icon: Rocket,
  },
  {
    href: "/admin/venture-posts",
    label: "Venture Posts",
    icon: Briefcase,
  },
];

const badgeCounts: Record<string, number> = {
  cisoApps: 0,
  messages: 0,
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  function isActive(href: string, exact?: boolean) {
    if (exact) return pathname === href;
    return pathname === href || pathname.startsWith(href + "/");
  }

  return (
    <div className="flex h-screen overflow-hidden bg-[#F8F9FA]">
      {/* Sidebar */}
      <aside className="flex w-60 shrink-0 flex-col border-r border-[#E5E7EB] bg-white">
        {/* Sidebar Header */}
        <div className="flex h-14 items-center gap-2 px-4">
          <ShieldCheck className="size-6 text-navy" />
          <span className="font-serif text-lg font-medium text-navy">
            CISO Radar
          </span>
        </div>

        <Separator />

        {/* Navigation */}
        <nav className="flex-1 space-y-0.5 overflow-y-auto px-2 py-3">
          {sidebarLinks.map((link) => {
            const active = isActive(link.href, link.exact);
            const Icon = link.icon;
            const count =
              link.badgeKey !== undefined
                ? badgeCounts[link.badgeKey]
                : undefined;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  active
                    ? "bg-navy text-white"
                    : "text-[#0A0A0A]/70 hover:bg-[#F3F4F6] hover:text-[#0A0A0A]"
                }`}
              >
                <Icon className="size-4 shrink-0" />
                <span className="flex-1 truncate">{link.label}</span>
                {count !== undefined && count > 0 && (
                  <Badge
                    className={`h-5 min-w-[20px] justify-center px-1.5 text-[10px] font-semibold ${
                      active
                        ? "bg-white/20 text-white"
                        : "bg-blue-cta/10 text-blue-cta"
                    }`}
                  >
                    {count}
                  </Badge>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="border-t border-[#E5E7EB] p-3">
          <div className="text-xs text-muted-foreground">
            Admin v1.0
          </div>
        </div>
      </aside>

      {/* Main Area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="flex h-14 shrink-0 items-center justify-between border-b border-[#E5E7EB] bg-white px-6">
          <h1 className="text-base font-semibold text-[#0A0A0A]">
            Admin Panel
          </h1>
          <Button variant="outline" size="sm">
            <LogOut className="size-3.5" />
            Logout
          </Button>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
