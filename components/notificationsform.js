import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Swal from "sweetalert2";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

import { useStateValue } from "./context/state";
import NotificationCard from "./notificationcard"; 

import styles from "../styles/form.module.css";

const endpoint =
  process.env.NODE_ENV === "production" ? `` : "http://localhost:3000";

const Notifications = ({ pagedataid }) => {
  const [{ notifications }, dispatch] = useStateValue();
  const [loading, setloading] = useState(false);
  const [isNewNotiInList, setisNewNotiInList] = useState(false);

  const addNewNoti = () => {
    // console.log(links.length);
    // console.log(links[links.length - 1]);
    setisNewNotiInList(true);

    let newNoti = notifications[notifications.length - 1];

    if (newNoti && !newNoti.hasOwnProperty("id")) {
      // console.log("new link on arr");
      return;
    }
    dispatch({
      type: "updateNotification",
      notificationsdata: [
        ...notifications,
        {
          notiTitle: "",
          notiMessage: "",
          notiType:"",
          pagedataid: pagedataid,
          active: true,
        },
      ],
    });
  };

  const saveNotiData = async (notidata) => {
    // console.log("save linkdata");
    // console.log(linkdata);
    setloading(true);

    let operation = "insertNotification";
    if (notidata.hasOwnProperty("id")) {
      operation = `updateNotification`;
    }

    if (operation === "insertNotification") {
      setisNewNotiInList(false);
    }

    // console.log(operation);
    try {
      let res = await fetch(`${endpoint}/api/notification/${operation}`, {
        method: "POST",
        body: JSON.stringify(notidata),
        headers: { "Content-Type": "application/json" },
      }).then((res) => res.json());

      // console.log(res);

      if (!res.success) {
        toast.error(`Error ${res.message}`, { autoClose: 5000 });
        setloading(false);
        return;
      }
      dispatch({ type: "updateNotification", notificationsdata: res.updatedNotificationsdata });
      toast.success(
        `${
          operation === "insertNotification"
            ? "Added new notification "
            : "Updated notification " + " successfully"
        }`,
        { autoClose: 1000 }
      );
    } catch (error) {
      console.log(error);
      toast.error(`Error : ${error.message}`, { autoClose: 5000 });
    }
    setloading(false);
  };

  const deleteNoti = async (id) => {
    let confirm = await Swal.fire({
      title: "Delete notification",
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
   
    setloading(true);

    try {
      let res = await fetch(`${endpoint}/api/notification/deleteNotification`, {
        method: "POST",
        body: JSON.stringify({ id: id }),
        headers: { "Content-Type": "application/json" },
      }).then((res) => res.json());

      if (!res.success) {
        toast.error(`Error ${res.message}`, { autoClose: 5000 });
        setloading(false);
        return;
      }
      dispatch({ type: "deleteNotification", id: id });
      toast.success(`Successfully deleted notification`, { autoClose: 1000 });
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

    const items = Array.from(notifications);
    const [reorderedItem] = items.splice(data.source.index, 1);
    items.splice(data.destination.index, 0, reorderedItem);

    let updateditems = items.map((item, index) => {
      item.orderIndex = index;
      return item;
    });

    dispatch({ type: "updateNotification", notificationsdata: updateditems });

    let orderData = updateditems.map((item) => {
      return {
        id: item.id,
        name: item.displayText,
        orderIndex: item.orderIndex,
      };
    });

    // console.log(orderData);

    try {
      let res = await fetch(`${endpoint}/api/notification/reorderNotifications`, {
        method: "POST",
        body: JSON.stringify({ orderData }),
        headers: { "Content-Type": "application/json" },
      }).then((res) => res.json());

      if (!res.success) {
        toast.error(`Error ${res.message}`, { autoClose: 5000 });
        return;
      }

      toast.success(`Successfully reordered notificaitons`, { autoClose: 1000 });
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
          <h3>Notifications</h3>
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
              addNewNoti();
            }}
          >
            Add new notification
          </button>
          <DragDropContext onDragEnd={dragEndHnadler}>
            <Droppable droppableId="notifications" isDropDisabled={isNewNotiInList}>
              {(provided) => (
                <div
                  className="notifications"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {notifications.length > 0 &&
                    notifications.map((item, index) => {
                      return (
                        <NotificationCard
                          key={index}
                          deleteNoti={deleteNoti}
                          updateNoti={saveNotiData}
                          loading={loading}
                          item={item}
                          index={index}
                          isDragDisabled={isNewNotiInList}
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
export default Notifications;
