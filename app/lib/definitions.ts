
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
    price : number,
    originalPrice? : number,
    image : string,
    cloudinary_public_id : string
    inStock : boolean
    
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
  brandName: string,
  productName:string,
  quantity : number,
  unitCost: number,
}

export type Purchase = {
  purchaseid : string,
  buyeremail: string,
  timestamp : string,
  totalcost : number,
  items: CartItem[]
}


export type PurchaseDetail = {
  detaliid : string,
  purchase_id: string,
  productname : string,
  quantity : number,
  itemprice: number
}

