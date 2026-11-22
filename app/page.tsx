import NavBar from "@/components/NavBar"
import Footer from "@/components/Footer"

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col justify-between bg-background">
      <NavBar />
      <div className="flex-1"></div>
      <Footer />
    </div>
  )
}
