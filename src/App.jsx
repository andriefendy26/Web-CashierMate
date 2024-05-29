import { createBrowserRouter, RouterProvider, Route, Link } from "react-router-dom";

import { useState, useEffect } from "react";
import AuthContext from "./service/AuthContext";

//redux
import store from "./redux/store";
import { Provider } from "react-redux";

import { ThemeProvider } from "@material-tailwind/react";

import Homepage from "./pages/homepage";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import Dashboard from "./pages/dashboard/dashboard";
import Beranda from "./pages/dashboard/beranda";
import Transaksi from "./pages/dashboard/transaksi";
import Produk from "./pages/dashboard/produk";
import Kategori from "./pages/dashboard/kategori";
import Laporan from "./pages/dashboard/laporan";
import Pegawai from "./pages/dashboard/pegawai";
import Riwayat from "./pages/dashboard/riwayat";
import Pengaturan from "./pages/dashboard/pengaturan";

import { WelcomeScreen } from "./pages/dashboard/dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage></Homepage>,
  },
  {
    path: "login",
    element: <Login></Login>,
  },
  {
    path: "register",
    element: <Register></Register>,
  },
  {
    path: "dashboard/",
    element: <Dashboard></Dashboard>,
    children: [
      { index: true, element: <WelcomeScreen></WelcomeScreen> },
      {
        path: "beranda",
        element: <Beranda />,
      },
      {
        path: "transaksi",
        element: <Transaksi />,
      },
      {
        path: "produk",
        element: <Produk />,
      },
      {
        path: "Kategori",
        element: <Kategori />,
      },
      {
        path: "riwayat",
        element: <Riwayat />,
      },
      // {
      //   path: "laporan",
      //   element: <Laporan />,
      // },
      {
        path: "pegawai",
        element: <Pegawai />,
      },
      {
        path: "pengaturan",
        element: <Pengaturan />,
      },
    ],
  },
]);

function App() {
  const [user, setUsers] = useState();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setUsers(user);
  }, []);

  return (
    <ThemeProvider>
      <AuthContext.Provider value={{ user, setUsers }}>
        <Provider store={store}>
          <RouterProvider router={router} />;
        </Provider>
      </AuthContext.Provider>
    </ThemeProvider>
  );
}

export default App;
