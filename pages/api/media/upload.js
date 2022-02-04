import cloudinary from 'cloudinary';
import { IncomingForm } from 'formidable';
import { getMediaData, insertMediaImages, updateMediaImage } from "../../../lib/dbfuncprisma";

  cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET 
  });
  
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async (req, res) => {
 try {  
    const data = await new Promise((resolve, reject) => {
        const form = new IncomingForm();

        form.parse(req, (err, fields, files) => {
        if (err) return reject(err);
        resolve({ fields, files });
        });
    });

    const file = data?.files?.inputFile.filepath;
    const fields = data?.fields;

    const response = await cloudinary.v2.uploader.upload(file, {
        resource_type: 'auto',
    });
   

    if(fields.id !== 'undefined' && fields.id){
        //need to update
        const payload = {
                id: parseInt(fields.id, 10),
                pagedataid: parseInt(fields.pagedataid, 10),
                imageUrl: response.secure_url,
                cloudinary_public_id : response.public_id,
            }
        await updateMediaImage(payload);
    }else{
        // need to insert
        const payload = {
            pagedataid: parseInt(fields.pagedataid, 10),
            imageUrl: response.secure_url,
            cloudinary_public_id : response.public_id,
        }
        await insertMediaImages(payload);
    }

    let updatedMediaData = await getMediaData(parseInt(fields.pagedataid, 10));
    return res.json({
        success: true,
        updatedMediaData: updatedMediaData.mediaData,
      });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};