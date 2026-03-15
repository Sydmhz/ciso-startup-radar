"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { CheckCircle2 } from "lucide-react";

const certificationOptions = ["CISSP", "CISM", "CCSP", "CEH", "Other"];
const referralSources = [
  "LinkedIn",
  "Colleague",
  "Conference",
  "Search Engine",
  "Other",
];

const applySchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  currentTitle: z.string().min(2, "Current title is required"),
  currentCompany: z.string().min(1, "Current company is required"),
  linkedinUrl: z
    .string()
    .url("Please enter a valid URL")
    .or(z.literal(""))
    .optional(),
  workEmail: z.string().email("Please enter a valid work email"),
  certifications: z.array(z.string()).default([]),
  referralSource: z.string().optional(),
});

type ApplyFormInput = z.input<typeof applySchema>;

export default function ApplyPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedCerts, setSelectedCerts] = useState<string[]>([]);
  const [referral, setReferral] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ApplyFormInput>({
    resolver: zodResolver(applySchema) as never,
    defaultValues: {
      certifications: [],
      referralSource: "",
    },
  });

  function handleCertToggle(cert: string, checked: boolean) {
    const updated = checked
      ? [...selectedCerts, cert]
      : selectedCerts.filter((c) => c !== cert);
    setSelectedCerts(updated);
    setValue("certifications", updated);
  }

  async function onSubmit(data: ApplyFormInput) {
    void data;
    setLoading(true);
    // Simulate submission
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setLoading(false);
    toast.success("Application submitted successfully!");
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="bg-white min-h-screen">
        <div className="max-w-2xl mx-auto px-4 py-20 text-center">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="font-serif text-3xl text-navy mb-4">
            Application Received
          </h1>
          <p className="text-[#0A0A0A]/70 text-lg leading-relaxed max-w-md mx-auto">
            Thank you. We manually verify all CISO applications. You&apos;ll
            hear back within 48 hours.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <section className="py-12 md:py-16 bg-gray-50 border-b border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-serif text-3xl md:text-4xl text-navy text-center">
            Apply as a CISO
          </h1>
          <p className="text-center text-[#0A0A0A]/60 mt-3 max-w-xl mx-auto">
            Join our verified CISO directory. Free access after verification.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="py-10">
        <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="bg-white">
            <CardContent className="pt-2">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-6"
              >
                {/* Full Name */}
                <div className="space-y-2">
                  <Label htmlFor="fullName">
                    Full Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="fullName"
                    placeholder="Jane Smith"
                    {...register("fullName")}
                  />
                  {errors.fullName && (
                    <p className="text-sm text-red-500">
                      {errors.fullName.message}
                    </p>
                  )}
                </div>

                {/* Current Title */}
                <div className="space-y-2">
                  <Label htmlFor="currentTitle">
                    Current Title <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="currentTitle"
                    placeholder="Chief Information Security Officer"
                    {...register("currentTitle")}
                  />
                  {errors.currentTitle && (
                    <p className="text-sm text-red-500">
                      {errors.currentTitle.message}
                    </p>
                  )}
                </div>

                {/* Current Company */}
                <div className="space-y-2">
                  <Label htmlFor="currentCompany">
                    Current Company <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="currentCompany"
                    placeholder="Acme Corporation"
                    {...register("currentCompany")}
                  />
                  {errors.currentCompany && (
                    <p className="text-sm text-red-500">
                      {errors.currentCompany.message}
                    </p>
                  )}
                </div>

                {/* LinkedIn URL */}
                <div className="space-y-2">
                  <Label htmlFor="linkedinUrl">LinkedIn URL</Label>
                  <Input
                    id="linkedinUrl"
                    placeholder="https://linkedin.com/in/yourprofile"
                    {...register("linkedinUrl")}
                  />
                  {errors.linkedinUrl && (
                    <p className="text-sm text-red-500">
                      {errors.linkedinUrl.message}
                    </p>
                  )}
                </div>

                {/* Work Email */}
                <div className="space-y-2">
                  <Label htmlFor="workEmail">
                    Work Email <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="workEmail"
                    type="email"
                    placeholder="jane.smith@company.com"
                    {...register("workEmail")}
                  />
                  {errors.workEmail && (
                    <p className="text-sm text-red-500">
                      {errors.workEmail.message}
                    </p>
                  )}
                </div>

                {/* Certifications */}
                <div className="space-y-3">
                  <Label>Certifications</Label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {certificationOptions.map((cert) => (
                      <label
                        key={cert}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <Checkbox
                          checked={selectedCerts.includes(cert)}
                          onCheckedChange={(checked) =>
                            handleCertToggle(cert, !!checked)
                          }
                        />
                        <span className="text-sm text-[#0A0A0A]">{cert}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Referral Source */}
                <div className="space-y-2">
                  <Label>How did you hear about us?</Label>
                  <Select
                    value={referral}
                    onValueChange={(val) => {
                      setReferral(val as string);
                      setValue("referralSource", val as string);
                    }}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a source" />
                    </SelectTrigger>
                    <SelectContent>
                      {referralSources.map((source) => (
                        <SelectItem key={source} value={source}>
                          {source}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Submit */}
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-navy hover:bg-navy/90 text-white h-11 text-base"
                >
                  {loading ? "Submitting..." : "Submit Application"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
