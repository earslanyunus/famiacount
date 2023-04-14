import { useEffect, useState } from "react";
import { createSubscriptionOwner, getPlatformsInfo, getSubscriptionsData, sendJoinRequest } from "../firebase";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";

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
    const veri={
        platform:data.Platform,
        plan:data.Plan,
        activeUser:data.activeUser,
        paymentMonth:data.paymentMonth,
        accountEmail:data.accountEmail,
        accountPassword:data.accountPassword,
        owner:user.uid,
        createdTime:new Date().toISOString()
    }
    createSubscriptionOwner(veri)

  };
  // console.log(errors);

  useEffect(() => {
    getPlatformsInfo().then((data) => {
      setPlatforms(data);
    });
    getSubscriptionsData().then((data) => {
      setSubscriptionData(data);
      
    });
  }, []);

  const platformHandler = (e) => {
    setSelectedPlatform(e.target.value);
  };
  const joinHandler = (e) => {
    console.log(e);
    const data ={
      subscriptionId:e.id,
      ownerId:e.owner,
      sendUserInfo:user,
      text:"I want to join your subscription",
      isRead:false,
      isVerified:false,
      isRequest:true,
    }
    sendJoinRequest(data)

  }
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <select
          defaultValue=""
          {...register("Platform", { required: true })}
          onChange={platformHandler}
        >
          //default empty value
          <option disabled value="">
            Select Platform
          </option>
          {platforms.map((platform) => {
            return <option key={platform.name} value={platform.name}>{platform.name}</option>;
          })}
          {/*<option value="netflix">netflix</option>*/}
          {/*<option value="disney plus">disney plus</option>*/}
        </select>
        <select defaultValue="" {...register("Plan", { required: true })}>
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
          })}
        </select>
        <input
          type="number"
          placeholder="Active User"
          {...register("activeUser", { required: true })}
        />
        <input
          type="number"
          placeholder="Payment Month"
          {...register("paymentMonth", {})}
        />
        <input
          type="email"
          placeholder="Account Email"
          {...register("accountEmail", { required: true })}
        />
        <input
          type="password"
          placeholder="Account Password"
          {...register("accountPassword", { required: true })}
        />

        <input type="submit" />
      </form>


      <div className="flex flex-col">
        {subscriptionData.map((data) => {
          return(
          <div key={data.id} className="mb-4">
          <p>{data.accountEmail}</p>
          <p>{data.id}</p>
          <button onClick={()=>{joinHandler(data)}} className="p-2 bg-gray-600 text-white">join Sub</button>
          </div>
          )
          
        })}
        </div>
    </>
  );
}
