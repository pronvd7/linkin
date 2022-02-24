import Prisma from "../db/dbconprisma";

/**
 * get User by username
 * @param {*} username
 * @returns User
 */
export async function getUser(username = null) {
  if (username === null) {
    throw new Error("pass valid username");
  }
  try {
    let response = await Prisma.users.findUnique({
      where: { username },
    });
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
}

/**
 * create new User 
 * @param {*} username email password
 * @returns User detail
 */
 export async function createUser(userdata) {
  if (userdata.username === null) {
    throw new Error("pass valid username");
  }
  if (userdata.email === null) {
    throw new Error("pass valid email");
  }
  if (userdata.password === null) {
    throw new Error("pass valid password");
  }
  try {
 
      const createUser = await Prisma.users.create({ data: userdata });
     if(createUser !== null && createUser.username == userdata.username){
            await Prisma.pagedata.create({
              data: {
                username: createUser.username,
                handlerText: "Luxury Travel Hackers",
                avatarUrl:
                  "https://luxurytravelhackers.com/wp-content/uploads/2020/04/Logo_LTH-09-copy-1-300x286.png",
                avatarBorderColor: "#ffffff",
                bgColor: "#cca567",
                accentColor: "#bdd7ff",
                handlerFontSize: "20",
                handlerFontColor: "#262621",
                avatarwidth: "50",
                footerBgColor: "#000000ad",
                footerTextSize: "12",
                footerText: "Powered by Luxury Travel Hackers",
                footerTextColor: "#ffffff",
                handlerDescription:
                  "The number one luxury travel booking platform",
                handlerDescriptionFontColor: "#262621",
                linktreeWidth: "700",
                linkdata: {
                  create: {
                    bgColor: "#2C6BED",
                    textColor: "#ffffff",
                    displayText: "Welcome to Luxury Travel Hackers",
                    iconClass: "fas fa-link",
                    linkUrl: "",
                    linkEffect: "None",
                  },
                },
                socialdata: {
                  create: {
                    iconClass: "fab fa-github",
                    linkUrl: "",
                    bgColor: "#2C6BED",
                    borderRadius: "5",
                  },
                },
              },
            });
      } 
    return { success: true, data: createUser};
  } catch (error) {
    return { success: false, data: error.message };
  }
}

/**
 * get PageData
 * @returns {object} Pagedata
 */
export async function getPageData(username = '') {

  try {
    let  pageDataResponse = await Prisma.pagedata.findUnique({
      where: { username},
    });
    if(pageDataResponse !== null){
    let { created_at, ...pageData } = pageDataResponse;
    return  pageData;
    }
    return false;
    
  } catch (error) {
    throw new Error(error.message);
  }
}


/**
 * get PageData with LinkData & SocialData
 * @param {*} includeInactive
 * @returns
 */
 export async function getPageDatawLinkAndSocialData(username = '') {

  try {
    let pageData = await getPageData(username);
    if(typeof pageData != 'undefined' && pageData.username === username){
      let linkData = await getLinkData(pageData.id);
      let socialData = await getSocialData(pageData.id);
      let mediaData = await getMediaData(pageData.id);
      return { success: true, pageData: pageData, ...linkData, ...socialData, ...mediaData };
    }else{
      return { success: false, pageData: [], linkData: [], socialData:[], mediaData: [] };
    }
  } catch (error) {
    throw new Error(error.message);
  }
}

/**
 * get LinkData
 * @param {*} includeInactive
 * @returns
 */
export async function getLinkData(pagedataid = null) {
  try {
    let linkData = [];
    if(pagedataid){
          let linkDataResponse = await Prisma.linkdata.findMany({
            orderBy: { orderIndex: "asc" },
            where: {pagedataid: pagedataid},
          });

          linkDataResponse.forEach((element, index) => {
            let { created_at, ...linkDataRows } = element;
            linkData.push(linkDataRows);
          });
    }
    return { linkData };
  } catch (error) {
    throw new Error(error.message);
  }
}

/**
 * get SocialData
 * @param {*} includeInactive
 * @returns
 */
export async function getSocialData(pagedataid = null) {
  try {
    let socialData = [];
    if(pagedataid){
      let socialDataResponse = await Prisma.socialdata.findMany({
        orderBy: { orderIndex: "asc" },
        where: {pagedataid : pagedataid},
      });

      socialDataResponse.forEach((element, index) => {
        let { created_at, ...socialDataRows } = element;
        socialData.push(socialDataRows);
      });
    }
    return { socialData };
  } catch (error) {
    throw new Error(error.message);
  }
}

/**
 * get PageData with LinkData
 * @param {*} includeInactive
 * @returns
 * @deprecated // Now all APP uses getPageDatawLinkAndSocialData method
 */
export async function getPageDatawLinkData(includeInactive = true) {
  try {
    let pageData = await getPageData();
    let linkData = await getLinkData(includeInactive);

    return { ...pageData, ...linkData };
  } catch (error) {
    throw new Error(error.message);
  }
}



/**
 * update PageData
 * @param {*} data
 * @returns
 */
export async function updatePageData(data) {
  const pagedataId = data.id;
  try {
    let updatedPageData = await Prisma.pagedata.update({
      where: { id: pagedataId },
      data,
    });
    return updatedPageData;
  } catch (error) {
    throw new Error(error.message);
  }
}

/**
 * insert PageLink
 * @param {*} data
 * @returns
 */
export async function insertPageLinks(data) {
  try {
    let insertLinksData = Prisma.linkdata.create({ data });

    return insertLinksData;
  } catch (error) {
    throw new Error(error.message);
  }
}

/**
 * insert SocialLink
 * @param {*} data
 * @returns
 */
export async function insertSocialLinks(data) {
  
  try {
    let insertSocialData = Prisma.socialdata.create({ data });

    return insertSocialData;
  } catch (error) {
    throw new Error(error.message);
  }
}

/**
 * update Link
 * @param {*} data
 * @returns
 */
export async function updateLink(data) {
  try {
    const { id, ...dataWOid } = data;
    let updatedLink = await Prisma.linkdata.update({
      data: dataWOid,
      where: { id: id }
    });
    
    return updatedLink;
  } catch (error) {
    // console.log(error);
    if (error.code === "P2025") {
      throw new Error(error.meta.cause);
    }
    throw new Error(error.message);
  }
}

/**
 * update Social Link
 * @param {*} data
 * @returns
 */
export async function updateSocialLink(data) {
  try {
    const { id, ...dataWOid } = data;

    let updatedLink = await Prisma.socialdata.update({
      data: dataWOid,
      where: { id },
    });

    return updatedLink;
  } catch (error) {
    // console.log(error);
    if (error.code === "P2025") {
      throw new Error(error.meta.cause);
    }
    throw new Error(error.message);
  }
}

/**
 * delete Link
 * @param {*} id
 * @returns
 */
export async function deleteLink({ id }) {
  if (id === null || id === undefined) {
    throw new Error("pass valid id");
  }
  try {
    let response = await Prisma.linkdata.delete({ where: { id } });

    return response;
  } catch (error) {
    // console.log(error);
    if (error.code === "P2025") {
      throw new Error(error.meta.cause);
    }
    throw new Error(error.message);
  }
}

/**
 * delete Social Link
 * @param {*} id
 * @returns
 */
export async function deleteSocialLink({ id }) {
  if (id === null || id === undefined) {
    throw new Error("pass valid id");
  }
  try {
    let response = await Prisma.socialdata.delete({ where: { id } });

    return response;
  } catch (error) {
    // console.log(error);
    if (error.code === "P2025") {
      throw new Error(error.meta.cause);
    }
    throw new Error(error.message);
  }
}

/**
 * update all links with common data
 * @param {*} data
 * @returns
 */
export async function updateCommonData(body) {
  try {
    await Prisma.linkdata.updateMany({ 
      data: body.data,
      where: { pagedataid: body.pagedataid },
     });
  } catch (error) {
    // console.log(error);
    if (error.code === "P2025") {
      throw new Error(error.meta.cause);
    }
    throw new Error(error.message);
  }
}

/**
 * change Password
 * @param {*} param0
 * @returns
 */
export async function changePassword({ username, newhashedpassword }) {
  if (username === null || username === undefined) {
    throw new Error("pass valid username");
  }

  if (newhashedpassword === null || newhashedpassword === undefined) {
    throw new Error("pass valid newhashedpassword");
  }

  try {
    let { password, ...response } = await Prisma.users.update({
      data: { password: newhashedpassword },
      where: { username: username },
    });

    return response;
  } catch (error) {
    // console.log(error);
    if (error.code === "P2025") {
      throw new Error(error.meta.cause);
    }
    throw new Error(error.message);
  }
}

/**
 * reorder Links
 * @param {*} data
 * @returns
 */
export async function reorderLinks(data = []) {
  if (data.length < 1) {
    throw new Error("invalid data");
  }

  let promiseArr = [];

  try {
    data.forEach((link) => {
      promiseArr.push(
        Prisma.linkdata.update({
          where: { id: link.id },
          data: { orderIndex: link.orderIndex },
        })
      );
    });

    await Promise.all(promiseArr);
  } catch (error) {
    throw new Error(error.message);
  }

  return { success: true };
}

/**
 * reorder Social Links
 * @param {*} data
 * @returns
 */
export async function reorderSocialLinks(data = []) {
  if (data.length < 1) {
    throw new Error("invalid data");
  }

  let promiseArr = [];

  try {
    data.forEach((link) => {
      promiseArr.push(
        Prisma.socialdata.update({
          where: { id: link.id },
          data: { orderIndex: link.orderIndex },
        })
      );
    });

    await Promise.all(promiseArr);
  } catch (error) {
    throw new Error(error.message);
  }

  return { success: true };
}


/**
 * get MediaData
 * @param {*} includeInactive
 * @returns
 */
 export async function getMediaData(pagedataid = null) {
  try {
    let mediaData = [];
    if(pagedataid){
      let mediaDataResponse = await Prisma.mediadata.findMany({
        orderBy: { orderIndex: "asc" },
        where: {pagedataid : pagedataid},
      });

      mediaDataResponse.forEach((element, index) => {
        let { created_at, ...mediaDataRows } = element;
        mediaData.push(mediaDataRows);
      });
    }
    return { mediaData };
  } catch (error) {
    throw new Error(error.message);
  }
}


/**
 * reorder media Images
 * @param {*} data
 * @returns
 */
 export async function reorderMediaImages(data = []) {
  if (data.length < 1) {
    throw new Error("invalid data");
  }

  let promiseArr = [];

  try {
    data.forEach((image) => {
      promiseArr.push(
        Prisma.mediadata.update({
          where: { id: image.id },
          data: { orderIndex: image.orderIndex },
        })
      );
    });

    await Promise.all(promiseArr);
  } catch (error) {
    throw new Error(error.message);
  }

  return { success: true };
}


/**
 * delete Media Image
 * @param {*} id
 * @returns
 */
 export async function deleteMediaImage({ id }) {
  if (id === null || id === undefined) {
    throw new Error("pass valid id");
  }
  try {
    let response = await Prisma.mediadata.delete({ where: { id } });

    return response;
  } catch (error) {
    // console.log(error);
    if (error.code === "P2025") {
      throw new Error(error.meta.cause);
    }
    throw new Error(error.message);
  }
}


/**
 * update media Image
 * @param {*} data
 * @returns
 */
 export async function updateMediaImage(data) {
  try {
    const { id, ...dataWOid } = data;

    let updatedImage = await Prisma.mediadata.update({
      data: dataWOid,
      where: { id },
    });

    return updatedImage;
  } catch (error) {
    // console.log(error);
    if (error.code === "P2025") {
      throw new Error(error.meta.cause);
    }
    throw new Error(error.message);
  }
}


/**
 * insert SocialLink
 * @param {*} data
 * @returns
 */
 export async function insertMediaImages(data) {
  try {
    let insertMediaData = Prisma.mediadata.create({ data });

    return insertMediaData;
  } catch (error) {
    throw new Error(error.message);
  }
}