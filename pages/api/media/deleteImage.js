import cloudinary from 'cloudinary';
import { jwtAuth, use } from "../../../middleware/middleware";
import { deleteMediaImage } from "../../../lib/dbfuncprisma";

cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.API_KEY, 
  api_secret: process.env.API_SECRET 
});

async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(400).send("method not allowed");
    return;
  }

  try {
    // Run the middleware
    await use(req, res, jwtAuth);
    // console.log(req.body);
    const response = await cloudinary.v2.uploader.destroy(req.body.cloudinary_public_id, function(error, result) {console.log(result, error)});
    console.log(response);
    await deleteMediaImage(req.body);

    res.json({ success: true });
  } catch (error) {
    console.log(error.message);

    res.status(500).json({ success: false, message: error.message });
  }
}

export default handler;
