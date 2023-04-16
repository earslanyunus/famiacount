import React from 'react';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ContactForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = (data) => {
    toast.success("Thank you for getting in touch with us", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    })
   
  }

  return (
    <>
          <ToastContainer />

    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-6'>
      <input className='input-field' type="text" placeholder="First name" {...register("First name", {required: true, maxLength: 80})} />
      <input className='input-field' type="text" placeholder="Last name" {...register("Last name", {required: true, maxLength: 100})} />
      <input className='input-field' type="email" placeholder="Email" {...register("Email", {required: true, pattern: /^\S+@\S+$/i})} />
      <textarea className='input-field' placeholder='Leave us a message...' {...register("Message", {required: true, maxLength: 500})} />

      <button className='btn-primary-lg' type="submit">Send message</button>
    </form>
    </>
  );
}