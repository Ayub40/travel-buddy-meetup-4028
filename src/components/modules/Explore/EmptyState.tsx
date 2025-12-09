"use client";

interface Props {
    onReset: () => void;
}

const EmptyState = ({ onReset }: Props) => {
    return (
        <div className="text-center py-20">
            <p className="text-xl mb-4">No travelers found. Try changing your filters.</p>
            <button className="btn btn-secondary" onClick={onReset}>
                Reset Filters
            </button>
        </div>
    );
};

export default EmptyState;
