import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import LandingClient from "./components/LandingClient";

export default async function Home() {
  const cookieStore = await cookies();

  // Creamos el cliente para leer la cookie de sesión actual
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    }
  );

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Si hay sesión, podrías redirigir al dashboard aquí si lo deseas
  // if (session) redirect("/dashboard");

  return <LandingClient />;
}