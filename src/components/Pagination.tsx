"use client";

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';



interface PaginationProps {
    currentPage: number;
    totalPages: number;
}

export default function Pagination({ currentPage, totalPages }: PaginationProps) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString());
            params.set(name, value);
            return params.toString();
        },
        [searchParams]
    );

    const handlePageChange = (page: number) => {
        router.push(pathname + '?' + createQueryString('page', page.toString()));
    };

    // Logique pour afficher les numéros de page (ex: 1, 2, ..., 5, 6, 7, ..., 12)
    const pageNumbers = [];
    // ... implémentez une logique plus complexe si besoin pour beaucoup de pages
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    return (
        <nav className="flex items-center justify-center space-x-2">
            {pageNumbers.map(page => (
                <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-4 py-2 rounded-md transition-colors text-lg font-semibold ${currentPage === page
                            ? 'bg-[#FBBF24] text-[#111827]'
                            : 'bg-white text-gray-700 hover:bg-gray-100 border'
                        }`}
                >
                    {page}
                </button>
            ))}
        </nav>
    );
}