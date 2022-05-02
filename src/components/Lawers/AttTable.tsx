import { Table, Thead, Th, Tr, Checkbox, Tbody, TableCaption, useBreakpointValue } from "@chakra-ui/react";
import { AttLawers } from "./AttLawers";


interface ILawer {
    _id: string,
    name: string,
    email: string,
    date: string,
}

interface AttTableProps {
    lawers: ILawer[],
    loadLawers: (page:any) => void
}

export function AttTable({ lawers, loadLawers } : AttTableProps) {

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
                </Tr>
            </Thead>
            <Tbody>
                <AttLawers lawers={lawers} loadLawers={loadLawers}/>
            </Tbody>
            </Table>
        </>
    )
}