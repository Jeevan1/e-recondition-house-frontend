import React from "react";
import { PrimaryButton } from "../Button";
import FormInput from "../InputField/FormInput";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from "@/context/AuthContext";
import { redirect } from "next/navigation";
import { useForm } from "react-hook-form";

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
    name: "username",
    type: "text",
    placeholder: "Enter your username",
    label: "Customer ID",
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
  username: Yup.string().required("Customer ID is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const LogInForm = () => {
  const { login, isAuthenticated } = useAuth();
  const [loading, setLoading] = React.useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ username: string; password: string }>({
    resolver: yupResolver(signupSchema),
    mode: "all",
  });

  const onSubmitHandler = async (data: {
    username: string;
    password: string;
  }) => {
    setLoading(true);
    const res = await login(data.username, data.password);
    setLoading(false);
  };

  if (isAuthenticated) {
    redirect("/");
  }

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
          {loading ? "Submitting.." : "Submit"}
        </PrimaryButton>
      </div>
    </form>
  );
};

export default LogInForm;
