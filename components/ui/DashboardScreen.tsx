"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function DashboardScreen() {
  const pathRef = useRef<SVGPathElement>(null);
  const numRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    // Metric animation (PERF: Direct DOM update instead of React setState)
    const timer = setTimeout(() => {
      const vals = { p: 0, c: 0, d: 0 };

      gsap.to(vals, {
        p: 47,
        c: 23,
        d: 18,
        duration: 1.2,
        ease: "power2.out",
        onUpdate: () => {
          if (numRefs.current[0]) numRefs.current[0].innerHTML = Math.round(vals.p).toString();
          if (numRefs.current[1]) numRefs.current[1].innerHTML = Math.round(vals.c).toString();
          if (numRefs.current[2]) numRefs.current[2].innerHTML = Math.round(vals.d).toString();
        }
      });
    }, 600);

    // Path animation
    if (pathRef.current) {
      const length = pathRef.current.getTotalLength();
      gsap.fromTo(pathRef.current, 
        { strokeDasharray: length, strokeDashoffset: length },
        { strokeDashoffset: 0, duration: 1.5, delay: 0.8, ease: "power2.out" }
      );
    }

    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{ width: "100%", height: "100%", background: "var(--bg-surface)", padding: 16, fontFamily: "var(--font-rubik)", overflow: "hidden", fontSize: 11, boxSizing: "border-box" }}>
      {/* ROW 1: Top Bar */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", height: 36, marginBottom: 8 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div style={{ width: 20, height: 20, background: "var(--accent)", borderRadius: 6 }}></div>
          <span style={{ fontSize: 11, fontWeight: 500, color: "var(--text-primary)" }}>Dev Studio</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, background: "rgba(34, 197, 94, 0.12)", color: "#22C55E", border: "1px solid rgba(34, 197, 94, 0.25)", borderRadius: 20, padding: "2px 8px", fontSize: 10, fontWeight: 500 }}>
          <div style={{ width: 5, height: 5, background: "#22C55E", borderRadius: "50%", animation: "pulse 2s infinite" }}></div>
          Live
        </div>
      </div>

      {/* ROW 2: Metrics */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8, height: 64, marginBottom: 12 }}>
        {[
          { label: "Projects", trend: "+12% ↑" },
          { label: "Clients", trend: "+8% ↑" },
          { label: "Avg Days", trend: "-3 ↓" }
        ].map((m, i) => (
          <div key={i} style={{ background: "var(--bg-elevated)", borderRadius: 10, padding: "10px 12px", border: "1px solid var(--border)", display: "flex", flexDirection: "column", gap: 2 }}>
            <span style={{ fontSize: 9, color: "var(--text-faint)", fontWeight: 400 }}>{m.label}</span>
            <span 
              ref={(el) => { numRefs.current[i] = el; }}
              style={{ fontSize: 18, color: "var(--text-primary)", fontWeight: 600, fontFamily: "var(--font-outfit)" }}
            >
              0
            </span>
            <span style={{ fontSize: 9, fontWeight: 500, color: "#22C55E" }}>{m.trend}</span>
          </div>
        ))}
      </div>

      {/* ROW 3: Bottom Half */}
      <div style={{ display: "flex", gap: 8 }}>
        {/* Left Column */}
        <div style={{ flex: 1.2 }}>
          <div style={{ fontSize: 10, fontWeight: 500, color: "var(--text-muted)", marginBottom: 8 }}>Recent Projects</div>
          {[
            { name: "NAMRL Platform", color: "#0052FF", status: "Live", bg: "rgba(0,82,255,0.1)", tColor: "#0052FF" },
            { name: "Kiyomi Facilities", color: "#22C55E", status: "Live", bg: "rgba(34,197,94,0.1)", tColor: "#22C55E" },
            { name: "Cresults Portal", color: "#F59E0B", status: "Active", bg: "rgba(245,158,11,0.1)", tColor: "#F59E0B" }
          ].map((p, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 0", borderBottom: i === 2 ? "none" : "1px solid var(--border)" }}>
              <div style={{ width: 6, height: 6, borderRadius: 3, background: p.color, flexShrink: 0 }}></div>
              <span style={{ fontSize: 10, color: "var(--text-primary)", fontWeight: 500 }}>{p.name}</span>
              <span style={{ marginLeft: "auto", fontSize: 9, borderRadius: 20, padding: "1px 6px", background: p.bg, color: p.tColor }}>{p.status}</span>
            </div>
          ))}
        </div>

        {/* Right Column */}
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 10, fontWeight: 500, color: "var(--text-muted)", marginBottom: 8 }}>Velocity</div>
          <svg viewBox="0 0 100 50" style={{ width: "100%", height: 50, background: "transparent", overflow: "visible" }}>
            <defs>
              <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.15" />
                <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d="M0,50 L0,45 C7.5,41.5 7.5,38 15,38 C22.5,38 22.5,42 30,42 C37.5,42 37.5,28 45,28 C52.5,28 52.5,32 60,32 C67.5,32 67.5,18 75,18 C82.5,18 82.5,22 90,22 C95,22 100,12 100,12 L100,50 Z" fill="url(#chartGradient)" />
            <path ref={pathRef} d="M0,45 C7.5,41.5 7.5,38 15,38 C22.5,38 22.5,42 30,42 C37.5,42 37.5,28 45,28 C52.5,28 52.5,32 60,32 C67.5,32 67.5,18 75,18 C82.5,18 82.5,22 90,22 C95,22 100,12 100,12" fill="none" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            {[
              { x: 0, y: 45 }, { x: 15, y: 38 }, { x: 30, y: 42 }, { x: 45, y: 28 }, 
              { x: 60, y: 32 }, { x: 75, y: 18 }, { x: 90, y: 22 }, { x: 100, y: 12 }
            ].map((pt, i) => (
              <circle key={i} cx={pt.x} cy={pt.y} r="2.5" fill="var(--accent)" />
            ))}
          </svg>
          <div style={{ fontSize: 9, color: "#22C55E", fontWeight: 500, marginTop: 4 }}>↑ 34% this quarter</div>
        </div>
      </div>
    </div>
  );
}
