'use client';

import { Clock, RefreshCcw } from 'lucide-react';
import { Button } from '@/app/ui/button';

export default function TimeoutFallback() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="flex justify-center">
          <div className="bg-amber-50 p-6 rounded-full">
            <Clock className="w-12 h-12 text-amber-500" />
          </div>
        </div>
        
        <div className="space-y-2">
          <h2 className="text-2xl font-bold tracking-tight">El servidor tardó demasiado</h2>
          <p className="text-gray-500 text-lg leading-relaxed">
            No pudimos obtener los productos a tiempo. Esto suele ser un problema temporal de conexión.
          </p>
        </div>

        <div className="flex justify-center pt-4">
          <Button
            onClick={() => window.location.reload()}
            className="bg-black hover:bg-gray-800 text-white px-8 flex items-center gap-2"
          >
            <RefreshCcw className="w-4 h-4" />
            Reintentar ahora
          </Button>
        </div>
      </div>
    </div>
  );
}
