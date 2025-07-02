export interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  category: string;
  description: string;
}

export type SortOption = 'default' | 'price-low-high' | 'price-high-low';
