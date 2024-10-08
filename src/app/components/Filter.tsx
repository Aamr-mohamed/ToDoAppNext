"use client";

import { useRouter, useSearchParams } from "next/navigation";

const TodoFilters = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  return (
    <div className="flex gap-4">
      <button
        className={`${
          !searchParams.get("filter") ? "text-blue-600" : "hover:text-blue-400"
        }`}
        onClick={() => {
          router.push("/");
        }}
      >
        All
      </button>
      <button
        className={`${
          searchParams.get("filter") === "not_completed"
            ? "text-blue-600"
            : "hover:text-blue-400"
        }`}
        onClick={() => {
          router.push("/?filter=not_completed");
        }}
      >
        Not Completed
      </button>
      <button
        className={`${
          searchParams.get("filter") === "completed"
            ? "text-blue-600"
            : "hover:text-blue-400"
        }`}
        onClick={() => {
          router.push("/?filter=completed");
        }}
      >
        Completed
      </button>
    </div>
  );
};

export default TodoFilters;
