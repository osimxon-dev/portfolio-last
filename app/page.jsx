import SmoothScroll from '@/components/SmoothScroll';
import Background from '@/components/Background';
import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import About from '@/components/About';
import WhyMe from '@/components/WhyMe';
import Projects from '@/components/Projects';
import Services from '@/components/Services';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Page() {
  return (
    <>
      <SmoothScroll />
      <Background />
      <Nav />
      <main>
        <Hero />
        <About />
        <WhyMe />
        <Projects />
        <Services />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
