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
  const navigatorOnline = useSyncExternalStore(subscribe, getSnapshot, () => true)
  const [isOffline, setIsOffline] = useState(!navigatorOnline)
  const [checkTrigger, setCheckTrigger] = useState(0)

  // Escuchar eventos manualmente para disparar re-verificaciones de ping
  useEffect(() => {
    const triggerCheck = () => setCheckTrigger(prev => prev + 1)
    
    window.addEventListener('online', triggerCheck)
    window.addEventListener('focus', triggerCheck)
    
    return () => {
      window.removeEventListener('online', triggerCheck)
      window.removeEventListener('focus', triggerCheck)
    }
  }, [])

  useEffect(() => {
    if (!navigatorOnline) {
      setIsOffline(true)
      return
    }

    let isMounted = true
    const checkRealStatus = async () => {
      try {
        // Añadimos un timestamp para evitar cache agresiva del navegador en el fetch
        const response = await fetch(`/api/ping?t=${Date.now()}`, { 
          method: "GET",
          cache: "no-store" 
        })
        if (isMounted) setIsOffline(!response.ok)
      } catch (error) {
        if (isMounted) setIsOffline(true)
      }
    }

    checkRealStatus()
    return () => { isMounted = false }
  }, [navigatorOnline, checkTrigger]) // Ahora también depende de checkTrigger

  return isOffline
}
