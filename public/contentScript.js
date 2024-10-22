

const randomDelay = (min = 1000, max = 2000) => {
    const delay = Math.random() * (max - min) + min;
    return new Promise(resolve => setTimeout(resolve, delay));
  };
// eslint-disable-next-line no-undef
window.handleConnections =  handleConnections = async() => {
    
    let totalConnections = 0; 
    window.isStart=true;
    console.log("lola totalConnections",totalConnections)  
    const sendConnection = async() => {
        const buttons = Array.from(document.querySelectorAll('button'));
        const connectButtons = buttons.filter(button => button.innerText.includes('Connect'));
        for (let i = 0; i < connectButtons.length; i++) {
          const button = connectButtons[i];
          try {
            // eslint-disable-next-line no-undef
            const { isRunning } = await chrome.storage.local.get("isRunning");
            if(!isRunning) return;
            console.log(" isRunning", isRunning)
            button.click();
            totalConnections += 1;
    
            // Send the current progress count to the popup
            // eslint-disable-next-line no-undef
            chrome.runtime.sendMessage({
              type: 'progress',
              count: totalConnections,
              message: `Connected to ${totalConnections} profiles.`
            });
    
            // Wait for a random delay (5-10 seconds)
            await randomDelay(5000,10000);
    
          } catch (error) {
            console.error(`Error connecting to profile ${i + 1}: `, error);
            // eslint-disable-next-line no-undef
            chrome.runtime.sendMessage({
              type: 'error',
              message: `Error on profile ${i + 1}`
            });
          }
        }
    
        
      };


      const waitForNextPageLoad = async () => {
        return new Promise((resolve) => {
          const observer = new MutationObserver(() => {
            // Check if the page has reloaded (can be customized to check specific changes)
            const newButtons = document.querySelectorAll('button');
            console.log("newButtons",newButtons)
            if (newButtons.length > 0) {
              observer.disconnect();
              resolve();
            }
          });
          observer.observe(document.body, { childList: true, subtree: true });
        });
      };

      const navigateToNextPage = async () => {
        const nextButtonSelector = 'button[aria-label="Next"]';
        const maxAttempts = 3;
        let attempt = 0;
      
        while (attempt < maxAttempts) {
          const nextButton = document.querySelector(nextButtonSelector);
      
          // Check if the next button exists and is visible/enabled
          if (nextButton && !nextButton.disabled) {
            // Wait a short delay before clicking to ensure the page has settled
            await randomDelay(); // Short delay before clicking
      
            try {
              nextButton.click();
              console.log('Clicked Next button successfully.');
              return true; // Successfully clicked next
            } catch (error) {
              console.error('Error clicking Next button:', error);
            }
          } else {
            console.log('No Next button available or it is disabled.');
            return false; // No next button available or it is disabled
          }
      
          attempt++;
          console.log(`Attempt ${attempt} to click the Next button failed. Retrying...`);
        }
      
        console.log('Failed to click the Next button after 3 attempts.');
        return false; // Failed after max attempts
      };
      
      const processAllPages = async () => {
        let hasNextPage = true;
        // eslint-disable-next-line no-undef
        const { isRunning } = await chrome.storage.local.get("isRunning");
        console.log(" isRunning", isRunning)
    
        while (hasNextPage && isRunning) {
          await sendConnection(); // Connect on the current page
          hasNextPage = navigateToNextPage(); // Try navigating to the next page
          console.log("hasNextPage",hasNextPage)
    
          if (hasNextPage) {
            // Wait for the next page to load
            await waitForNextPageLoad();
          }
        }
    
        // Once all pages are processed, send completion message
        // eslint-disable-next-line no-undef
        chrome.runtime.sendMessage({
          type: 'complete',
          count: totalConnections,
          message: `Completed connecting to ${totalConnections} profiles across all pages.`
        });
      };
    
      // Start the connection and pagination process
      await processAllPages();

  };
