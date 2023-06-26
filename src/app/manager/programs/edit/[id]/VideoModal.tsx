import Modal from '@/components/global/Modal';
import React from 'react';

const VideoModal = ({ 
  videoUrl,
  handleClose
}) => {
  const getEmbeddedLink = (url) => {
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;
    if (youtubeRegex.test(url)) {
      const videoIdMatch = url.match(/[?&]v=([^&]+)/);
      if (videoIdMatch && videoIdMatch[1]) {
        const videoId = videoIdMatch[1];
        return `https://www.youtube.com/embed/${videoId}`;
      }
    }
    return '';
  };

  const embeddedLink = getEmbeddedLink(videoUrl);

  return (
    <Modal 
      className="w-[700px] h-[505px]"
      onClose={handleClose}
    >
      {embeddedLink && (
        <iframe width="700" height="500" src={embeddedLink} title="YouTube Video" allowFullScreen></iframe>
      )}
    </Modal>
  );
};

export default VideoModal;