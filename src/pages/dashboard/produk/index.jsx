import React from "react";
import { Button, Select, Option, Card, Dialog, CardFooter, CardBody, Input, Typography, IconButton, Tooltip } from "@material-tailwind/react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";

import { simpanProduk } from "../../../service/ProdukServices";

import { setProdukRedux } from "../../../redux/produkSlice";
import { useSelector, useDispatch } from "react-redux";

import { ambilProduk, editProduk, hapusProduk } from "../../../service/ProdukServices";

export default function index() {
  const TABLE_HEAD = ["No", "Name", "Kategori", "Stock", "Aksi"];
  const user = JSON.parse(localStorage.getItem("user"));
  const usaha_id = user[1].usaha_id;

  const dataKategoriRedux = useSelector((state) => state.kategori.data);
  const dataProdukRedux = useSelector((state) => state.produk.data);
  const dispatch = useDispatch();

  const [searchQuery, setSearchQuery] = React.useState("");

  const [modalVisible, setModalVisible] = React.useState(false);
  const [valueForm, setValueForm] = React.useState({
    nama: undefined,
    harga: undefined,
    qty: 1,
    kategori_id: undefined,
  });
  const [isLoading, setLoading] = React.useState(false);

  const [imageUri, setImageUri] = React.useState(null);
  const [imageFix, setImageFix] = React.useState(null);
  const formData = new FormData();

  const onImageUpload = (e) => {
    const file = e.target.files[0];
    setImageFix(file);
    // setImageFix(file);
  };

  const handleTambahProduk = async () => {
    if (valueForm.nama == undefined || valueForm.harga == undefined || valueForm.kategori_id == undefined) {
      alert("Semua Kolom harus di isi");
      return false;
    }
    formData.append("nama", valueForm.nama);
    formData.append("harga", valueForm.harga);
    formData.append("kategori_id", valueForm.kategori_id);
    formData.append("qty", valueForm.qty);
    // formData.append("gambar", imageFix);
    if (imageFix) {
      formData.append("gambar", imageFix);
    }
    console.log(imageFix);
    console.log("formdata", formData);
    setLoading(true);
    const result = await simpanProduk(formData, usaha_id);

    if (result.status == 200) {
      setModalVisible(!modalVisible);
      dispatch(setProdukRedux(result.data));
      console.log(result.data);
      setValueForm({
        nama: undefined,
        harga: undefined,
        qty: 1,
        kategori_id: undefined,
      });
      setLoading(false);
    } else {
      setModalVisible(!modalVisible);
      setValueForm({
        nama: undefined,
        harga: undefined,
        qty: 1,
        kategori_id: undefined,
      });
      console.log(result);
      setLoading(false);
    }
  };

  const filteredProducts = dataProdukRedux.filter((item) => item.nama.toLowerCase().includes(searchQuery.toLowerCase())).filter((item) => item.qty > 0);

  return (
    <div className="p-5 mt-10 w-full">
      {/* Modal Add Produk */}

      <Dialog size="xs" open={modalVisible} className="bg-transparent shadow-none">
        <Card className="mx-auto w-full max-w-[24rem]">
          <CardBody className="flex flex-col gap-4">
            <Typography variant="h4" color="blue-gray">
              Tambah Produk
            </Typography>
            <div className="flex justify-between border-b-2 pb-2">
              <Input label="Nama" onChange={(e) => setValueForm({ ...valueForm, nama: e.target.value })}></Input>
            </div>
            <div className="flex justify-between border-b-2 pb-2">
              <Input label="Harga" type="number" onChange={(e) => setValueForm({ ...valueForm, harga: e.target.value })}></Input>
            </div>
            <div className="flex justify-between border-b-2 items-center pb-2">
              <Typography>Upload Image : </Typography>
              <Input type="file" onChange={(e) => onImageUpload(e)}></Input>
            </div>
            <div className="flex justify-between border-b-2 items-center pb-2">
              <Typography>Jumlah Barang : </Typography>
              <Button
                color="gray"
                onClick={() => {
                  if (valueForm.qty <= 1) return;
                  setValueForm({ ...valueForm, qty: valueForm.qty + 1 });
                }}
              >
                -
              </Button>
              <Typography>{valueForm.qty}</Typography>
              <Button onClick={() => setValueForm({ ...valueForm, qty: valueForm.qty + 1 })}>+</Button>
            </div>
            <div className="flex justify-center border-b-2 items-center pb-2">
              <Select onChange={(val) => setValueForm({ ...valueForm, kategori_id: parseInt(val) })} label="Kategori Produk">
                {dataKategoriRedux.map((item, i) => (
                  <Option key={i} value={String(item.id)}>
                    {item.nama}
                  </Option>
                ))}
              </Select>
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
                  handleTambahProduk();
                }}
                loading={isLoading}
                fullWidth
              >
                Simpan
              </Button>
            </div>
          </CardFooter>
        </Card>
      </Dialog>
      <h1 className="font-bold px-10 text-4xl">Manajemen Produk</h1>
      <div className="p-10">
        <Input variant="outlined" label="Search" placeholder="Search" onChange={(e) => setSearchQuery(e.target.value)}/>
        <div className="my-5">
          <Button onClick={() => setModalVisible(!modalVisible)} className=" mr-5">
            Tambah Produk
          </Button>
        </div>
        <Card className=" w-full overflow-y-scroll h-[510px] scrollbar-thin scrollbar-webkit">
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                    <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredProducts &&
                filteredProducts.map((item, index) => {
                  const isLast = index === filteredProducts.length - 1;
                  const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

                  return (
                    <RowProduk key={index} index={index} id={item.id} harga={item.harga} classes={classes} nama={item.nama} kategori={item.kategori.nama} kategori_id={item.kategori_id} qty={item.qty} usaha_id={item.usaha_id}></RowProduk>
                  );
                })}
            </tbody>
          </table>
        </Card>
      </div>
      <div className="w-[30%]"></div>
    </div>
  );
}

const RowProduk = ({ index, id, classes, nama, kategori, kategori_id, qty, harga, usaha_id }) => {
  const [ModalVisible, setModalVisible] = React.useState(false);
  // const [value, setValue] = React.useState(kategori);
  
  const [valueForm, setValueForm] = React.useState({
    nama: nama,
    harga: harga.toString(),
    qty: qty,
    kategori_id: kategori_id,
  });
  const dataKategoriRedux = useSelector((state) => state.kategori.data);
  const dataProdukRedux = useSelector((state) => state.produk.data);
  const dispatch = useDispatch();

  const handleEditProduk = async () => {
    const result = await editProduk(valueForm, id, usaha_id);
    if (!result) {
      console.log(result);
      return;
    }
    const getAllProduk = await ambilProduk(usaha_id);
    dispatch(setProdukRedux(getAllProduk));
    setModalVisible(false);
  };

  const handleDelete = async () => {
    // setLoading(true);
    const result = await hapusProduk(id, usaha_id);
    if (result.status === 200) {
      const filter = dataProdukRedux.filter((items) => items.id !== id);
      dispatch(setProdukRedux(filter));
      // setLoading(false);
    }
    console.log(result.message);
  };

  return (
    <tr key={index}>
      <Dialog size="xs" open={ModalVisible} className="bg-transparent shadow-none">
        <Card className="mx-auto w-full max-w-[24rem]">
          <CardBody className="flex flex-col gap-4">
            <Typography variant="h4" color="blue-gray">
              Edit Produk
            </Typography>
            <div className="flex justify-between border-b-2 pb-2">
              <Input defaultValue={valueForm.nama} label="Nama" onChange={(e) => setValueForm({ ...valueForm, nama: e.target.value })}></Input>
            </div>
            <div className="flex justify-between border-b-2 pb-2">
              <Input defaultValue={valueForm.harga} label="Harga" type="number" onChange={(e) => setValueForm({ ...valueForm, harga: e.target.value })}></Input>
            </div>
            <div className="flex justify-between border-b-2 items-center pb-2">
              <Typography>Jumlah Barang : </Typography>
              <Button
                color="gray"
                onClick={() => {
                  if (valueForm.qty <= 1) return;
                  setValueForm({ ...valueForm, qty: valueForm.qty + 1 });
                }}
              >
                -
              </Button>
              <Typography>{valueForm.qty}</Typography>
              <Button onClick={() => setValueForm({ ...valueForm, qty: valueForm.qty + 1 })}>+</Button>
            </div>
            <div className="flex justify-center border-b-2 items-center pb-2">
              <Select value={String(valueForm.kategori_id)} onChange={(val) => setValueForm({ ...valueForm, kategori_id: parseInt(val) })} label="Kategori Produk">
                {dataKategoriRedux.map((item, i) => (
                  <Option key={i} value={String(item.id)}>
                    {item.nama}
                  </Option>
                ))}
              </Select>
            </div>
          </CardBody>
          <CardFooter className="pt-0">
            <div className="flex gap-1">
              <Button variant="gradient" onClick={() => setModalVisible(!ModalVisible)} fullWidth>
                Close
              </Button>
              <Button
                variant="gradient"
                onClick={() => {
                  handleEditProduk();
                }}
                fullWidth
              >
                Simpan
              </Button>
            </div>
          </CardFooter>
        </Card>
      </Dialog>
      <td className={classes}>
        <Typography variant="small" color="blue-gray" className="font-normal">
          {index + 1}
        </Typography>
      </td>
      <td className={classes}>
        <Typography variant="small" color="blue-gray" className="font-normal">
          {nama}
        </Typography>
      </td>
      <td className={classes}>
        <Typography variant="small" color="blue-gray" className="font-normal">
          {kategori}
        </Typography>
      </td>
      <td className={classes}>
        <Typography variant="small" color="blue-gray" className="font-normal">
          {qty}
        </Typography>
      </td>
      <td className={classes}>
        <Tooltip content="Edit Produk">
          <IconButton variant="text" onClick={() => setModalVisible(!ModalVisible)}>
            <PencilIcon className="h-4 w-4" />
          </IconButton>
        </Tooltip>
        <Tooltip content="Hapus Produk">
          <IconButton variant="text" onClick={() => handleDelete()}>
            <TrashIcon className="h-4 w-4" />
          </IconButton>
        </Tooltip>
      </td>
    </tr>
  );
};
