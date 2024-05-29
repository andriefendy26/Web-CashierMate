import React from "react";
import Navbar from "../../layout/Navbar";
import Footer from "../../layout/Footer";

import Button from "../../Components/button";

import ssapk from "../../assets/ssapk.png";
import logo from "../../assets/logocashier.png";
import logoproduk from "../../assets/signature.png";
import croissant from "../../assets/bacon.png";
import pegawai from "../../assets/user.png";
import sync from "../../assets/Sync.png";
import docs from "../../assets/Docs.png";
import fitur from "../../assets/fitur.png";

export default function index() {
  return (
    <div className="flex justify-center font-poppins">
      <Navbar></Navbar>
      <div className="w-[68%]">
        <div id="beranda" className="flex h-[100vh] ">
          <div className="w-[50%] h-full justify-center items-center flex flex-col">
            <div className="justify-center relative items-center flex">
              <img className="absolute top-[-40px] left-[-40px] bg-white rounded-xl shadow-2xl border-[1px] w-[80px]" src={logo}></img>
              <img className="w-[450px] bg-white rounded-xl shadow-2xl  border-gray-400 " src={ssapk}></img>
              <div className="absolute flex items-center flex-col p-2 bottom-[-40px] right-[-40px] bg-white rounded-xl shadow-2xl border-[1px] border-gray-400 w-[180px]">
                <img className="w-20" src={logoproduk}></img>
                <p className="absolute text-xl right-3">+</p>
                <p className="text-sm font-bold">Kelola Produk Anda</p>
              </div>
            </div>
          </div>
          <div className="w-[50%] h-full justify-center flex flex-col ">
            <h1 className="font-bold text-5xl text-[#616161]">Optimalkan Pengelolaan usaha UMKM Anda dengan CashierMate!</h1>
            <p className="text-xl mt-10">Aplikasi pintar kami menyediakan solusi terpadu untuk manajemen inventaris dan transaksi penjualan. Tingkatkan efisiensi dan kembangkan bisnis Anda hari ini dengan CashierMate!</p>
            <div className="flex flex-row gap-5 mt-10">
              <Button style="bg-cashier text-white hover:bg-cashierHover"> Download Aplikasi</Button>
              <Button style="border border-cashier text-cashier hover:bg-cashier hover:text-white"> Mulai Sekarang</Button>
            </div>
          </div>
        </div>
        {/* Fitur Aplikasi */}
        <div id="fitur" className="flex  h-[70vh]">
          <div className="w-[50%]">
            <h1 className="text-[#616161] font-bold text-5xl">Fitur Aplikasi</h1>
            <p className="text-xl mt-5">
              "Tingkatkan produktivitas dan kendalikan bisnis Anda dengan mudah melalui fitur-fitur unggulan kami: Kelola Produk: Tersedia alat lengkap untuk mengelola inventaris dan produk Anda dengan efisien. Dari pembaruan stok hingga
              pengaturan harga, kendalikan semuanya dengan sekali sentuh. Laporan Pendapatan: Pantau kinerja bisnis Anda dengan detail melalui laporan pendapatan yang informatif. Analisis yang mendalam tentang arus kas, penjualan, dan
              profitabilitas akan membantu Anda membuat keputusan yang tepat waktu. Kelola Pegawai: Manajemen tim menjadi lebih efisien dengan fitur kelola pegawai kami. Tetap terorganisir dalam penugasan, jadwal, dan evaluasi kinerja untuk
              memastikan tim Anda selalu berada pada jalur yang benar.
            </p>
          </div>
          <div className="w-[50%] h-full justify-center items-center flex flex-col">
            <div className="justify-center relative items-center flex">
              <img className="w-[200px] bg-white rounded-xl shadow-2xl  border-gray-400 " src={fitur}></img>
              <div className="absolute flex items-center flex-col p-2 bottom-[40px] left-[-40px] bg-white rounded-xl shadow-2xl border-[1px] border-gray-400 w-[180px]">
                <img className="w-20" src={croissant}></img>
                <p className="absolute text-xl right-3">+</p>
                <p className="text-sm font-bold">Kelola Produk Anda</p>
              </div>
              <div className="absolute flex items-center flex-col p-2 top-[-40px] left-[-40px] bg-white rounded-xl shadow-2xl border-[1px] border-gray-400 w-[150px]">
                <img className="w-10" src={pegawai}></img>
                <p className="absolute text-xl right-3">🔃</p>
                <p className="text-sm font-bold">Kelola Pegawai</p>
              </div>
              <div className="absolute flex items-center flex-col p-2 top-[100px] right-[-80px] bg-white rounded-xl shadow-2xl border-[1px] border-gray-400 w-[180px]">
                <img className="w-10" src={docs}></img>
                <p className="text-sm font-bold">Laporan Penjualan</p>
              </div>
            </div>
          </div>
        </div>
        {/* about us*/}
        <div id="tentangkami" className="flex mt-20 mb-32">
          <div className="w-[50%]"></div>
          <div className="w-[50%] flex justify-center  flex-col">
            <h1 className="text-[#616161] font-bold text-5xl">Tentang Kami</h1>
            <p className=" text-xl mt-5">
              cashierMate adalah solusi perangkat lunak terdepan yang dirancang khusus untuk memenuhi kebutuhan bisnis ritel modern. Dengan komitmen kami untuk menyediakan platform yang dapat dipercaya dan inovatif, kami membantu pemilik
              bisnis mengelola operasi mereka dengan lebih efisien dan meningkatkan pengalaman pelanggan.
            </p>
          </div>
        </div>
        <Footer></Footer>
      </div>
    </div>
  );
}
