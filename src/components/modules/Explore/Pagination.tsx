"use client";

interface Props {
    page: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination = ({ page, totalPages, onPageChange }: Props) => {
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <div className="flex justify-center gap-2 mt-6">
            <button
                className="btn btn-outline"
                disabled={page === 1}
                onClick={() => onPageChange(page - 1)}
            >
                Previous
            </button>

            {pages.map((p) => (
                <button
                    key={p}
                    className={`btn ${p === page ? "btn-primary" : "btn-outline"}`}
                    onClick={() => onPageChange(p)}
                >
                    {p}
                </button>
            ))}

            <button
                className="btn btn-outline"
                disabled={page === totalPages}
                onClick={() => onPageChange(page + 1)}
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;
