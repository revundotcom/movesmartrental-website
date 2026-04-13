"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";

/* ─── Shared dark card shell ─────────────────────────────────────────── */
const BG =
  "h-full w-full bg-gradient-to-br from-[#071228] via-[#0B1D3A] to-[#071228] flex items-center justify-center relative overflow-hidden";

const GRID_OVERLAY = {
  backgroundImage:
    "linear-gradient(rgba(16,185,129,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(16,185,129,0.06) 1px,transparent 1px)",
  backgroundSize: "22px 22px",
};

/* ════════════════════════════════════════════════════════════════════════
   1 - TenantScreeningVisual
   Credit score arc + animated checklist + "Verified" badge
════════════════════════════════════════════════════════════════════════ */
export function TenantScreeningVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const checks = [
    { label: "Credit Score", delay: "0s" },
    { label: "Employment", delay: "0.35s" },
    { label: "References", delay: "0.7s" },
    { label: "ID Verified", delay: "1.05s" },
  ];

  /* Arc math - score gauge 0-100 maps to 0-180° sweep on a 70r semicircle */
  const r = 52;
  const cx = 90;
  const cy = 82;
  const sweep = Math.PI; // 180°
  const score = 760;
  const scoreAngle = ((score - 300) / (850 - 300)) * sweep - Math.PI;
  const needleX = cx + r * Math.cos(scoreAngle);
  const needleY = cy + r * Math.sin(scoreAngle);
  const arcEnd = `${cx + r * Math.cos(0)} ${cy}`; // right tip

  return (
    <div ref={ref} className={BG}>
      <div className="absolute inset-0 opacity-[1]" style={GRID_OVERLAY} />

      {/* Score gauge - SVG */}
      <div className="absolute left-4 top-6">
        <svg width="180" height="96" viewBox="0 0 180 96" fill="none">
          {/* Background arc track */}
          <path
            d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="8"
            strokeLinecap="round"
          />
          {/* Filled arc - emerald */}
          <path
            d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${arcEnd}`}
            stroke="#10B981"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray="163"
            strokeDashoffset={inView ? 0 : 163}
            style={{
              transition: inView
                ? "stroke-dashoffset 1.4s cubic-bezier(0.34,1.1,0.64,1)"
                : "none",
            }}
          />
          {/* Needle */}
          <line
            x1={cx}
            y1={cy}
            x2={inView ? needleX : cx - r}
            y2={inView ? needleY : cy}
            stroke="#D4A853"
            strokeWidth="2.5"
            strokeLinecap="round"
            style={{
              transition: inView ? "x2 1.4s ease, y2 1.4s ease" : "none",
            }}
          />
          <circle cx={cx} cy={cy} r="4" fill="#D4A853" />
          {/* Labels */}
          <text x={cx - r - 2} y={cy + 14} fontSize="8" fill="rgba(255,255,255,0.45)" textAnchor="middle">300</text>
          <text x={cx + r + 2} y={cy + 14} fontSize="8" fill="rgba(255,255,255,0.45)" textAnchor="middle">850</text>
          <text x={cx} y={cy - 6} fontSize="16" fontWeight="bold" fill="white" textAnchor="middle">
            {score}
          </text>
          <text x={cx} y={cy + 8} fontSize="7" fill="#10B981" textAnchor="middle" letterSpacing="0.08em">
            EXCELLENT
          </text>
        </svg>
      </div>

      {/* Checklist */}
      <div className="absolute right-5 top-8 flex flex-col gap-2">
        {checks.map((c) => (
          <div
            key={c.label}
            className="flex items-center gap-2"
            style={{
              opacity: inView ? 1 : 0,
              animation: inView
                ? `counter-up 0.4s ease both ${c.delay}`
                : "none",
            }}
          >
            <span
              className="flex size-4 items-center justify-center rounded-full bg-emerald-500"
              style={{
                animation: inView
                  ? `check-pop 0.4s cubic-bezier(0.34,1.56,0.64,1) both ${c.delay}`
                  : "none",
              }}
            >
              <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                <polyline points="1.5,4 3,6 6.5,2" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <span className="text-[10px] font-medium text-white/70">{c.label}</span>
          </div>
        ))}
      </div>

      {/* Verified badge */}
      <div
        className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 rounded-full bg-emerald-500 px-3 py-1 shadow-lg"
        style={{
          animation: inView ? "check-pop 0.5s cubic-bezier(0.34,1.56,0.64,1) both 1.2s" : "none",
          opacity: inView ? undefined : 0,
        }}
      >
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
          <path d="M5 1L6.12 3.56L9 3.82L7 5.7L7.62 8.5L5 7L2.38 8.5L3 5.7L1 3.82L3.88 3.56L5 1Z" fill="white" />
        </svg>
        <span className="text-[10px] font-bold text-white">Tenant Verified</span>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════════
   2 - RentCollectionVisual
   12-month bar chart + trend line + "$24.8K" badge
════════════════════════════════════════════════════════════════════════ */
export function RentCollectionVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const bars = [
    { h: "60%", delay: "0s" },
    { h: "72%", delay: "0.07s" },
    { h: "55%", delay: "0.14s" },
    { h: "80%", delay: "0.21s" },
    { h: "65%", delay: "0.28s" },
    { h: "90%", delay: "0.35s" },
    { h: "70%", delay: "0.42s" },
    { h: "85%", delay: "0.49s" },
    { h: "75%", delay: "0.56s" },
    { h: "95%", delay: "0.63s" },
    { h: "88%", delay: "0.70s" },
    { h: "100%", delay: "0.77s" },
  ];

  const months = ["J","F","M","A","M","J","J","A","S","O","N","D"];

  return (
    <div ref={ref} className={BG}>
      <div className="absolute inset-0 opacity-[1]" style={GRID_OVERLAY} />

      {/* Chart area */}
      <div className="relative mx-auto w-[340px] h-[140px] mt-4">
        {/* Y-axis */}
        <div className="absolute left-0 inset-y-0 w-px bg-white/10" />
        {/* X-axis */}
        <div className="absolute bottom-5 inset-x-4 h-px bg-white/10" />

        {/* Bars */}
        <div className="absolute bottom-5 left-4 right-0 flex items-end gap-[3px] h-[112px]">
          {bars.map((b, i) => (
            // Static SVG data - index key is safe
            <div key={`bar-${months[i]}`} className="flex flex-1 flex-col items-center justify-end h-full gap-0.5">
              <div
                className="w-full rounded-t-[2px] origin-bottom"
                style={{
                  height: b.h,
                  background:
                    i === 11
                      ? "linear-gradient(to top, #059669, #10B981)"
                      : "linear-gradient(to top, #0d4d38, #10B981aa)",
                  animation: inView
                    ? `bar-rise 1.8s cubic-bezier(0.34,1.15,0.64,1) both ${b.delay}`
                    : "none",
                  transform: inView ? undefined : "scaleY(0.08)",
                  transformOrigin: "bottom",
                }}
              />
              <span className="text-[6px] text-white/30">{months[i]}</span>
            </div>
          ))}
        </div>

        {/* Trend line overlay */}
        <svg
          className="absolute left-4 right-0 bottom-5 pointer-events-none"
          style={{ width: "calc(100% - 16px)", height: "112px" }}
          viewBox="0 0 316 112"
          preserveAspectRatio="none"
        >
          <polyline
            points="13,45 39,32 65,50 91,22 117,39 143,11 169,34 195,17 221,28 247,5 273,13 299,0"
            fill="none"
            stroke="rgba(212,168,83,0.7)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeDasharray="400"
            strokeDashoffset={inView ? 0 : 400}
            style={{
              transition: inView ? "stroke-dashoffset 2s ease 0.5s" : "none",
            }}
          />
        </svg>
      </div>

      {/* $24.8K badge */}
      <div
        className="absolute top-4 right-5 rounded-full bg-[#D4A853] px-2.5 py-1 text-[11px] font-bold text-[#071228] shadow-lg"
        style={{
          animation: inView ? "float-y 2.6s ease-in-out infinite" : "none",
        }}
      >
        $24.8K collected
      </div>

      {/* On-time badge */}
      <div
        className="absolute bottom-4 left-5 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-400"
        style={{
          animation: inView ? "float-y 3s ease-in-out infinite 0.8s" : "none",
        }}
      >
        98% on-time ↑
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════════
   3 - PropertyListingVisual
   MLS miniature listing card + "Live on 50+ sites" counter + network nodes
════════════════════════════════════════════════════════════════════════ */
export function PropertyListingVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const nodes = [
    { x: "20%", y: "18%", delay: "0s" },
    { x: "80%", y: "15%", delay: "0.3s" },
    { x: "12%", y: "72%", delay: "0.6s" },
    { x: "88%", y: "68%", delay: "0.9s" },
    { x: "50%", y: "85%", delay: "1.2s" },
    { x: "35%", y: "12%", delay: "0.45s" },
    { x: "68%", y: "80%", delay: "0.75s" },
  ];

  return (
    <div ref={ref} className={BG}>
      <div className="absolute inset-0 opacity-[1]" style={GRID_OVERLAY} />

      {/* Network pulse nodes in background */}
      {nodes.map((n) => (
        <div
          key={`${n.x}-${n.y}`}
          className="absolute"
          style={{ left: n.x, top: n.y, transform: "translate(-50%,-50%)" }}
        >
          {/* Ping ring */}
          <div
            className="absolute inset-0 rounded-full border border-emerald-400/40"
            style={{
              width: 16,
              height: 16,
              transform: "translate(-25%, -25%)",
              animation: inView
                ? `soft-ping 2.4s ease-out infinite ${n.delay}`
                : "none",
            }}
          />
          <div className="size-2 rounded-full bg-emerald-400/60" />
        </div>
      ))}

      {/* MLS listing card */}
      <div className="relative z-10 w-[200px] rounded-xl border border-white/10 bg-[#0e1e38] shadow-2xl overflow-hidden">
        {/* Thumbnail */}
        <div className="relative h-[72px] bg-gradient-to-br from-[#132D54] to-[#0B1D3A] flex items-center justify-center">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <rect x="4" y="18" width="32" height="18" rx="2" fill="rgba(16,185,129,0.15)" stroke="rgba(16,185,129,0.4)" strokeWidth="1" />
            <path d="M4 18L20 6L36 18" fill="none" stroke="rgba(16,185,129,0.5)" strokeWidth="1.5" />
            <rect x="15" y="26" width="10" height="10" rx="1" fill="rgba(16,185,129,0.3)" />
          </svg>
          <div
            className="absolute top-2 right-2 rounded-full bg-emerald-500 px-1.5 py-0.5 text-[7px] font-bold text-white"
          >
            LIVE
          </div>
        </div>
        {/* Details */}
        <div className="p-3 space-y-1.5">
          <div className="h-1.5 w-28 bg-white/60 rounded-full" />
          <div className="h-1.5 w-20 bg-white/30 rounded-full" />
          <div className="flex justify-between items-center mt-2">
            <div className="text-[10px] font-bold text-emerald-400">$2,450/mo</div>
            <div className="text-[7px] text-white/40">3 bd · 2 ba</div>
          </div>
        </div>
      </div>

      {/* "Live on 50+ sites" counter */}
      <div
        className="absolute top-4 right-4 flex flex-col items-end"
        style={{
          animation: inView ? "counter-up 0.6s ease both 0.4s" : "none",
          opacity: inView ? undefined : 0,
        }}
      >
        <span className="text-[22px] font-black text-white leading-none">50+</span>
        <span className="text-[8px] text-white/45 tracking-wider uppercase">Sites Live</span>
      </div>

      {/* MLS badge */}
      <div
        className="absolute bottom-5 right-5 rounded-full border border-[#D4A853]/50 bg-[#D4A853]/10 px-2 py-0.5 text-[9px] font-bold text-[#D4A853]"
        style={{
          animation: inView ? "float-y 2.8s ease-in-out infinite 1s" : "none",
        }}
      >
        MLS® Listed ✓
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════════
   4 - MaintenanceVisual
   Ticket board + animated progress bars + "98% resolved" metric
════════════════════════════════════════════════════════════════════════ */
export function MaintenanceVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const tickets = [
    { label: "HVAC repair", status: "Done", pct: 100, color: "#10B981", delay: "0s" },
    { label: "Roof inspection", status: "Done", pct: 100, color: "#10B981", delay: "0.2s" },
    { label: "Plumbing fix", status: "In progress", pct: 72, color: "#D4A853", delay: "0.4s" },
    { label: "Paint touch-up", status: "Scheduled", pct: 30, color: "#3B82F6", delay: "0.6s" },
  ];

  return (
    <div ref={ref} className={BG}>
      <div className="absolute inset-0 opacity-[1]" style={GRID_OVERLAY} />

      {/* Ticket board */}
      <div className="relative z-10 w-[280px] space-y-2">
        {tickets.map((t) => (
          <div
            key={t.label}
            className="flex items-center gap-3 rounded-lg border border-white/8 bg-white/4 px-3 py-2"
            style={{
              animation: inView
                ? `counter-up 0.4s ease both ${t.delay}`
                : "none",
              opacity: inView ? undefined : 0,
            }}
          >
            {/* Status dot */}
            <div
              className="size-2 shrink-0 rounded-full"
              style={{ backgroundColor: t.color }}
            />
            {/* Label + bar */}
            <div className="flex-1 min-w-0">
              <div className="flex justify-between mb-1">
                <span className="text-[10px] text-white/70 truncate">{t.label}</span>
                <span className="text-[9px] font-bold" style={{ color: t.color }}>
                  {t.status}
                </span>
              </div>
              <div className="h-1 w-full rounded-full bg-white/10 overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: inView ? `${t.pct}%` : "0%",
                    backgroundColor: t.color,
                    transition: inView ? `width 1.2s cubic-bezier(0.34,1.1,0.64,1) ${t.delay}` : "none",
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* "98% resolved" metric */}
      <div
        className="absolute top-4 right-4 text-right"
        style={{
          animation: inView ? "counter-up 0.5s ease both 0.3s" : "none",
          opacity: inView ? undefined : 0,
        }}
      >
        <div className="text-[26px] font-black text-emerald-400 leading-none">98%</div>
        <div className="text-[8px] text-white/40 uppercase tracking-wider">Resolved</div>
      </div>

      {/* Response time badge */}
      <div
        className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-white/6 border border-white/12 px-3 py-1 text-[9px] font-medium text-white/60"
        style={{
          animation: inView ? "float-y 2.6s ease-in-out infinite 0.5s" : "none",
        }}
      >
        Avg. response: 4 hrs
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════════
   5 - LeaseManagementVisual
   Document with animated signature line + milestone timeline
════════════════════════════════════════════════════════════════════════ */
export function LeaseManagementVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const milestones = [
    { label: "Draft", done: true, delay: "0s" },
    { label: "Review", done: true, delay: "0.3s" },
    { label: "Signed", done: true, delay: "0.6s" },
    { label: "Active", done: false, delay: "0.9s" },
  ];

  return (
    <div ref={ref} className={BG}>
      <div className="absolute inset-0 opacity-[1]" style={GRID_OVERLAY} />

      {/* Document */}
      <div className="relative z-10 w-[160px] rounded-xl border border-white/12 bg-[#0e1e38] shadow-xl overflow-hidden">
        {/* Header bar */}
        <div className="flex items-center gap-1.5 bg-[#071228] px-3 py-2">
          <div className="size-2 rounded-full bg-emerald-500/60" />
          <span className="text-[9px] font-semibold text-white/50 uppercase tracking-wider">Lease Agreement</span>
        </div>
        {/* Content rows */}
        <div className="px-3 py-3 space-y-2">
          <div className="h-1.5 w-full bg-white/20 rounded-full" />
          <div className="h-1.5 w-4/5 bg-white/15 rounded-full" />
          <div className="h-1.5 w-full bg-white/12 rounded-full" />
          <div className="h-1.5 w-3/4 bg-white/10 rounded-full" />
          <div className="h-1.5 w-full bg-white/10 rounded-full" />
          {/* Signature line */}
          <div className="mt-3 pt-2 border-t border-white/10">
            <svg width="100%" height="22" viewBox="0 0 134 22" fill="none">
              {/* Signature path */}
              <path
                d="M4 16 C12 8, 18 20, 26 14 C34 8, 40 18, 50 12 C58 7, 62 17, 70 13"
                stroke="#D4A853"
                strokeWidth="1.5"
                strokeLinecap="round"
                fill="none"
                strokeDasharray="120"
                strokeDashoffset={inView ? 0 : 120}
                style={{
                  transition: inView
                    ? "stroke-dashoffset 1.2s cubic-bezier(0.34,1.1,0.64,1) 0.5s"
                    : "none",
                }}
              />
              {/* Underline */}
              <line
                x1="4"
                y1="20"
                x2={inView ? "130" : "4"}
                y2="20"
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="1"
                style={{
                  transition: inView ? "x2 0.8s ease 0.3s" : "none",
                }}
              />
            </svg>
            <div className="text-[7px] text-white/30 mt-0.5">Digital Signature</div>
          </div>
        </div>
      </div>

      {/* Milestone timeline */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-0">
        {milestones.map((m, i) => (
          <div key={m.label} className="flex items-center">
            {/* Connector line (not before first) */}
            {i > 0 && (
              <div
                className="h-px w-8 bg-white/15"
                style={{
                  background: m.done
                    ? "linear-gradient(to right, #10B981, #10B98180)"
                    : "rgba(255,255,255,0.1)",
                }}
              />
            )}
            {/* Node */}
            <div className="flex flex-col items-center gap-1">
              <div
                className="size-3 rounded-full border"
                style={{
                  backgroundColor: m.done ? "#10B981" : "transparent",
                  borderColor: m.done ? "#10B981" : "rgba(255,255,255,0.2)",
                  animation: inView
                    ? `milestone-pop 0.4s cubic-bezier(0.34,1.56,0.64,1) both ${m.delay}`
                    : "none",
                  opacity: inView ? undefined : 0,
                }}
              />
              <span
                className="text-[7px] whitespace-nowrap"
                style={{ color: m.done ? "#10B981" : "rgba(255,255,255,0.35)" }}
              >
                {m.label}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* "e-Signed" badge */}
      <div
        className="absolute top-4 right-4 rounded-full bg-[#D4A853] px-2.5 py-1 text-[9px] font-bold text-[#071228] shadow-lg"
        style={{
          animation: inView ? "float-y 2.4s ease-in-out infinite 1s" : "none",
        }}
      >
        e-Signed ✓
      </div>
    </div>
  );
}

/* ─── Slug → Visual map (exported for service-grid-block) ─────────────── */
export const SERVICE_VISUAL_MAP: Record<
  string,
  React.ComponentType
> = {
  "tenant-screening": TenantScreeningVisual,
  "rent-collection": RentCollectionVisual,
  "property-listing": PropertyListingVisual,
  "mls-listing": PropertyListingVisual,
  "maintenance": MaintenanceVisual,
  "maintenance-coordination": MaintenanceVisual,
  "lease-management": LeaseManagementVisual,
  "lease-renewal": LeaseManagementVisual,
};
