import React from "react";
import logo from "../../assets/logocashier.png";

export default function index() {
  return (
    <div className="border-t-2 border-cashier">
      <div className="max-w-2xl mx-auto text-black py-10">
        <div className="text-center">
          <h3 className="text-3xl mb-3"> Gunakan CashierMate Sekarang </h3>
          <p> Kelola Usaha UMKM kalian dengan Aplikasi kami. </p>
          <div className="flex justify-center my-10">
            <div className="flex items-center border border-cashier rounded-lg px-4 py-2 w-52 mx-2">
              <img src="https://cdn-icons-png.flaticon.com/512/888/888857.png" className="w-7 md:w-8" />
              <div className="text-left ml-3">
                <p className="text-xs text-gray-600">Download on </p>
                <p className="text-sm md:text-base"> Google Play Store </p>
              </div>
            </div>
            <div className="flex items-center border border-cashier rounded-lg px-4 py-2 w-44 mx-2">
              <img src={logo} className="w-10 md:w-8" />
              <div className="text-left ml-3">
                <p className="text-xs text-gray-600">Akses Melalui </p>
                <p className="text-sm md:text-base"> Web </p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-28 flex flex-col md:flex-row md:justify-between items-center text-sm text-gray-400">
          <p className="order-2 md:order-1 mt-8 md:mt-0"> &copy; CashierMate, 2024. </p>
          <div className="order-1 md:order-2">
            <span className="px-2">About us</span>
            <span className="px-2 border-l">Contact us</span>
            <span className="px-2 border-l">Privacy Policy</span>
          </div>
        </div>
      </div>
    </div>
  );
}
