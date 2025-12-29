"use client"

import { useFormState, useFormStatus } from "react-dom"
import { authenticate } from "@/app/lib/actions"
import { Button } from "@/app/ui/button"
import { Input } from "@/app/ui/home/input"

export function Login() {
  const [errorMessage, dispatch] = useFormState(authenticate, undefined)
  const { pending } = useFormStatus()

  return (
    <form className="space-y-5" action={dispatch}>
      <div className="space-y-2">
        <label htmlFor="email" className="block text-sm font-medium text-foreground">
          Email
        </label>
        <Input type="email" id="email" name="email" placeholder="tu@email.com" required className="w-full" />
      </div>
      <div className="space-y-2">
        <label htmlFor="password" className="block text-sm font-medium text-foreground">
          Contraseña
        </label>
        <Input
          type="password"
          id="password"
          name="password"
          placeholder="••••••••"
          required
          minLength={5}
          className="w-full"
        />
      </div>

      {errorMessage && (
        <div className="flex items-start space-x-2 p-3 bg-destructive/10 border border-destructive/20 rounded-md">
          <div className="flex-1">
            <p className="text-sm text-destructive font-medium">{errorMessage}</p>
          </div>
        </div>
      )}

      <Button type="submit" disabled={pending} className="w-full h-10 mt-6 font-semibold" variant="default">
        {pending ? (
          <span className="flex items-center gap-2">
            <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent"></span>
            Iniciando sesión...
          </span>
        ) : (
          "Inicia Sesión"
        )}
      </Button>
      <div className="text-center">
        <a href="#" className="text-xs text-primary hover:underline font-medium">
          ¿Olvidaste tu contraseña?
        </a>
      </div>
    </form>
  )
}
