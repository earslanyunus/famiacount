import React, { useEffect, useState } from "react";
import {
  findUser,
  getPlatformsInfo,
  getSubscriptionFromUser,
  getSubscriptionWithId,
} from "../firebase";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

export default function MySubs() {
  const user = useSelector((state) => state.user.user);
  const [subscriptions, setSubs] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [platforms, setPlatforms] = useState([]);

  useEffect(() => {
    if (user?.uid) {
      getPlatformsInfo().then((data) => {
        setPlatforms(data);
      });
      getSubscriptionFromUser(user.uid).then((data) => {
        const subs = [];
        Promise.all(data.map((doc) => getSubscriptionWithId(doc.id))).then(
          (allData) => {
            allData.forEach((data) => {
              subs.push(data);
            });
            setSubs(subs);
          }
        );
      });
    }
  }, [user]);

  useEffect(() => {
    // subscriptions ve platforms state'lerinde değişiklik olduğunda total price'i hesapla
    let total = 0;
    subscriptions.forEach((item) => {
      platforms.forEach((platform) => {
        if (item[0].platform === platform.name) {
          platform.plans.forEach((plan) => {
            if (item[0].plan === plan.plan) {
              total += plan.price / item[0].activeUser;
            }
          });
        }
      });
    });
    setTotalPrice(total);
  }, [subscriptions, platforms]);

  const upperFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <div className="container">
      <div className="stats shadow w-full mt-4">
        <div className="stat">
          <div className="stat-title text-text-sm font-medium text-gray-600">
            Number of active subscriptions
          </div>
          <div className="stat-value text-display-md font-semibold text-gray-900">
            {subscriptions.length}
          </div>
        </div>

        <div className="stat">
          <div className="stat-title text-text-sm font-medium text-gray-600">
            Monthly payment amount
          </div>
          <div className="stat-value text-display-md font-semibold text-red-500 ">
            {totalPrice}$
          </div>
        </div>

        <div className="stat">
          <div className="stat-title text-text-sm font-medium text-gray-600">
            Number of payment issues
          </div>
          <div className="stat-value text-display-md font-semibold text-gray-900">
            {subscriptions.length}
          </div>
        </div>
      </div>
      <div className="overflow-x-auto w-full">
        <table className="table w-full mt-8">
          {/* head */}
          <thead>
            <tr>
              <th>Subscription Company</th>
              <th>Payment Status</th>
              <th>Payment Amount</th>
              <th></th>
            </tr>
          </thead>
          <tbody className="border ">
            {/* row 1 */}
            {subscriptions.map((item) => {
              
              return (
                <tr key={item[0].id}>
                  <td>
                    <div className="flex items-center space-x-3">
                      <div>
                        <div className="font-bold">
                          {upperFirstLetter(item[0].platform)}
                        </div>
                        <div className="text-sm opacity-50">
                          {upperFirstLetter(item[0].plan)}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                   
                  </td>
                  <td>
                    {/* price */}
                    {platforms.map((platform) => {
                      if (item[0].platform === platform.name) {
                        return platform.plans.map((plan) => {
                          if (item[0].plan === plan.plan) {
                            return (
                              <p key={item[0].id}>
                                {plan.price / item[0].activeUser}$
                              </p>
                            );
                          }
                          return null;
                        });
                      }
                      return null;
                    })}
                  </td>
                 
                  <th>
                    <NavLink to={`/my/sub/detail/${item[0].id}`} className="btn btn-ghost btn-xs">details</NavLink>
                  </th>
                </tr>
              );
            })}
          </tbody>
          {/* foot */}
        </table>
      </div>
    </div>
  );
}
