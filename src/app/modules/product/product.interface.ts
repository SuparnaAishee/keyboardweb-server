

export type TVariantData = {
  type: string;
  value: string;
};

export type TInventoryData = {
  quantity: number;
  inStock: boolean;
};

//Create an interface 
export type TProduct = {
  
  image?:string;
  name: string;
  brand?:string;
  description: string;
  price: number;
  ratings?:number;
  category: string;
  tags?: string[];
  variants?: TVariantData[];
  inventory?: TInventoryData;
  quantity?:number;
};

