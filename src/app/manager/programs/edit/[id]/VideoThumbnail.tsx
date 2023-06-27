import React, { useEffect } from 'react';

const VideoThumbnail = ({ 
  videoUrl, 
  onClick 
}) => {
  const getThumbnailUrl = (url) => {
    let thumbnailUrl = '';
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;
    const vimeoRegex = /^(https?:\/\/)?(www\.)?(vimeo\.com)\/.+$/;
    console.log("url", url);
    if (youtubeRegex.test(url)) {
      const videoIdMatch = url.match(/[?&]v=([^&]+)/);
      if (videoIdMatch && videoIdMatch[1]) {
        const videoId = videoIdMatch[1];
        thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
      }
    } else if (vimeoRegex.test(url)) {
      const videoIdMatch = url.match(/vimeo\.com\/(\d+)/);
      if (videoIdMatch && videoIdMatch[1]) {
        const videoId = videoIdMatch[1];
        thumbnailUrl = `https://vumbnail.com/${videoId}.jpg`;
      }
    }

    return thumbnailUrl;
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