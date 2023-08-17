import { useEffect, useState } from "react";

export default function useExerciseVideo({ 
  currentExercise
}: any) {
  const [player, setPlayer] = useState<any>(null);
  const [videoId, setVideoId] = useState("");

  const getEmbeddedLink = (url: string) => {
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/watch\/([^?/#&]+)/;
    if (youtubeRegex.test(url)) {
      const videoIdMatch = url.match(youtubeRegex);
      if (videoIdMatch && videoIdMatch[4]) {
        const videoId = videoIdMatch[4];
        return videoId;
      }
    }
    return '';
  };

  // set new video id if current exercise is updated
  useEffect(() => {
    if(currentExercise) {
      setVideoId(getEmbeddedLink(currentExercise?.videoLink));
    }
  }, [currentExercise]);

  const onPlayVideo = () => {
    if (player) {
      console.log("player", player)
      player?.playVideo();
    }
  };

  const onPauseVideo = () => {
    if (player) {
      player?.pauseVideo();
    }
  };

  return {
    player,
    setPlayer,
    videoId,
    onPlayVideo,
    onPauseVideo
  };
};