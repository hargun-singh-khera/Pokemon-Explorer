"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface Props {
  currentPage: number;
  totalPages: number;
}

export default function Pagination({ currentPage, totalPages }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  if (totalPages <= 1) return null;

  function goTo(page: number) {
    const params = new URLSearchParams(searchParams.toString());
    if (page === 1) params.delete("page");
    else params.set("page", String(page));

    const url = params.toString() ? `${pathname}?${params}` : pathname;
    router.push(url);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const start = Math.max(1, currentPage - 1);
  const end = Math.min(totalPages, currentPage + 1);

  return (
    <nav aria-label="Pokemon pagination" className="mt-10 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
      <button
        type="button"
        disabled={currentPage === 1}
        onClick={() => goTo(currentPage - 1)}
        className="flex cursor-pointer items-center gap-1 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-50 hover:text-gray-900 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <ChevronLeft className="h-4 w-4" />
        <span className="hidden sm:inline">Previous</span>
      </button>

      {start > 1 && (
        <>
          <PageButton page={1} onClick={() => goTo(1)} />
          {start > 2 && <span className="px-1.5 text-sm text-gray-400">...</span>}
        </>
      )}

      {Array.from({ length: end - start + 1 }, (_, i) => start + i).map((page) => (
        <button
          key={page}
          type="button"
          onClick={() => goTo(page)}
          aria-current={page === currentPage ? "page" : undefined}
          className={`min-w-[36px] cursor-pointer rounded-lg px-3 py-2 text-sm font-semibold transition ${
            page === currentPage
              ? "bg-red-500 text-white shadow-sm shadow-red-500/25"
              : "border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900"
          }`}
        >
          {page}
        </button>
      ))}

      {end < totalPages && (
        <>
          {end < totalPages - 1 && <span className="px-1.5 text-sm text-gray-400">...</span>}
          <PageButton page={totalPages} onClick={() => goTo(totalPages)} />
        </>
      )}

      <button
        type="button"
        disabled={currentPage === totalPages}
        onClick={() => goTo(currentPage + 1)}
        className="flex cursor-pointer items-center gap-1 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-50 hover:text-gray-900 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <span className="hidden sm:inline">Next</span>
        <ChevronRight className="h-4 w-4" />
      </button>
    </nav>
  );
}

function PageButton({ page, onClick }: { page: number; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="min-w-[36px] cursor-pointer rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-semibold text-gray-600 transition hover:bg-gray-50 hover:text-gray-900"
    >
      {page}
    </button>
  );
}
