"use client";
import {
    ArrowDown,
    ArrowUp,
    ArrowUpDown,
    Edit,
    Eye,
    Loader2,
    MoreHorizontal,
    Trash,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useTransition } from "react";
import { Button } from "../ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../ui/table";
import { cn } from "@/lib/utils";

export interface Column<T> {
    header: string;
    accessor: keyof T | ((row: T) => React.ReactNode);
    className?: string;
    sortKey?: string;
}

interface ManagementTableProps<T> {
    data: T[];
    columns: Column<T>[];
    onView?: (row: T) => void;
    onEdit?: (row: T) => void;
    onDelete?: (row: T) => void;
    getRowKey: (row: T) => string;
    emptyMessage?: string;
    isRefreshing?: boolean;
}

function ManagementTable<T>({
    data = [],
    columns = [],
    onView,
    onEdit,
    onDelete,
    getRowKey,
    emptyMessage = "No records found.",
    isRefreshing = false,
}: ManagementTableProps<T>) {
    const hasActions = onView || onEdit || onDelete;
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isPending, startTransition] = useTransition();

    const currentSortBy = searchParams.get("sortBy") || "";
    const currentSortOrder = searchParams.get("sortOrder") || "desc";

    const handleSort = (sortKey: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (currentSortBy === sortKey) {
            params.set("sortOrder", currentSortOrder === "asc" ? "desc" : "asc");
        } else {
            params.set("sortBy", sortKey);
            params.set("sortOrder", "desc");
        }
        params.set("page", "1");
        startTransition(() => {
            router.push(`?${params.toString()}`);
        });
    };

    return (
        <div className="w-full space-y-4">
            <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden relative">
                {/*  Loader  */}
                {(isRefreshing || isPending) && (
                    <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px] flex items-center justify-center z-20">
                        <div className="flex flex-col items-center gap-2 bg-white p-4 rounded-xl shadow-lg border">
                            <Loader2 className="h-6 w-6 animate-spin text-indigo-600" />
                            <p className="text-xs font-bold text-slate-600 uppercase tracking-tighter">Updating...</p>
                        </div>
                    </div>
                )}

                <Table>
                    <TableHeader className="bg-slate-50/50">
                        <TableRow className="hover:bg-transparent border-b">
                            {columns?.map((column, colIndex) => (
                                <TableHead key={colIndex} className={cn("py-4 text-slate-900 font-bold", column.className)}>
                                    {column.sortKey ? (
                                        <button
                                            onClick={() => handleSort(column.sortKey!)}
                                            className="flex items-center gap-1 hover:text-indigo-600 transition-colors uppercase text-[11px] tracking-wider"
                                        >
                                            {column.header}
                                            {currentSortBy === column.sortKey ? (
                                                currentSortOrder === "asc" ? <ArrowUp size={14} /> : <ArrowDown size={14} />
                                            ) : (
                                                <ArrowUpDown size={14} className="text-slate-300" />
                                            )}
                                        </button>
                                    ) : (
                                        <span className="uppercase text-[11px] tracking-wider">{column.header}</span>
                                    )}
                                </TableHead>
                            ))}
                            {hasActions && <TableHead className="w-[80px] text-right pr-6 uppercase text-[11px] tracking-wider font-bold">Actions</TableHead>}
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {data.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={columns.length + 1} className="h-40 text-center text-slate-400 font-medium">
                                    {emptyMessage}
                                </TableCell>
                            </TableRow>
                        ) : (
                            data.map((item) => (
                                <TableRow key={getRowKey(item)} className="group hover:bg-slate-50/50 transition-colors border-b last:border-0">
                                    {columns.map((col, idx) => (
                                        <TableCell key={idx} className={cn("py-4", col.className)}>
                                            {typeof col.accessor === "function" ? col.accessor(item) : (item[col.accessor] as React.ReactNode)}
                                        </TableCell>
                                    ))}
                                    {hasActions && (
                                        <TableCell className="text-right pr-4">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-white hover:shadow-sm border-transparent hover:border-slate-200 border">
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end" className="w-48 rounded-xl p-2 shadow-xl border-slate-100">
                                                    <DropdownMenuLabel className="text-[10px] font-black uppercase text-slate-400 px-2 py-1.5 tracking-widest">Options</DropdownMenuLabel>
                                                    <DropdownMenuSeparator />
                                                    {onView && (
                                                        <DropdownMenuItem onClick={() => onView(item)} className="rounded-lg gap-2 cursor-pointer font-medium text-slate-700">
                                                            <Eye size={16} className="text-blue-500" /> View Details
                                                        </DropdownMenuItem>
                                                    )}
                                                    {onEdit && (
                                                        <DropdownMenuItem onClick={() => onEdit(item)} className="rounded-lg gap-2 cursor-pointer font-medium text-slate-700">
                                                            <Edit size={16} className="text-amber-500" /> Edit Plan
                                                        </DropdownMenuItem>
                                                    )}
                                                    {onDelete && (
                                                        <>
                                                            <DropdownMenuSeparator />
                                                            <DropdownMenuItem onClick={() => onDelete(item)} className="rounded-lg gap-2 cursor-pointer font-medium text-rose-600 focus:bg-rose-50 focus:text-rose-600">
                                                                <Trash size={16} /> Delete Plan
                                                            </DropdownMenuItem>
                                                        </>
                                                    )}
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    )}
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}

export default ManagementTable;














// "use client";
// import {
//     ArrowDown,
//     ArrowUp,
//     ArrowUpDown,
//     Edit,
//     Eye,
//     Loader2,
//     MoreHorizontal,
//     Trash,
// } from "lucide-react";
// import { useRouter, useSearchParams } from "next/navigation";
// import React, { useTransition } from "react";
// import { Button } from "../ui/button";
// import {
//     DropdownMenu,
//     DropdownMenuContent,
//     DropdownMenuItem,
//     DropdownMenuTrigger,
// } from "../ui/dropdown-menu";
// import {
//     Table,
//     TableBody,
//     TableCell,
//     TableHead,
//     TableHeader,
//     TableRow,
// } from "../ui/table";

// export interface Column<T> {
//     header: string;
//     accessor: keyof T | ((row: T) => React.ReactNode);
//     className?: string;
//     sortKey?: string;
// }

// interface ManagementTableProps<T> {
//     data: T[];
//     columns: Column<T>[];
//     onView?: (row: T) => void;
//     onEdit?: (row: T) => void;
//     onDelete?: (row: T) => void;
//     getRowKey: (row: T) => string;
//     emptyMessage?: string;
//     isRefreshing?: boolean;
// }

// function ManagementTable<T>({
//     data = [],
//     columns = [],
//     onView,
//     onEdit,
//     onDelete,
//     getRowKey,
//     emptyMessage = "No records found.",
//     isRefreshing = false,
// }: ManagementTableProps<T>) {
//     const hasActions = onView || onEdit || onDelete;
//     const router = useRouter();
//     const searchParams = useSearchParams();
//     const [, startTransition] = useTransition();

//     const currentSortBy = searchParams.get("sortBy") || "";
//     const currentSortOrder = searchParams.get("sortOrder") || "desc";

//     const handleSort = (sortKey: string) => {
//         const params = new URLSearchParams(searchParams.toString());

//         // Toggle sort order if clicking the same column
//         if (currentSortBy === sortKey) {
//             const newOrder = currentSortOrder === "asc" ? "desc" : "asc";
//             params.set("sortOrder", newOrder);
//         } else {
//             // New column, default to descending
//             params.set("sortBy", sortKey);
//             params.set("sortOrder", "desc");
//         }

//         params.set("page", "1"); // Reset to first page

//         startTransition(() => {
//             router.push(`?${params.toString()}`);
//         });
//     };

//     const getSortIcon = (sortKey?: string) => {
//         if (!sortKey) return null;

//         if (currentSortBy !== sortKey) {
//             return <ArrowUpDown className="ml-2 h-4 w-4 text-muted-foreground" />;
//         }

//         return currentSortOrder === "asc" ? (
//             <ArrowUp className="ml-2 h-4 w-4" />
//         ) : (
//             <ArrowDown className="ml-2 h-4 w-4" />
//         );
//     };
//     return (
//         <>
//             <div className="rounded-lg border relative">
//                 {/* Refreshing Overlay */}
//                 {isRefreshing && (
//                     <div className="absolute inset-0 bg-background/50 backdrop-blur-[2px] flex items-center justify-center z-10 rounded-lg">
//                         <div className="flex flex-col items-center gap-2">
//                             <Loader2 className="h-6 w-6 animate-spin text-primary" />
//                             <p className="text-sm text-muted-foreground">Refreshing...</p>
//                         </div>
//                     </div>
//                 )}

//                 <Table>
//                     <TableHeader>
//                         <TableRow>
//                             {columns?.map((column, colIndex) => (
//                                 <TableHead key={colIndex} className={column.className}>
//                                     {column.sortKey ? (
//                                         <span
//                                             onClick={() => handleSort(column.sortKey!)}
//                                             className="flex items-center p-2 hover:text-foreground transition-colors font-medium cursor-pointer select-none"
//                                         >
//                                             {column.header}
//                                             {getSortIcon(column.sortKey)}
//                                         </span>
//                                     ) : (
//                                         column.header
//                                     )}
//                                 </TableHead>
//                             ))}
//                             {hasActions && (
//                                 <TableHead className="w-[70px]">Actions</TableHead>
//                             )}
//                         </TableRow>
//                     </TableHeader>

//                     <TableBody>
//                         {data.length === 0 ? (
//                             <TableRow>
//                                 <TableCell
//                                     colSpan={columns.length + (hasActions ? 1 : 0)}
//                                     className="text-center py-8 text-muted-foreground"
//                                 >
//                                     {emptyMessage}
//                                 </TableCell>
//                             </TableRow>
//                         ) : (
//                             data?.map((item) => (
//                                 <TableRow key={getRowKey(item)}>
//                                     {columns.map((col, idx) => (
//                                         <TableCell key={idx} className={col.className}>
//                                             {typeof col.accessor === "function"
//                                                 ? col.accessor(item)
//                                                 : String(item[col.accessor])}
//                                         </TableCell>
//                                     ))}
//                                     {hasActions && (
//                                         <TableCell>
//                                             <DropdownMenu>
//                                                 <DropdownMenuTrigger asChild>
//                                                     <Button variant="ghost" size="icon">
//                                                         <MoreHorizontal className="h-4 w-4" />
//                                                     </Button>
//                                                 </DropdownMenuTrigger>
//                                                 <DropdownMenuContent align="end">
//                                                     {onView && (
//                                                         <DropdownMenuItem onClick={() => onView(item)}>
//                                                             <Eye className="mr-2 h-4 w-4" />
//                                                             View
//                                                         </DropdownMenuItem>
//                                                     )}
//                                                     {onEdit && (
//                                                         <DropdownMenuItem onClick={() => onEdit(item)}>
//                                                             <Edit className="mr-2 h-4 w-4" />
//                                                             Edit
//                                                         </DropdownMenuItem>
//                                                     )}
//                                                     {onDelete && (
//                                                         <DropdownMenuItem
//                                                             onClick={() => onDelete(item)}
//                                                             className="text-destructive"
//                                                         >
//                                                             <Trash className="mr-2 h-4 w-4" />
//                                                             Delete
//                                                         </DropdownMenuItem>
//                                                     )}
//                                                 </DropdownMenuContent>
//                                             </DropdownMenu>
//                                         </TableCell>
//                                     )}
//                                 </TableRow>
//                             ))
//                         )}
//                     </TableBody>
//                 </Table>
//             </div>
//         </>
//     );
// }

// export default ManagementTable;
