import React from "react";
import Button from "../../Components/button";

const Navbar = () => {
  return (
    <div className="absolute z-50 bg-white font-poppins justify-center flex p-5 w-full border-b-[1px] border-gray-300">
      <div className="w-[70%] flex justify-between flex-row items-center">
        <h1 className="text-cashier text-3xl font-bold tracking-wide">CashierMate</h1>
        <div className="flex flex-row gap-6 text-lg items-center">
          <a href="#beranda">Beranda</a>
          <a href="#fitur">Fitur</a>
          <a href="#tentangkami">Tentang Kami</a>
          {/* <a href="#">Visi Misi</a> */}
          <a href="/register">
            <Button style="bg-cashier text-white hover:bg-cashierHover">Daftar</Button>
          </a>

          <a href="/login">
            <Button style="border border-cashier text-cashier hover:bg-cashier hover:text-white">Masuk</Button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
