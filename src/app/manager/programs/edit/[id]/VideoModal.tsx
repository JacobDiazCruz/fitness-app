import Modal from '@/components/global/Modal';
import React from 'react';

const VideoModal = ({ 
  videoUrl,
  handleClose
}) => {
  const getEmbeddedLink = (url) => {
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/watch\/([^?/#&]+)/;
    if (youtubeRegex.test(url)) {
      const videoIdMatch = url.match(youtubeRegex);
      if (videoIdMatch && videoIdMatch[4]) {
        const videoId = videoIdMatch[4];
        return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
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
        // <video id="doc-player" src="https://res.cloudinary.com/dqrtlfjc0/video/upload/v1688187122/Business/Screen_Recording_2023-07-01_at_12.45.08_PM_ccygmz.mov" controls muted class="cld-video-player cld-fluid"></video>
        <iframe 
          width="700" 
          height="500"
          src={embeddedLink} 
          title="YouTube Video" 
          allowFullScreen
        ></iframe>
      )}
    </Modal>
  );
};

export default VideoModal;
