import React from 'react';

interface VideoThumbnailProps {
  videoUrl: string;
  onClick?: () => void;
};

const VideoThumbnail = ({ 
  videoUrl, 
  onClick
}: VideoThumbnailProps) => {
  const getThumbnailUrl = (url: string) => {
    const youtubeWatchRegex = /^(https?:\/\/)?(www\.)?(youtube\.com)\/watch\/([^?/#&]+)/;
    const youtubeShortsRegex = /^(https?:\/\/)?(www\.)?(youtube\.com)\/shorts\/([^?/#&]+)/;
  
    let videoId = null;
  
    if (youtubeWatchRegex.test(url)) {
      const videoIdMatch = url.match(youtubeWatchRegex);
      if (videoIdMatch && videoIdMatch[4]) {
        videoId = videoIdMatch[4];
      }
    } else if (youtubeShortsRegex.test(url)) {
      const videoIdMatch = url.match(youtubeShortsRegex);
      if (videoIdMatch && videoIdMatch[4]) {
        videoId = videoIdMatch[4];
      }
    }
  
    if (videoId) {
      return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
    }
  
    return null;
  };  

  const thumbnailUrl = getThumbnailUrl(videoUrl);

  return thumbnailUrl ? (
    <img 
      src={thumbnailUrl} 
      alt="Video Thumbnail" 
      onClick={onClick}
      className="cursor-pointer"
    />
  ) : null;
};

export default VideoThumbnail;
