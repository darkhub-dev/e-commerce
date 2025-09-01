"use client";

import useCategories from "@/hooks/use-categories";
import { Suspense } from "react";
import { IconType } from "react-icons";

interface CategoryProps {
  label: string;
  icon: IconType;
  selected?: boolean;
}

const CategoryContent: React.FC<CategoryProps> = ({
  label,
  icon: Icon,
  selected,
}) => {
  const { handleChangeCategory } = useCategories({ label });

  return (
    <div
      onClick={handleChangeCategory}
      className={`flex items-center justify-center text-center gap-2 p-2 border-b-2 hover:text-slate-800 transition cursor-pointer active:scale-[0.9]
    ${
      selected
        ? "border-b-slate-800 text-slate-800"
        : "border-transparent text-slate-500"
    }
    `}
    >
      <Icon size={20} />
      <div className="font-medium text-sm">{label}</div>
    </div>
  );
};

const Category: React.FC<CategoryProps> = (props) => {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center text-center gap-2 p-2 border-b-2 border-transparent text-slate-500">
          <div className="w-5 h-5 bg-slate-300 rounded animate-pulse"></div>
          <div className="w-16 h-4 bg-slate-300 rounded animate-pulse"></div>
        </div>
      }
    >
      <CategoryContent {...props} />
    </Suspense>
  );
};

export default Category;
