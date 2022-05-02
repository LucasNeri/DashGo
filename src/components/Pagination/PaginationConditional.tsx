import { Button } from "@chakra-ui/react";
import { PaginationItem } from "./PaginationItem";

interface NewPaginationProps {
    offset: number
    pages: number
    loadLawers: (page:any, sortDate: boolean, sortName: boolean) => void
    isSortDate: boolean
    isSortName: boolean
}

export function PaginationConditional({offset, pages, loadLawers, isSortDate, isSortName}: NewPaginationProps) {

    if (pages < 7) {
      return (
        <>
        {
            Array.from({length: pages}, (_, index) => (
                <PaginationItem number={index + 1} isCurrent={index === offset/10 } loadLawers={loadLawers} isSortDate={isSortDate} isSortName={isSortName} />
            ))
        }
        </>
      );
    } else if (pages > 6 && (offset/10 + 1) > (pages-6)) {
        const numbers = [5, 4, 3, 2, 1, 0]
        return (
            <>
            {
            Array.from(numbers, (number, _) => (
                <PaginationItem number={pages - number} isCurrent={pages - number === offset/10 + 1 } loadLawers={loadLawers} isSortDate={isSortDate} isSortName={isSortName}/>
            ))
            }
            </>
        );
    }
    return (
        <>
            <PaginationItem number={(offset/10)+1} isCurrent={true} loadLawers={loadLawers} isSortDate={isSortDate} isSortName={isSortName}/>
            <PaginationItem number={(offset/10)+2} isCurrent={false} loadLawers={loadLawers} isSortDate={isSortDate} isSortName={isSortName}/>
            <Button 
                size='sm'
                fontSize='xs'
                width='4'
                bg='gray.700'
                _hover={{
                    bg: 'gray.500'
                }}
                disabled
            >
                ...
            </Button>
            <PaginationItem number={pages-1} isCurrent={false} loadLawers={loadLawers} isSortDate={isSortDate} isSortName={isSortName}/>
            <PaginationItem number={pages} isCurrent={false} loadLawers={loadLawers} isSortDate={isSortDate} isSortName={isSortName}/>
        </>
    );
}