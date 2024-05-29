import { Alert } from "@material-tailwind/react";
import React from "react";

import { regist } from "../../service/AuthServices";

export default function Register() {
  const [valueForm, setValueForm] = React.useState({
    nama: "",
    kategori: "",
    alamat: "",
    nama_pengguna: "",
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = React.useState();
  const [error, setError] = React.useState({
    nama: null,
    kategori: null,
    alamat: null,
    nama_pengguna: null,
    email: null,
    password: null,
    message: null,
  });
  const [sukses, setSukses] = React.useState();

  const handleDaftar = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const result = await regist({
      ...valueForm,
    });

    if (result.data.status === 200) {
      setSukses(true);
      setIsLoading(false);
      setValueForm({
        nama: "",
        kategori: "",
        alamat: "",
        nama_pengguna: "",
        email: "",
        password: "",
      });
    } else {
      console.log(result.data.errors);

      setError({
        nama: result.data.errors.nama,
        kategori: result.data.errors.kategori,
        alamat: result.data.errors.alamat,
        nama_pengguna: result.data.errors.nama_pengguna,
        email: result.data.errors.email,
        password: result.data.errors.password,
        message: result.data.message,
      });
      setValueForm({
        nama: "",
        kategori: "",
        alamat: "",
        nama_pengguna: "",
        email: "",
        password: "",
      });
      setTimeout(() => {
        setError({
          nama: null,
          kategori: null,
          alamat: null,
          nama_pengguna: null,
          email: null,
          password: null,
          message: null,
        });
      }, 10000);
      // console.log(result.data);
      setIsLoading(false);
    }
    setIsLoading(false);
  };
  return (
    <div className="container flex flex-col mx-auto bg-white rounded-lg">
      {sukses ? (
        <Alert
          className="fixed left-4 bottom-4 w-[30%]"
          color="blue"
          animate={{
            mount: { y: 0 },
            unmount: { y: 100 },
          }}
        >
          Berhasil Mendaftarkan Akun
        </Alert>
      ) : (
        ""
      )}
      <div className="flex justify-center w-full h-full my-auto xl:gap-14 lg:justify-normal md:gap-5 draggable">
        <div className="flex items-center justify-center w-full lg:p-12">
          <div className="flex items-center xl:p-10">
            <form className="flex flex-col w-full h-full pb-6 text-center bg-white rounded-3xl">
              <h3 className="mb-3 text-4xl font-extrabold text-dark-grey-900">Daftar</h3>
              <p className="mb-4 text-grey-700">Lengkapi data diri dan data usaha</p>
              <div className="flex items-center mb-3">
                <hr className="h-0 border-b border-solid border-grey-500 grow" />
                <p className="mx-4 text-grey-600">or</p>
                <hr className="h-0 border-b border-solid border-grey-500 grow" />
              </div>
              <label htmlFor="nama" className="mb-2 text-sm text-start text-grey-900">
                Nama*
              </label>
              <input
                id="nama"
                placeholder="Masukkan Nama Pengguna"
                value={valueForm.nama_pengguna}
                // defaultValue={valueForm.nama_pengguna}
                onChange={(e) => setValueForm({ ...valueForm, nama_pengguna: e.target.value })}
                className="flex items-center w-full px-5 py-4 mr-2 text-sm font-medium outline-none focus:bg-grey-400 mb-7 placeholder:text-grey-700 bg-gray-200 text-dark-grey-900 rounded-2xl"
              />
              {error.nama_pengguna ? <p className="text-red-500">{error.nama_pengguna}</p> : ""}
              <label htmlFor="email" className="mb-2 text-sm text-start text-grey-900">
                Email*
              </label>
              <input
                id="email"
                type="email"
                value={valueForm.email}
                onChange={(e) => setValueForm({ ...valueForm, email: e.target.value })}
                placeholder="joendoe@gmail.com"
                className="flex items-center w-full px-5 py-4 mr-2 text-sm font-medium outline-none focus:bg-grey-400 mb-7 placeholder:text-grey-700 bg-gray-200 text-dark-grey-900 rounded-2xl"
              />
              {error.email ? <p className="text-red-500">{error.email}</p> : ""}
              <label htmlFor="password" className="mb-2 text-sm text-start text-grey-900">
                Password*
              </label>
              <input
                id="password"
                type="password"
                value={valueForm.password}
                placeholder="Enter a password"
                onChange={(e) => setValueForm({ ...valueForm, password: e.target.value })}
                className="flex items-center w-full px-5 py-4 mb-5 mr-2 text-sm font-medium outline-none focus:bg-grey-400 placeholder:text-grey-700 bg-gray-200 0 text-dark-grey-900 rounded-2xl"
              />
              {error.password ? <p className="text-red-500">{error.password}</p> : ""}
              <label htmlFor="usaha" className="mb-2 text-sm text-start text-grey-900">
                Usaha*
              </label>
              <input
                id="usaha"
                value={valueForm.nama}
                placeholder="Masukkan Nama Usaha"
                onChange={(e) => setValueForm({ ...valueForm, nama: e.target.value })}
                className="flex items-center w-full px-5 py-4 mr-2 text-sm font-medium outline-none focus:bg-grey-400 mb-7 placeholder:text-grey-700 bg-gray-200 text-dark-grey-900 rounded-2xl"
              />
              {error.nama ? <p className="text-red-500">{error.nama}</p> : ""}
              <label htmlFor="kategori" className="mb-2 text-sm text-start text-grey-900 ">
                Pilih Kategori Usaha
              </label>
              <select
                onChange={(e) => setValueForm({ ...valueForm, kategori: e.target.value })}
                id="kategori"
                value={valueForm.kategori}
                className="flex items-center w-full px-5 py-4 mr-2 text-sm font-medium outline-none focus:bg-grey-400 mb-7 placeholder:text-grey-700 bg-gray-200 text-dark-grey-900 rounded-2xl"
              >
                <option selected>Pilih Kategori Usaha</option>
                <option value="Coffe Shop">Coffe Shop</option>
                <option value="Restaurant">Restaurant</option>
              </select>
              {error.kategori ? <p className="text-red-500">{error.kategori}</p> : ""}
              <label htmlFor="alamat" className="mb-2 text-sm text-start text-grey-900">
                Alamat*
              </label>
              <input
                onChange={(e) => setValueForm({ ...valueForm, alamat: e.target.value })}
                id="alamat"
                value={valueForm.alamat}
                placeholder="Masukkan Alamat"
                className="flex items-center w-full px-5 py-4 mr-2 text-sm font-medium outline-none focus:bg-grey-400 mb-7 placeholder:text-grey-700 bg-gray-200 text-dark-grey-900 rounded-2xl"
              />
              {error.alamat ? <p className="text-red-500">{error.alamat}</p> : ""}

              <button
                onClick={(e) => handleDaftar(e)}
                className="w-full flex justify-center items-center px-6 py-5 mb-5 text-sm font-bold leading-none text-white bg-cashier transition duration-300 md:w-96 rounded-2xl hover:bg-cashierHover focus:ring-4 focus:ring-purple-blue-100 bg-purple-blue-500"
              >
                {isLoading ? (
                  <svg className="text-gray-300 animate-spin" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" width="24" height="24">
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
                      className="text-gray-900"
                    ></path>
                  </svg>
                ) : (
                  "Daftar"
                )}
              </button>
              <p className="text-sm leading-relaxed text-grey-900">
                Sudah Punya Akun ?{" "}
                <a href="/login" className="font-bold text-grey-700">
                  Login
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
