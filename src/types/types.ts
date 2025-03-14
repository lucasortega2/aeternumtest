export type Product = {
  id: string;
  name: string;
  url: string;
  description: string;
  shortDescription?: string;
  price: string;
  is_active: boolean;
  category_id: string;
  featured: boolean;
};
export type Category = {
  id: string;
  name: string;
};

export interface CartItem
  extends Omit<
    Product,
    | 'is_active'
    | 'category_id'
    | 'shortDescription'
    | 'description'
    | 'featured'
  > {
  quantity: number;
}
