import React, { DetailedHTMLProps, InputHTMLAttributes } from "react";
import YouTube from "react-youtube";

import "./App.css";
import Footer from "./Footer";
import youtubeUrlToID from "./youtubeUrlToID";

function App() {
  const [isPlaying, setIsPlaying] = React.useState<boolean>(false);
  const [videoId, setVideoId] = React.useState<string | undefined>();

  const urlRef = React.useRef<HTMLInputElement | null>(null);
  const playerRef = React.useRef<YouTube>(null);

  const playing = () => {
    setIsPlaying(true);
  };

  const paused = () => {
    setIsPlaying(false);
  };

  const handleInputKeyDown = (
    event: DetailedHTMLProps<
      InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    >
  ) => {
    if (event.key === "Enter") onLoopClick();
  };

  const onLoopClick = (): void => {
    if (urlRef?.current) {
      const id = youtubeUrlToID(urlRef.current.value);
      setVideoId(id ? id : undefined);
    }
  };

  const getTimeLeftInVideo = async (): Promise<number> => {
    if (playerRef?.current?.internalPlayer) {
      const secondsIntoVideo =
        await playerRef.current.internalPlayer.getCurrentTime();
      const secondsInVideo =
        await playerRef.current.internalPlayer.getDuration();
      return secondsInVideo - secondsIntoVideo;
    }
    return 0;
  };

  const backToBeginning = async (): Promise<void> => {
    if (playerRef?.current?.internalPlayer) {
      const secondsIntoVideo =
        await playerRef.current.internalPlayer.getCurrentTime();
      const secondsInVideo =
        await playerRef.current.internalPlayer.getDuration();
      if (secondsInVideo - secondsIntoVideo < 2) {
        await playerRef.current.internalPlayer.seekTo(0, true);
      }
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
  };

  const sleep = (ms: number): Promise<void> => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  React.useEffect(() => {
    if (!isPlaying) return;

    let exit = false;
    (async () => {
      while (!exit) {
        if ((await getTimeLeftInVideo()) < 2) {
          await backToBeginning();
        }
        await sleep(500);
      }
    })();

    return () => {
      exit = true;
    };
  }, [isPlaying]);

  return (
    <div className="App">
      <div className="top">
        <h1>YouTube Looper</h1>
        <p>Enter a URL and it will endlessly loop.</p>
        <input
          ref={urlRef}
          type="text"
          placeholder="YouTube video to loop"
          className="input"
          onKeyDown={handleInputKeyDown}
        />
        <button className="input-button" onClick={onLoopClick}>
          Loop It!
        </button>
      </div>
      <YouTube
        ref={playerRef}
        videoId={videoId}
        onPlay={playing}
        onPause={paused}
        onEnd={paused}
      />
      <Footer />
    </div>
  );
}

export default App;
