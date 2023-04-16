import { useEffect, useState } from "react";
import {
  createSubscriptionOwner,
  getPlatformsInfo,
  getSubscriptionsData,
  sendJoinRequest,
} from "../firebase";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function FindPartner() {
  const user = useSelector((state) => state.user.user);
  const [platforms, setPlatforms] = useState([]);
  const [selectedPlatform, setSelectedPlatform] = useState("Disney Plus");
  const [screenCount, setScreenCount] = useState([]);
  const screencount = [];
  const [subscriptionData, setSubscriptionData] = useState([]);


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    const veri = {
      platform: data.Platform,
      plan: data.Plan,
      activeUser: data.activeUser,
      paymentMonth: data.paymentMonth,
      accountEmail: data.accountEmail,
      accountPassword: data.accountPassword,
      owner: user.uid,
      createdTime: new Date().toISOString(),
    };
    createSubscriptionOwner(veri);
  };
  // console.log(errors);

  useEffect(() => {

    getPlatformsInfo().then((data) => {
      setPlatforms(data);
    });
    getSubscriptionsData().then((data) => {
      //remove accountEmail and accountPassword
      data.forEach((item) => {
        delete item.accountEmail;
        delete item.accountPassword;
      });

      setSubscriptionData(data);
    });
  }, []);

  const platformHandler = (e) => {
    setSelectedPlatform(e.target.value);
  };
  const joinHandler = (e) => {

    if(user){
      const data = {
        subscriptionId: e.id,
        ownerId: e.owner,
        sendUserInfo: user,
        text: "I want to join your subscription",
        isRead: false,
        isVerified: false,
        isRequest: true,
      };
      sendJoinRequest(data);
      toast.success('Request sent');
    }
    else{
      toast.error('You need to login to join a subscription');
    }
  
  };
  return (
    <div className="min-w-[100vw]">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <ToastContainer />
      <Navbar />
      <div className="container py-6">
        <label htmlFor="my-modal-6" className="btn">
          Add
        </label>

        <input type="checkbox" id="my-modal-6" className="modal-toggle" />
        <div className="modal modal-bottom sm:modal-middle">
          <div className="modal-box relative">
            <label
              htmlFor="my-modal-6"
              className="btn btn-sm btn-circle absolute right-2 top-2"
            >
              ✕
            </label>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              <select
                className="select select-bordered w-full max-w-xs"
                defaultValue=""
                {...register("Platform", { required: true })}
                onChange={platformHandler}
              >
                <option disabled value="">
                  Select Platform
                </option>
                {platforms.map((platform) => (
                  <option key={platform.name} value={platform.name}>
                    {platform.name}
                  </option>
                ))}
              </select>
              <select
                className="select select-bordered w-full max-w-xs"
                defaultValue=""
                {...register("Plan", { required: true })}
              >
                <option disabled value="">
                  Select Plan
                </option>
                {platforms.map((platform) => {
                  if (platform.name === selectedPlatform) {
                    return platform.plans.map((plan) => (
                      <option key={plan.plan} value={plan.plan}>
                        {plan.plan}
                      </option>
                    ));
                  }
                  return null;
                })}
              </select>
              <input
                className="input input-bordered w-full max-w-xs"
                type="number"
                placeholder="Active User"
                {...register("activeUser", { required: true })}
              />
              <input
                className="input input-bordered w-full max-w-xs"
                type="number"
                placeholder="Payment Month"
                {...register("paymentMonth", {})}
              />
              <input
                className="input input-bordered w-full max-w-xs"
                type="email"
                placeholder="Account Email"
                {...register("accountEmail", { required: true })}
              />
              <input
                className="input input-bordered w-full max-w-xs"
                type="password"
                placeholder="Account Password"
                {...register("accountPassword", { required: true })}
              />
              <button type="submit" className="btn btn-primary w-min">
                Add
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="container flex justify-between mt-6 flex-wrap">
        {subscriptionData?.map((item) => {
          if(item.owner !== user?.uid){
          return (
            <div
              key={item.id}
              className="card w-1/3 min-w-[24rem]  bg-gray-50 shadow-xl"
            >
              <div className="card-body">
                <h2 className="card-title">{item.platform}</h2>
                <span className="badge">
                  {platforms.map((platform, i) => {
                    if (platform.name === item.platform) {
                      return (
                        <p key={item?.id}>
                          {platform?.plans[0]?.userCount}-Person Sub
                        </p>
                      );
                    }
                  })}
                </span>
                <span className="badge">
                  {platforms.map((platform) => {
                    if (platform.name === item.platform) {
                      return (
                        <p key={item?.id}>
                          Space for{" "}
                          {platform?.plans[0]?.userCount - item.activeUser <= 0
                            ? "Yer Yok"
                            : platform?.plans[0]?.userCount - item.activeUser}
                        </p>
                      );
                    }
                  })}
                </span>
                <span className="badge">
                  {platforms.map((platform) => {
                    if (platform.name === item.platform) {
                      return (
                        <p key={item?.id}>{item?.paymentMonth}-Month Payment</p>
                      );
                    }
                  })}
                </span>
                {/* calculate price */}
                <span className="badge py-2.5">
                  {platforms.map((platform) => {
                    if (platform.name === item.platform) {
                      return (
                        <p key={item?.id}>
                          {Number(platform?.plans[0]?.price) /
                            Number(
                              platform?.plans[0]?.userCount - item.activeUser
                            )}
                          $ per person
                        </p>
                      );
                    }
                  })}
                </span>

                <div className="card-actions justify-center mt-4">
                  {/* <button onClick={} className="btn btn-primary ">Join Now</button> */}
                  <button onClick={() => joinHandler(item)} className="btn btn-primary"> Join Now</button>

                  
                                  </div>
              </div>
            </div>
          );
        }
        })}
      </div>

      <Footer />
    </div>
  );
}
