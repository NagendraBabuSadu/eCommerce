import ImageCarousel from "./components/CarouselComponent";
import { ProductList } from "./components/ProductList";

export default function Home() {
  const scrollImages = [
    "https://rukminim2.flixcart.com/fk-p-flap/1620/270/image/3d7827c92a670177.jpg?q=20",
    "https://rukminim2.flixcart.com/fk-p-flap/1620/270/image/57d9b129e302642e.jpg?q=22",
    "https://rukminim2.flixcart.com/fk-p-flap/1620/270/image/a354077c3747d8f6.png?q=21",
  ];

  return (
    <div
      className="flex flex-col justify-items-center min-h-screen 
    px-1 font-[family-name:var(--font-geist-sans)] 
    sm:px-2 
    md:px-4 
    lg:px-6"
    >
      <ImageCarousel images={scrollImages} />
      <ProductList />
    </div>
  );
}
