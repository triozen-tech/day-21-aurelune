import AuLoader from "./components/AuLoader";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Residences from "./components/Residences";
import VillaDetail from "./components/VillaDetail";
import Amenities from "./components/Amenities";
import Locations from "./components/Locations";
import Story from "./components/Story";
import Booking from "./components/Booking";
import Footer from "./components/Footer";
import Key from "./components/Key";
import CursorPill from "./components/CursorPill";

export default function Page() {
  return (
    <main className="au">
      <AuLoader />
      <Hero />
      <Residences />
      <VillaDetail />
      <Amenities />
      <Locations />
      <Story />
      <Booking />
      <Footer />
      <Key />
      <CursorPill />
      <Nav />
    </main>
  );
}
