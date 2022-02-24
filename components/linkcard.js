import { useCallback, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Draggable } from "react-beautiful-dnd";
import debounce from "lodash.debounce";

import styles from "../styles/utils.module.css";

export default function LinkCard({
  item,
  updateLink,
  deleteLink,
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
    // logic to test comment settings data and reset
    // reset(item);
    if (
      cardInfo.borderRadius !== item.borderRadius ||
      cardInfo.textColor !== item.textColor ||
      cardInfo.bgColor !== item.bgColor
    ) {
      // console.log("reset after common settings change");
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
    updateLink(data);
  };

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
                    <input
                      type="text"
                      className={
                        errors.displayText
                          ? "form-control form-control-sm mb-2 is-invalid"
                          : "form-control form-control-sm mb-2"
                      }
                      placeholder="Enter Link Display Text"
                      {...register(`displayText`, {
                        required: true,
                      })}
                    />
                    {errors.displayText && (
                      <div className="invalid-feedback">
                        Link Display Text is required
                      </div>
                    )}
                  </div>
                  <div className="mb-1 small">
                    <input
                      type="text"
                      className={
                        errors.linkUrl
                          ? "form-control form-control-sm mb-2  is-invalid"
                          : "form-control form-control-sm mb-2 "
                      }
                      placeholder="Enter Link Url"
                      {...register(`linkUrl`, {
                        pattern: {
                          message: "Should be a valid URL",
                          // see https://regexr.com/67tue
                          value:
                            /((https?:\/\/(?:www\.|(?!www))[a-z0-9][a-z0-9-]+[a-z0-9]\.[^\s]{2,}|www\.[a-z0-9][a-z0-9-]+[a-z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-z0-9]+\.[^\s]{2,}|www\.[a-z0-9]+\.[^\s]{2,})|(((^mailto:)(([a-z])([a-z0-9_\.-]+)?)[@](([a-z])([a-z0-9_\.-]+)?)(\.([a-z]){2,}))))/i,
                        },
                      })}
                    />
                    {errors.linkUrl && (
                      <div className="invalid-feedback">
                        {errors.linkUrl.message}
                      </div>
                    )}
                  </div>
                  <div className="mb-1 small">
                    <div className="form-text">
                      Use{" "}
                      <a
                        className="text-decoration-none"
                        href="https://fontawesome.com/v5.15/icons?d=gallery&p=2"
                        target="_blank"
                      >
                        fontawesome
                      </a>{" "}
                      for icon classes
                    </div>
                  </div>
                  <input
                    type="text"
                    className={
                      errors.iconClass
                        ? "form-control form-control-sm mb-2  is-invalid"
                        : "form-control form-control-sm mb-2 "
                    }
                    placeholder="Enter Icon Class"
                    {...register(`iconClass`)}
                  />
                  <div className="mb-3 ">
                    <div className="input-group mb-3">
                      <input
                        type="number"
                        className={
                          errors.borderRadius
                            ? "form-control is-invalid"
                            : "form-control"
                        }
                        placeholder="Enter Border Radius"
                        {...register("borderRadius", {
                          min: {
                            message: "Font Size must be above 0px",
                            value: 0,
                          },
                        })}
                      />
                      <span className="input-group-text">px</span>
                      {errors.borderRadius && (
                        <div className="invalid-feedback">
                          {errors.borderRadius.message}
                        </div>
                      )}
                    </div>
                  </div>
                 <div className={`${styles.prioritize_animate} row`}> 
                    <h5>Prioritize Link:</h5>
                    <p>Draw attention to your most important link.</p>
                    <div className="">
                    <input  {...register("linkEffect")} type="radio" name="linkEffect" id={`${item.id}_None`} value="None" checked={item.linkEffect === 'None'} /><label for={`${item.id}_None`}>None</label>
                    <input  {...register("linkEffect")} type="radio" name="linkEffect" id={`${item.id}_Grow`} value="hvr-grow" checked={item.linkEffect === 'hvr-grow'} /><label for={`${item.id}_Grow`}>Grow</label>
                    <input  {...register("linkEffect")} type="radio" name="linkEffect" id={`${item.id}_Shrink`} value="hvr-shrink" checked={item.linkEffect === 'hvr-shrink'} /><label for={`${item.id}_Shrink`}>Shrink</label>
                    <input {...register("linkEffect")} type="radio" name="linkEffect" id={`${item.id}_Wobble`} value="hvr-wobble-vertical" checked={item.linkEffect === 'hvr-wobble-vertical'} /><label for={`${item.id}_Wobble`}>Wobble</label>
                    <input {...register("linkEffect")} type="radio" name="linkEffect" id={`${item.id}_Buzz`} value="hvr-buzz" checked={item.linkEffect === 'hvr-buzz'} /><label for={`${item.id}_Buzz`}>Buzz</label>
                    </div>
                  </div> 
                  <div className="row">
                    <div className="col">
                      <div className="mb-1 small ">
                        <label className="form-label small ">
                          Link Display Text Font color
                        </label>
                        <input
                          type="color"
                          className="form-control form-control-sm mb-2 form-control-color"
                          title="Choose Link text color"
                          placeholder="Choose Link text color"
                          {...register("textColor")}
                        />
                      </div>
                    </div>
                    <div className="col">
                      <div className="mb-1 small ">
                        <label className="form-label small">
                          Link background color
                        </label>
                        <input
                          type="color"
                          className="form-control form-control-sm mb-2 form-control-color"
                          title="Choose Link background color"
                          placeholder="Choose Link background color"
                          {...register("bgColor")}
                        />
                      </div>
                    </div>
                  </div>
                  {/* <div className="mb-1 small ">
                  <label className="form-label small">Link accent color </label>
                  <input
                    type="color"
                    className="form-control form-control-sm mb-2 form-control-color"
                    title="Choose Link accent color"
                    placeholder="Choose Link accent color"
                    {...register("accentColor")}
                  />
                </div> */}
                  <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                    <button
                      className="btn btn-outline-danger btn-sm"
                      type="button"
                      disabled={loading}
                      hidden={!item.id}
                      onClick={() => {
                        deleteLink(item.id);
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
