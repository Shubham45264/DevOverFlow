import HeroSection from "./components/HeroSection";
import LatestQuestions from "./components/LatestQuestions";
import TopContributers from "./components/TopContributers";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      {/* HERO SECTION */}
      <HeroSection />

      {/* MAIN CONTENT */}
      <div className="container mx-auto px-4 pb-20 pt-12">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">

          {/* Latest Questions */}
          <div className="lg:col-span-2">
            <h2 className="mb-8 text-3xl font-bold">
              Latest Questions
            </h2>
            <LatestQuestions />
          </div>

          {/* Top Contributors */}
          <aside>
            <h2 className="mb-8 text-3xl font-bold">
              Top Contributors
            </h2>
            <TopContributers />
          </aside>

        </div>
      </div>

      {/* FOOTER */}
      <Footer />
    </>
  );
}
