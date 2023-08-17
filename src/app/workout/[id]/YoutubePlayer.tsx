// YouTubePlayer.js
import React, { useEffect } from 'react';

const YouTubePlayer = ({ player, setPlayer, videoId }: any) => {
  useEffect(() => {
    const onYouTubePlayerAPIReady = () => {
      const player = new window.YT.Player('player', {
        height: '360',
        width: '640',
        videoId,
        playerVars: {
          controls: 0, // Hide YouTube controls
          autoplay: 0, // Do not autoplay initially
        },
        events: {
          onReady: () => setPlayer(player), // Store the player instance
        },
      });
    };

    if (window.YT) {
      onYouTubePlayerAPIReady();
    } else {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/player_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      window.onYouTubePlayerAPIReady = onYouTubePlayerAPIReady;
    }

    return () => {
      if (player) {
        player.destroy();
      }
    };
  }, [videoId, setPlayer]);

  return (
    <div>
      <div id="player" className="w-[400px] h-[350px]"></div>
    </div>
  );
};

export default YouTubePlayer;