import { getMediaData, insertMediaImages, updateMediaImage } from "../../../lib/dbfuncprisma";
const cloudinary = require('cloudinary');
  cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET 
  });
  

export default async (req, res) => {
  if (req.method !== "POST") {
    res.status(400).send("method not allowed");
    return;
  }
 try {  
  
   if(req.body.inputFile === 'undefined' || req.body.inputFile === null || req.body.inputFile === ""){
    return res.status(500).json({ success: false, message: "File is required!" });
   }

    const file = req.body.inputFile;
    const response = await cloudinary.v2.uploader.upload(file, {
        resource_type: 'auto',
    });
   

    if(req.body.id !== 'undefined' &&  req.body.id){
        //need to update
        const payload = {
                id: parseInt( req.body.id, 10),
                pagedataid: parseInt(req.body.pagedataid, 10),
                imageUrl: response.secure_url,
                cloudinary_public_id : response.public_id,
            }
        await updateMediaImage(payload);
    }else{
        // need to insert
        const payload = {
            pagedataid: parseInt(req.body.pagedataid, 10),
            imageUrl: response.secure_url,
            cloudinary_public_id : response.public_id,
        }
        await insertMediaImages(payload);
    }

    let updatedMediaData = await getMediaData(parseInt(req.body.pagedataid, 10));
    return res.json({
        success: true,
        updatedMediaData: updatedMediaData.mediaData,
      });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};