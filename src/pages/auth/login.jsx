import React, { useState, useContext } from "react";
import AuthContext from "../../service/AuthContext";

import Logo from "../../assets/logocashier.png";
import { login } from "../../service/AuthServices";
import { Alert } from "@material-tailwind/react";
import { redirect, Navigate } from "react-router-dom";

export default function Login() {
  const { setUsers } = useContext(AuthContext);
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    // if (state.email == "" || state.password == "") alert("isi semua");
    const result = await login({
      ...state,
    });
    console.log(result);
    if (result.status === 200) {
      setUsers(result.data);
      localStorage.setItem("user", JSON.stringify(result.data));
      window.location.href = "/dashboard";
      setIsLoading(false);
    } else {
      setError(result.message);
      setTimeout(() => {
        setError("");
      }, 5000);
      setIsLoading(false);
      console.log(error);
    }
  };

  return (
    <div className="container flex flex-col mx-auto bg-white rounded-lg ">
      {error ? (
        <Alert
          className="fixed left-4 bottom-4 w-[30%]"
          color="red"
          animate={{
            mount: { y: 0 },
            unmount: { y: 100 },
          }}
        >
          {error}
        </Alert>
      ) : (
        ""
      )}
      <div className="flex justify-center w-full h-full my-auto xl:gap-14 lg:justify-normal md:gap-5 draggable">
        <div className="flex items-center justify-center w-full lg:p-12">
          <div className="flex items-center xl:p-10">
            <form className="flex flex-col w-full h-full pb-6 text-center bg-white rounded-3xl">
              <h3 className="mb-3 text-4xl font-extrabold text-dark-grey-900">Masuk</h3>
              <div className="items-center flex w-full justify-center">
                <img src={Logo} className="w-32"></img>
              </div>
              <p className="mb-4 text-grey-700">Silahkan inputkan email dan password</p>
              <div className="flex items-center mb-3">
                <hr className="h-0 border-b border-solid border-grey-500 grow" />
                <p className="mx-4 text-grey-600">or</p>
                <hr className="h-0 border-b border-solid border-grey-500 grow" />
              </div>
              <label htmlFor="email" className="mb-2 text-sm text-start text-grey-900">
                Email*
              </label>
              <input
                id="email"
                type="email"
                placeholder="joendoe@gmail.com"
                onChange={(e) => {
                  setState({ ...state, email: e.target.value });
                }}
                className="flex items-center w-full px-5 py-4 mr-2 text-sm font-medium outline-none focus:bg-grey-400 mb-7 placeholder:text-grey-700 bg-gray-200 text-dark-grey-900 rounded-2xl"
              />
              <label htmlFor="password" className="mb-2 text-sm text-start text-grey-900">
                Password*
              </label>
              <input
                id="password"
                type="password"
                placeholder="Enter a password"
                onChange={(e) => {
                  setState({ ...state, password: e.target.value });
                }}
                className="flex items-center w-full px-5 py-4 mb-5 mr-2 text-sm font-medium outline-none focus:bg-grey-400 placeholder:text-grey-700 bg-gray-200 0 text-dark-grey-900 rounded-2xl"
              />

              <button
                onClick={(e) => handleLogin(e)}
                className="w-full flex items-center justify-center px-6 py-5 mb-5 text-sm font-bold leading-none text-white bg-cashier transition duration-300 md:w-96 rounded-2xl hover:bg-cashierHover focus:ring-4 focus:ring-purple-blue-100 bg-purple-blue-500"
              >
                {isLoading ? (
                  <svg class="text-gray-300 animate-spin" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" width="24" height="24">
                    <path
                      d="M32 3C35.8083 3 39.5794 3.75011 43.0978 5.20749C46.6163 6.66488 49.8132 8.80101 52.5061 11.4939C55.199 14.1868 57.3351 17.3837 58.7925 20.9022C60.2499 24.4206 61 28.1917 61 32C61 35.8083 60.2499 39.5794 58.7925 43.0978C57.3351 46.6163 55.199 49.8132 52.5061 52.5061C49.8132 55.199 46.6163 57.3351 43.0978 58.7925C39.5794 60.2499 35.8083 61 32 61C28.1917 61 24.4206 60.2499 20.9022 58.7925C17.3837 57.3351 14.1868 55.199 11.4939 52.5061C8.801 49.8132 6.66487 46.6163 5.20749 43.0978C3.7501 39.5794 3 35.8083 3 32C3 28.1917 3.75011 24.4206 5.2075 20.9022C6.66489 17.3837 8.80101 14.1868 11.4939 11.4939C14.1868 8.80099 17.3838 6.66487 20.9022 5.20749C24.4206 3.7501 28.1917 3 32 3L32 3Z"
                      stroke="currentColor"
                      stroke-width="5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                    <path
                      d="M32 3C36.5778 3 41.0906 4.08374 45.1692 6.16256C49.2477 8.24138 52.7762 11.2562 55.466 14.9605C58.1558 18.6647 59.9304 22.9531 60.6448 27.4748C61.3591 31.9965 60.9928 36.6232 59.5759 40.9762"
                      stroke="currentColor"
                      stroke-width="5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="text-gray-900"
                    ></path>
                  </svg>
                ) : (
                  "Masuk"
                )}
              </button>

              <p className="text-sm leading-relaxed text-grey-900">
                Belum Punya Akun ?{" "}
                <a href="/register" className="font-bold text-grey-700">
                  Daftar Sekarang
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
