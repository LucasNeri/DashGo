import { Box, Flex, Heading, Progress } from "@chakra-ui/react";
import { Sidebar } from "../components/Sidebar/index";
import { Header } from "../components/Header";
import { AttTable } from "../components/Lawers/AttTable";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import api from "../services/api";

export default function Dashboard() {
    const [lawers, setLawers] = useState()
    const [isLoading, setIsLoading] = useState(false)
    let router = useRouter();

    useEffect(()=>{
        loadLawersAt()
        if(!router.isReady) return;
    }, [router.isReady]);


    async function loadLawersAt() {
        setIsLoading(false)
        let url = `/api/getLawers?page=1&size=5`

        api.get(url).then(res => {
            setTimeout(() => {
                setLawers(res.data.data.docs)
                setIsLoading(true)
            }, 1000)
        }).catch(err => {
            console.log(err)
        })
        setTimeout(() => {
            if (window.location.href.split('/')[3] == undefined) {
                if (router.route == '/dashboard') {
                    loadLawersAt()
                }
            } else if (window.location.href.split('/')[3] == 'dashboard'){ 
                loadLawersAt()
            }
        }, 5000)
    }

    return (
        <Flex direction='column' h='100vh'>
            <Header />

            <Flex w='100%' my='6' maxWidth={1480} mx='auto' px='6'>
                <Sidebar />

                <Box flex='1' borderRadius={8} bg='gray.800' p='8'>
                    <Flex mb='8' justify='space-between' align='center'>
                        <Heading size='lg' fontWeight='normal'>Últimos Advogados Cadastrados</Heading>
                    </Flex>
                    

                    <Progress size='xs' isIndeterminate mb={5} hidden={isLoading}/>
                    <AttTable lawers={lawers} loadLawers={loadLawersAt}/>
                </Box>
            </Flex>
        </Flex>
    )
}