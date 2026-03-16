"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import {
  Search,
  Linkedin,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
  Shield,
  ChevronDown,
  Building2,
  Star,
  Sparkles,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import type { CisoDirectoryEntry } from "@/lib/types";
import allCisos from "@/lib/data/cisos.json";

const cisos = allCisos as CisoDirectoryEntry[];

/* all unique industries */
const ALL_INDUSTRIES = Array.from(
  new Set(cisos.map((c) => c.industry).filter(Boolean))
).sort() as string[];

/* helper: extract clean company name (strip role notes like "(CSO)") */
function cleanCompany(raw: string): string {
  return raw.replace(/\s*\(.*?\)\s*$/, "").trim();
}

/* helper: get company logo from Google Favicon API — full company map */
function companyLogoUrl(company: string): string {
  const name = cleanCompany(company).toLowerCase().replace(/[^a-z0-9]/g, "");
  const domainMap: Record<string, string> = {
    "3m": "3m.com",
    "7eleven": "7-eleven.com",
    abbottlaboratories: "abbott.com",
    abbvie: "abbvie.com",
    absolutesecurity: "absolute.com",
    acronis: "acronis.com",
    adobe: "adobe.com",
    advancedmicrodevices: "amd.com",
    aflac: "aflac.com",
    aig: "aig.com",
    altriagroup: "altria.com",
    amazon: "amazon.com",
    amentum: "amentum.com",
    americanelectricpower: "aep.com",
    americanexpress: "americanexpress.com",
    americanfamilyinsurancegroup: "amfam.com",
    ameriprisefinancial: "ameriprise.com",
    amrize: "amrize.com",
    anthropic: "anthropic.com",
    apolloglobalmanagement: "apollo.com",
    apple: "apple.com",
    aramark: "aramark.com",
    archerdanielsmidland: "adm.com",
    att: "att.com",
    automaticdataprocessing: "adp.com",
    avenhospitality: "avenhospitality.com",
    avnet: "avnet.com",
    bakerhughes: "bakerhughes.com",
    bakertilly: "bakertilly.com",
    bankofamerica: "bankofamerica.com",
    bankofnewyorkbny: "bnymellon.com",
    baycarehealthsystem: "baycare.org",
    bectondickinson: "bd.com",
    bestbuy: "bestbuy.com",
    beyondtrust: "beyondtrust.com",
    bjswholesaleclub: "bjs.com",
    blackducksoftware: "blackduck.com",
    blackrock: "blackrock.com",
    block: "block.xyz",
    boeing: "boeing.com",
    bonsecoursmercyhealth: "bsmhealth.org",
    bookingholdings: "bookingholdings.com",
    bostonscientific: "bostonscientific.com",
    bristolmyerssquibb: "bms.com",
    capitalonefinancial: "capitalone.com",
    cardinalhealth: "cardinalhealth.com",
    carmax: "carmax.com",
    carrierglobal: "carrier.com",
    caterpillar: "caterpillar.com",
    caterpillarinc: "caterpillar.com",
    cbregroup: "cbre.com",
    cbts: "cbts.com",
    cdw: "cdw.com",
    cencora: "cencora.com",
    centene: "centene.com",
    centretechnologies: "intivix.com",
    charlesschwab: "schwab.com",
    chartercommunications: "charter.com",
    cherrybekaert: "cbh.com",
    chevron: "chevron.com",
    chrobinsonworldwide: "chrobinson.com",
    chs: "chsinc.com",
    cisa: "cisa.gov",
    ciscosystems: "cisco.com",
    citigroup: "citigroup.com",
    cityofaustin: "austintexas.gov",
    cityofhope: "cityofhope.org",
    cityofphoenix: "phoenix.gov",
    cityofsanantoniotx: "sanantonio.gov",
    clarisalesloft: "clari.com",
    clevelandcliffs: "clevelandcliffs.com",
    cocacola: "coca-cola.com",
    cognizanttechnologysolutions: "cognizant.com",
    colgatepalmolive: "colgatepalmolive.com",
    collectivehealth: "collectivehealth.com",
    comcast: "comcast.com",
    commonwealthofpennsylvania: "pa.gov",
    concurrenttechnologiescorp: "ctc.com",
    conductorone: "conductorone.com",
    conocophillips: "conocophillips.com",
    conseroglobal: "conseroglobal.com",
    constellationenergy: "constellationenergy.com",
    coreweave: "coreweave.com",
    corteva: "corteva.com",
    costcowholesale: "costco.com",
    coupang: "coupang.com",
    cvshealth: "cvshealth.com",
    danaher: "danaher.com",
    deere: "deere.com",
    delawaredeptoftechnologyandinformation: "delaware.gov",
    delltechnologies: "dell.com",
    deltaairlines: "delta.com",
    departmentofdefense: "defense.gov",
    departmentofhomelandsecurity: "dhs.gov",
    departmentoftheairforce: "af.mil",
    discoverfinancial: "discover.com",
    discoveryeducation: "discoveryeducation.com",
    docusign: "docusign.com",
    dollargeneral: "dollargeneral.com",
    dollartree: "dollartree.com",
    dow: "dow.com",
    dukeenergy: "duke-energy.com",
    dwavequantuminc: "dwavesys.com",
    edisoninternational: "edison.com",
    elevancehealth: "elevancehealth.com",
    elililly: "lilly.com",
    envestnet: "envestnet.com",
    equinix: "equinix.com",
    eversourceenergy: "eversource.com",
    exxonmobil: "exxonmobil.com",
    fanniemae: "fanniemae.com",
    fedex: "fedex.com",
    fergusonenterprises: "ferguson.com",
    finastra: "finastra.com",
    firstadvantage: "fadv.com",
    firsthorizonbank: "firsthorizon.com",
    fiserv: "fiserv.com",
    freddiemac: "freddiemac.com",
    freeportmcmoran: "fcx.com",
    generaldynamics: "gd.com",
    generalelectricgeaerospace: "ge.com",
    generalmills: "generalmills.com",
    generalmotors: "gm.com",
    genuineparts: "genpt.com",
    georgiainstituteoftechnology: "gatech.edu",
    gevernova: "gevernova.com",
    gileadsciences: "gilead.com",
    globalpartnerslp: "globalp.com",
    halliburton: "halliburton.com",
    hartfordinsurancegroup: "thehartford.com",
    hcahealthcare: "hcahealthcare.com",
    hdiglobalusa: "hdi.global",
    healthequity: "healthequity.com",
    hewlettpackardenterprise: "hpe.com",
    hfsinclair: "hfsinclair.com",
    hireright: "hireright.com",
    homedepot: "homedepot.com",
    honeywellinternational: "honeywell.com",
    hp: "hp.com",
    hrblock: "hrblock.com",
    ibm: "ibm.com",
    imerit: "imerit.net",
    infusionpoints: "infusionpoints.com",
    ingrammicroholding: "ingrammicro.com",
    instacart: "instacart.com",
    intel: "intel.com",
    internationalpaper: "internationalpaper.com",
    ionq: "ionq.com",
    jacobssolutions: "jacobs.com",
    johnsonjohnson: "jnj.com",
    joneslanglasalle: "jll.com",
    jpmorganchase: "jpmorganchase.com",
    jumpcloud: "jumpcloud.com",
    jumpmind: "jumpmind.com",
    keepersecurity: "keepersecurity.com",
    kimberlyclark: "kimberly-clark.com",
    kkr: "kkr.com",
    kraftheinz: "kraftheinzcompany.com",
    l3harristechnologies: "l3harris.com",
    lear: "lear.com",
    leidosholdings: "leidos.com",
    lennar: "lennar.com",
    libertymutualinsurancegroup: "libertymutual.com",
    lincolnnational: "lfg.com",
    livenationentertainment: "livenationentertainment.com",
    lockheedmartin: "lockheedmartin.com",
    lowes: "lowes.com",
    macys: "macys.com",
    magna5: "magna5global.com",
    manpowergroup: "manpowergroup.com",
    marathonpetroleum: "marathonpetroleum.com",
    marshmclennan: "marshmclennan.com",
    marylanddepartmentoftechnology: "maryland.gov",
    massachusettsmutuallifeinsurance: "massmutual.com",
    mastercard: "mastercard.com",
    mcdonalds: "mcdonalds.com",
    mckesson: "mckesson.com",
    merck: "merck.com",
    metaplatforms: "meta.com",
    metlife: "metlife.com",
    metropolitanairportscommission: "metroairports.org",
    mgmresortsinternational: "mgmresorts.com",
    microntechnology: "micron.com",
    microsoft: "microsoft.com",
    molinahealthcare: "molinahealthcare.com",
    mondelezinternational: "mondelezinternational.com",
    murphyusa: "murphyusa.com",
    nasuni: "nasuni.com",
    nationwide: "nationwide.com",
    newmont: "newmont.com",
    newyorklifeinsurance: "newyorklife.com",
    nexteraenergy: "nexteraenergy.com",
    nike: "nike.com",
    nile: "nilesecure.com",
    nninc: "nninc.com",
    nordstrom: "nordstrom.com",
    northdakotainformationtechnology: "nd.gov",
    northwesternmutual: "northwesternmutual.com",
    nrgenergy: "nrg.com",
    nscale: "nscale.com",
    nvidia: "nvidia.com",
    occidentalpetroleum: "oxy.com",
    optiv: "optiv.com",
    oracle: "oracle.com",
    oraclehealthandglobalindustries: "oracle.com",
    packsize: "packsize.com",
    paramountglobal: "paramount.com",
    parkerhannifin: "parker.com",
    parkplacetechnologies: "parkplacetechnologies.com",
    pathify: "pathify.com",
    penskeautomotivegroup: "penskeautomotive.com",
    pepsico: "pepsico.com",
    performancefoodgroup: "pfgc.com",
    pfizer: "pfizer.com",
    pge: "pge.com",
    philipmorrisinternational: "pmi.com",
    phillips66: "phillips66.com",
    plainsgpholdings: "plainsallamerican.com",
    pncfinancialservicesgroup: "pnc.com",
    ppgindustries: "ppg.com",
    principalfinancialgroup: "principal.com",
    progressive: "progressive.com",
    prudentialfinancial: "prudential.com",
    pultegroup: "pultegroup.com",
    qualcomm: "qualcomm.com",
    quickbase: "quickbase.com",
    quorumsoftware: "quorumsoftware.com",
    radsecurity: "rad.security",
    regscale: "regscale.com",
    reinsurancegroupofamerica: "rgare.com",
    rootinc: "joinroot.com",
    rossstores: "rossstores.com",
    rtx: "rtx.com",
    russellinvestments: "russellinvestments.com",
    salesforce: "salesforce.com",
    saronictechnologies: "saronic.com",
    sherwinwilliams: "sherwin-williams.com",
    siliconlabs: "silabs.com",
    smartsheet: "smartsheet.com",
    southerncompany: "southerncompany.com",
    southwestairlines: "southwest.com",
    spartannash: "spartannash.com",
    statefarminsurance: "statefarm.com",
    stateofmichigan: "michigan.gov",
    stateofnebraska: "nebraska.gov",
    stateofoklahoma: "oklahoma.gov",
    statestreet: "statestreet.com",
    stonexgroup: "stonex.com",
    stryker: "stryker.com",
    synchronyfinancial: "synchrony.com",
    sysco: "sysco.com",
    target: "target.com",
    tdsynnex: "tdsynnex.com",
    tenethealthcare: "tenethealth.com",
    teradata: "teradata.com",
    terracon: "terracon.com",
    thermofisherscientific: "thermofisher.com",
    thewendyscompany: "wendys.com",
    thewinndixiecompany: "winndixie.com",
    tiaa: "tiaa.org",
    tjx: "tjx.com",
    travelers: "travelers.com",
    truistfinancial: "truist.com",
    tysonfoods: "tysonfoods.com",
    unionpacific: "up.com",
    unitedairlinesholdings: "united.com",
    unitedhealthgroup: "unitedhealthgroup.com",
    unitednaturalfoods: "unfi.com",
    unitedparcelservice: "ups.com",
    universityofcaliforniasystem: "universityofcalifornia.edu",
    universityofcentralflorida: "ucf.edu",
    upwindsecurity: "upwind.io",
    usaa: "usaa.com",
    usfoodsholding: "usfoods.com",
    verizoncommunications: "verizon.com",
    visa: "visa.com",
    walgreensbootsalliance: "walgreens.com",
    walmart: "walmart.com",
    waltdisney: "disney.com",
    warnerbrosdiscovery: "wbd.com",
    wastemanagement: "wm.com",
    webflow: "webflow.com",
    wellsfargo: "wellsfargo.com",
    wescointernational: "wesco.com",
    westernalliancebank: "westernalliancebancorporation.com",
    worldkinect: "world-kinect.com",
    wwgrainger: "grainger.com",
  };
  const domain =
    domainMap[name] ||
    `${cleanCompany(company)
      .toLowerCase()
      .replace(/\s+/g, "")}.com`;
  return `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
}

type SortField = "name" | "company" | "industry";
type SortDir = "asc" | "desc";

/* Industry dropdown component */
function IndustryDropdown({
  selected,
  onChange,
}: {
  selected: string | null;
  onChange: (v: string | null) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border ${
          selected
            ? "bg-[#1E3A5F] text-white border-[#1E3A5F] shadow-md"
            : "bg-white text-[#0A0A0A]/70 border-[#E5E7EB] hover:border-[#1E3A5F]/30 hover:bg-[#F0F4FA]"
        }`}
      >
        <Building2 className="h-3.5 w-3.5" />
        {selected || "Industry"}
        <ChevronDown
          className={`h-3.5 w-3.5 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      {open && (
        <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl border border-[#E5E7EB] shadow-xl z-50 py-1 max-h-80 overflow-y-auto">
          {selected && (
            <button
              onClick={() => {
                onChange(null);
                setOpen(false);
              }}
              className="w-full text-left px-4 py-2.5 text-sm text-[#0A0A0A]/50 hover:bg-[#F0F4FA] transition-colors flex items-center gap-2"
            >
              <X className="h-3.5 w-3.5" />
              Clear filter
            </button>
          )}
          {ALL_INDUSTRIES.map((ind) => {
            const count = cisos.filter((c) => c.industry === ind).length;
            return (
              <button
                key={ind}
                onClick={() => {
                  onChange(ind);
                  setOpen(false);
                }}
                className={`w-full text-left px-4 py-2.5 text-sm transition-colors flex items-center justify-between ${
                  selected === ind
                    ? "bg-[#1E3A5F]/5 text-[#1E3A5F] font-medium"
                    : "text-[#0A0A0A]/70 hover:bg-[#F0F4FA]"
                }`}
              >
                <span>{ind}</span>
                <span className="text-[11px] text-[#0A0A0A]/30 font-medium tabular-nums">
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function CisosPage() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState<SortField>("name");
  const [sortDir, setSortDir] = useState<SortDir>("asc");
  const [industryFilter, setIndustryFilter] = useState<string | null>(null);
  const [fortune100Filter, setFortune100Filter] = useState(false);
  const [newCisoFilter, setNewCisoFilter] = useState(false);
  const perPage = 40;

  const activeFilterCount =
    (industryFilter ? 1 : 0) +
    (fortune100Filter ? 1 : 0) +
    (newCisoFilter ? 1 : 0);

  const filtered = useMemo(() => {
    let results = [...cisos];

    // Apply filters
    if (industryFilter) {
      results = results.filter((c) => c.industry === industryFilter);
    }
    if (fortune100Filter) {
      results = results.filter((c) => c.fortune100);
    }
    if (newCisoFilter) {
      results = results.filter((c) => c.newCiso);
    }

    // Apply search
    if (search) {
      const q = search.toLowerCase();
      results = results.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          (c.company && c.company.toLowerCase().includes(q)) ||
          (c.industry && c.industry.toLowerCase().includes(q)) ||
          (c.previous_role && c.previous_role.toLowerCase().includes(q)) ||
          (c.custom_fields?.["Past Companies"] &&
            c.custom_fields["Past Companies"].toLowerCase().includes(q))
      );
    }

    // Sort
    results.sort((a, b) => {
      let aVal = "";
      let bVal = "";
      if (sortField === "name") {
        aVal = a.name || "";
        bVal = b.name || "";
      } else if (sortField === "company") {
        aVal = a.company || "";
        bVal = b.company || "";
      } else if (sortField === "industry") {
        aVal = a.industry || "";
        bVal = b.industry || "";
      }
      const cmp = aVal.localeCompare(bVal);
      return sortDir === "asc" ? cmp : -cmp;
    });
    return results;
  }, [search, sortField, sortDir, industryFilter, fortune100Filter, newCisoFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const paged = filtered.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  const pageWindow = 5;
  const startPage = Math.max(1, currentPage - Math.floor(pageWindow / 2));
  const endPage = Math.min(totalPages, startPage + pageWindow - 1);
  const visiblePages = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );

  function toggleSort(field: SortField) {
    if (sortField === field) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDir("asc");
    }
    setCurrentPage(1);
  }

  function clearAllFilters() {
    setIndustryFilter(null);
    setFortune100Filter(false);
    setNewCisoFilter(false);
    setSearch("");
    setCurrentPage(1);
  }

  return (
    <div
      className="min-h-screen"
      style={{
        background:
          "linear-gradient(180deg, #FFFFFF 0%, #F0F4FA 40%, #E8EEF6 100%)",
      }}
    >
      {/* Header */}
      <section
        className="py-16 md:py-20 relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #0A0F1C 0%, #0F1B2E 30%, #1E3A5F 70%, #0A0F1C 100%)",
        }}
      >
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, #0057FF 0%, transparent 50%), radial-gradient(circle at 80% 50%, #1E3A5F 0%, transparent 50%)",
          }}
        />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/[0.06] border border-white/10 rounded-full px-4 py-1.5 mb-6">
            <Shield className="h-3.5 w-3.5 text-[#0057FF]" />
            <span className="text-[12px] font-semibold uppercase tracking-[0.15em] text-white/50">
              Verified Network
            </span>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl text-white leading-tight">
            CISO Directory
          </h1>
          <p className="text-white/40 mt-4 text-lg max-w-xl mx-auto leading-relaxed">
            {cisos.length} security leaders from Fortune 100 and leading
            enterprises
          </p>
        </div>
      </section>

      {/* Filters + Search */}
      <section className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter bar */}
          <div className="flex flex-wrap items-center gap-3 mb-5 justify-center">
            {/* Industry dropdown */}
            <IndustryDropdown
              selected={industryFilter}
              onChange={(v) => {
                setIndustryFilter(v);
                setCurrentPage(1);
              }}
            />

            {/* Fortune 100 toggle */}
            <button
              onClick={() => {
                setFortune100Filter(!fortune100Filter);
                setCurrentPage(1);
              }}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border ${
                fortune100Filter
                  ? "bg-[#1E3A5F] text-white border-[#1E3A5F] shadow-md"
                  : "bg-white text-[#0A0A0A]/70 border-[#E5E7EB] hover:border-[#1E3A5F]/30 hover:bg-[#F0F4FA]"
              }`}
            >
              <Star className="h-3.5 w-3.5" />
              Fortune 100
              <span
                className={`text-[11px] px-1.5 py-0.5 rounded-md font-semibold tabular-nums ${
                  fortune100Filter
                    ? "bg-white/20 text-white"
                    : "bg-[#0A0A0A]/[0.04] text-[#0A0A0A]/40"
                }`}
              >
                {cisos.filter((c) => c.fortune100).length}
              </span>
            </button>

            {/* New CISOs toggle */}
            <button
              onClick={() => {
                setNewCisoFilter(!newCisoFilter);
                setCurrentPage(1);
              }}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border ${
                newCisoFilter
                  ? "bg-[#0057FF] text-white border-[#0057FF] shadow-md"
                  : "bg-white text-[#0A0A0A]/70 border-[#E5E7EB] hover:border-[#0057FF]/30 hover:bg-[#F0F4FA]"
              }`}
            >
              <Sparkles className="h-3.5 w-3.5" />
              New CISOs
              <span
                className={`text-[11px] px-1.5 py-0.5 rounded-md font-semibold tabular-nums ${
                  newCisoFilter
                    ? "bg-white/20 text-white"
                    : "bg-[#0A0A0A]/[0.04] text-[#0A0A0A]/40"
                }`}
              >
                {cisos.filter((c) => c.newCiso).length}
              </span>
            </button>

            {/* Clear all */}
            {activeFilterCount > 0 && (
              <button
                onClick={clearAllFilters}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm text-[#0A0A0A]/40 hover:text-[#0A0A0A]/70 transition-colors"
              >
                <X className="h-3.5 w-3.5" />
                Clear all
              </button>
            )}
          </div>

          {/* Search */}
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#0A0A0A]/40" />
            <Input
              placeholder="Search by name, company, industry, or past role..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-11 h-11 rounded-xl bg-white border-[#E5E7EB] shadow-sm focus:shadow-md transition-shadow"
            />
          </div>
          <p className="text-center text-xs text-[#0A0A0A]/35 mt-3">
            Showing {filtered.length} of {cisos.length} CISOs
            {activeFilterCount > 0 && (
              <span className="ml-1">
                ({activeFilterCount} filter{activeFilterCount > 1 ? "s" : ""}{" "}
                active)
              </span>
            )}
          </p>
        </div>
      </section>

      {/* Bloomberg-style List */}
      <section className="pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Table header */}
          <div className="rounded-t-xl overflow-hidden shadow-sm">
            <div
              className="grid items-center px-5 py-3 text-[11px] font-semibold uppercase tracking-wider"
              style={{
                gridTemplateColumns: "1.2fr 1fr 0.8fr 1.5fr",
                background:
                  "linear-gradient(135deg, #0A0F1C 0%, #1E3A5F 100%)",
              }}
            >
              <button
                onClick={() => toggleSort("name")}
                className="flex items-center gap-1.5 text-white/60 hover:text-white transition-colors text-left"
              >
                Name
                <ArrowUpDown className="h-3 w-3" />
              </button>
              <button
                onClick={() => toggleSort("company")}
                className="flex items-center gap-1.5 text-white/60 hover:text-white transition-colors text-left"
              >
                Current Company
                <ArrowUpDown className="h-3 w-3" />
              </button>
              <button
                onClick={() => toggleSort("industry")}
                className="flex items-center gap-1.5 text-white/60 hover:text-white transition-colors text-left hidden md:flex"
              >
                Industry
                <ArrowUpDown className="h-3 w-3" />
              </button>
              <span className="text-white/60 hidden lg:block">
                Previous Companies
              </span>
            </div>
          </div>

          {/* Rows */}
          <div className="border-x border-b border-[#E5E7EB]/70 rounded-b-xl overflow-hidden shadow-sm bg-white">
            {paged.length === 0 ? (
              <div className="text-center py-16">
                <Shield className="h-10 w-10 text-[#0A0A0A]/10 mx-auto mb-3" />
                <p className="text-[#0A0A0A]/50 text-sm">
                  No CISOs match your filters.
                </p>
                {activeFilterCount > 0 && (
                  <button
                    onClick={clearAllFilters}
                    className="text-[#0057FF] text-sm mt-2 hover:underline"
                  >
                    Clear all filters
                  </button>
                )}
              </div>
            ) : (
              paged.map((ciso, idx) => {
                const pastCompanies =
                  ciso.custom_fields?.["Past Companies"] ||
                  ciso.previous_role ||
                  "";
                const isEven = idx % 2 === 0;

                return (
                  <div
                    key={ciso.id}
                    className={`grid items-center px-5 py-3.5 border-b border-[#E5E7EB]/40 last:border-b-0 transition-all duration-200 hover:bg-gradient-to-r hover:from-[#F0F4FF]/60 hover:to-[#F8FAFF]/60 group ${
                      isEven ? "bg-white" : "bg-[#F8FAFD]/60"
                    }`}
                    style={{
                      gridTemplateColumns: "1.2fr 1fr 0.8fr 1.5fr",
                    }}
                  >
                    {/* Name + LinkedIn icon as avatar */}
                    <div className="flex items-center gap-3 min-w-0">
                      {ciso.linkedin_url ? (
                        <a
                          href={ciso.linkedin_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-9 h-9 rounded-lg shrink-0 flex items-center justify-center transition-all duration-200 group-hover:scale-105"
                          style={{
                            background:
                              "linear-gradient(135deg, #0A66C2 0%, #004182 100%)",
                          }}
                          title={`View ${ciso.name} on LinkedIn`}
                        >
                          <Linkedin className="h-4 w-4 text-white" />
                        </a>
                      ) : (
                        <div
                          className="w-9 h-9 rounded-lg shrink-0 flex items-center justify-center"
                          style={{
                            background:
                              "linear-gradient(135deg, #1E3A5F 0%, #0F2440 100%)",
                          }}
                        >
                          <Shield className="h-4 w-4 text-white/60" />
                        </div>
                      )}
                      <div className="min-w-0 flex items-center gap-2">
                        <span className="text-sm font-semibold text-[#0A0A0A] truncate block">
                          {ciso.name}
                        </span>
                        <div className="flex items-center gap-1 shrink-0">
                          {ciso.fortune100 && (
                            <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-[#1E3A5F]/[0.08] text-[#1E3A5F]">
                              F100
                            </span>
                          )}
                          {ciso.newCiso && (
                            <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-[#0057FF]/[0.08] text-[#0057FF]">
                              New
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Current Company */}
                    <div className="flex items-center gap-2.5 min-w-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={companyLogoUrl(ciso.company || "")}
                        alt=""
                        className="w-5 h-5 rounded object-contain shrink-0"
                        onError={(e) => {
                          (
                            e.currentTarget as HTMLImageElement
                          ).style.display = "none";
                        }}
                        loading="lazy"
                      />
                      <span className="text-sm text-[#0A0A0A]/65 truncate">
                        {ciso.company}
                      </span>
                    </div>

                    {/* Industry */}
                    <div className="hidden md:block min-w-0">
                      {ciso.industry ? (
                        <span className="text-xs text-[#0A0A0A]/45 truncate block">
                          {ciso.industry}
                        </span>
                      ) : (
                        <span className="text-xs text-[#0A0A0A]/15">—</span>
                      )}
                    </div>

                    {/* Previous Companies */}
                    <div className="hidden lg:block min-w-0">
                      {pastCompanies ? (
                        <span className="text-xs text-[#0A0A0A]/35 truncate block leading-relaxed">
                          {pastCompanies}
                        </span>
                      ) : (
                        <span className="text-xs text-[#0A0A0A]/15">—</span>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-8">
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
                className="rounded-lg"
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Previous
              </Button>
              {startPage > 1 && (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(1)}
                    className="rounded-lg"
                  >
                    1
                  </Button>
                  {startPage > 2 && (
                    <span className="text-[#0A0A0A]/40 px-1">...</span>
                  )}
                </>
              )}
              {visiblePages.map((page) => (
                <Button
                  key={page}
                  variant={page === currentPage ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentPage(page)}
                  className={
                    page === currentPage
                      ? "rounded-lg text-white"
                      : "rounded-lg"
                  }
                  style={
                    page === currentPage
                      ? {
                          background:
                            "linear-gradient(135deg, #1E3A5F 0%, #0057FF 100%)",
                        }
                      : undefined
                  }
                >
                  {page}
                </Button>
              ))}
              {endPage < totalPages && (
                <>
                  {endPage < totalPages - 1 && (
                    <span className="text-[#0A0A0A]/40 px-1">...</span>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(totalPages)}
                    className="rounded-lg"
                  >
                    {totalPages}
                  </Button>
                </>
              )}
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => p + 1)}
                className="rounded-lg"
              >
                Next
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
