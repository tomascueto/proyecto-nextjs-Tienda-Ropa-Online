'use client'
import { CartItem, Product } from "@/app/lib/definitions";
import Image from 'next/image';
import { useCartStore } from "@/app/lib/store/cart-store"; // Asegúrate de importar el store si lo usas

export default function ProductsCards({
    products
}:{
    products: Product[];
}){
    const addItem = useCartStore((state) => state.addItem);

    const handleAddToCart = (product: Product) => {
        addItem({
            id: product.id,
            brand_name: product.brand_name,
            productName: product.name,
            unitCost: product.price!, // Usamos el precio actual (not null assertion si estás seguro)
            image: product.image
        });
    };

    const formatPrice = (price: number) =>
        new Intl.NumberFormat("es-AR", {
            style: "currency",
            currency: "ARS",
            minimumFractionDigits: 0, // Generalmente en ropa no se usan decimales si son precios redondos
    }).format(price)

    return(
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products.map((product) => {
                // Lógica de Descuento
                // (product.price puede ser null en la definición, pero en la DB lo guardamos como el valor final)
                const currentPrice = (product.price && product.price > 0) ? product.price : product.original_price;
                const originalPrice = product.original_price ?? 0;
                const hasDiscount = (product.price && product.price > 0) && (product.price < product.original_price);

                return (
                    <div
                        key={product.id}
                        className="bg-white dark:bg-gray-950 rounded-lg shadow-sm hover:shadow-md transition-shadow flex flex-col h-full"
                    >
                        <div className="relative aspect-square overflow-hidden rounded-t-lg bg-gray-100">
                            <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                className="object-cover hover:scale-105 transition-transform duration-300"
                            />
                            {hasDiscount && (
                                <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                                    OFERTA
                                </span>
                            )}
                        </div>
                        
                        <div className="p-4 flex flex-col flex-1">
                            <div className="mb-2">
                                <p className="text-sm text-gray-500 mb-1">{product.brand_name}</p>
                                <h3 className="text-lg font-semibold leading-tight">{product.name}</h3>
                            </div>
                            
                            <div className="mt-auto">
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="text-xl font-bold">{formatPrice(currentPrice)}</span>
                                    {hasDiscount && (
                                        <span className="text-sm text-gray-400 line-through">
                                            {formatPrice(originalPrice)}
                                        </span>
                                    )}
                                </div>
                                
                                <button 
                                    className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition-colors text-sm font-medium"
                                    onClick={() => handleAddToCart(product)}
                                >
                                    Agregar al carrito
                                </button>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    )  
}