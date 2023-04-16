import React, { useEffect, useState } from "react";
import {
  acceptSub,
  findUser,
  getNotifications,
  signInWithGoogle,
  deleteNotification
} from "../firebase";
import { useSelector } from "react-redux";
export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const user = useSelector((state) => state.user.user);
  useEffect(() => {
    if (user?.uid) {
      getNotifications(user?.uid).then((data) => {
        console.log(data);
        setNotifications(data);
      });
    }
  }, [user?.uid]);
  const acceptHandler = (e) => {
    const data = {
      ownerId: e.data.ownerId,
      subscriptionId: e.data.subscriptionId,
      senderId: e.data.sendUserInfo.uid,
      id: e.id,
    };
    
    acceptSub(data);
    const filteredList = notifications.filter((item) => item.id !== e.id);
    setNotifications(filteredList);
  };
  const cancelHandler = (e) => {
    deleteNotification(e.id)
    const filteredList = notifications.filter((item) => item.id !== e.id);
    setNotifications(filteredList);
  }
  return (
    <div className="container">
      <div className="overflow-x-auto w-full">
        <table className="table w-full">
          {/* head */}
          <thead>
            <tr>
              <th>Notification</th>

              <th></th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {notifications.map((notification) => {
              return (
                <tr key={notification.id}>
                  <td>
                    <div className="flex items-center space-x-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img
                            src={notification.data.sendUserInfo.photoURL}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">
                          {notification.data.text}
                        </div>
                        <div className="text-sm opacity-50">
                          {notification.data.sendUserInfo.displayName}
                        </div>
                      </div>
                    </div>
                  </td>
                  { 
                  notification.data.isRequest === true && (
                  <th>
                    <button onClick={()=>acceptHandler(notification)} className="btn btn-primary mr-4 btn-xs">Accept</button>
                    <button onClick={()=>cancelHandler(notification)} className="btn btn-outline btn-xs">Cancel</button>
                  </th>)
                  }
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
