import { auth } from "@/auth"
import { redirect } from "next/navigation"
import LandingClient from "./components/LandingClient"

export default async function Home() {

  const session = await auth()


  // If not logged in, show the landing page component
  return <LandingClient />
}