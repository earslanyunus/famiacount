import { useEffect, useState } from "react";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import { getPlatformsInfo } from "../firebase";
import { NavLink } from "react-router-dom";

export default function SupportedPlatforms() {
  const [platforms, setPlatforms] = useState([]);
  useEffect(() => {
    getPlatformsInfo().then((data) => {
      setPlatforms(data);
    });
  }, []);
  return (
    <div className="min-h-[100vh] flex flex-col justify-between">
      <div>
      <Navbar />
      <div className="container flex gap-24 mt-6 flex-col md:flex-row items-center">
        {platforms.map((item) => {
          return (
            <div key={item.name} className="card w-96 bg-base-100 shadow-xl">
              {/* <figure className="px-10 pt-10">
    <img src="" alt="Shoes" className="rounded-xl" />
  </figure> */}
              <div className="card-body items-center text-center">
                <h2 className="card-title">{item?.name}</h2>
                <div className="flex gap-4">
                  <p>{item?.plans[0]?.activeScreen} Person Sub</p>
                  <div className="badge badge-outline">
                    {" "}
                    {(() => {
                      const num =
                        item?.plans[0]?.price / item?.plans[0]?.userCount;
                      const value = num.toFixed(1);
                      return `${value}`;
                    })()}
                    $ per person
                  </div>
                </div>

                <div className="card-actions mt-4">
                  <NavLink to={"/findpartners"} className="btn btn-primary">
                    Find Subscriptions
                  </NavLink>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
