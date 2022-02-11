import React from 'react';
import Gallery from 'react-grid-gallery';
export default function ReactGallery({mediaData}){
        
        const captionStyle = {
                backgroundColor: "rgba(0, 0, 0, 0.8)",
                maxHeight: "240px",
                overflow: "hidden",
                position: "absolute",
                bottom: "0",
                width: "100%",
                color: "white",
                padding: "2px",
                fontSize: "90%",
                hoverColor:"rgba(0,0,0,0.54)",
                opacity: "0",
                transition: ".5s ease",
            };
    
        const IMAGES = mediaData.map((image) =>{
              if(image.imageUrl){  
      
               const customOverlay = image.imageCaption ? (<div style={captionStyle}>
                                            <div>{image.imageCaption}</div>  
                                      </div>): "";   
                return {
                        imageDestinationUrl: image.imageDestinationUrl,
                        thumbnail: image.imageUrl,
                        thumbnailWidth: 320,
                        thumbnailHeight: 212,
                        customOverlay : customOverlay,
                };
             }
             return; 
        });
 
        const destinationUrl = (imageid) =>{
                const imageDestinationUrl = IMAGES[imageid].imageDestinationUrl;
                if(imageDestinationUrl){
                window.open(imageDestinationUrl);
                }
                return true; 
        }
      
        return (
            <div> 
              { IMAGES && (<div style={{
                    display: "block",
                    minHeight: "1px",
                    width: "100%",
                    border: "1px solid #ddd",
                    overflow: "auto"}}><Gallery images={IMAGES} enableImageSelection={false} enableLightbox={false} onClickThumbnail={destinationUrl}/></div>) }
            </div>   
        );

}