import { WifiOff } from "lucide-react";
import { Button } from "@/app/ui/button";

export const metadata = {
  title: "Sin conexión | TNDA",
};

export default function OfflinePage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 text-center">
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full">
        <div className="mb-6 rounded-full bg-gray-100 w-20 h-20 mx-auto flex items-center justify-center">
          <WifiOff className="h-10 w-10 text-gray-500" />
        </div>
        
        <h1 className="mb-2 text-2xl font-bold text-gray-900">
          Estás sin conexión
        </h1>
        
        <p className="mb-8 text-gray-600">
          Parece que perdiste tu conexión a internet. Verificá tu red e intentá nuevamente.
        </p>

        <div className="space-y-3">
          <Button 
            className="w-full bg-black hover:bg-gray-800 text-white font-medium py-2 rounded-lg transition-colors"
            asChild
          >
            <a href="/">Inicio</a>
          </Button>
          
          <div className="pt-2">
             <p className="text-xs text-gray-400">
               Algunas funciones pueden no estar disponibles hasta que recuperes la conexión.
             </p>
          </div>
        </div>
      </div>
    </div>
  );
}
