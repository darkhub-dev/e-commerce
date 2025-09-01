"use client";

import useCategories from "@/hooks/use-categories";
import { Suspense } from "react";

interface CategoriesProps {
  label: string;
}

const CategoriesContent: React.FC<CategoriesProps> = ({ label }) => {
  const { handleChangeCategory } = useCategories({ label });

  if (label === "All") {
    return null;
  }

  return (
    <div
      className="hover:text-slate-50 transition cursor-pointer"
      onClick={handleChangeCategory}
    >
      {label}
    </div>
  );
};

const Categories: React.FC<CategoriesProps> = (props) => {
  return (
    <Suspense
      fallback={
        <div className="hover:text-slate-50 transition cursor-pointer">
          <div className="w-12 h-4 bg-slate-600 rounded animate-pulse"></div>
        </div>
      }
    >
      <CategoriesContent {...props} />
    </Suspense>
  );
};

export default Categories;
