export default function useVideoLinkCoverter() {
  const videoLinkConverter = (inputValue: string) => {
    // Regular expression to match YouTube Shorts link
    const youtubeShortsRegex = /^(https?:\/\/)?(www\.)?(youtube\.com)\/shorts\/([^?/#&]+)/;
    if (youtubeShortsRegex.test(inputValue)) {
      // Extract the video ID from the YouTube Shorts link
      const videoIdMatch = inputValue.match(youtubeShortsRegex);
      if (videoIdMatch && videoIdMatch[4]) {
        const videoId = videoIdMatch[4];
        // Update the link to the regular YouTube watch URL format
        return `https://www.youtube.com/watch/${videoId}`;
      }
    } else {
      // Regular expression to match YouTube watch URL
      const youtubeWatchRegex = /^(https?:\/\/)?(www\.)?(youtube\.com)\/watch\?v=([^?/#&]+)/;
      if (youtubeWatchRegex.test(inputValue)) {
        // Extract the video ID from the YouTube watch URL
        const videoIdMatch = inputValue.match(youtubeWatchRegex);
        if (videoIdMatch && videoIdMatch[4]) {
          const videoId = videoIdMatch[4];
          // Update the link to the desired format
          return `https://www.youtube.com/watch/${videoId}`;
        }
      }
    }
  };

  return {
    videoLinkConverter
  };
}