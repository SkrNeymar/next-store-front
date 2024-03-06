export interface Product {
  id: string;
  category: Category;
  name: string;
  price: string;
  isFeatured: boolean;
  images: Image[]
  variants: Variant[];
};

export interface Variant {
  id: string;
  productId: string;
  sizeId: string;
  colorId: string;
  quantity: number;
};

export interface Image {
  id: string;
  url: string;
}

export interface Billboard {
  id: string;
  label: string;
  imageUrl: string;
};

export interface Category {
  id: string;
  name: string;
  billboard: Billboard;
};

export interface Size {
  id: string;
  name: string;
  value: string;
};

export interface Color {
  id: string;
  name: string;
  value: string;
};

export interface ProductVariant {
  id: string;
  productId: string;
  sizeId: string;
  colorId: string;
  quantity: number;
  product: {
    id: string;
    storeId: string;
    categoryId: string;
    name: string;
    price: string;
    isFeatured: boolean;
    isArchived: boolean;
    images: Image[];
    createdAt: string;
    updatedAt: string;
  }
};