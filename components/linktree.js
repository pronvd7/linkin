import { isEmpty, isHex } from "../lib/side";
import YoutubeEmbed from "./youtubeEmbed";
import ReactGallery from "./reactGallery";
import styles from "../styles/animatelink.module.css";
import { ToastContainer, toast } from "react-toastify";
// import Image from "next/image";

export default function Home({
  handlerText,
  bgColor,
  handlerLink,
  avatarUrl,
  accentColor,
  avatarwidth,
  avatarBorderColor,
  handlerFontSize,
  handlerFontColor,
  fontFamily,
  fontUrl,
  linkData,
  socialData,
  mediaData,
  footerText,
  footerTextSize,
  footerBgColor,
  footerTextColor,
  handlerDescriptionFontColor,
  handlerDescription,
  bgImgUrl,
  footerEnabled,
  linkPadding,
  linktreeWidth,
  preview = false,
  youtubeUrl,
  notificationsData,
}) {
  let linkPaddingLowWidth = isEmpty(linkPadding)
    ? "2em"
    : `${linkPadding * 0.5}em`;

  accentColor = isEmpty(accentColor) ? "#BDD7FF" : accentColor;
  avatarwidth = isEmpty(avatarwidth) ? "50" : avatarwidth;
  avatarBorderColor = isEmpty(avatarBorderColor) ? "#fff" : avatarBorderColor;
  handlerFontSize = isEmpty(handlerFontSize) ? "15" : handlerFontSize;
  handlerFontColor = isEmpty(handlerFontColor) ? "#fff" : handlerFontColor;
  bgColor = isEmpty(bgColor) ? "#f9f4ef" : "#f9f4ef";
  fontFamily = isEmpty(fontFamily) ? "'Roboto', sans-serif" : fontFamily;
  fontUrl = isEmpty(fontUrl)
    ? "https://fonts.googleapis.com/css2?family=Roboto&display=swap"
    : fontUrl;
  footerTextSize = isEmpty(footerTextSize) ? 12 : footerTextSize;
  footerBgColor = isEmpty(footerBgColor) ? "#000000ad" : footerBgColor;
  footerTextColor = isEmpty(footerTextColor) ? "#ffffff" : footerTextColor;
  linkPadding = isEmpty(linkPadding) ? ".5em" : `${linkPadding}em`;
  linktreeWidth = isEmpty(linktreeWidth) ? "320px" : `${linktreeWidth}px`;

  const VID_REGEX =/(?:youtube(?:-nocookie)?\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;

  const EmbedId = youtubeUrl ? isEmpty(youtubeUrl.match(VID_REGEX)) ? "nIh91a4JX3M" : youtubeUrl.match(VID_REGEX)[1] : "nIh91a4JX3M";

  if (Array. isArray(notificationsData) && notificationsData. length) {
    notificationsData.map((notification, id) => {
      if (notification.notiType === "success") {
        toast.success(notification.notiMessage, { delay: notification.timeInterval * 1000  });
        return;
      }

      if (notification.notiType === "error") {
        toast.error(notification.notiMessage, { delay: notification.timeInterval * 1000  });
        return;
      }

      if (notification.notiType === "info") {
        toast.info(notification.notiMessage, { delay: notification.timeInterval * 1000  });
        return;
      }

      if (notification.notiType === "warning") {
        toast.warn(notification.notiMessage, { delay: notification.timeInterval * 1000  });
        return;
      }

      toast(notification.notiMessage, { delay: notification.timeInterval * 1000  });
      return;
     })
  }
  
  return (
    <div>
      <div className="outterwrap">
        <div className="wrap">
          <div className="profile">
            <div className="avatar-pic">
            {!isEmpty(avatarUrl) && <img src={avatarUrl} className="photo" />}
            {isEmpty(avatarUrl) && <img src="/avatar.png" className="photo" />}
            </div>
            <span className="handlerText">
              <a
                className="handlerLink"
                href={`${handlerLink || "#"}`}
                target="_blank"
              >
                {handlerText}{" "}
              </a>
            </span>

            <p className="handlerDescription">{handlerDescription}</p>
          </div>
          
          <div className="social">
            <ul>
              {socialData.map((link, id) => {
                return (
                  <li key={id}>
                    <a
                      href={`${link.linkUrl || "#"}`}
                      className="social_icon"
                      target="_blank"
                      style={{
                        backgroundColor: link.bgColor || "#2c6bed",
                        color: link.textColor || "#ffffff",
                        borderRadius: `${link.borderRadius || "4"}px`,
                      }}
                    >
                      {link.iconClass && (
                        <i
                          className={`${link.iconClass} single_icon fa-fw`}
                        ></i>
                      )}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="links">
            <ul>
              {linkData.map((link, id) => {
                return (
                  <li className={`${styles[link.linkEffect]} linklist`} key={id}>
                    <a
                      href={`${link.linkUrl || "#"}`}
                      className="link"
                      target="_blank"
                      style={{
                        backgroundColor: link.bgColor || "#2c6bed",
                        color: link.textColor || "#ffffff",
                        borderRadius: `${link.borderRadius || "4"}px`,
                      }}
                    >
                      {link.iconClass && (
                        <i className={`${link.iconClass} icon`}></i>
                      )}
                      <div className="d-flex w-100 align-items-center justify-content-center">
                        {link.displayText}
                      </div>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        { EmbedId && (
          <div className="youtube-video-class">  
            <YoutubeEmbed EmbedId={EmbedId} />
          </div>)  
          }
          { mediaData && (mediaData.length > 0) && (<ReactGallery mediaData={mediaData}/>)
          }
          </div>

        <ToastContainer
          position="bottom-left"
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
          {footerEnabled && (
          <div className="footer d-flex align-items-center justify-content-center">
            {/* Copyright © 2021 All Rights Reserved by. */}
            {footerText}
            </div>
        )}
      
      </div>

      <style
        jsx
        onError={(e) => {
          console.log(e);
        }}
      >{`
        @import url("${fontUrl}");

        @import url("https://use.fontawesome.com/releases/v5.8.1/css/all.css");

        .outterwrap {
          margin: 0;
          // padding: 15px;
          padding-top:2vh ;
          height: 100%;
          min-height: "100vh";
          // min-height: ${footerEnabled ? "96vh" : "100vh"};
          width: 100%;
          font-family: ${fontFamily};
          background: ${bgColor};
          ${bgImgUrl ? `background-image: url("${bgImgUrl}");` : ""}
          ${bgImgUrl ? `background-repeat: no-repeat;` : ""}
          ${bgImgUrl ? `background-position: center;` : ""}
          ${bgImgUrl ? `background-size: cover;` : ""}
        }
     
        .wrap {
          min-height: ${footerEnabled ? "140vh" : "100vh"};
          height: 100%;
          width: 100%;
          max-width: ${linktreeWidth};
          padding: 0  1em 30px 1em;
          margin: 0 auto;
          position: relative;
          display: table;
        }
        .ReactGridGallery_tile {
          padding-bottom: 15px!important;
      }
        .handlerLink {
          text-decoration: dashed;
        }

        .handlerDescription {
          text-align: center;
          text-justify: inter-word;
          background: ${handlerDescriptionFontColor};
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent; 
          -moz-background-clip: text;
          -moz-text-fill-color: transparent;
          // color: ${handlerDescriptionFontColor};
        }

        .footer {
          position:relative;
          ${preview ? "" : "left: 0 ; "}
          //padding: 1rem;
          background: ${footerBgColor};
          // background-color: ${footerBgColor};
          text-align: center;
          color: ${footerTextColor};
          font-size: ${footerTextSize}px;
          margin: 0 auto;
          width:100%;
          padding:10px 0;
        }

        a {
          color: ${handlerFontColor};
        }

        a:hover {
          color: ${accentColor};
        }

        .profile {
          text-align: center;
          color: #fff;
        }

        .photo {
          width:  ${avatarwidth}%;
        }

        .avatar-pic { 
          position: relative;
          width: 150px;
          height: 150px;
          margin: 20px auto;
          border: 1px solid #000;
          border-radius: 50%;
          padding: 20px;
          background: #000;
          box-shadow: 0px 0px 13px 0px #000; 
          display: flex;
          align-items: center;
          justify-content: center;
        }
      
        .handlerText {
          padding: 10px;
          font-weight: bold;
          display: block;
          font-size: ${handlerFontSize}px;
        }

        .social {
          // margin: 0 -2rem 0 -2rem;
        }
        .social ul {
          list-style: none;
          padding: 0;
          margin: 0 auto;
          width: fit-content;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: center;
        }

        .social ul li {
          margin: 7px;
        }

        .social_icon {
          display: inline-flex;
          padding: 0.5rem;
          text-align: center;
          text-decoration: none;
          border-radius: 4px;
          transition: ease all 0.3s;
          color: #fff;
          align-items: center;
        }

        .social_icon:hover {
          opacity: 0.9;
        }

        .links ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .links ul li {
          margin: 14px 0;
        }
        .link {
          padding: ${linkPadding};
          display: flex;
          text-align: center;
          text-decoration: none;
          border-radius: 4px;
          color: #fff;
          align-items: center;
        }
        .link:hover {
          opacity: 0.9;
        }

        .icon {
          // padding: 1rem;
          font-size: 1.7rem;
        }

        .single_icon {
          font-size: 2rem;
        }
        .youtube-video-class{
          max-width:100%;
        }
        
        .ReactGridGallery_tile-viewport {
          outline: 2px solid #766d6d;
          outline-offset: -8px;
       }
        @media (max-width: 768px) {
          .link {
            padding: 1em;
            // padding: 1.2rem;
          }
          .avatar-pic {
            width: 120px;
             height: 120px;
         }
      `}</style>
    </div>
  );
}
//

// position: absolute;
// right: 0;
// bottom: 0;
// ${preview ? "" : "left: 0 ; "}
// padding: 1rem;
// background-color: #000;
// text-align: center;
// color: #fff;
// font-size: 0.6rem;
// width: ${preview ? "50%" : "100%"};
