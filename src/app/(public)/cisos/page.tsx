"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Linkedin, Lock } from "lucide-react";
import type { CisoDirectoryEntry } from "@/lib/types";
import allCisos from "@/lib/data/cisos.json";

const cisos = allCisos as CisoDirectoryEntry[];

function CisoTable({
  entries,
  blurAfter = 5,
}: {
  entries: CisoDirectoryEntry[];
  blurAfter?: number;
}) {
  const visible = entries.slice(0, blurAfter);
  const blurred = entries.slice(blurAfter);

  return (
    <div className="relative">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Company</TableHead>
            <TableHead className="hidden lg:table-cell">
              Past Companies as CISO
            </TableHead>
            <TableHead className="w-[60px]">LinkedIn</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {visible.map((ciso) => (
            <TableRow key={ciso.id}>
              <TableCell className="font-medium text-[#0A0A0A]">
                {ciso.name}
              </TableCell>
              <TableCell>{ciso.company}</TableCell>
              <TableCell className="hidden lg:table-cell text-[#0A0A0A]/60">
                {ciso.custom_fields?.["Past Companies"] ||
                  ciso.previous_role ||
                  "—"}
              </TableCell>
              <TableCell>
                {ciso.linkedin_url && (
                  <a
                    href={ciso.linkedin_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-cta hover:text-blue-cta/80"
                  >
                    <Linkedin className="h-4 w-4" />
                  </a>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Blurred rows */}
      {blurred.length > 0 && (
        <div className="relative">
          <div className="filter blur-[4px] select-none pointer-events-none">
            <Table>
              <TableBody>
                {blurred.slice(0, 10).map((ciso) => (
                  <TableRow key={ciso.id}>
                    <TableCell className="font-medium text-[#0A0A0A]">
                      {ciso.name}
                    </TableCell>
                    <TableCell>{ciso.company}</TableCell>
                    <TableCell className="hidden lg:table-cell text-[#0A0A0A]/60">
                      {ciso.custom_fields?.["Past Companies"] ||
                        ciso.previous_role ||
                        "—"}
                    </TableCell>
                    <TableCell>
                      <Linkedin className="h-4 w-4 text-[#0A0A0A]/30" />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/70 backdrop-blur-sm rounded-lg">
            <Lock className="h-8 w-8 text-navy/40 mb-3" />
            <p className="text-center text-[#0A0A0A]/80 font-medium mb-2 max-w-md px-4">
              Verify as a CISO or subscribe to unlock the full directory
            </p>
            <p className="text-center text-sm text-[#0A0A0A]/50 mb-4">
              {blurred.length} more CISOs available
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                asChild
                className="bg-navy hover:bg-navy/90 text-white"
              >
                <Link href="/apply">Apply for Free CISO Access</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-navy text-navy hover:bg-navy/5"
              >
                <Link href="/pricing">View Pricing</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function CisosPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <section className="py-12 md:py-16 bg-gray-50 border-b border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-serif text-3xl md:text-4xl text-navy text-center">
            CISO Directory
          </h1>
          <p className="text-center text-[#0A0A0A]/60 mt-3 max-w-xl mx-auto">
            {cisos.length} verified CISOs from leading companies
          </p>
        </div>
      </section>

      {/* Tabs */}
      <section className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="fortune100">
            <TabsList className="mb-6">
              <TabsTrigger value="fortune100">
                Fortune 100 CISOs
                <Badge variant="secondary" className="ml-2 text-xs">
                  {cisos.length}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="newly_appointed">
                Newly Appointed CISOs
              </TabsTrigger>
            </TabsList>

            <TabsContent value="fortune100">
              <CisoTable entries={cisos} blurAfter={5} />
            </TabsContent>

            <TabsContent value="newly_appointed">
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="w-12 h-12 rounded-full bg-navy/10 flex items-center justify-center mb-4">
                  <Lock className="h-5 w-5 text-navy/50" />
                </div>
                <h3 className="font-serif text-xl text-navy mb-2">
                  Coming Soon
                </h3>
                <p className="text-[#0A0A0A]/60 max-w-md">
                  We&apos;re tracking newly appointed CISOs across the industry.
                  This section will be available in a future update.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
}
