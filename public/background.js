// eslint-disable-next-line no-undef
chrome.runtime.onInstalled.addListener(() => {
  console.log('LinkedIn Auto Connect Extension Installed');
});

// Forward messages from content script to the popup
// eslint-disable-next-line no-undef, no-unused-vars
chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message.type === 'progress' || message.type === 'complete') {
    // This will forward messages to the popup
    // eslint-disable-next-line no-undef
    chrome.runtime.sendMessage(message);
  }
});
