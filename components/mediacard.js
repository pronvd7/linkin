import { useCallback, useEffect, useRef, useState } from "react";
import { useStateValue } from "./context/state";
import { useForm } from "react-hook-form";
import { Draggable } from "react-beautiful-dnd";
import debounce from "lodash.debounce";
import DragDrop from "./dragdropcard";
import styles from "../styles/utils.module.css";


export default function MediaCard({
  item,
  updateImage,
  uploadImage,
  deleteImage,
  loading,
  index,
  isDragDisabled,
}) {
  const refSubmitButtom = useRef(null);
  const [cardInfo, setCardInfo] = useState(item);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({ defaultValues: item });
 

  useEffect(() => {
    // reset when the linkdata is change to the form update with new values
    if (cardInfo.id === undefined && item.id) {
      // console.log("reset with item");
      reset(item);
      setCardInfo(item);
    }
    // reset when the link is deleted to the card will show differert value
    if (cardInfo.id !== item.id) {
      // console.log("reset after delete");
      reset(item);
      setCardInfo(item);
    }

    if (cardInfo.id == item.id) {
      // console.log("reset after delete");
      reset(item);
      setCardInfo(item);
    }
  }, [item]);

  watch((data, { type }) => {
    // console.log(type);
    //console.log(data);
    // event fired when reset the form with updated data
    if (type == undefined) {
      return;
    }
    debouncedSaveLinkData();
  });

  // debounced function to save the data after 1.5 seconds
  const debouncedSaveLinkData = useCallback(
    debounce(() => {
      refSubmitButtom?.current?.click();
    }, 1500),
    []
  );

  const submitAction = (data) => {
    // when the form is submited by enter , the debounced action is canceled to avoid uplicate debounce
    debouncedSaveLinkData.cancel();
    // console.log(data);
    updateImage(data);
  };

  const uploadfile = async (filedata) =>{
         uploadImage(filedata, item.id);
  }

  return (
    <>
      <Draggable
        isDragDisabled={isDragDisabled}
        key={item.id}
        draggableId={String(item.id)}
        index={index}
      >
        {(provided) => (
          <div
            className="card mt-3"
            ref={provided.innerRef}
            {...provided.draggableProps}
          >
            <div className="d-flex flex-row">
              <div className="card-body py-2 px-4">        
                <form onSubmit={handleSubmit(submitAction)}>
                  <div className="d-flex flex-row justify-content-between">
                    <div
                      {...provided.dragHandleProps}
                      className={`${styles.boxshadowmenu} ms-1 `}
                    ></div>{" "}
                    <div className="form-check form-switch d-grid gap-2 d-md-flex justify-content-md-end">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        {...register(`active`)}
                      />
                    </div>
                  </div>
                  <div className="mb-1 small">
                     <DragDrop handleChange={uploadfile}/>
                  </div>
                  <div className="mb-1 small">
                    <input
                      type="text"
                      className={
                        errors.imageUrl
                          ? "form-control form-control-sm mb-2  is-invalid"
                          : "form-control form-control-sm mb-2 "
                      }
                      placeholder="Enter Image Url"
                      {...register(`imageUrl`, {
                        pattern: {
                          message: "Should be a valid URL",
                          value:
                            /((https?:\/\/(?:www\.|(?!www))[a-z0-9][a-z0-9-]+[a-z0-9]\.[^\s]{2,}|www\.[a-z0-9][a-z0-9-]+[a-z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-z0-9]+\.[^\s]{2,}|www\.[a-z0-9]+\.[^\s]{2,})|(((^mailto:)(([a-z])([a-z0-9_\.-]+)?)[@](([a-z])([a-z0-9_\.-]+)?)(\.([a-z]){2,}))))/i,
                        },
                      })}
                    />
                    {errors.imageUrl && (
                      <div className="invalid-feedback">
                        {errors.imageUrl.message}
                      </div>
                    )}
                  </div>
       
                  <input
                    type="text"
                    className={
                      errors.imageDestinationUrl
                        ? "form-control form-control-sm mb-2  is-invalid"
                        : "form-control form-control-sm mb-2 "
                    }
                    placeholder="Enter Media Destination Link"
                    {...register(`imageDestinationUrl`)}
                  />
                  
                  <input
                    type="text"
                    className={
                      errors.imageCaption
                        ? "form-control form-control-sm mb-2  is-invalid"
                        : "form-control form-control-sm mb-2 "
                    }
                    placeholder="Enter Media Caption"
                    {...register(`imageCaption`)}
                  />
    
                  <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                    <button
                      className="btn btn-outline-danger btn-sm"
                      type="button"
                      disabled={loading}
                      hidden={!item.id}
                      onClick={() => {
                        deleteImage(item.id, item.cloudinary_public_id);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                  <button hidden={true} ref={refSubmitButtom} type={"submit"} />
                </form>
              </div>
            </div>
          </div>
        )}
      </Draggable>
    </>
  );
}
