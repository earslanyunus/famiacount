import React, { useEffect, useState } from "react";
import {
  confirmPayment,
  deleteUserFromSubscription,
  findUser,
  getPlatformsInfo,
  getSubscriptionUsers,
  getSubscriptionWithId,
} from "../firebase";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

export default function SubDetail() {
  const activeUser = useSelector((state) => state.user.user);
  const { id } = useParams();
  const [sub, setSub] = useState([]);
  const [users, setUsers] = useState([]);
  const [platform, setPlatform] = useState([]);
  useEffect(() => {
    getSubscriptionWithId(id).then((data) => {
      setSub(data);
    });

    getSubscriptionUsers(id).then((data) => {
      const users = [];

      data.forEach((doc) => {
        console.log("doc", doc);
        findUser(doc.user).then((data) => {
          users.push(data);
        });
      });
      setUsers(users);
    });
  }, []);
  useEffect(() => {
    if (sub.length > 0) {
      console.log("calisti");
      getPlatformsInfo().then((data) => {
        data.forEach((item) => {
          if (item.name === sub[0]?.platform) {
            const veri = {
              name: item.name,
              ...item.plans.reduce((acc, cur) => ({ ...acc, ...cur }), {}),
            };
            setPlatform(veri);
          }
        });
      });
    }
  }, [sub]);

  return (
    <div className="container flex gap-24">
      {/* Put this part before </body> tag */}

      <div className="card w-96 bg-base-100 shadow-xl">
        <figure className="px-10 pt-10">
          {/* <img src="/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" className="rounded-xl" /> */}
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title font-black text-display-xs">
            {sub[0]?.platform}
          </h2>
          <p className="font-bold mt-4">Membership Package</p>
          <span className="badge py-2.5">
            {platform?.userCount}-person package
          </span>
          <span className="badge py-2.5">
            {platform?.activeScreen} screens at the same time
          </span>
          <span className="badge py-2.5">
            {platform?.price}$ total per month
          </span>

          <p className="font-bold">Account Info</p>
          <div>
            <div className="flex flex-col mt-4">
              <p className="text-gray-700 font-bold self-start">Email</p>
              <p>{sub[0]?.accountEmail}</p>
            </div>
            <div className="flex flex-col mt-4 wf">
              <p className="text-gray-700 font-bold self-start">Password</p>
              <p className="text-left">{sub[0]?.accountPassword}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body items-center text-center">
          <h2 className="card-title">Users</h2>
          {users.map((item) => {
            console.log("item", item);
            const [user] = sub[2].filter((user) => user.user === item.uid);

            return (
              <div key={item.uid}>
                <input
                  type="checkbox"
                  id="delete-modal"
                  className="modal-toggle"
                />
                <div className="modal">
                  <div className="modal-box">
                    <p>Are you sure you want to delete the user?</p>
                    <div className="modal-action">
                      <label htmlFor="delete-modal" className="btn btn-outline">
                        Cancel
                      </label>
                      <label
                        onClick={() =>{
                          deleteUserFromSubscription({
                            userId: item.uid,
                            subscriptionId: id,
                          })
                          const filteredUsers = users.filter((user) => user.uid !== item.uid)
                          setUsers(filteredUsers)

                        }
                        }
                        htmlFor="delete-modal"
                        className="btn btn-error"
                      >
                        Accept
                      </label>
                    </div>
                  </div>
                </div>
                <input
                  type="checkbox"
                  id="edit-modal"
                  className="modal-toggle"
                />
                <div className="modal">
                  <div className="modal-box">
                    <p>Do you confirm that the payment has been made?</p>
                    <div className="modal-action">
                      <label htmlFor="edit-modal" className="btn btn-outline">
                        Cancel
                      </label>
                      <label
                        onClick={() =>
                          confirmPayment({
                            userId: item.uid,
                            subscriptionId: id,
                          })
                        }
                        htmlFor="edit-modal"
                        className="btn"
                      >
                        Accept
                      </label>
                    </div>
                  </div>
                </div>
                <div key={item.uid} className={`flex gap-3  mt-4  `}>
                  <img
                    className="rounded-full h-12"
                    src={item.photoURL}
                    alt=""
                  />
                  <div>
                    <p className="text-gray-700 font-bold text-left">
                      {item?.displayName}
                    </p>
                    <p className="text-red-500">
                      {!user.isPayed && "Payment Issue"}
                    </p>
                  </div>
                  {activeUser.uid === sub[0]?.owner && (
                    <div className="dropdown dropdown-right">
                      <label tabIndex={0} className="btn m-1 p-0 px-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          viewBox="0 0 16 16"
                        >
                          <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                        </svg>
                      </label>
                      <ul
                        tabIndex={0}
                        className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
                      >
                        <li>
                          <label htmlFor="edit-modal" className="">
                            Confirm Payment
                          </label>
                        </li>
                        <li>
                          <label htmlFor="delete-modal" className="text-red-500">
                            Delete User
                          </label>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
