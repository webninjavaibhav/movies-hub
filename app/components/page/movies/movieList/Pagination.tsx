import React from 'react'

type PaginationProps = {
    pageCount: number
    totalPage: number
    handlePageChange: (page: number | "next" | "prev") => void
}

export default function Pagination({ totalPage, pageCount, handlePageChange }: PaginationProps) {

    const RenderPageButtons = () => {
        return Array.from({ length: totalPage }, (_, index) => {
            const page = index + 1;
            return (
                <button
                    key={page}
                    className={`rounded-sm w-8 h-8 cursor-pointer ${pageCount === (index + 1) ? "bg-green-500 text-white" : "bg-gray-700 text-gray-300"}`}
                    onClick={() => handlePageChange(index + 1)}
                >
                    {page}
                </button>
            );
        });
    };

    return (
        <div className="flex justify-center gap-4">
            <button className="text-white disabled:opacity-50 cursor-pointer" onClick={() => handlePageChange("prev")} disabled={pageCount <= 1}> Prev </button>
            <div className=' flex gap-2'>
                <RenderPageButtons />
            </div>
            <button className="text-white disabled:opacity-50 cursor-pointer" onClick={() => handlePageChange("next")} disabled={pageCount >= totalPage}> Next</button>
        </div>
    )
}
