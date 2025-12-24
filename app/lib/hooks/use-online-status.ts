import { useSyncExternalStore, useState, useEffect } from "react"

function getSnapshot() {
  return typeof navigator !== "undefined" ? navigator.onLine : true
}

function subscribe(callback: () => void) {
  window.addEventListener('online', callback)
  window.addEventListener('offline', callback)
  window.addEventListener('load', callback)
  window.addEventListener('focus', callback)
  return () => {
    window.removeEventListener('online', callback)
    window.removeEventListener('offline', callback)
    window.removeEventListener('load', callback)
    window.removeEventListener('focus', callback)
  }
}

/**
 * Hook para detectar el estado de conexión del usuario.
 * Combina navigator.onLine con una verificación real (ping) al servidor.
 * @returns boolean true si el usuario está offline, false si está online.
 */
export function useOnlineStatus() {
  // navigatorOnline es true si el navegador cree que hay red
  const navigatorOnline = useSyncExternalStore(subscribe, getSnapshot, () => true)
  
  // isOffline es el estado final que devolvemos.
  // Inicializamos asumiendo el estado del navegador.
  const [isOffline, setIsOffline] = useState(!navigatorOnline)

  useEffect(() => {
    // Si el navigator dice que estamos offline, no hay duda de que estamos offline.
    if (!navigatorOnline) {
      setIsOffline(true)
      return
    }

    // Si el navigator dice que estamos online, verificamos con un ping real
    // para asegurar que hay salida a internet.
    let isMounted = true
    
    const checkRealStatus = async () => {
      try {
        console.log("Intentando ping al servidor...")
        const response = await fetch("/api/ping", { 
          method: "GET",
          cache: "no-store" 
        })
        
        if (isMounted) {
          // Si el status es 200, estamos realmente online (isOffline = false)
          setIsOffline(!response.ok)
        }
      } catch (error) {
        // Si hay un error (ej. SerwistError, red caída, timeout), 
        // asumimos que estamos offline.
        if (isMounted) {
          setIsOffline(true)
        }
      }
    }

    checkRealStatus()
    
    return () => { isMounted = false }
  }, [navigatorOnline])

  return isOffline
}
