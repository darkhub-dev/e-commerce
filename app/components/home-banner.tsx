import Image from "next/image";

const HomeBanner = () => {

  return (
    <section className="relative w-full min-h-screen bg-[#141414] backdrop-blur-sm text-white">
      <div className="container mx-auto h-screen flex justify-between items-center gap-4">
        <div className="flex flex-col gap-4">
          <h1 className="text-6xl max-w-2xl font-bold">
            Discover Your Perfect Device with HsanAnber
          </h1>
          <p className="text-lg max-w-2xl text-white/80">
            From smartphones to machines and tricycles, everything you need is
            here with top quality and competitive prices.
          </p>
          <div className="flex gap-4">
            <button className="bg-transparent text-white px-4 py-2 rounded-md border border-white/40">
              Learn More
            </button>
            <button className="bg-[#703BF7] text-white px-4 py-2 rounded-md">
              Browse Products
            </button>
          </div>
          <div className="flex gap-4 py-10">
            <div className="flex flex-col justify-center items-center py-4 px-8 border border-white/10 rounded-md bg-[#191919]">
              <h2 className="text-2xl font-bold">5000 +</h2>
              <p className="text-sm text-white/80 w-full text-center">
                Products Available
              </p>
            </div>
            <div className="flex flex-col justify-center items-center py-4 px-8 border border-white/10 rounded-md bg-[#191919]">
              <h2 className="text-2xl font-bold">16 +</h2>
              <p className="text-sm text-white/80 w-full text-center">
                Years of Experience
              </p>
            </div>
            <div className="flex flex-col justify-center items-center py-4 px-8 border border-white/10 rounded-md bg-[#191919]">
              <h2 className="text-2xl font-bold">2000 +</h2>
              <p className="text-sm text-white/80 w-full text-center">
                Happy Customers
              </p>
            </div>
          </div>
        </div>
        <div className="">
          <div className="absolute top-0 right-0 w-1/2 -z-10 h-full bg-[#191919] blur-sm" />
          <Image
            src="/hero.png"
            alt="banner"
            width={700}
            height={700}
          />
        </div>
      </div>
    </section>
  );
};

export default HomeBanner;
