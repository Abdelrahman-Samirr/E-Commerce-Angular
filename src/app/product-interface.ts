export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  stock: string;
  brand: string;
  sku: string;
  discountPercentage?: number;
  availabilityStatus: 'In Stock' | 'Low in Stock' ;
  images: string[];
  thumbnail: string;
  quantity: number; 
}