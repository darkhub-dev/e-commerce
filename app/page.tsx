export const revalidate = 0;

import getProducts, { IProductParams } from "@/actions/get-products";
import Image from "next/image";
import HomeBanner from "./components/home-banner";
import NullData from "./components/null-data";
import ProductCard from "./components/products/product-card";

interface HomeProps {
  searchParams: IProductParams;
}

export default async function Home({ searchParams }: HomeProps) {
  const products = await getProducts(searchParams);

  if (products.length === 0) {
    return (
      <NullData title='Oops! No products found. Click "All" to clear filters.' />
    );
  }

  const shuffleArray = (array: any) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
  };

  const shuffledProducts = shuffleArray(products);

  return (
    <div className="text-white">
      <HomeBanner />
      <section className="min-h-[400px] w-full py-8 flex justify-center items-center gap-6">
        <div className="relative bg-[#191919] text-white text-lg shadow-sm max-w-[350px] shadow-gray-500 cursor-pointer w-full min-h-[150px] font-bold px-4 text-center py-4 rounded-lg flex flex-col justify-center items-center gap-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="absolute right-0 top-0 mr-2 mt-1 h-10 lucide lucide-move-up-right-icon text-[#454545] lucide-move-up-right"
          >
            <path d="M13 5H19V11" />
            <path d="M19 5L5 19" />
          </svg>
          <Image
            src={"/icon.png"}
            alt="icon"
            width={60}
            height={60}
            className=""
          />
          <h2>Find your device</h2>
        </div>
        <div className="relative bg-[#191919] text-white text-lg shadow-sm max-w-[350px] shadow-gray-500 cursor-pointer w-full min-h-[150px] font-bold px-4 text-center py-4 rounded-lg flex flex-col justify-center items-center gap-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="absolute right-0 top-0 mr-2 mt-1 h-10 lucide lucide-move-up-right-icon text-[#454545] lucide-move-up-right"
          >
            <path d="M13 5H19V11" />
            <path d="M19 5L5 19" />
          </svg>
          <Image
            src={"/icon.png"}
            alt="icon"
            width={60}
            height={60}
            className=""
          />
          <h2>Find your device</h2>
        </div>
        <div className="relative bg-[#191919] text-white text-lg shadow-sm max-w-[350px] shadow-gray-500 cursor-pointer w-full min-h-[150px] font-bold px-4 text-center py-4 rounded-lg flex flex-col justify-center items-center gap-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="absolute right-0 top-0 mr-2 mt-1 h-10 lucide lucide-move-up-right-icon text-[#454545] lucide-move-up-right"
          >
            <path d="M13 5H19V11" />
            <path d="M19 5L5 19" />
          </svg>
          <Image
            src={"/icon.png"}
            alt="icon"
            width={60}
            height={60}
            className=""
          />
          <h2>Find your device</h2>
        </div>
        <div className="relative bg-[#191919] text-white text-lg shadow-sm max-w-[350px] shadow-gray-500 cursor-pointer w-full min-h-[150px] font-bold px-4 text-center py-4 rounded-lg flex flex-col justify-center items-center gap-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="absolute right-0 top-0 mr-2 mt-1 h-10 lucide lucide-move-up-right-icon text-[#454545] lucide-move-up-right"
          >
            <path d="M13 5H19V11" />
            <path d="M19 5L5 19" />
          </svg>
          <Image
            src={"/icon.png"}
            alt="icon"
            width={60}
            height={60}
            className=""
          />
          <h2>Find your device</h2>
        </div>
      </section>

      <section className="container mx-auto pt-14 items-start text-start relative min-h-screen w-full flex-col flex gap-4">
        <Image
          src={"/Abstract.png"}
          alt="abstract"
          width={100}
          height={100}
          className="absolute top-0 left-0"
        />
        <h2 className="text-3xl font-bold pl-6">Featured Properties</h2>
        <p className="text-gray-500 text-lg pl-6 pt-2">
          Explore our handpicked selection of featured properties. Each listing
          offers a glimpse into exceptional homes and investments available
          through HasanAnber. Click &quot;View Details&quot; for more
          information.
        </p>
      </section>
      <div className="container mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 sm:gap-8">
        {products.map((product: any) => {
          return <ProductCard data={product} key={product.id} />;
        })}
      </div>
    </div>
  );
}
