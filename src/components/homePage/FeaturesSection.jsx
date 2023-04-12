import React from "react";
import Features from "./Features";
import RightArrow from "../../assets/iconRightFeature.svg";

const PartnerIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1.25rem"
      height="1.125rem"
      viewBox="0 0 22 20"
      fill="none"
    >
      <path
        d="M15 16L17 18L21 14M11 13H7C5.13623 13 4.20435 13 3.46927 13.3045C2.48915 13.7105 1.71046 14.4892 1.30448 15.4693C1 16.2044 1 17.1362 1 19M14.5 1.29076C15.9659 1.88415 17 3.32131 17 5C17 6.67869 15.9659 8.11585 14.5 8.70924M12.5 5C12.5 7.20914 10.7091 9 8.5 9C6.29086 9 4.5 7.20914 4.5 5C4.5 2.79086 6.29086 1 8.5 1C10.7091 1 12.5 2.79086 12.5 5Z"
        stroke="#D39B7D"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
const CreditCardIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="14"
      viewBox="0 0 20 14"
      fill="none"
    >
      <path
        d="M18.3333 5.33335H1.66667M1.66667 3.83335L1.66667 10.1667C1.66667 11.1001 1.66667 11.5668 1.84833 11.9233C2.00812 12.2369 2.26308 12.4919 2.57669 12.6517C2.93321 12.8334 3.39992 12.8334 4.33334 12.8334L15.6667 12.8334C16.6001 12.8334 17.0668 12.8334 17.4233 12.6517C17.7369 12.4919 17.9919 12.2369 18.1517 11.9233C18.3333 11.5668 18.3333 11.1001 18.3333 10.1667V3.83335C18.3333 2.89993 18.3333 2.43322 18.1517 2.0767C17.9919 1.7631 17.7369 1.50813 17.4233 1.34834C17.0668 1.16669 16.6001 1.16669 15.6667 1.16669L4.33334 1.16669C3.39992 1.16669 2.93321 1.16669 2.57669 1.34834C2.26308 1.50813 2.00812 1.7631 1.84833 2.0767C1.66667 2.43322 1.66667 2.89993 1.66667 3.83335Z"
        stroke="#D39B7D"
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
const StatsIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
    >
      <path
        d="M6.5 16.5H2.83333C2.36662 16.5 2.13327 16.5 1.95501 16.4092C1.79821 16.3293 1.67072 16.2018 1.59083 16.045C1.5 15.8667 1.5 15.6334 1.5 15.1667V2.83333C1.5 2.36662 1.5 2.13327 1.59083 1.95501C1.67072 1.79821 1.79821 1.67072 1.95501 1.59083C2.13327 1.5 2.36662 1.5 2.83333 1.5H5.16667C5.63338 1.5 5.86673 1.5 6.04499 1.59083C6.20179 1.67072 6.32928 1.79821 6.40917 1.95501C6.5 2.13327 6.5 2.36662 6.5 2.83333V4.83333M6.5 16.5H11.5M6.5 16.5L6.5 4.83333M6.5 4.83333H10.1667C10.6334 4.83333 10.8667 4.83333 11.045 4.92416C11.2018 5.00406 11.3293 5.13154 11.4092 5.28834C11.5 5.4666 11.5 5.69996 11.5 6.16667V16.5M11.5 8.16667H15.1667C15.6334 8.16667 15.8667 8.16667 16.045 8.25749C16.2018 8.33739 16.3293 8.46487 16.4092 8.62167C16.5 8.79993 16.5 9.03329 16.5 9.5V15.1667C16.5 15.6334 16.5 15.8667 16.4092 16.045C16.3293 16.2018 16.2018 16.3293 16.045 16.4092C15.8667 16.5 15.6334 16.5 15.1667 16.5H11.5"
        stroke="#D39B7D"
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default function FeaturesSection() {
  return (
    <div className="py-16 container">
      <div className="mb-12">
        <p className="text-text-sm text-primary-700 font-semibold mb-3">
          Features
        </p>
        <p className="text-display-sm font-semibold text-gray-900 mb-4">
          Budget-friendly subscription services.
        </p>
        <p className="text-text-lg font-normal text-gray-600">
          Instead of using subscriptions for one person, use family and group
          packages with multiple people to save money.
        </p>
      </div>
      <div className="flex flex-col gap-10">
        <div>
          <Features
            icon={<PartnerIcon />}
            text={
              "You don't have to search for partners everywhere for your subscriptions. Whether you want to find partners for yourself or join someone who is looking for partners, they are just one click away."
            }
            heading={"Find a partner for your subscriptions"}
          />
          <button className="btn-color-link flex items-center justify-center mt-4">
            Start Now
            <img src={RightArrow} alt="right arrow" className="ml-3" />
          </button>
        </div>
        <Features
          icon={<CreditCardIcon />}
          text={
            "Personal subscriptions are usually more expensive than family and group subscriptions. Thanks to Famiacount, you don't have to pay high prices for individual subscriptions."
          }
          heading={"Protect your budget"}
        />
        <Features
          icon={<StatsIcon />}
          text={
            "When using your subscriptions with partners, keep your payments separate. Track your payments through the payment tracking interface and easily see who has paid and who hasn't."
          }
          heading={"Easily track your subscription payments"}
        />
      </div>
    </div>
  );
}
