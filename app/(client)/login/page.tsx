import { Login } from "@/app/ui/login/logInForm"
import Link from "next/link"

export default function LogIn() {
  return (
    <main className="min-h-screen bg-background flex flex-col">

      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">Bienvenido</h1>
            <p className="text-muted-foreground text-sm md:text-base">Accede a tu cuenta para continuar comprando</p>
          </div>
          <div className="bg-card border border-border rounded-lg shadow-lg p-8">
            <Login />
          </div>
        </div>
      </div>
    </main>
  )
}
