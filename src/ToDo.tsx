import React from "react";
import { useForm } from "react-hook-form";

interface IForm {
  email: string;
  password: string;
  username: string;
  password1: string;
  extraError: string;
}

const ToDo = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<IForm>({ defaultValues: { email: "@naver.com" } });
  const onValid = (data: IForm) => {
    if (data.password !== data.password1) {
      setError(
        "password1",
        { message: "password is not same" },
        { shouldFocus: true }
      );
    }
    // setError("extraError", { message: "server error" });
  };
  console.log(errors);
  return (
    <div>
      <form
        onSubmit={handleSubmit(onValid)}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <input
          {...register("email", {
            required: "email is required",
            pattern: {
              value: /^[A-Za-z0-9._%+-]+@naver.com$/,
              message: "email must be '---@naver.com'",
            },
          })}
          placeholder="email"
        />
        <span>{errors?.email?.message}</span>
        <input
          {...register("password", {
            required: "passord is required",
            minLength: { value: 5, message: "Mininum Length is 5" },
          })}
          placeholder="password"
        />
        <span>{errors?.password?.message}</span>
        <input {...register("password1")} placeholder="password1" />
        <span>{errors?.password1?.message}</span>
        <input
          {...register("username", {
            validate: {
              noChaeeun: (value) => (value.includes("채은") ? "error" : true),
            },
          })}
          placeholder="username"
        />
        <button>submit</button>
        <span>{errors?.extraError?.message}</span>
      </form>
    </div>
  );
};

export default ToDo;
