import React from "react";
import { Card, CardBody, CardHeader } from "@material-tailwind/react";

import { FaUser, FaShoppingCart, FaDollarSign, FaBoxOpen, FaFile } from "react-icons/fa";

export default function index() {
  return (
    <div className="p-5 mt-10">
      <h1 className="font-bold px-10 text-4xl">Beranda</h1>
      <div className="p-10 flex gap-8 flex-wrap">
        <Card className="border-2 justify-between items-center border-gray-400 w-[400px]">
          <CardBody className="flex p-10">
            <div className="mr-10 ">
              <p className="text-xl">Total Stock Produk</p>
              <p className="text-5xl">143</p>
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
              <p className="text-5xl">324</p>
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
              <p className="text-5xl">144</p>
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
              <p className="text-5xl">Rp.22,000,000</p>
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
