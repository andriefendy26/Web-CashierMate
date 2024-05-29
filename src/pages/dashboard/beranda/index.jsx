import React from "react";
import { Card, CardBody, CardHeader } from "@material-tailwind/react";

import { FaUser, FaShoppingCart, FaDollarSign, FaBoxOpen, FaFile } from "react-icons/fa";

import { detailLaporan } from "../../../service/transaksiServices";

export default function index() {
  const user = JSON.parse(localStorage.getItem("user"));
  const usaha_id = user[1].usaha_id;

  const [data, setData] = React.useState({})

  React.useEffect(() => {
    const getData = async () => {
      const result = await detailLaporan(usaha_id);
      setData(result.data)
      // console.log(result.data)
    };
    getData();
  }, []);

  return (
    <div className="p-5 mt-10">
      <h1 className="font-bold px-10 text-4xl">Beranda</h1>
      <div className="p-10 flex gap-8 flex-wrap">
        <Card className="border-2 justify-between items-center border-gray-400 w-[400px]">
          <CardBody className="flex p-10">
            <div className="mr-10 ">
              <p className="text-xl">Total Stock Produk</p>
              <p className="text-5xl">{data.stock}</p>
            </div>
            <Card className="p-5 bg-cashierHover">
              <FaShoppingCart size={50}></FaShoppingCart>
            </Card>
          </CardBody>
        </Card>
        <Card className="border-2 justify-between items-center border-gray-400 w-[400px]">
          <CardBody className="flex p-10">
            <div className="mr-10 ">
              <p className="text-xl">Total Produk Terjual</p>
              <p className="text-5xl">{data.produkterjual}</p>
            </div>
            <Card className="p-5 bg-orange-400">
              <FaBoxOpen size={50}></FaBoxOpen>
            </Card>
          </CardBody>
        </Card>
        <Card className="border-2 border-gray-400 justify-between items-center w-[400px]">
          <CardBody className="flex p-10">
            <div className="mr-10 ">
              <p className="text-xl">Jumlah Transaksi</p>
              <p className="text-5xl">{data.jumlahtransaksi}</p>
            </div>
            <Card className="p-5 bg-yellow-400">
              <FaFile size={50}></FaFile>
            </Card>
          </CardBody>
        </Card>
        <Card className="border-2 border-gray-400 justify-between items-center w-[600px]">
          <CardBody className="flex p-10">
            <div className="mr-10 ">
              <p className="text-xl">Total Pendapatan</p>
              <p className="text-5xl">Rp.{data.totalpendapatan?.toLocaleString()}</p>
            </div>
            <Card className="p-5 bg-green-300">
              <FaDollarSign size={50}></FaDollarSign>
            </Card>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
