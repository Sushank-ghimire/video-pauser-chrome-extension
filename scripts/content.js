chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "pauseVideo") {
    const video = document.querySelector("video");
    if (video && !video.paused) {
      video.pause();
    }
  }
});
