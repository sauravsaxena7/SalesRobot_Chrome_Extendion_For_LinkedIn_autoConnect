// eslint-disable-next-line no-unused-vars
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react'
import { Box, Button, CircularProgress, CircularProgressLabel, Text, VStack } from '@chakra-ui/react';

const StartStopButton = () => {


  const maximumAutoConnectionsPerSession=100;
  const [buttonClicksCount, setButtonClicksCount] = useState(0);
  
  
  
  
  const [isAutoConnectionRunning, setIsAutoConnectionRunning] = useState(null);
  const [statusMessage,setStatusMessage]=useState(null);


  

  const emitStopButtonClicked = () => {

    setIsAutoConnectionRunning(false);
    

    // eslint-disable-next-line no-undef
    chrome.storage.local.set({ isRunning: false }, () => {
      console.log("Auto-connection stopped.");
    });

  }

  const emitStartButtonClicked = () => {
    setIsAutoConnectionRunning(true);
    setButtonClicksCount(0);
    // eslint-disable-next-line no-undef
    chrome.storage.local.set({ isRunning: true }, () => {
      console.log("Auto-connection stopped.");
    });

    // eslint-disable-next-line no-undef
    

   // Execute the handleConnections function in the content script on the active tab
   // eslint-disable-next-line no-undef
   chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    // eslint-disable-next-line no-undef
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      function: () => window.handleConnections(),
    });
  });
  

  }

  useEffect(() => {
    // Listen for messages from the content script
    // eslint-disable-next-line no-undef
    chrome.runtime.onMessage.addListener((request) => {
      if (request.type === 'progress' || request.type === 'error') {
        setStatusMessage(request.message);
        if (request.type === 'progress') {
          setButtonClicksCount(request.count);  // Update progress count
        }
      }
      if (request.type === 'complete') {
        setStatusMessage(request.message);
        setIsAutoConnectionRunning(false); // Stop the process when completed
        setButtonClicksCount(request.count); // Update final count on completion
      }
    });

     // eslint-disable-next-line no-undef
    
   
  }, []);

  useEffect(()=>{
    setIsAutoConnectionRunning(buttonClicksCount>0?true:false);
  },[buttonClicksCount])


  return (
    <VStack spacing="3">
      <Box>
        <Text fontSize="18px">Invitations Sent</Text>
      </Box>
      <Box>
        <CircularProgress
          value={(buttonClicksCount / Number(maximumAutoConnectionsPerSession)) * 100}
          color="green.400"
          size="100px"
        >
          <CircularProgressLabel>{buttonClicksCount}</CircularProgressLabel>
        </CircularProgress>
      </Box>
      <Box>
        <Button
          colorScheme={isAutoConnectionRunning ? "red" : "green"}
          onClick={() => (isAutoConnectionRunning ? emitStopButtonClicked() : emitStartButtonClicked())}
          width="full"
        >
          {isAutoConnectionRunning ? "STOP" : "START"} CONNECTING
        </Button>
        {statusMessage}
      </Box>
    </VStack>
  )


}



export default StartStopButton