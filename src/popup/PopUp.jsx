// eslint-disable-next-line no-unused-vars
import { Box, Button, ChakraProvider, Container, Flex, Heading, Spacer } from '@chakra-ui/react'
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react'
import { darkTheme } from '../utils/helper'

import StartStopButton from './StartStopButton'
import PageSelection from './PageSelection'


const PopUp = () => {
    const [isActiveTabConnected,setIsActiveTabConnected] = useState(false);
    
  useEffect(()=>{
     // eslint-disable-next-line no-undef
     chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
        console.log(tabs[0].url);
        setIsActiveTabConnected(tabs[0]?.url?.includes("search"))
    });
  },[])


    return (
        <div>

            <ChakraProvider theme={darkTheme}>

                <Flex paddingX={5} paddingY={2} backgroundColor="gray.700" align="center" width="260px" >
                    <Box>
                        <Heading size="sm">LinkedIn AutoConnect</Heading>
                    </Box>
                    <Spacer />
                    {/* <Box>
                        <Button size="sm" onClick={() => {
                            //openOptionsPage()
                        }}>
                            <MdSettings />
                        </Button>
                    </Box> */}
                </Flex>
                <Container padding="5">{isActiveTabConnected ? <StartStopButton /> : <PageSelection />}</Container>
            </ChakraProvider>

        </div>
    )
}



export default PopUp