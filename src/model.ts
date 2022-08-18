export interface Product {
  id: string;
  name: string;
  description: string;
  image_url: string;
  slug: string;
  price: number;
  created_at: string;
}

export const products: Product[] = [
  {
    id: "uuid1",
    name: "Produto Teste",
    description: "Descrição do produto",
    image_url: "https://source.unsplash.com/random?product," + Math.random(),
    slug: "produto-teste1",
    price: 50.5,
    created_at: "2021-06-06T00:00:00",
  },
  {
    id: "uuid2",
    name: "Produto Teste 2",
    description: "Descrição do produto 2",
    image_url: "https://source.unsplash.com/random?product," + Math.random(),
    slug: "produto-teste2",
    price: 92.7,
    created_at: "2021-06-06T00:00:00",
  },
];
