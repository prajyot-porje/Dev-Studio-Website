"use client";

import DashboardScreen from "./DashboardScreen";

export default function TabletMockup() {
  return (
    <div 
      id="tablet-hero"
      className="w-full max-w-[560px] mx-auto relative"
      style={{ aspectRatio: "4/3" }}
    >
      {/* Outer Shell */}
      <div 
        className="w-full h-full rounded-[24px] p-[16px] relative bg-[#E8E8E8] dark:bg-[#1A1A1A] shadow-[0_2px_0_0_#C0C0C0,0_20px_60px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.6)] dark:shadow-[0_2px_0_0_#000,0_20px_60px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.06)]"
      >
        {/* Camera Dot */}
        <div className="absolute top-[10px] left-1/2 -translate-x-1/2 w-[8px] h-[8px] rounded-full bg-[#C8C8C8] dark:bg-[#333]"></div>
        
        {/* Screen Area */}
        <div className="w-full h-full rounded-[14px] overflow-hidden relative bg-[var(--bg-surface)]">
          <DashboardScreen />
        </div>

        {/* Side Buttons */}
        <div className="absolute -right-[3px] top-[30%] w-[3px] h-[24px] rounded-[2px] bg-[#D0D0D0] dark:bg-[#111]"></div>
        <div className="absolute -right-[3px] top-[45%] w-[3px] h-[24px] rounded-[2px] bg-[#D0D0D0] dark:bg-[#111]"></div>
      </div>
    </div>
  );
}
