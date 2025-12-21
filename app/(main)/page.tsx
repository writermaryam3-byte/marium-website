import Articles from "./components/Articles";
import AvailableCourses from "./components/AvailableCourses";
import Hero from "./components/Hero";
export default function Home() {
  return (
    <>
      <Hero />
      <AvailableCourses />
      <Articles />
    </>
  );
}
