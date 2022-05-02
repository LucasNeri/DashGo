import { Button } from "@chakra-ui/react"

interface PaginationMovimentProps {
    before?: boolean;
    page: number;
    total_pages: number;
    loadLawers: (page:any, sortDate: boolean, sortName: boolean) => void
    isSortDate: boolean;
    isSortName: boolean;
}

export function PaginationMoviment({ before, page, total_pages, loadLawers, isSortDate, isSortName } : PaginationMovimentProps) {
    if (before && page > 1) {
        return (
            <Button 
                size='sm'
                fontSize='xs'
                width='4'
                bg='gray.700'
                _hover={{
                    bg: 'gray.500'
                }}
                onClick={() => loadLawers(page - 1, isSortDate, isSortName)}
            >
                &lt;&lt;
            </Button>    
        )
    }

    if (!before && page < total_pages) {
        return (
            <Button 
                size='sm'
                fontSize='xs'
                width='4'
                bg='gray.700'
                _hover={{
                    bg: 'gray.500'
                }}
                onClick={() => loadLawers(page + 1, isSortDate, isSortName)}
            >
                &gt;&gt;
            </Button>
        )
    }

    return (
        <></>
    );
}