import { site } from "./config/site"
import { AgeGate } from "./components/AgeGate"
import { Background } from "./components/Background"
import { Footer } from "./components/Footer"
import { Navbar } from "./components/Navbar"
import { About } from "./sections/About"
import { Hero } from "./sections/Hero"
import { Models } from "./sections/Models"
import { TelegramCTA } from "./sections/TelegramCTA"

export default function App() {
  return (
    <>
      <Background />
      <Navbar />
      {/* clip: los adornos que sobresalen no generan scroll horizontal en móvil */}
      <div className="overflow-x-clip">
        <main>
          <Hero />
          <About />
          <Models />
          <TelegramCTA />
        </main>
        <Footer />
      </div>
      {site.ageGate && <AgeGate />}
    </>
  )
}
