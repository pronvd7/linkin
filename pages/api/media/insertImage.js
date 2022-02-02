import { jwtAuth, use } from "../../../middleware/middleware";
import { getMediaData, insertMediaImages } from "../../../lib/dbfuncprisma";

async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(400).send("method not allowed");
    return;
  }

  try {
    // Run the middleware
    await use(req, res, jwtAuth);
   
    await insertMediaImages(req.body);

    let updatedMediaData = await getMediaData(req.body.pagedataid);

    // mock loading times for testing
    // await new Promise((resolve, reject) =>
    //   setTimeout(() => {
    //     resolve();
    //   }, 5000)
    // );

    // console.log(updatedPageData);
    res.json({
      success: true,
      updatedMediaData: updatedMediaData.mediaData,
    });
  } catch (error) {
    console.log(error.message);

    res.status(500).json({ success: false, message: error.message });
  }
}

export default handler;
