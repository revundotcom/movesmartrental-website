"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const SIZE = 520;
const CX = 260;
const CY = 260;
const R = 162;
const NR = 40;
const GAP = 16;

const EMERALD = "#10B981";
const NAVY = "#0B1D3A";
const GOLD = "#D4A853";

const toRad = (d: number) => (d * Math.PI) / 180;
const pt = (angle: number, r = R) => ({
  x: CX + r * Math.cos(toRad(angle)),
  y: CY + r * Math.sin(toRad(angle)),
});
const arc = (fromAngle: number) => {
  const s = pt(fromAngle + GAP);
  const e = pt(fromAngle + 60 - GAP);
  return `M ${s.x.toFixed(1)} ${s.y.toFixed(1)} A ${R} ${R} 0 0 1 ${e.x.toFixed(1)} ${e.y.toFixed(1)}`;
};

const NODES = [
  { label: "List Property",     sub: "Publish & go live",    icon: "house",      angle: -90  },
  { label: "Market & Syndicate", sub: "Reach more renters",  icon: "megaphone",  angle: -30  },
  { label: "Screen Tenants",    sub: "Verify & qualify",     icon: "shield",     angle: 30   },
  { label: "Sign Lease",        sub: "Digital contracts",    icon: "document",   angle: 90   },
  { label: "Collect Rent",      sub: "Auto-payments",        icon: "dollar",     angle: 150  },
  { label: "Manage & Report",   sub: "Track everything",     icon: "chart",      angle: 210  },
];

// Inline SVG icons - no external dependency
function NodeIcon({ icon, size = 26 }: { icon: string; size?: number }) {
  const s = size;
  switch (icon) {
    case "house":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={EMERALD} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9.75L12 3l9 6.75V21a1 1 0 01-1 1H4a1 1 0 01-1-1V9.75z" />
          <path d="M9 22V12h6v10" />
        </svg>
      );
    case "megaphone":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={EMERALD} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 8a4 4 0 010 8" />
          <path d="M5 8H3a1 1 0 00-1 1v6a1 1 0 001 1h2l7 4V4L5 8z" />
          <line x1="15.5" y1="8.5" x2="15.5" y2="15.5" />
        </svg>
      );
    case "shield":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={EMERALD} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="M9 12l2 2 4-4" />
        </svg>
      );
    case "document":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={EMERALD} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="9" y1="13" x2="15" y2="13" />
          <line x1="9" y1="17" x2="13" y2="17" />
        </svg>
      );
    case "dollar":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={EMERALD} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 6v12M15 9a3 3 0 00-6 0c0 1.5 1 2 3 2.5S15 13 15 15a3 3 0 01-6 0" />
        </svg>
      );
    case "chart":
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={EMERALD} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="20" x2="18" y2="10" />
          <line x1="12" y1="20" x2="12" y2="4" />
          <line x1="6" y1="20" x2="6" y2="14" />
          <line x1="2" y1="20" x2="22" y2="20" />
        </svg>
      );
    default:
      return null;
  }
}

export function LeasingFlywheel() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div className="flex justify-center" ref={ref}>
      <div
        className="relative origin-top scale-[0.55] sm:scale-75 md:scale-90 lg:scale-100 transition-transform"
        style={{ width: SIZE, height: SIZE }}
      >
        {/* SVG layer: dashed ring + animated arc arrows */}
        <svg
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          className="absolute inset-0 w-full h-full"
          style={{ overflow: "visible" }}
        >
          <defs>
            <marker
              id="ms-arrowhead"
              markerWidth="7"
              markerHeight="7"
              refX="5.5"
              refY="3.5"
              orient="auto"
            >
              <path d="M 0 0.5 L 6 3.5 L 0 6.5 z" fill={EMERALD} opacity="0.85" />
            </marker>
          </defs>

          {/* Dashed background ring */}
          <motion.circle
            cx={CX}
            cy={CY}
            r={R}
            fill="none"
            stroke={EMERALD}
            strokeWidth="1.5"
            strokeDasharray="6 5"
            opacity="0.22"
            initial={{ scale: 0.6, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 0.22 } : {}}
            transition={{ duration: 0.6 }}
            style={{ transformOrigin: `${CX}px ${CY}px` }}
          />

          {/* Arc arrows */}
          {NODES.map((node, i) => (
            <motion.path
              key={i}
              d={arc(node.angle)}
              fill="none"
              stroke={EMERALD}
              strokeWidth="2.2"
              strokeLinecap="round"
              markerEnd="url(#ms-arrowhead)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={isInView ? { pathLength: 1, opacity: 0.75 } : {}}
              transition={{ duration: 0.55, delay: 0.5 + i * 0.13, ease: "easeInOut" }}
            />
          ))}
        </svg>

        {/* Centre label */}
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
          initial={{ opacity: 0, scale: 0.7 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.25 }}
        >
          {/* M lettermark */}
          <svg width="40" height="36" viewBox="0 0 40 36" fill="none" aria-hidden="true">
            <path
              d="M4 32V4l16 18L36 4v28"
              stroke={GOLD}
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span
            className="text-[9px] font-black uppercase tracking-[3px] mt-1"
            style={{ color: NAVY, opacity: 0.6 }}
          >
            MoveSmart
          </span>
        </motion.div>

        {/* Nodes */}
        {NODES.map((node, i) => {
          const { x, y } = pt(node.angle);
          const cosA = Math.cos(toRad(node.angle));
          const sinA = Math.sin(toRad(node.angle));
          const INNER_GAP = 12;
          const LABEL_W = 96;

          let labelStyle: React.CSSProperties;
          if (Math.abs(cosA) < 0.2) {
            // Cardinal vertical: top (-90°) or bottom (90°)
            labelStyle = {
              left: x - LABEL_W / 2,
              top: sinA < 0 ? y - NR - INNER_GAP - 30 : y + NR + INNER_GAP,
              width: LABEL_W,
              textAlign: "center",
            };
          } else if (cosA > 0) {
            // Right-side nodes
            labelStyle = {
              left: x + NR + INNER_GAP,
              top: y,
              width: LABEL_W,
              textAlign: "left",
              transform: "translateY(-50%)",
            };
          } else {
            // Left-side nodes
            labelStyle = {
              left: x - NR - INNER_GAP - LABEL_W,
              top: y,
              width: LABEL_W,
              textAlign: "right",
              transform: "translateY(-50%)",
            };
          }

          return (
            <motion.div
              key={node.label}
              initial={{ opacity: 0, scale: 0.4 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{
                duration: 0.4,
                delay: i * 0.1,
                ease: [0.34, 1.56, 0.64, 1],
              }}
            >
              {/* Circle icon */}
              <div
                className="absolute -translate-x-1/2 -translate-y-1/2 bg-white rounded-full flex items-center justify-center"
                style={{
                  left: x,
                  top: y,
                  width: NR * 2,
                  height: NR * 2,
                  border: `1.5px solid rgba(16,185,129,0.22)`,
                  boxShadow: "0 4px 20px rgba(16,185,129,0.12)",
                }}
              >
                <NodeIcon icon={node.icon} size={26} />
              </div>

              {/* Label */}
              <div className="absolute leading-tight" style={labelStyle}>
                <p
                  className="text-[10px] font-black uppercase tracking-wider"
                  style={{ color: NAVY }}
                >
                  {node.label}
                </p>
                <p className="text-[9px] mt-0.5" style={{ color: NAVY, opacity: 0.5 }}>
                  {node.sub}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
