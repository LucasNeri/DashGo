import { Button } from "@chakra-ui/react"

interface PaginationItemProps {
    number: number;
    isCurrent?: boolean;
    loadLawers: (page:any, sortDate: boolean, sortName: boolean) => void
    isSortDate: boolean
    isSortName: boolean
}

export function PaginationItem({
    isCurrent = false,
    number,
    loadLawers,
    isSortDate,
    isSortName
}: PaginationItemProps) {
    if (isCurrent) {
        return (
            <Button 
                size='sm'
                fontSize='xs'
                width='4'
                colorScheme='pink'
                disabled
                _disabled={{
                    bg: 'pink.500',
                    cursor: 'default',
                }}
                onClick = {() => loadLawers(number, isSortDate, isSortName)}
            >
                {number}
            </Button>    
        )
    }

    return (
        <Button 
            size='sm'
            fontSize='xs'
            width='4'
            bg='gray.700'
            _hover={{
                bg: 'gray.500'
            }}
            onClick = {() => loadLawers(number, isSortDate, isSortName)}
        >
            {number}
        </Button>
    )
}