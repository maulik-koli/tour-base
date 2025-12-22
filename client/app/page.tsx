import React from "react";
import HeroSection from "@modules/main/components/hero-section";
import CategorySlider from "@modules/category/components/category-slider";
import WhyChooseUsSections from "@modules/main/components/why-choose-sec";
import FeatureTourSlider from "@modules/tours/components/feature-tour-slider";
import AboutSection from "@modules/main/components/about-section";

const Home: React.FC = () => {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <CategorySlider />
      <WhyChooseUsSections />
      <FeatureTourSlider />
      <AboutSection />
    </div>
  );
}

export default Home;
