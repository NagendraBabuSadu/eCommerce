"use client";
import ImageCarousel from "./components/CarouselComponent";
import { ProductList } from "./components/ProductList";


export default function Home() {
  const scrollImages = [
    "https://rukminim2.flixcart.com/fk-p-flap/1620/270/image/3d7827c92a670177.jpg?q=20",
    "https://rukminim2.flixcart.com/fk-p-flap/1620/270/image/57d9b129e302642e.jpg?q=22",
    "https://rukminim2.flixcart.com/fk-p-flap/1620/270/image/a354077c3747d8f6.png?q=21",
  ];

  return (
    <div className="grid grid-rows-[10px_1fr_10px] items-center justify-items-center min-h-screen p-1 pb-1 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
  
        <ImageCarousel images={scrollImages} />
        <ProductList />
      </main>
    </div>
  );
}
