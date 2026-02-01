import Navbar from "./_components/navbar";
import { Meteors } from "@/components/ui/meteors";
import { Globe } from "@/components/ui/globe";

const Home = () => {
  return (
    <>
      <div className="min-h-screen w-full relative overflow-hidden">
        {/* Red Glow Background */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `
    radial-gradient(125% 125% at 50% 90%, #ffffff 40%, #ef4444 100%)
  `,
            backgroundSize: "100% 100%",
          }}
        />
        {/* Dark Mode Red Glow Background */}
        <div
          className="absolute inset-0 z-0 opacity-0 dark:opacity-100 transition-opacity"
          style={{
            backgroundImage: `
    radial-gradient(125% 125% at 50% 90%, #000000 40%, #7f1d1d 100%)
  `,
            backgroundSize: "100% 100%",
          }}
        />

        {/* Your Content/Components */}
        <div className="px-4 sm:px-8 md:px-16 lg:px-30 relative z-10">
          <Meteors />
          <Navbar />

          <div className="relative pb-20 sm:pb-32 md:pb-40 lg:pb-60 overflow-hidden w-full min-h-[calc(100vh-60px)]  sm:min-h-screen  flex items-center justify-center">
            <div className="space-y-4 sm:space-y-6 text-center max-w-5xl mx-auto px-4">
              <h1 className="pointer-events-none bg-linear-to-b from-black to-gray-300/80 bg-clip-text text-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight sm:leading-none font-semibold whitespace-pre-wrap text-transparent dark:from-white dark:to-slate-900/10">
                Where Skills Are Exchanged <br />
                <span className="text-primary block text-center mt-2">Not sold.</span>
              </h1>
              <p className="text-muted-foreground text-center text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
                Mentor to earn credits. Learn using credits. Grow through community-powered
                mentoring.
              </p>
            </div>
            <Globe className="absolute top-[60%] sm:top-[65%] md:top-[70%] lg:top-80 left-1/2 -translate-x-1/2 w-full max-w-75 sm:max-w-100 md:max-w-125 lg:max-w-150 lg:min-w-250" />
          </div>

          <div className="pointer-events-none absolute inset-0 h-full bg-[radial-gradient(circle_at_50%_200%,rgba(255,0,0,0.2),rgba(255,255,255,0))] dark:bg-[radial-gradient(circle_at_50%_200%,rgba(127,29,29,0.3),rgba(0,0,0,0))]" />
        </div>
      </div>
    </>
  );
};

export default Home;
