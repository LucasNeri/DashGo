import { Box, Stack } from "@chakra-ui/react";
import { PaginationConditional } from "./PaginationConditional";
import { PaginationMoviment } from "./PaginationMoviment";

interface PaginationProps {
    total: number
    offset: number
    pages: number
    loadLawers: (page:any, sortDate: boolean, sortName: boolean) => void
    isSortDate: boolean
    isSortName: boolean
}

export function Pagination({total, offset, pages, loadLawers, isSortDate, isSortName }: PaginationProps) {
    return (
        <Stack
            direction={['column', 'row']}
            mt='8'
            justify='space-between'
            align='center'
            spacing='6'
        >
            <Box>
                <strong>{offset}</strong> - <strong>{ Math.min((offset + 10), total) }</strong> de <strong>{total}</strong>
            </Box>
            <Stack direction='row' spacing='2'>
                <PaginationMoviment page={(offset/10) + 1} total_pages={pages} before={true} loadLawers={loadLawers} isSortDate={isSortDate} isSortName={isSortName}/>
                <PaginationConditional offset={offset} pages={pages} loadLawers={loadLawers} isSortDate={isSortDate} isSortName={isSortName}/>
                <PaginationMoviment page={(offset/10) + 1} total_pages={pages} before={false} loadLawers={loadLawers} isSortDate={isSortDate} isSortName={isSortName}/>
            </Stack>
        </Stack>
    );
}