// Listen for tab activation (when switching tabs)
chrome.tabs.onActivated.addListener((activeInfo) => {
    handleTabChange(activeInfo.tabId);
  });
  
  // Listen for updates on any tab (when loading new pages)
  chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === "complete" && tab.active) {
      handleTabChange(tabId);
    }
  });
  
  function handleTabChange(tabId) {
    chrome.tabs.get(tabId, (tab) => {
      if (tab && tab.url && !tab.url.includes("youtube.com")) {
        // Inject script into YouTube tabs to pause the video
        chrome.scripting.executeScript({
          target: { tabId: tabId },
          func: pauseYouTubeVideo
        });
      }
    });
  }
  
  // Function to pause the video on YouTube
  function pauseYouTubeVideo() {
    const video = document.querySelector('video');
    if (video && !video.paused) {
      video.pause();
    }
  }
  