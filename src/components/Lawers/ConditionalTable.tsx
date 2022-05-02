import { Table, Thead, Th, Tr, Checkbox, Tbody, TableCaption, useBreakpointValue } from "@chakra-ui/react";
import { Pagination } from "../../components/Pagination/index";
import { Lawers } from "./Lawers";

interface ILawer {
    _id: string,
    name: string,
    email: string,
    date: string,
}

interface ConditionalTableProps {
    lawers: ILawer[],
    totalLawers: number,
    offset: number,
    pages: number,
    loadLawers: (page:any, sortDate: boolean, sortName: boolean) => void
    isSortDate: boolean,
    isSortName: boolean,
}

export function ConditionalTable({ lawers, totalLawers, offset, pages, loadLawers, isSortDate, isSortName } : ConditionalTableProps) {
    const isWideVersion = useBreakpointValue({
        base: false,
        lg: true, 
    })

    if (!lawers) {
        return (
            <Table colorScheme='whiteAlpha'>
                <TableCaption >Não foram encontrados advogados cadastrados</TableCaption>
            </Table>
        )
    }
    return (
        <>
            <Table colorScheme='whiteAlpha'>
            <Thead>
                <Tr>
                    <Th>Advogado</Th>
                    { isWideVersion && <Th>Data de Cadastro</Th>}
                    <Th width='1'></Th>
                    <Th width='1'></Th>
                </Tr>
            </Thead>
            <Tbody>
                <Lawers lawers={lawers} loadLawers={loadLawers} totalLawers={totalLawers} offset={offset} pages={pages} isSortDate={isSortDate} isSortName={isSortName}/>
            </Tbody>
            </Table>

            <Pagination total={totalLawers} offset={offset} pages={pages} loadLawers={loadLawers} isSortDate={isSortDate} isSortName={isSortName}/>
        </>
    )
}