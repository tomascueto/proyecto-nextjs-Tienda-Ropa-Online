
export type User = {
    id: string;
    name: string;
    email: string;
    password: string;
  };

export type Product = {
    id : string,
    name: string,
    description: string,
    brand_name : string,
    category_name : string,
    price : number,
    image : string,
    cloudinary_public_id : string
}

export type Category = {
  id: string;
  name: string;
};

export type Brand = {
  id : string,
  name : string
}
