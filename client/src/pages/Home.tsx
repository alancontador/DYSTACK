import { Helmet } from "react-helmet";
import HeroSection from "@/components/home/HeroSection";
import CategoryHighlights from "@/components/home/CategoryHighlights";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import CalculatorPromo from "@/components/home/CalculatorPromo";
import Testimonials from "@/components/home/Testimonials";
import BlogPreview from "@/components/home/BlogPreview";
import CTASection from "@/components/home/CTASection";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Dystack - Materiais de Construção de Qualidade</title>
        <meta 
          name="description" 
          content="Dystack: Qualidade e agilidade para sua construção do início ao fim. Oferecemos uma ampla variedade de materiais de construção com entrega rápida e atendimento especializado." 
        />
      </Helmet>

      <HeroSection />
      <CategoryHighlights />
      <WhyChooseUs />
      <FeaturedProducts />
      <CalculatorPromo />
      <Testimonials />
      <BlogPreview />
      <CTASection />
    </>
  );
};

export default Home;
