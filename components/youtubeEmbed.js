import React ,{useEffect} from 'react';
import YouTube from 'react-youtube';

export default function YoutubeEmbed({EmbedId}){

  const [width, setWidth] = React.useState(665);
  const [youtubeWidth, setYoutubeWidth] = React.useState();
  const [youtubeHeight, setYoutubeHeight] = React.useState();
      useEffect(() => {
      setWidth(window.innerWidth);
      let  ytbWidth = (width < 700) ? window.screen.width - 35 : "665";
      let  ytbHeight = (width < 500) ? "250" : "374";
       setYoutubeHeight(ytbHeight);
       setYoutubeWidth(ytbWidth);
      });
      
    const opts = {
      height: youtubeHeight,
      width: youtubeWidth,  // 600
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 1,
      },
    };
    const  _onReady =  (event) => {
        // access to player in all event handlers via event.target
        event.target.pauseVideo();
      }
  return (
      
        <YouTube videoId={EmbedId} opts={opts}  className="embedVideo"   onReady={_onReady} />
    
  );
};


