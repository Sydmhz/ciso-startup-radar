"use client";

import React, { useState, useRef } from "react";
import Papa from "papaparse";
import { toast } from "sonner";
import type { ColumnMapping } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Upload,
  FileSpreadsheet,
  Download,
  Save,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  XCircle,
  Loader2,
} from "lucide-react";

type DirectoryType = "ciso" | "startup" | "training";

const knownFieldsMap: Record<DirectoryType, { value: string; label: string }[]> = {
  ciso: [
    { value: "name", label: "Name" },
    { value: "company", label: "Company" },
    { value: "industry_vertical", label: "Industry Vertical" },
    { value: "previous_role", label: "Previous Role" },
    { value: "linkedin_url", label: "LinkedIn URL" },
    { value: "certifications", label: "Certifications" },
    { value: "list_type", label: "List Type" },
    { value: "appointed_date", label: "Appointed Date" },
  ],
  startup: [
    { value: "name", label: "Name" },
    { value: "slug", label: "Slug" },
    { value: "description", label: "Description" },
    { value: "sector", label: "Sector" },
    { value: "funding_stage", label: "Funding Stage" },
    { value: "total_raised", label: "Total Raised" },
    { value: "founding_year", label: "Founding Year" },
    { value: "hq", label: "Headquarters" },
    { value: "website", label: "Website" },
    { value: "founder_name", label: "Founder Name" },
    { value: "founder_linkedin", label: "Founder LinkedIn" },
    { value: "vc_backers", label: "VC Backers" },
  ],
  training: [
    { value: "name", label: "Name" },
    { value: "provider", label: "Provider" },
    { value: "format", label: "Format" },
    { value: "cost_usd", label: "Cost (USD)" },
    { value: "location_state", label: "Location / State" },
    { value: "accreditation_body", label: "Accreditation Body" },
    { value: "duration_weeks", label: "Duration (Weeks)" },
    { value: "url", label: "URL" },
  ],
};

const directoryLabels: Record<DirectoryType, string> = {
  ciso: "CISO Directory",
  startup: "Startup Directory",
  training: "Training Programs",
};

interface ImportSummary {
  imported: number;
  skipped: number;
  errors: number;
  timestamp: string;
}

export default function DirectoryUploadPage() {
  const [directoryType, setDirectoryType] = useState<DirectoryType>("ciso");
  const [csvHeaders, setCsvHeaders] = useState<string[]>([]);
  const [csvData, setCsvData] = useState<Record<string, string>[]>([]);
  const [columnMappings, setColumnMappings] = useState<
    Record<string, ColumnMapping>
  >({});
  const [importMode, setImportMode] = useState<"add" | "replace">("add");
  const [isDragging, setIsDragging] = useState(false);
  const [confirmReplace, setConfirmReplace] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [importSummary, setImportSummary] = useState<ImportSummary | null>(
    null
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  const knownFields = knownFieldsMap[directoryType];

  function resetState() {
    setCsvHeaders([]);
    setCsvData([]);
    setColumnMappings({});
    setImportSummary(null);
  }

  function handleFile(file: File) {
    if (!file.name.endsWith(".csv")) {
      toast.error("Please upload a .csv file");
      return;
    }

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const headers = results.meta.fields || [];
        const data = results.data as Record<string, string>[];

        if (headers.length === 0) {
          toast.error("CSV file has no headers");
          return;
        }

        setCsvHeaders(headers);
        setCsvData(data);

        // Auto-map columns that match known field names
        const autoMappings: Record<string, ColumnMapping> = {};
        headers.forEach((header) => {
          const normalizedHeader = header.toLowerCase().replace(/[\s_-]+/g, "_");
          const matchedField = knownFields.find(
            (f) =>
              f.value === normalizedHeader ||
              f.label.toLowerCase().replace(/[\s_-]+/g, "_") === normalizedHeader
          );
          if (matchedField) {
            autoMappings[header] = {
              target: matchedField.value,
              type: "known",
            };
          } else {
            autoMappings[header] = {
              target: "",
              type: "ignore",
            };
          }
        });

        setColumnMappings(autoMappings);
        setImportSummary(null);
        toast.success(
          `Parsed ${data.length} rows with ${headers.length} columns`
        );
      },
      error: (err) => {
        toast.error(`Failed to parse CSV: ${err.message}`);
      },
    });
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault();
    setIsDragging(true);
  }

  function handleDragLeave(e: React.DragEvent) {
    e.preventDefault();
    setIsDragging(false);
  }

  function handleFileInput(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
    // Reset input so re-uploading the same file triggers change
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function updateMapping(
    header: string,
    type: ColumnMapping["type"],
    target: string,
    customLabel?: string
  ) {
    setColumnMappings((prev) => ({
      ...prev,
      [header]: {
        type,
        target,
        ...(customLabel !== undefined ? { custom_label: customLabel } : {}),
      },
    }));
  }

  function handleMappingChange(header: string, value: string) {
    if (value === "__ignore__") {
      updateMapping(header, "ignore", "");
    } else if (value === "__custom__") {
      updateMapping(header, "custom", "", "");
    } else {
      updateMapping(header, "known", value);
    }
  }

  function handleImport() {
    if (importMode === "replace") {
      setConfirmReplace(true);
      return;
    }
    executeImport();
  }

  function executeImport() {
    setConfirmReplace(false);
    setIsImporting(true);

    // Simulate import
    setTimeout(() => {
      const totalRows = csvData.length;
      const errCount = Math.floor(Math.random() * 2);
      const skipCount =
        importMode === "add" ? Math.floor(Math.random() * 3) : 0;
      const importedCount = totalRows - errCount - skipCount;

      setImportSummary({
        imported: Math.max(0, importedCount),
        skipped: skipCount,
        errors: errCount,
        timestamp: new Date().toISOString(),
      });

      setIsImporting(false);
      toast.success(
        `Import complete: ${Math.max(0, importedCount)} rows imported`
      );
    }, 1500);
  }

  function downloadCurrentData() {
    // Simulate CSV download
    const fields = knownFieldsMap[directoryType];
    const headerRow = fields.map((f) => f.label).join(",");
    const sampleRow = fields.map(() => "").join(",");
    const csv = `${headerRow}\n${sampleRow}`;
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${directoryType}_directory_export.csv`;
    link.click();
    URL.revokeObjectURL(url);
    toast.success(`Downloaded ${directoryLabels[directoryType]} template`);
  }

  function saveMappingConfig() {
    toast.success("Field mapping saved for future imports");
  }

  // Get sample row for preview
  const sampleRow = csvData.length > 0 ? csvData[0] : null;

  // Build preview data from mappings
  const previewData: { label: string; value: string }[] = [];
  if (sampleRow) {
    Object.entries(columnMappings).forEach(([header, mapping]) => {
      if (mapping.type === "ignore") return;
      const label =
        mapping.type === "custom"
          ? mapping.custom_label || header
          : knownFields.find((f) => f.value === mapping.target)?.label ||
            mapping.target;
      previewData.push({
        label,
        value: sampleRow[header] || "",
      });
    });
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-serif text-2xl text-[#0A0A0A]">
            Directory Upload
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Import CSV data into CISO, Startup, or Training directories.
          </p>
        </div>
        <Button variant="outline" onClick={downloadCurrentData}>
          <Download className="size-4" />
          Download Current Data as CSV
        </Button>
      </div>

      {/* Directory Type Tabs */}
      <Tabs
        value={directoryType}
        onValueChange={(val) => {
          setDirectoryType(val as DirectoryType);
          resetState();
        }}
      >
        <TabsList>
          <TabsTrigger value="ciso">CISO Directory</TabsTrigger>
          <TabsTrigger value="startup">Startup Directory</TabsTrigger>
          <TabsTrigger value="training">Training Programs</TabsTrigger>
        </TabsList>

        <TabsContent value={directoryType} className="mt-4 space-y-6">
          {/* File Drop Zone */}
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={() => fileInputRef.current?.click()}
            className={`flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-10 transition-colors ${
              isDragging
                ? "border-blue-cta bg-blue-cta/5"
                : "border-[#E5E7EB] bg-[#FAFAFA] hover:border-blue-cta/40 hover:bg-[#F5F7FF]"
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv"
              className="hidden"
              onChange={handleFileInput}
            />
            <div className="flex size-12 items-center justify-center rounded-full bg-blue-cta/10">
              <Upload className="size-5 text-blue-cta" />
            </div>
            <p className="mt-3 text-sm font-medium text-[#0A0A0A]">
              {isDragging
                ? "Drop your CSV file here"
                : "Drag and drop a CSV file, or click to browse"}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Only .csv files are accepted
            </p>
          </div>

          {/* Detected Columns */}
          {csvHeaders.length > 0 && (
            <>
              {/* Column Headers Badge */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-sm font-semibold">
                    <FileSpreadsheet className="size-4 text-muted-foreground" />
                    Detected Columns ({csvHeaders.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-1.5">
                    {csvHeaders.map((header) => (
                      <Badge key={header} variant="outline" className="text-xs">
                        {header}
                      </Badge>
                    ))}
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">
                    {csvData.length} rows parsed from CSV
                  </p>
                </CardContent>
              </Card>

              {/* Field Mapping */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-sm font-semibold">
                    Field Mapping
                  </CardTitle>
                  <Button variant="outline" size="sm" onClick={saveMappingConfig}>
                    <Save className="size-3.5" />
                    Save Mapping
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="rounded-lg border border-[#E5E7EB]">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>CSV Column</TableHead>
                          <TableHead className="w-8" />
                          <TableHead>Map To</TableHead>
                          <TableHead>Custom Label</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {csvHeaders.map((header) => {
                          const mapping = columnMappings[header];
                          return (
                            <TableRow key={header}>
                              <TableCell className="font-mono text-xs font-medium">
                                {header}
                              </TableCell>
                              <TableCell>
                                <ArrowRight className="size-3.5 text-muted-foreground" />
                              </TableCell>
                              <TableCell>
                                <Select
                                  value={
                                    mapping?.type === "ignore"
                                      ? "__ignore__"
                                      : mapping?.type === "custom"
                                        ? "__custom__"
                                        : mapping?.target || "__ignore__"
                                  }
                                  onValueChange={(val) => {
                                    if (val) handleMappingChange(header, val);
                                  }}
                                >
                                  <SelectTrigger className="w-48">
                                    <SelectValue placeholder="Select mapping" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="__ignore__">
                                      Ignore
                                    </SelectItem>
                                    <SelectItem value="__custom__">
                                      Custom Field
                                    </SelectItem>
                                    {knownFields.map((field) => (
                                      <SelectItem
                                        key={field.value}
                                        value={field.value}
                                      >
                                        {field.label}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </TableCell>
                              <TableCell>
                                {mapping?.type === "custom" ? (
                                  <Input
                                    placeholder="Enter label..."
                                    className="w-40"
                                    value={mapping.custom_label || ""}
                                    onChange={(e) =>
                                      updateMapping(
                                        header,
                                        "custom",
                                        "",
                                        e.target.value
                                      )
                                    }
                                  />
                                ) : (
                                  <span className="text-xs text-muted-foreground">
                                    --
                                  </span>
                                )}
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>

              {/* Live Preview */}
              {previewData.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm font-semibold">
                      Live Preview (Sample Row)
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-lg border border-[#E5E7EB] bg-[#FAFAFA] p-4">
                      <div className="grid grid-cols-2 gap-3">
                        {previewData.map((item, i) => (
                          <div key={i} className="space-y-0.5">
                            <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                              {item.label}
                            </span>
                            <p className="text-sm text-[#0A0A0A]">
                              {item.value || (
                                <span className="italic text-muted-foreground">
                                  Empty
                                </span>
                              )}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Import Options */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-semibold">
                    Import Options
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <span className="text-xs font-medium text-muted-foreground">
                      Import Mode
                    </span>
                    <div className="flex gap-4">
                      <label className="flex cursor-pointer items-center gap-2">
                        <input
                          type="radio"
                          name="importMode"
                          value="add"
                          checked={importMode === "add"}
                          onChange={() => setImportMode("add")}
                          className="accent-blue-cta"
                        />
                        <div>
                          <span className="text-sm font-medium text-[#0A0A0A]">
                            Add New Only
                          </span>
                          <p className="text-xs text-muted-foreground">
                            Skip rows with existing names
                          </p>
                        </div>
                      </label>
                      <label className="flex cursor-pointer items-center gap-2">
                        <input
                          type="radio"
                          name="importMode"
                          value="replace"
                          checked={importMode === "replace"}
                          onChange={() => setImportMode("replace")}
                          className="accent-blue-cta"
                        />
                        <div>
                          <span className="text-sm font-medium text-[#0A0A0A]">
                            Replace All
                          </span>
                          <p className="text-xs text-muted-foreground">
                            Clear existing data and reimport
                          </p>
                        </div>
                      </label>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex items-center gap-3">
                    <Button
                      className="bg-blue-cta text-white hover:bg-blue-cta/90"
                      onClick={handleImport}
                      disabled={isImporting}
                    >
                      {isImporting ? (
                        <Loader2 className="size-4 animate-spin" />
                      ) : (
                        <Upload className="size-4" />
                      )}
                      {isImporting ? "Importing..." : "Import Data"}
                    </Button>
                    <span className="text-xs text-muted-foreground">
                      {csvData.length} rows &middot;{" "}
                      {
                        Object.values(columnMappings).filter(
                          (m) => m.type !== "ignore"
                        ).length
                      }{" "}
                      fields mapped
                    </span>
                  </div>
                </CardContent>
              </Card>

              {/* Import Summary */}
              {importSummary && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-sm font-semibold">
                      <CheckCircle2 className="size-4 text-emerald-600" />
                      Import Summary
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-4 gap-4">
                      <SummaryItem
                        label="Imported"
                        value={importSummary.imported}
                        icon={
                          <CheckCircle2 className="size-4 text-emerald-600" />
                        }
                      />
                      <SummaryItem
                        label="Skipped"
                        value={importSummary.skipped}
                        icon={
                          <AlertCircle className="size-4 text-amber-500" />
                        }
                      />
                      <SummaryItem
                        label="Errors"
                        value={importSummary.errors}
                        icon={<XCircle className="size-4 text-red-500" />}
                      />
                      <SummaryItem
                        label="Timestamp"
                        value={new Date(
                          importSummary.timestamp
                        ).toLocaleString()}
                        isText
                      />
                    </div>
                  </CardContent>
                </Card>
              )}
            </>
          )}
        </TabsContent>
      </Tabs>

      {/* Confirm Replace Dialog */}
      <Dialog open={confirmReplace} onOpenChange={setConfirmReplace}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Replace All Data</DialogTitle>
            <DialogDescription>
              This will permanently delete all existing records in the{" "}
              <strong>{directoryLabels[directoryType]}</strong> and replace them
              with {csvData.length} rows from your CSV. This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose render={<Button variant="outline" />}>
              Cancel
            </DialogClose>
            <Button variant="destructive" onClick={executeImport}>
              Replace All Data
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function SummaryItem({
  label,
  value,
  icon,
  isText,
}: {
  label: string;
  value: number | string;
  icon?: React.ReactNode;
  isText?: boolean;
}) {
  return (
    <div className="space-y-1">
      <span className="text-xs font-medium text-muted-foreground">
        {label}
      </span>
      <div className="flex items-center gap-1.5">
        {icon}
        {isText ? (
          <span className="text-xs text-[#0A0A0A]">{value}</span>
        ) : (
          <span className="text-xl font-semibold text-[#0A0A0A]">{value}</span>
        )}
      </div>
    </div>
  );
}
