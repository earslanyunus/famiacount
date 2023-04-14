import React, { useEffect, useState } from "react";
import {  acceptSub, findUser, getNotifications, signInWithGoogle } from "../firebase";
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
    const data ={
      ownerId:e.data.ownerId,
      subscriptionId:e.data.subscriptionId,
      senderId:e.data.sendUserInfo.uid,
      id:e.id
    }
    console.log(data);
    acceptSub(data)
    
    
  }
  return (
    <div>
      {notifications?.map((item) => {
        return (
          <div key={item.data.id}>
            <p>{item.data?.text}</p>
            <p>{item.data?.id}</p>
            if (item.data?.isRequest) {
              <button onClick={() => acceptHandler(item)}>Kabul Et</button>
            }
          </div>
        );
      })}
    </div>
  );
}
