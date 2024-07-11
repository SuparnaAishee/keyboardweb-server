

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
  name: string;
  description: string;
  price: number;
  category: string;
  tags: string[];
  variants: TVariantData[];
  inventory: TInventoryData;
};
