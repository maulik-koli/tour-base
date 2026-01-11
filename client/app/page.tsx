import React from "react";
import HeroSection from "@modules/main/components/hero-section";
import CategorySlider from "@modules/category/components/category-slider";
import WhyChooseUsSections from "@modules/main/components/why-choose-sec";
import FeatureTourSlider from "@modules/tours/components/feature-tour-slider";
import AboutSection from "@modules/main/components/about-section";
import SocialMediaSection from "@modules/main/components/social-media-section";

export const metadata = {
  title: "Explore Tours & Travel Packages",
  description: "Discover affordable tour packages and curated travel experiences across top destinations.",
  alternates: {
    canonical: "/",
  },
};

const Home: React.FC = () => {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <CategorySlider />
      <FeatureTourSlider />
      <WhyChooseUsSections />
      <AboutSection />
      <SocialMediaSection />
    </div>
  );
}

export default Home;
