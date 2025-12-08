
export type User = {
    email: string;
    password: string;
  };

export type Product = {
    id : string,
    name: string,
    description: string,
    features: string[],
    brand_name : string,
    category_name : string,
    
    // CAMBIO AQUÍ:
    price : number | null,   // Ahora puede ser null (si no hay oferta)
    original_price : number, // Ahora es obligatorio (siempre es el precio base)
    
    image : string,
    cloudinary_public_id : string
    instock : boolean
}

export type Category = {
  id: string;
  name: string;
  description: string;
  image : string,
  cloudinary_public_id : string
};

export type Brand = {
  id : string,
  name : string
}

export type CartItem = {
  id : string,
  brand_name: string,
  productName:string,
  quantity : number,
  unitCost: number,
  image: string
}

export type Purchase = {
  purchaseid : string,
  buyeremail: string,
  timestamp : string,
  totalcost : number,
  items: CartItem[],
  itemcount : number
}


export type PurchaseDetail = {
  detaliid : string,
  purchase_id: string,
  productname : string,
  quantity : number,
  itemprice: number
}

