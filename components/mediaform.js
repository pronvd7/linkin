import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Swal from "sweetalert2";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

import { useStateValue } from "./context/state";
import MediaCard from "./mediacard";

import styles from "../styles/form.module.css";

const endpoint =
  process.env.NODE_ENV === "production" ? `` : "http://localhost:3000";

const MediaForm = ({ pagedataid }) => {
  const [{ mediaImages }, dispatch] = useStateValue();
  const [loading, setloading] = useState(false);
  const [isNewImageInList, setisNewImageInList] = useState(false);

  const addNewMedia = () => {
    // console.log(links.length);
    // console.log(links[links.length - 1]);
    setisNewImageInList(true);

    let newImage = mediaImages[mediaImages.length - 1];

    if (newImage && !newImage.hasOwnProperty("id")) {
      // console.log("new link on arr");
      return;
    }
    dispatch({
      type: "updateMedia",
      mediadata: [
        ...mediaImages,
        {
          imageUrl: "",
          pagedataid: pagedataid,
          active: true,
          imageCaption: "",
          imageDestinationUrl: "",
        },
      ],
    });
    };

   const saveImageData = async (mediadata) => {
    // console.log("save linkdata");
    // console.log(linkdata);
    setloading(true);

    let operation = "insertImage";
    if (mediadata.hasOwnProperty("id")) {
      operation = `updateImage`;
    }

    if (operation === "insertImage") {
        setisNewImageInList(false);
    }

    // console.log(operation);
    try {
      let res = await fetch(`${endpoint}/api/media/${operation}`, {
        method: "POST",
        body: JSON.stringify(mediadata),
        headers: { "Content-Type": "application/json" },
      }).then((res) => res.json());

      // console.log(res);

      if (!res.success) {
        toast.error(`Error ${res.message}`, { autoClose: 5000 });
        setloading(false);
        return;
      }

      dispatch({ type: "updateMedia", mediadata: res.updatedMediaData });
      toast.success(
        `${
          operation === "insertImage"
            ? "Added new Post image "
            : "Updated Post image " + " successfully"
        }`,
        { autoClose: 1000 }
      );
    } catch (error) {
      console.log(error);
      toast.error(`Error : ${error.message}`, { autoClose: 5000 });
    }
    setloading(false);
   };
   

   const uploadImage = async (filedata, itemId) =>{
        setloading(true);
        console.log(filedata);
    const formData = new FormData();
    formData.append('inputFile', filedata); 

      if (itemId !== undefined && itemId) {
            // if image need to update 
           formData.append('pagedataid', pagedataid);
           formData.append('id', itemId);
       }else{
          // if image need to insert new one 
         formData.append('pagedataid', pagedataid);
       }
       console.log(formData);
       try {
         const res = await fetch(`${endpoint}/api/media/upload`, {
           method: 'POST',
           body: formData,
         }).then((res) => res.json());
         
         if (!res.success) {
           toast.error(`Error ${res.message}`, { autoClose: 5000 });
           setloading(false);
           return;
         }

         dispatch({ type: "updateMedia", mediadata: res.updatedMediaData });
         toast.success(`Successfully uploaded Image`, { autoClose: 1000 });
           setloading(false);
       } catch (error) {
         toast.error(`Error : ${error.message}`, { autoClose: 5000 });
       } 
    }


    const deleteImage = async (id, cloudinary_public_id) => {
    let confirm = await Swal.fire({
      title: "Delete Post image",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (!confirm.isConfirmed) {
      return;
    }
    // console.log("delete link");
    // console.log(id);
    setloading(true);

    try {
      let res = await fetch(`${endpoint}/api/media/deleteImage`, {
        method: "POST",
        body: JSON.stringify({ id: id, cloudinary_public_id: cloudinary_public_id }),
        headers: { "Content-Type": "application/json" },
      }).then((res) => res.json());


      if (!res.success) {
        toast.error(`Error ${res.message}`, { autoClose: 5000 });
        setloading(false);
        return;
      }
      dispatch({ type: "deleteMedia", id: id });
      toast.success(`Successfully deleted Image`, { autoClose: 1000 });
    } catch (error) {
      console.log(error);
      toast.error(`Error : ${error.message}`, { autoClose: 5000 });
    }
    setloading(false);
   };

   const dragEndHnadler = async (data) => {
    // console.log(data);
    if (!data.destination) {
      return;
    }

    if (data.destination.index === data.source.index) {
      return;
    }

    setloading(true);

    const items = Array.from(mediaImages);
    const [reorderedItem] = items.splice(data.source.index, 1);
    items.splice(data.destination.index, 0, reorderedItem);

    let updateditems = items.map((item, index) => {
      item.orderIndex = index;
      return item;
    });

    dispatch({ type: "updateMedia", mediadata: updateditems });

    let orderData = updateditems.map((item) => {
      return {
        id: item.id,
        name: item.displayText,
        orderIndex: item.orderIndex,
      };
    });

    // console.log(orderData);

    try {
      let res = await fetch(`${endpoint}/api/media/reorderImages`, {
        method: "POST",
        body: JSON.stringify({ orderData }),
        headers: { "Content-Type": "application/json" },
      }).then((res) => res.json());

      if (!res.success) {
        toast.error(`Error ${res.message}`, { autoClose: 5000 });
        return;
      }

      toast.success(`Successfully reordered Images`, { autoClose: 1000 });
      setloading(false);
    } catch (error) {
      console.log(error);
      setloading(false);
      toast.error(`Error : ${error.message}`, { autoClose: 5000 });
    }
   };

  return (
  
    <>
      <div className={styles.Wrapper}>
        <div
          className={`${styles.Inner} col-10 col-sm-10 col-md-10 col-lg-10 col-xl-10 col-xxl-8 `}
        >
          <h3>Media Data</h3>
          {loading && (
            <div className="d-grid gap-2 d-md-flex justify-content-end">
              <span
                className="spinner-border text-info spinner-border me-1"
                role="status"
                aria-hidden="true"
              ></span>
            </div>
          )}
          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={(e) => {
                addNewMedia();
            }}
          >
            Add new media
          </button>
          <DragDropContext onDragEnd={dragEndHnadler}>
            <Droppable droppableId="links" isDropDisabled={isNewImageInList}>
              {(provided) => (
                <div
                  className="links"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {mediaImages.length > 0 &&
                    mediaImages.map((item, index) => {
     
                      return (
                        <MediaCard
                          key={index}
                          deleteImage={deleteImage}
                          updateImage={saveImageData}
                          uploadImage={uploadImage}
                          loading={loading}
                          item={item}
                          index={index}
                          isDragDisabled={isNewImageInList}
                        />
                      );
                    })}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
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
        <div className="mb-5"></div>
      </div>
    </>
  );
};
export default MediaForm;
