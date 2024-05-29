import React, { useState, useEffect } from "react";
import AuthContext from "../../service/AuthContext";

import gambarku from "../../assets/1070509.png";
import logo from "../../assets/logocashier.png";

import { Card, List, ListItem, ListItemPrefix } from "@material-tailwind/react";
import { HomeModernIcon, ShoppingBagIcon, UserCircleIcon, Cog6ToothIcon, InboxIcon, ArchiveBoxIcon } from "@heroicons/react/24/solid";
import { Outlet, Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { ambilProduk, ambilKategori } from "../../service/ProdukServices";
import { ambilSemuaTransaksi } from "../../service/transaksiServices";
import { getUserByEmail } from "../../service/AuthServices";
import { setKategoriRedux } from "../../redux/kategoriSlice";
import { setRiwayatRedux } from "../../redux/riwayatSlice";
import { setProdukRedux } from "../../redux/produkSlice";

export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  const usaha_id = user?.[1]?.usaha_id;
  const role_id = user?.[1]?.role_id;
  const dispatch = useDispatch();
  const [Nama, setNama] = useState("");

  useEffect(() => {
    if (!localStorage.getItem("user")) {
      window.location.href = "/";
    } else if (usaha_id) {
      // console.log(usaha_id);
    }
  }, [usaha_id]);

  useEffect(() => {
    const runEffect = async () => {
      if (user?.[1]?.email) {
        const result = await getUserByEmail(user[1].email);
        setNama(result.data.data.nama);
      }
    };
    runEffect();
  }, [user]);

  // fetch data produk
  useEffect(() => {
    const getProduk = async () => {
      if (usaha_id) {
        const result = await ambilProduk(usaha_id);
        dispatch(setProdukRedux(result));
      }
    };
    getProduk();
  }, [dispatch, usaha_id]);

  // fetch data kategori
  useEffect(() => {
    const getKategori = async () => {
      if (usaha_id) {
        const result = await ambilKategori(usaha_id);
        dispatch(setKategoriRedux(result));
      }
    };

    const getRiwayat = async () => {
      if (usaha_id) {
        const result = await ambilSemuaTransaksi(usaha_id);
        dispatch(setRiwayatRedux(result.data));
      }
    };

    getKategori();
    getRiwayat();
  }, [dispatch, usaha_id]);

  return (
    <div className="flex">
      <Card className="h-[calc(100vh-2rem)] w-full max-w-[20rem] border-r-2 p-4 shadow-xl shadow-blue-gray-900/5">
        <div className="mb-2 border-b-2 border-gray-200 p-3">
          <div className="rounded-xl items-center justify-center flex">
            <img src={gambarku} className="w-[120px] shadow-xl h-[120px] object-cover rounded-[50%]" alt="User" />
          </div>
          <p>{Nama}</p>
          <p>{user?.[1]?.email}</p>
        </div>
        <List>
          <Link to="beranda">
            <ListItem>
              <ListItemPrefix>
                <HomeModernIcon className="h-5 w-5" />
              </ListItemPrefix>
              Beranda
            </ListItem>
          </Link>
          <Link to="transaksi">
            <ListItem>
              <ListItemPrefix>
                <ShoppingBagIcon className="h-5 w-5" />
              </ListItemPrefix>
              Transaksi
            </ListItem>
          </Link>
          {role_id == 2 ? null : (
            <Link to="produk">
              <ListItem>
                <ListItemPrefix>
                  <InboxIcon className="h-5 w-5" />
                </ListItemPrefix>
                Produk
              </ListItem>
            </Link>
          )}
          {role_id == 2 ? null : (
            <Link to="kategori">
              <ListItem>
                <ListItemPrefix>
                  <InboxIcon className="h-5 w-5" />
                </ListItemPrefix>
                Kategori
              </ListItem>
            </Link>
          )}
          <Link to="riwayat">
            <ListItem>
              <ListItemPrefix>
                <ArchiveBoxIcon className="h-5 w-5" />
              </ListItemPrefix>
              Riwayat
            </ListItem>
          </Link>
          {role_id == 2 ? null : (
            <Link to="pegawai">
              <ListItem>
                <ListItemPrefix>
                  <UserCircleIcon className="h-5 w-5" />
                </ListItemPrefix>
                Pegawai
              </ListItem>
            </Link>
          )}
          <Link to="pengaturan">
            <ListItem>
              <ListItemPrefix>
                <Cog6ToothIcon className="h-5 w-5" />
              </ListItemPrefix>
              Pengaturan
            </ListItem>
          </Link>
        </List>
      </Card>
      <Outlet />
    </div>
  );
}

export const WelcomeScreen = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="flex justify-center items-center w-full flex-col">
      <img src={logo} alt="Logo" />
      <p className="text-2xl">
        Hallo <span className="font-bold text-blue-gray-800">{user?.[1]?.nama}👋</span>, Selamat datang di Aplikasi CashierMate
      </p>
    </div>
  );
};
