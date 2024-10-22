
import './assets/style.css'
import PopUp from './popup/PopUp';

function App() {
  // const [isRunning, setIsRunning] = useState(false);

  // const startAutomation = () => {
  //   setIsRunning(true);

  //   // Execute content script
  //   // eslint-disable-next-line no-undef
  //   chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  //     // eslint-disable-next-line no-undef
  //     chrome.scripting.executeScript({
  //       target: { tabId: tabs[0].id },
  //       function: sendConnectionRequests
  //     });
  //   });
  // };

  return (
    // <div style={{ padding: '10px', textAlign: 'center' }}>
    //   <h2>LinkedIn Auto Connect</h2>
    //   <button
    //     onClick={startAutomation}
    //     disabled={isRunning}
    //     style={{ padding: '10px 20px', fontSize: '16px' }}
    //   >
    //     {isRunning ? 'Connecting...' : 'Start Connecting'}
    //   </button>
    // </div>
    <PopUp/>
  );
}

// Injected script function
// const sendConnectionRequests = () => {
//   const buttons = Array.from(document.querySelectorAll('button'));
//   let index = 0;

//   const sendConnection = () => {
//     if (index >= buttons.length) return;

//     const button = buttons[index];
//     const isConnectButton = button.innerText.includes('Connect');
    
//     if (isConnectButton) {
//       button.click();
//       console.log(`Clicked Connect on profile ${index + 1}`);
//       const randomDelay = Math.random() * 5000 + 5000;
//       setTimeout(sendConnection, randomDelay);
//     } else {
//       console.log(`Skipped profile ${index + 1}`);
//       sendConnection();
//     }

//     index++;
//   };

//   sendConnection();
// };

export default App
