chrome.runtime.onInstalled.addListener(() => {
    console.log("Background script: Installed");
});

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    // later
});