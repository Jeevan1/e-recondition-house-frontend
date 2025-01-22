"use client";
import React from "react";
import { PrimaryButton } from "../Button";
import FormInput from "../InputField/FormInput";

const ContactForm = () => {
  return (
    <div className="bg-white p-4 sm:p-6">
      <h1 className="text-lg font-bold text-primary md:text-xl">
        Contact With Us
      </h1>
      <form
        action=""
        className=" flex h-full flex-col gap-5 py-5 sm:grid sm:grid-cols-2 "
      >
        <FormInput
          type="text"
          name="name"
          label="Enter Name"
          placeholder="Your Name"
          height="h-[45px]"
        />
        <FormInput
          type="email"
          name="email"
          label="Email"
          height="h-[45px]"
          placeholder="Your Email"
        />
        <FormInput
          type="text"
          name="subject"
          label="Subject"
          height="h-[45px]"
          placeholder="Subject"
        />
        <FormInput
          type="text"
          name="phone"
          label="Phone Number"
          placeholder="Phone"
          height="h-[45px]"
        />
        <FormInput
          type="textarea"
          name="message"
          label="Message"
          placeholder="Message"
          className="col-span-2"
        />
        <div className="col-span-2">
          <PrimaryButton className="">Send Message</PrimaryButton>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
