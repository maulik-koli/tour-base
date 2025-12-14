"use client"
import React from "react";
import Image from "next/image";
import SearchBar from "@/modules/tours/components/search-button-bar";
import { Typography } from "@/components/ui/typography";


const Home: React.FC = () => {
  return (
    <div className="relative w-full px-20 min-h-[calc(100svh-4rem)] h-[calc(100svh-4rem)]">
      <Image
        src="/hero-for-now.avif"
        fill
        className="object-cover"
        alt="Hero"
      />

      {/* <div className="absolute inset-0 bg-linear-to-b from-black/50 via-black/30 to-black/60" /> */}
      <div className="absolute inset-0 bg-linear-to-b from-slate-900/80 via-slate-900/60 to-slate-900/90" />

      <div className="relative z-10 flex flex-col gap-6 items-center justify-center h-full text-center px-4">
        <div className="max-w-md">
          <Typography variant="h1" className="text-primary-foreground text-6xl">
            Journeys Across Incredible <span className="text-primary">India</span>
          </Typography>
        </div>

        <Typography variant='p' className="max-w-md text-primary-foreground/80">
          Explore hand-crafted tours across India leisure, culture, and spiritual journeys made simple.
        </Typography>

        <SearchBar />
      </div>
    </div>
  );
}

export default Home;
