import { Avatar, Box, Flex, Text } from "@chakra-ui/react";

interface ProfileProps {
    showProfileData?: boolean;
}

export function Profile({ showProfileData = true }: ProfileProps) {
    return (
        <Flex align='center'>
            { showProfileData && (
                <Box mr='4' textAlign='right'>
                    <Text>Lucas Neri</Text>
                    <Text color='gray.300' fontSize='small'>
                        lucasneri.mat@gmail.com
                    </Text>
                </Box>
            )}

            <Avatar size='md' name='Lucas Neri' src='https://github.com/LucasNeri.png'/>
        </Flex>
    )
}