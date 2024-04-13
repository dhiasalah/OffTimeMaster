import { Hero } from "./components/Hero";
import { Faq } from "./components/Faq";
import { Testimonials } from "./components/Testimonials";
import { Test } from "./components/Test";
import { useTitle } from "../../hooks/useTitle";
export const HomePage = () => {
  useTitle("Home")
  return (
    <>
    <Test/>
      <main>
            <Hero/>
            <Testimonials/>
            <Faq/>
        </main>
    </>
      
    )
}
