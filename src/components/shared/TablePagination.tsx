"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { Button } from "../ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";

interface TablePaginationProps {
    currentPage: number;
    totalPages: number;
}

const TablePagination = ({ currentPage, totalPages }: TablePaginationProps) => {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const searchParams = useSearchParams();

    const navigateToPage = (newPage: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", newPage.toString());

        startTransition(() => {
            router.push(`?${params.toString()}`);
        });
    };

    const changeLimit = (newLimit: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("limit", newLimit);
        params.set("page", "1");
        startTransition(() => {
            router.push(`?${params.toString()}`);
        });
    };


    const currentLimit = searchParams.get("limit") || "10";

    return (

        <div className="flex flex-wrap items-center justify-center gap-2 mt-4">

            <Button
                variant="outline"
                size="sm"
                onClick={() => navigateToPage(currentPage - 1)}
                disabled={currentPage <= 1 || isPending}

                className="px-2 sm:px-3"
            >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Previous
            </Button>


            <div className="flex flex-wrap items-center justify-center gap-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, index) => {
                    let pageNumber;

                    if (totalPages <= 5) {
                        pageNumber = index + 1;
                    } else if (currentPage <= 3) {
                        pageNumber = index + 1;
                    } else if (currentPage >= totalPages - 2) {
                        pageNumber = totalPages - 4 + index;
                    } else {
                        pageNumber = currentPage - 2 + index;
                    }

                    return (
                        <Button
                            key={pageNumber}
                            variant={pageNumber === currentPage ? "default" : "outline"}
                            size="sm"
                            onClick={() => navigateToPage(pageNumber)}
                            disabled={isPending}
                            className="w-9 h-9 sm:w-10 sm:h-10"

                        >
                            {pageNumber}
                        </Button>
                    );
                })}
            </div>


            <Button
                variant="outline"
                size="sm"
                onClick={() => navigateToPage(currentPage + 1)}
                disabled={currentPage === totalPages || isPending}
                className="px-2 sm:px-3"
            >
                Next
                <ChevronRight className="h-4 w-4 ml-1" />
            </Button>


            <span className="text-xs sm:text-sm text-muted-foreground text-center">
                Page {currentPage} of {totalPages}
            </span>

            <div className="flex items-center gap-2">
                <span className="text-xs sm:text-sm text-muted-foreground">
                    Items:
                </span>

                <Select
                    value={currentLimit}
                    onValueChange={changeLimit}
                    disabled={isPending}
                >
                    <SelectTrigger className="w-[65px] sm:w-[70px] h-8">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="1">1</SelectItem>
                        <SelectItem value="5">5</SelectItem>
                        <SelectItem value="10">10</SelectItem>
                        <SelectItem value="20">20</SelectItem>
                        <SelectItem value="50">50</SelectItem>
                        <SelectItem value="100">100</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
};

export default TablePagination;
