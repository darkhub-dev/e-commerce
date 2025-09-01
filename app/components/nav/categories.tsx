"use client";

import { categories } from "@/utils/categories";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Container from "../container";
import Category from "./category";

const CategoriesContent = () => {
  const params = useSearchParams();
  const category = params?.get("category");
  const pathname = usePathname();

  const isMainPage = pathname === "/";

  if (!isMainPage) return null;

  return (
    <div className="hidden sm:block border-b-[0.5px] bg-slate-300">
      <Container>
        <div className="pt-1 flex flex-wrap items-center justify-between overlow-x-auto">
          {categories.map((item) => (
            <Category
              key={item.label}
              label={item.label}
              icon={item.icon}
              selected={
                category === item.label ||
                (category === null && item.label === "All")
              }
            />
          ))}
        </div>
      </Container>
    </div>
  );
};

const Categories = () => {
  return (
    <Suspense
      fallback={
        <div className="hidden sm:block border-b-[0.5px] bg-slate-300 h-12"></div>
      }
    >
      <CategoriesContent />
    </Suspense>
  );
};

export default Categories;
