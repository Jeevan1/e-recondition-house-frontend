import React from "react";
import { PrimaryButton } from "../Button";
import { ReconditionHouse } from "@/model/type";
import FormInput from "../InputField/FormInput";
import * as Yup from "yup";
import { Resolver, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

type FieldsProps = {
  name: string;
  type: string;
  placeholder: string;
  label: string;
  className: string;
  required: boolean;
};

const inputFields: FieldsProps[] = [
  {
    name: "id",
    type: "number",
    placeholder: "Enter your id",
    label: "Customer Id",
    className: "",
    required: true,
  },
  {
    name: "password",
    type: "password",
    placeholder: "Enter your password",
    label: "Password",
    className: "",
    required: true,
  },
];

const signupSchema = Yup.object().shape({
  id: Yup.string().required("Id is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const LogInForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ id: number; password: string }>({
    resolver: yupResolver(signupSchema) as any,
    mode: "all",
  });

  const onSubmitHandler = (data: { id: number; password: string }) => {
    console.log(data);
  };

  return (
    <form className="mt-6" onSubmit={handleSubmit(onSubmitHandler)}>
      <div className="grid grid-cols-1 gap-6">
        {inputFields.map((field) => {
          const { name, type, placeholder, label, className, required } = field;
          return (
            <FormInput
              key={name}
              label={label}
              placeholder={placeholder}
              type={type}
              name={name}
              className={className}
              required={required}
              error={errors[name as keyof typeof errors]?.message}
              register={register}
            />
          );
        })}
      </div>
      <div className="mt-10">
        <PrimaryButton className="h-[40px] w-[150px] text-[14px] font-bold">
          Submit
        </PrimaryButton>
      </div>
    </form>
  );
};

export default LogInForm;
