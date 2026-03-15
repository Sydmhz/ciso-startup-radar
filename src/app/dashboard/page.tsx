"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import {
  Building2,
  ExternalLink,
  Shield,
  Briefcase,
  FileText,
} from "lucide-react";

export default function DashboardPage() {
  // In production, this would fetch the user's profile and role from Supabase
  const userRole: string | null = null;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="font-serif text-3xl text-[#0A0A0A] mb-2">Dashboard</h1>
      <p className="text-gray-500 mb-8">
        Welcome back. Manage your account and access platform features.
      </p>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Account Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                Active
              </Badge>
              <span className="text-sm text-gray-500">
                {userRole || "Founder"}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Subscription
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Skeleton className="h-5 w-24" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Member Since
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Skeleton className="h-5 w-32" />
          </CardContent>
        </Card>
      </div>

      {/* Role-specific sections */}
      <div className="space-y-6">
        {/* CISO Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Shield className="h-5 w-5 text-navy" />
              CISO Resources
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-sm">CISO Directory</p>
                <p className="text-xs text-gray-500">
                  Access the full verified CISO directory
                </p>
              </div>
              <Button asChild size="sm" variant="outline">
                <Link href="/cisos">
                  View <ExternalLink className="ml-1 h-3 w-3" />
                </Link>
              </Button>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-sm">Venture Network</p>
                <p className="text-xs text-gray-500">
                  Browse deal flow and advisory opportunities
                </p>
              </div>
              <Button asChild size="sm" variant="outline">
                <Link href="/venture-network">
                  View <ExternalLink className="ml-1 h-3 w-3" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Founder Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Building2 className="h-5 w-5 text-navy" />
              Founder Tools
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-sm">Your Startup Listing</p>
                <p className="text-xs text-gray-500">
                  Manage your startup profile in the directory
                </p>
              </div>
              <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
                Pending Review
              </Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-sm">Post to Venture Network</p>
                <p className="text-xs text-gray-500">
                  Share partnership opportunities with CISOs
                </p>
              </div>
              <Button asChild size="sm" variant="outline">
                <Link href="/venture-network">
                  Post <Briefcase className="ml-1 h-3 w-3" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Training Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <FileText className="h-5 w-5 text-navy" />
              Training & Certification
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-sm">Training Programs</p>
                <p className="text-xs text-gray-500">
                  Explore CISO training and certification programs
                </p>
              </div>
              <Button asChild size="sm" variant="outline">
                <Link href="/training">
                  Browse <ExternalLink className="ml-1 h-3 w-3" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
