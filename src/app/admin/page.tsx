"use client";

import React from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Users,
  ShieldCheck,
  Rocket,
  DollarSign,
  ClipboardList,
  MessageSquare,
  AlertTriangle,
  Activity,
} from "lucide-react";

const summaryCards = [
  {
    title: "Total Users",
    icon: Users,
    color: "text-blue-cta",
    bgColor: "bg-blue-cta/10",
  },
  {
    title: "Verified CISOs",
    icon: ShieldCheck,
    color: "text-navy",
    bgColor: "bg-navy/10",
  },
  {
    title: "Active Founders",
    icon: Rocket,
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
  },
  {
    title: "MRR",
    icon: DollarSign,
    color: "text-amber-600",
    bgColor: "bg-amber-50",
  },
];

const pendingAlerts = [
  {
    label: "Pending CISO applications",
    count: 0,
    href: "/admin/ciso-applications",
    icon: ClipboardList,
    color: "text-amber-600",
  },
  {
    label: "Startup submissions to review",
    count: 0,
    href: "/admin/startups",
    icon: Rocket,
    color: "text-blue-cta",
  },
  {
    label: "Unread messages",
    count: 0,
    href: "/admin/messages",
    icon: MessageSquare,
    color: "text-navy",
  },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h2 className="font-serif text-2xl text-[#0A0A0A]">Dashboard</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Overview of platform activity and pending items.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {summaryCards.map((card) => {
          const Icon = card.icon;
          return (
            <Card key={card.title}>
              <CardHeader className="flex flex-row items-center justify-between pb-1">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {card.title}
                </CardTitle>
                <div
                  className={`flex size-8 items-center justify-center rounded-lg ${card.bgColor}`}
                >
                  <Icon className={`size-4 ${card.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-20" />
                <p className="mt-1 text-xs text-muted-foreground">
                  <span className="text-muted-foreground">&mdash;</span>
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Pending Alerts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-sm font-semibold">
            <AlertTriangle className="size-4 text-amber-500" />
            Pending Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-2 sm:flex-row sm:gap-6">
            {pendingAlerts.map((alert) => {
              const Icon = alert.icon;
              return (
                <Link
                  key={alert.href}
                  href={alert.href}
                  className="flex items-center gap-2 rounded-lg border border-[#E5E7EB] px-4 py-3 transition-colors hover:bg-[#F9FAFB]"
                >
                  <Icon className={`size-4 ${alert.color}`} />
                  <span className="text-sm text-[#0A0A0A]">
                    {alert.label}
                  </span>
                  <Badge className="ml-auto bg-muted text-muted-foreground">
                    {alert.count}
                  </Badge>
                </Link>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity Feed */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-sm font-semibold">
            <Activity className="size-4 text-muted-foreground" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <Separator />
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="flex size-12 items-center justify-center rounded-full bg-muted">
              <Activity className="size-5 text-muted-foreground" />
            </div>
            <p className="mt-3 text-sm font-medium text-[#0A0A0A]">
              No recent activity
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Activity from users, applications, and submissions will appear
              here.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
