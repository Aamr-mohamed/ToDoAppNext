"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Pagination as MantinePagination } from "@mantine/core";

export default function Pagination({ totalPages }: { totalPages: number }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const onPageChange = (newPage: number) => {
    const query = new URLSearchParams(searchParams.toString());
    query.set("page", String(newPage));
    router.push(`?${query.toString()}`);
  };

  return (
    <MantinePagination
      total={totalPages}
      value={currentPage}
      onChange={onPageChange}
      size="md"
      radius="md"
      withEdges
      style={{ marginTop: 20 }}
    />
  );
}

