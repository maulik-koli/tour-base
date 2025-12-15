import React from "react";
import HeroSection from "@/modules/main/components/hero-section";
import ImageSlider from "@/modules/main/components/image-slider";
import WhyChooseUsSections from "@/modules/main/components/why-choose-sec";
import FeatureTourSlider from "@/modules/tours/components/feature-tour-slider";
import AboutSection from "@/modules/main/components/about-section";

const Home: React.FC = () => {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <ImageSlider />
      <WhyChooseUsSections />
      <FeatureTourSlider />
      <AboutSection />
    </div>
  );
}

export default Home;
