"use client";
import React from "react";
import FormInput from "./InputField/FormInput";
import { PrimaryButton } from "./Button";

const FooterForm = () => {
  return (
    <form className="mt-4 flex items-center gap-2">
      <FormInput
        placeholder="Enter your email"
        type="email"
        name="email"
        value=""
        onChange={() => {}}
        className="flex-1"
      />
      <PrimaryButton className="w-[100px] md:w-[80px]">Send</PrimaryButton>
    </form>
  );
};

export default FooterForm;
