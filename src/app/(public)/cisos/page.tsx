"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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

const fortune100Cisos: CisoDirectoryEntry[] = [
  {
    id: "f1",
    name: "Jennifer Walsh",
    company: "JPMorgan Chase",
    industry_vertical: "Financial Services",
    previous_role: "VP Security, Goldman Sachs",
    linkedin_url: "https://linkedin.com/in/jenniferwalsh",
    certifications: ["CISSP", "CISM"],
    list_type: "fortune100",
    appointed_date: null,
    active: true,
    custom_fields: {},
    last_updated: "2024-06-01T00:00:00Z",
  },
  {
    id: "f2",
    name: "Robert Chen",
    company: "Microsoft",
    industry_vertical: "Technology",
    previous_role: "CISO, Salesforce",
    linkedin_url: "https://linkedin.com/in/robertchen",
    certifications: ["CISSP", "CCSP", "CISM"],
    list_type: "fortune100",
    appointed_date: null,
    active: true,
    custom_fields: {},
    last_updated: "2024-05-15T00:00:00Z",
  },
  {
    id: "f3",
    name: "Maria Santos",
    company: "UnitedHealth Group",
    industry_vertical: "Healthcare",
    previous_role: "SVP InfoSec, Anthem",
    linkedin_url: "https://linkedin.com/in/mariasantos",
    certifications: ["CISSP", "CISM", "CEH"],
    list_type: "fortune100",
    appointed_date: null,
    active: true,
    custom_fields: {},
    last_updated: "2024-04-20T00:00:00Z",
  },
  {
    id: "f4",
    name: "David Thompson",
    company: "Amazon",
    industry_vertical: "Technology",
    previous_role: "Director Security Engineering, Google",
    linkedin_url: "https://linkedin.com/in/davidthompson",
    certifications: ["CISSP"],
    list_type: "fortune100",
    appointed_date: null,
    active: true,
    custom_fields: {},
    last_updated: "2024-06-10T00:00:00Z",
  },
  {
    id: "f5",
    name: "Lisa Park",
    company: "Walmart",
    industry_vertical: "Retail",
    previous_role: "CISO, Target",
    linkedin_url: "https://linkedin.com/in/lisapark",
    certifications: ["CISSP", "CISM"],
    list_type: "fortune100",
    appointed_date: null,
    active: true,
    custom_fields: {},
    last_updated: "2024-03-10T00:00:00Z",
  },
  {
    id: "f6",
    name: "Michael Okafor",
    company: "Exxon Mobil",
    industry_vertical: "Energy",
    previous_role: "VP Cybersecurity, Chevron",
    linkedin_url: "https://linkedin.com/in/michaelokafor",
    certifications: ["CISSP", "CCSP"],
    list_type: "fortune100",
    appointed_date: null,
    active: true,
    custom_fields: {},
    last_updated: "2024-05-01T00:00:00Z",
  },
  {
    id: "f7",
    name: "Sarah Goldstein",
    company: "Apple",
    industry_vertical: "Technology",
    previous_role: "Head of Security, Netflix",
    linkedin_url: "https://linkedin.com/in/sarahgoldstein",
    certifications: ["CISSP", "CISM", "CCSP"],
    list_type: "fortune100",
    appointed_date: null,
    active: true,
    custom_fields: {},
    last_updated: "2024-06-05T00:00:00Z",
  },
  {
    id: "f8",
    name: "James Rodriguez",
    company: "Berkshire Hathaway",
    industry_vertical: "Financial Services",
    previous_role: "CISO, State Street",
    linkedin_url: "https://linkedin.com/in/jamesrodriguez",
    certifications: ["CISSP", "CEH"],
    list_type: "fortune100",
    appointed_date: null,
    active: true,
    custom_fields: {},
    last_updated: "2024-02-15T00:00:00Z",
  },
];

const newlyAppointedCisos: CisoDirectoryEntry[] = [
  {
    id: "n1",
    name: "Emily Nguyen",
    company: "Databricks",
    industry_vertical: "Technology",
    previous_role: "VP Security, Snowflake",
    linkedin_url: "https://linkedin.com/in/emilynguyen",
    certifications: ["CISSP", "CCSP"],
    list_type: "newly_appointed",
    appointed_date: "2024-05-01T00:00:00Z",
    active: true,
    custom_fields: {},
    last_updated: "2024-06-01T00:00:00Z",
  },
  {
    id: "n2",
    name: "Thomas Wright",
    company: "Rivian",
    industry_vertical: "Automotive",
    previous_role: "Director Security, Tesla",
    linkedin_url: "https://linkedin.com/in/thomaswright",
    certifications: ["CISSP", "CISM"],
    list_type: "newly_appointed",
    appointed_date: "2024-04-15T00:00:00Z",
    active: true,
    custom_fields: {},
    last_updated: "2024-05-20T00:00:00Z",
  },
  {
    id: "n3",
    name: "Fatima Al-Hassan",
    company: "Stripe",
    industry_vertical: "Fintech",
    previous_role: "CISO, Plaid",
    linkedin_url: "https://linkedin.com/in/fatimaalhassan",
    certifications: ["CISSP", "CISM", "CEH"],
    list_type: "newly_appointed",
    appointed_date: "2024-06-01T00:00:00Z",
    active: true,
    custom_fields: {},
    last_updated: "2024-06-10T00:00:00Z",
  },
  {
    id: "n4",
    name: "Kevin O'Malley",
    company: "Figma",
    industry_vertical: "Technology",
    previous_role: "Head of Security, Canva",
    linkedin_url: "https://linkedin.com/in/kevinomalley",
    certifications: ["CISSP"],
    list_type: "newly_appointed",
    appointed_date: "2024-03-20T00:00:00Z",
    active: true,
    custom_fields: {},
    last_updated: "2024-04-15T00:00:00Z",
  },
  {
    id: "n5",
    name: "Diana Reyes",
    company: "Anduril",
    industry_vertical: "Defense",
    previous_role: "VP Cyber, Northrop Grumman",
    linkedin_url: "https://linkedin.com/in/dianareyes",
    certifications: ["CISSP", "CISM", "CCSP"],
    list_type: "newly_appointed",
    appointed_date: "2024-05-10T00:00:00Z",
    active: true,
    custom_fields: {},
    last_updated: "2024-06-01T00:00:00Z",
  },
  {
    id: "n6",
    name: "Alex Volkov",
    company: "Scale AI",
    industry_vertical: "AI/ML",
    previous_role: "Security Lead, OpenAI",
    linkedin_url: "https://linkedin.com/in/alexvolkov",
    certifications: ["CISSP", "CEH"],
    list_type: "newly_appointed",
    appointed_date: "2024-06-05T00:00:00Z",
    active: true,
    custom_fields: {},
    last_updated: "2024-06-15T00:00:00Z",
  },
];

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
            <TableHead className="hidden md:table-cell">Industry Vertical</TableHead>
            <TableHead className="hidden lg:table-cell">Previous Role</TableHead>
            <TableHead className="w-[60px]">LinkedIn</TableHead>
            <TableHead className="hidden md:table-cell">Certifications</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {visible.map((ciso) => (
            <TableRow key={ciso.id}>
              <TableCell className="font-medium text-[#0A0A0A]">
                {ciso.name}
              </TableCell>
              <TableCell>{ciso.company}</TableCell>
              <TableCell className="hidden md:table-cell">
                {ciso.industry_vertical}
              </TableCell>
              <TableCell className="hidden lg:table-cell text-[#0A0A0A]/60">
                {ciso.previous_role}
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
              <TableCell className="hidden md:table-cell">
                <div className="flex flex-wrap gap-1">
                  {ciso.certifications?.map((cert) => (
                    <Badge key={cert} variant="secondary" className="text-xs">
                      {cert}
                    </Badge>
                  ))}
                </div>
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
                {blurred.map((ciso) => (
                  <TableRow key={ciso.id}>
                    <TableCell className="font-medium text-[#0A0A0A]">
                      {ciso.name}
                    </TableCell>
                    <TableCell>{ciso.company}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      {ciso.industry_vertical}
                    </TableCell>
                    <TableCell className="hidden lg:table-cell text-[#0A0A0A]/60">
                      {ciso.previous_role}
                    </TableCell>
                    <TableCell>
                      <Linkedin className="h-4 w-4 text-[#0A0A0A]/30" />
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <div className="flex flex-wrap gap-1">
                        {ciso.certifications?.map((cert) => (
                          <Badge
                            key={cert}
                            variant="secondary"
                            className="text-xs"
                          >
                            {cert}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/70 backdrop-blur-sm rounded-lg">
            <Lock className="h-8 w-8 text-navy/40 mb-3" />
            <p className="text-center text-[#0A0A0A]/80 font-medium mb-4 max-w-md px-4">
              Verify as a CISO or subscribe to unlock the full directory
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
            Explore verified CISOs from Fortune 100 companies and newly
            appointed security leaders
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
              </TabsTrigger>
              <TabsTrigger value="newly_appointed">
                Newly Appointed CISOs
              </TabsTrigger>
            </TabsList>

            <TabsContent value="fortune100">
              <CisoTable entries={fortune100Cisos} blurAfter={5} />
            </TabsContent>

            <TabsContent value="newly_appointed">
              <CisoTable entries={newlyAppointedCisos} blurAfter={5} />
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
}
