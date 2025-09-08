import {
  ChevronFirstIcon,
  ChevronLastIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { Button } from "./ui/button";
import { Pagination, PaginationContent, PaginationItem } from "./ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  paginationItemsToDisplay?: number;
};

export default function Paginate({ currentPage, totalPages }: PaginationProps) {
  const [page, setPage] = useState(currentPage);
  const [searchParams, setSearchParams] = useSearchParams("");
  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    params.set("page", String(page));
    if (page) {
      setSearchParams(params);
    } else {
      params.delete("page");
      setSearchParams(params);
    }
  }, [page, searchParams,setSearchParams]);
  return (
    <Pagination>
      <PaginationContent>
        {/* First page button */}
        <PaginationItem>
          <Button
            disabled={page === 1}
            onClick={() => setPage(1)}
            variant="ghost"
          >
            <ChevronFirstIcon size={16} aria-hidden="true" />
          </Button>
        </PaginationItem>

        {/* Previous page button */}
        <PaginationItem>
          <Button
            disabled={page === 1}
            onClick={() => setPage((prev) => prev - 1)}
            variant="ghost"
          >
            <ChevronLeftIcon size={16} aria-hidden="true" />
          </Button>
        </PaginationItem>

        {/* Page number select */}
        <PaginationItem>
          <Select
            onValueChange={(value) => setPage(Number(value))}
            defaultValue={String(currentPage)}
            aria-label="Select page"
          >
            <SelectTrigger id="select-page" className="w-fit whitespace-nowrap">
              <SelectValue placeholder="Select page" />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <SelectItem key={page} value={String(page)}>
                    Page {page}
                  </SelectItem>
                )
              )}
            </SelectContent>
          </Select>
        </PaginationItem>

        {/* Next page button */}
        <PaginationItem>
          <Button
            disabled={totalPages === page}
            onClick={() => setPage((prev) => prev + 1)}
            variant="ghost"
          >
            <ChevronRightIcon size={16} aria-hidden="true" />
          </Button>
        </PaginationItem>

        {/* Last page button */}
        <PaginationItem>
          <Button
            disabled={page === totalPages}
            onClick={() => setPage(totalPages)}
            variant="ghost"
          >
            <ChevronLastIcon size={16} aria-hidden="true" />
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
