import React from "react";
import HeroSection from "@modules/main/components/hero-section";
import CategorySlider from "@modules/category/components/category-slider";
import WhyChooseUsSections from "@modules/main/components/why-choose-sec";
import FeatureTourSlider from "@modules/tours/components/feature-tour-slider";
import AboutSection from "@modules/main/components/about-section";
import SocialMediaSection from "@modules/main/components/social-media-section";

const Home: React.FC = () => {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <CategorySlider />
      <WhyChooseUsSections />
      <FeatureTourSlider />
      <AboutSection />
      <SocialMediaSection />
    </div>
  );
}

export default Home;
