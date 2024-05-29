import React, { useState } from "react";
import { FaCheck, FaTrash, FaPencilAlt } from "react-icons/fa";
import logocashier from "../../../assets/logocashier.png";
import { Input, Card, CardBody, Button, Select, Option, CardFooter, CardHeader, Typography, Alert, Dialog, DialogHeader, DialogBody, DialogFooter } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { addToCartRedux, setCartRedux, updateItemInCart, deleteItemCartRedux } from "../../../redux/cartSlice";
import { setRiwayatRedux } from "../../../redux/riwayatSlice";

import { ambilSemuaTransaksi, buatCart, tambahItem, transaksiLanjutan } from "../../../service/transaksiServices";
import Url from "../../../api/Url";

export default function index() {
  const user = JSON.parse(localStorage.getItem("user"));
  const usaha_id = user[1].usaha_id;
  const user_id = user[1].id;

  const dataKategoriRedux = useSelector((state) => state.kategori.data);
  const produkInCart = useSelector((state) => state.cart.data);
  const produk = useSelector((state) => state.produk.data);

  const dispatch = useDispatch();

  const [formValue, setFormValue] = React.useState({
    metode: null,
    bayar: null,
  });

  const [isSukses, setSukses] = React.useState({
    isShow: false,
    kembalian: "",
    total: "",
    pembayaran: "",
    diterima: "",
  });
  const [isLoading, setIsLoading] = React.useState();
  const [statAlert, setAlert] = React.useState("");

  const [selectedCategory, setSelectedCategory] = React.useState("Semua");
  const [searchQuery, setSearchQuery] = React.useState("");

  const qty = () => {
    const qty = produkInCart.map((item) => {
      return item.qty;
    });
    return qty.reduce((acc, curr) => acc + curr, 0);
  };

  const findProductNameById = (id) => {
    const foundProduk = produk.find((item) => item.id === id);
    return foundProduk ? foundProduk.nama : "Produk tidak ditemukan";
  };
  const findProductPriceById = (id) => {
    const foundProduk = produk.find((item) => item.id === id);
    return foundProduk ? foundProduk.harga : "Produk tidak ditemukan";
  };

  const handleAddToCart = async (id, qty) => {
    dispatch(addToCartRedux({ id, qty }));
    // console.log(cart);
  };

  const total = () => {
    // const product = produk.find((item: any) => item.id == id);
    const mapping = produkInCart.map((item, i) => {
      const produks = produk.find((itemp) => itemp.id == item.id);
      return produks.harga * item.qty;
    });
    
    const sum = mapping.reduce((acc, curr) => acc + curr, 0);
    // console.log(sum)
    return sum.toLocaleString();
  };

  const handleBayar = async () => {
    setIsLoading(true);
    if (formValue.metode == null || formValue.bayar == null || !produkInCart || produkInCart.length === 0) {
      setAlert("Lengkapi Form Transaksi");
      setTimeout(() => {
        setAlert("");
      }, 5000);
      setIsLoading(false);
      return;
    }

    if (formValue.bayar < total()) {
      setAlert("Uang yang dibayarkan kurang");
      setTimeout(() => {
        setAlert("");
      }, 5000);
      setIsLoading(false);
      return;
    }

    // console.log(total)

    try {
      // Membuat cart baru
      const resultCart = await buatCart({ usaha_id: usaha_id });
      console.log("Cart created:", resultCart);

      if (resultCart && resultCart.data && resultCart.data.id) {
        const id_cart = resultCart.data.id;
        // Menggunakan id_cart yang diperoleh dari resultCart.data.id
        const promises = produkInCart.map(async (item) => {
          const resultAdd = await tambahItem(
            {
              qty: item.qty,
              produk_id: item.id,
              cart_id: id_cart, // Menggunakan id_cart yang baru saja dibuat
            },
            usaha_id
          );
          return resultAdd;
        });

        const resultAdd = await Promise.all(promises);
        console.log("Items added to cart:", resultAdd);
        // Lakukan transaksi lanjutan setelah semua item ditambahkan
        const resultFinal = await transaksiLanjutan({ ...formValue }, user_id, usaha_id, id_cart);
        console.log(resultFinal);

        //mengupdate riwayat transaksi state redux
        const result = await ambilSemuaTransaksi(usaha_id);
        dispatch(setRiwayatRedux(result.data));

        setIsLoading(false);

        setSukses({
          isShow: true,
          kembalian: resultFinal.data.transaksi.kembalian,
          total: resultFinal.data.transaksi.total,
          pembayaran: resultFinal.data.transaksi.metode,
          diterima: resultFinal.data.transaksi.bayar,
        });

        //mengosongkan kembali cart redux
        dispatch(setCartRedux([]));
        setFormValue({
          metode: null,
          bayar: null,
        });
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Error:", error);
    }
  };

  React.useEffect(() => {
    console.log(selectedCategory);
    console.log(produk);
  }, [selectedCategory]);

  const filteredProducts = produk
    .filter((item) => {
      const matchesCategory = selectedCategory === "Semua" || item.kategori_id === selectedCategory;
      const matchesSearchQuery = item.nama.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearchQuery;
    })
    .filter((item) => item.qty > 0);

  return (
    <div className="p-5 mt-10 w-full">
      <Dialog open={isSukses.isShow}>
        <DialogHeader className="flex justify-center">
          <>Transaksi Berhasil</>
        </DialogHeader>
        <DialogBody className="flex flex-col items-center">
          <FaCheck size={100}></FaCheck>
          <div className="w-[70%] text-black">
            <div className="flex  justify-between">
              <Typography>Kembalian</Typography>
              <Typography>Rp.{isSukses.kembalian}</Typography>
            </div>
            <div className="w-full h-[1.3px] my-2 bg-black"></div>
            <div className="flex   justify-between">
              <Typography>Total</Typography>
              <Typography>Rp.{isSukses.total}</Typography>
            </div>
            <div className="flex  justify-between">
              <Typography>Pembayaran</Typography>
              <Typography>{isSukses.pembayaran}</Typography>
            </div>
            <div className="flex   justify-between">
              <Typography>Diterima</Typography>
              <Typography>Rp.{isSukses.diterima}</Typography>
            </div>
            <div className="flex justify-center mt-5">
              <Button variant="outlined" onClick={() => handleOpen(null)} className="mr-1">
                <span>Kirim Struk</span>
              </Button>
              <Button variant="outlined" onClick={() => handleOpen(null)} className="mr-1">
                <span>Cetak Struk</span>
              </Button>
            </div>
          </div>
        </DialogBody>
        <DialogFooter>
          <Button variant="gradient" onClick={() => setSukses({ isShow: false, kembalian: "", total: "", pembayaran: "", diterima: "" })}>
            Close
          </Button>
        </DialogFooter>
      </Dialog>

      {statAlert != "" ? <AlertWarning msg={statAlert}></AlertWarning> : null}

      <h1 className="font-bold px-10 text-4xl">Transaksi</h1>
      <div className="flex w-full p-10">
        <div className="w-[60%] ">
          <Input variant="outlined" label="Search" placeholder="Search" onChange={(e) => setSearchQuery(e.target.value)} />
          <div className="flex gap-5 mt-3">
            <Button variant="outlined" onClick={() => setSelectedCategory("Semua")}>
              Semua
            </Button>
            {dataKategoriRedux &&
              dataKategoriRedux.map((item, i) => (
                <Button key={i} variant="outlined" onClick={() => setSelectedCategory(item.id)}>
                  {item.nama}
                </Button>
              ))}
          </div>
          <div className=" mt-10 h-[450px] overflow-y-scroll scrollbar-thin scrollbar-webkit">
            <div className="flex p-1   flex-wrap gap-8">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((item, i) => (
                  <div onClick={() => handleAddToCart(item.id, 1)} key={i} className="items-center  w-36 h-52 p-4 rounded-xl shadow-xl cursor-pointer hover:ring-4 text-lg  text-black border-2 border-gray-300">
                    <img src={item.gambar != null ? `${Url.ipadress}${item.gambar}` : logocashier} className="w-full h-[50%] object-cover"></img>
                    <div className="w-full">
                      <Typography variant="h6" className="break-words">
                        {item.nama.substring(0, 10)}...
                      </Typography>
                      <Typography variant="paragraph">Rp.{item.harga.toLocaleString()}</Typography>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex justify-center w-full">
                  <Typography> Produk Masuk Kosong</Typography>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="w-[40%] px-10 ">
          <div className="flex justify-between">
            <h1 className="font-bold text-2xl mb-5">Cart</h1>
            <h1 className="font-bold text-2xl mb-5">Total : Rp.{total()}</h1>
          </div>
          <div>
            <div className="overflow-y-scroll scrollbar-thin scrollbar-webkit h-[330px] mb-3 border-2 border-gray-400 p-2 rounded-xl">
              {produkInCart.length > 0 ? (
                produkInCart.map((item, i) => (
                  <ItemInCartComp key={i} id={item.id} nama={findProductNameById(item.id)} harga={`${findProductPriceById(item.id) * item.qty}`} total={findProductPriceById(item.id) * item.qty} qtys={item.qty}></ItemInCartComp>
                ))
              ) : (
                <div className="flex justify-center">
                  <Typography>Cart Masih Kosong</Typography>
                </div>
              )}
            </div>
            <label>Metode Pembayaran</label>
            <Select value={isSukses.kategori} onChange={(value) => setFormValue({ ...formValue, metode: value })} label="Metode Pembayaran">
              <Option value="Tunai">Tunai</Option>
              <Option value="Transfer">Transfer</Option>
            </Select>
            <label>Bayar : </label>
            <Input value={isSukses.bayar} onChange={(e) => setFormValue({ ...formValue, bayar: e.target.value })} variant="outlined" type="number" label="Uang Diterima" placeholder="Search" />
            <Button className="w-full mt-5" onClick={() => handleBayar()}>
              {isLoading ? "Loading...." : "Selesaikan Transaksi"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

const ItemInCartComp = ({ id, nama, harga, total, qtys }) => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [qtyVal, setQty] = React.useState(qtys);

  // Gunakan useEffect untuk mengatur nilai qtyVal saat qtys berubah
  React.useEffect(() => {
    setQty(qtys);
  }, [qtys]);

  const dispatch = useDispatch();

  return (
    <div className="border-2 border-gray-400 p-3 my-5 rounded-xl ">
      <Dialog size="xs" open={modalVisible} className="bg-transparent shadow-none">
        <Card className="mx-auto w-full max-w-[24rem]">
          <CardBody className="flex flex-col gap-4">
            <Typography variant="h4" color="blue-gray">
              Edit Item
            </Typography>
            <div className="flex justify-between border-b-2 pb-2">
              <Typography>Nama : </Typography>
              <Typography>{nama}</Typography>
            </div>
            <div className="flex justify-between border-b-2 pb-2">
              <Typography>Harga : </Typography>
              <Typography>Rp.{harga}</Typography>
            </div>
            <div className="flex justify-between border-b-2 items-center pb-2">
              <Typography>Jumlah Barang : </Typography>
              <Button
                color="gray"
                onClick={() => {
                  if (qtyVal <= 1) return;
                  setQty(qtyVal - 1);
                }}
              >
                -
              </Button>
              <Typography>{qtyVal}</Typography>
              <Button onClick={() => setQty(qtyVal + 1)}>+</Button>
            </div>
            <div className="flex justify-center border-b-2 items-center pb-2">
              <Button onClick={() => dispatch(deleteItemCartRedux(id))} className="flex gap-1" variant="outlined" color="red">
                <FaTrash></FaTrash>
                Hapus Dari Keranjang
              </Button>
            </div>
          </CardBody>
          <CardFooter className="pt-0">
            <div className="flex gap-1">
              <Button variant="gradient" onClick={() => setModalVisible(!modalVisible)} fullWidth>
                Close
              </Button>
              <Button
                variant="gradient"
                onClick={() => {
                  dispatch(updateItemInCart({ id: id, qtyVal: qtyVal }));
                  setModalVisible(!modalVisible);
                }}
                fullWidth
              >
                Simpan
              </Button>
            </div>
          </CardFooter>
        </Card>
      </Dialog>
      <div className="flex flex-row justify-between">
        <p>{nama}</p>
        <Button onClick={() => setModalVisible(!modalVisible)} size="sm">
          <FaPencilAlt></FaPencilAlt>
        </Button>
      </div>
      <div className="flex flex-row justify-between">
        <p>Rp.{harga}</p>
        <p>Rp.{total}</p>
      </div>
    </div>
  );
};

function AlertWarning({ msg }) {
  return (
    <Alert className="absolute right-10 bottom-5 w-[40%]" color="red" variant="gradient">
      {msg ? msg : null}
    </Alert>
  );
}
