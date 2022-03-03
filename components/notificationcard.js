import { useCallback, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Draggable } from "react-beautiful-dnd";
import debounce from "lodash.debounce";
import 'react-dropdown/style.css';
import styles from "../styles/utils.module.css";

export default function NotificationCard({
  item,
  updateNoti,
  deleteNoti,
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
  }, [item]);

  watch((data, { type }) => {
    // console.log(type);
    //console.log(data);
    // event fired when reset the form with updated data
    if (type == undefined) {
      return;
    }
    debouncedSaveNotiData();
  });

  // debounced function to save the data after 1.5 seconds
  const debouncedSaveNotiData = useCallback(
    debounce(() => {
      refSubmitButtom?.current?.click();
    }, 1500),
    []
  );

  const submitAction = (data) => {
    // when the form is submited by enter , the debounced action is canceled to avoid uplicate debounce
    debouncedSaveNotiData.cancel();
    // console.log(data);
    updateNoti(data);
  };
 
  const options = [
    'one', 'two', 'three'
  ];
  const defaultOption = options[0];
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
                        errors.notiTitle
                          ? "form-control form-control-sm mb-2  is-invalid"
                          : "form-control form-control-sm mb-2 "
                      }
                      placeholder="Enter notification title"
                      {...register(`notiTitle`)}
                    />
                    {errors.notiTitle && (
                      <div className="invalid-feedback">
                        {errors.notiTitle.message}
                      </div>
                    )}
                  </div>
             
                <div className="mb-3 small">
                <textarea
                    className="form-control"
                    rows="3"
                    {...register("notiMessage")}
                    placeholder="Notification message"
                ></textarea>
                </div>{" "}
                <div className="mb-3 small">
                  <input
                    min="1"
                    type="number"
                    className="form-control"
                    title="timeInterval"
                    placeholder="time in seconds"
                    {...register("timeInterval", {
                      pattern: {
                          value: /^[0-9]+$/,
                          message: 'Please enter seconds in number',
                      },
                      required: "You must specify seconds",
                  })
                }
                  />
                </div> 
                <div className="mb-3 small">
                    <select  className={`${styles.notiType}`} {...register("notiType")}>
                      <option value="">Select Notification type...</option>
                      <option value="success">success</option>
                      <option value="info">info</option>
                      <option value="warning">warning</option>
                      <option value="error">error</option>
                    </select>
                </div> 
                  <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                    <button
                      className="btn btn-outline-danger btn-sm"
                      type="button"
                      disabled={loading}
                      hidden={!item.id}
                      onClick={() => {
                        deleteNoti(item.id);
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
