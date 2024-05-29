import React from "react";
// import gambarku from "../../../assets/ANDRI.jpg";
import gambarku from "../../../assets/1070509.png";
import { Card, CardBody, CardHeader, Alert, Input, Button, Tooltip, IconButton } from "@material-tailwind/react";
import { PencilIcon } from "@heroicons/react/24/solid";
import { FaUser, FaShoppingCart, FaDollarSign, FaBoxOpen, FaFile } from "react-icons/fa";

import { updateUser, getUserByEmail, logout } from "../../../service/AuthServices";

export default function index() {
  const user = JSON.parse(localStorage.getItem("user"));
  const usaha_id = user[1].usaha_id;
  const user_id = user[1].id;
  const token = user[0].token;

  const [formValue, setformValue] = React.useState({
    nama: null,
  });

  const [isTrue, setisTrue] = React.useState(false);

  React.useEffect(() => {
    const runEffect = async () => {
      const result = await getUserByEmail(user[1].email);
      setformValue({ nama: result.data.data.nama });
    };
    runEffect();
  }, []);

  const hanldeUpdate = async () => {
    const resp = await updateUser(user_id, formValue);
    if (resp.status == 200) {
      const result = await getUserByEmail(user[1].email);
      setisTrue(true);
      setTimeout(() => {
        setisTrue(false);
      }, 5000);
      console.log(result.data.data.nama);
    }
    console.log(resp);
  };

  const handleLogout = async () => {
    localStorage.removeItem("user");
    await logout(token);
    window.location.href = "/";
    alert("anda berhasil logout");
  };

  return (
    <div className="p-5 mt-10 w-full">
      {isTrue ? (
        <Alert className="absolute w-[50%] bottom-4" color="green">
          Berhasil Mengupdate Profile
        </Alert>
      ) : (
        <></>
      )}
      <h1 className="font-bold px-10 text-4xl">Pengaturan</h1>
      <div className="p-10 flex">
        <div className="mb-2 p-3 w-[50%]">
          <div className="rounded-xl items-center justify-center flex relative">
            <img src={gambarku} className="w-[120px] border border-black shadow-2xl h-[120px] object-cover rounded-[50%]"></img>
            <label htmlFor="gambar" className="border relative right-3 border-gray-600 rounded-xl p-1 bg-gray-600">
              <PencilIcon className="h-4 w-4" />
            </label>
            <input id="gambar" className="hidden" type="file"></input>
          </div>
          <div className="border-b-2 border-gray-400 pb-5">
            <label htmlFor="nama">Nama</label>
            <Input placeholder="" onChange={(e) => setformValue({ nama: e.target.value })} defaultValue={formValue.nama}></Input>
            <label htmlFor="nama">Email</label>
            <Input labal="nama" type="email" placeholder="" defaultValue={user[1].email} disabled></Input>
            <Button className="w-full mt-5" onClick={() => hanldeUpdate()}>
              {" "}
              Simpan
            </Button>
          </div>
          <div>
            <Button className="mt-5 w-full" variant="outlined">
              {" "}
              Set Printer
            </Button>
            <Button className="mt-5 w-full" color="red" onClick={() => handleLogout()}>
              {" "}
              Log Out
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
