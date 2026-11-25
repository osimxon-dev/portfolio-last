import SmoothScroll from '@/components/SmoothScroll';
import Preloader from '@/components/Preloader';
import Cursor from '@/components/Cursor';
import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import Statement from '@/components/Statement';
import Work from '@/components/Work';
import Playground from '@/components/Playground';
import Pricing from '@/components/Pricing';
import Process from '@/components/Process';
import ToolsMarquee from '@/components/ToolsMarquee';
import Footer from '@/components/Footer';

export default function Page() {
  return (
    <>
      <SmoothScroll />
      <Preloader />
      <Cursor />
      <Nav />
      <main id="top">
        <Hero />
        <Statement />
        <Work />
        <Playground />
        <Pricing />
        <Process />
        <ToolsMarquee />
      </main>
      <Footer />
    </>
  );
}
