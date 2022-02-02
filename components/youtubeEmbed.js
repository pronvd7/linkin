import React from 'react';
import YouTube from 'react-youtube';

export default function YoutubeEmbed({EmbedId}){
    const opts = {
        height: '374',
        width: '665',
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


