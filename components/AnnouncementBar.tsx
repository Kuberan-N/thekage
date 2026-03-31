"use client";

export default function AnnouncementBar() {
  return (
    <div className="bg-black text-white overflow-hidden h-8 flex items-center relative z-[60]">
      <div className="animate-marquee whitespace-nowrap inline-flex">
        {/* Duplicate content for seamless loop */}
        {[0, 1].map((i) => (
          <span key={i} className="inline-flex items-center gap-6 text-[11px] font-medium tracking-[0.15em] uppercase mx-8">
            <span>Free Delivery All Over India</span>
            <span className="text-white/40">·</span>
            <span>COD Available</span>
            <span className="text-white/40">·</span>
            <span>Free Delivery All Over India</span>
            <span className="text-white/40">·</span>
            <span>COD Available</span>
            <span className="text-white/40">·</span>
            <span>Free Delivery All Over India</span>
            <span className="text-white/40">·</span>
            <span>COD Available</span>
          </span>
        ))}
      </div>
    </div>
  );
}
