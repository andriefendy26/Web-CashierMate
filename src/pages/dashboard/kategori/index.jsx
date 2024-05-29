import React from "react";
import { Button, Card, CardBody, Dialog, DialogHeader, DialogBody, DialogFooter, CardFooter, Input, Typography, IconButton, Tooltip } from "@material-tailwind/react";
import { TrashIcon } from "@heroicons/react/24/solid";

import { useSelector, useDispatch } from "react-redux";
import { addKategoriRedux, setKategoriRedux } from "../../../redux/kategoriSlice";
import { setProdukRedux } from "../../../redux/produkSlice";

import { tambahKategori, hapusKategori, ambilProduk } from "../../../service/ProdukServices";

export default function index() {
  const TABLE_HEAD = ["No", "Name", ""];

  const user = JSON.parse(localStorage.getItem("user"));
  const usaha_id = user[1].usaha_id;
  const dataProdukRedux = useSelector((state) => state.produk.data);
  const [searchQuery, setSearchQuery] = React.useState("");
  const dataKategoriRedux = useSelector((state) => state.kategori.data);
  const dispatch = useDispatch();

  const [modalVisible, setModalVisible] = React.useState(false);
  const [valueForm, setValueForm] = React.useState({
    nama: undefined,
  });
  const [isLoading, setLoading] = React.useState(false);

  const handleTambahKategori = async () => {
    setLoading(true);
    if (!valueForm) return;
    const result = await tambahKategori(usaha_id, {
      ...valueForm,
    });
    if (result.status === 200) {
      dispatch(addKategoriRedux({ id: result.data.id, nama: result.data.nama }));
      setLoading(false);
      setModalVisible(false);
    }
    setModalVisible(false);
    setLoading(false);
  };

  // Memfilter kategori berdasarkan pencarian
  const filteredKategories = dataKategoriRedux.filter((item) => item.nama.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="p-5 mt-10 w-full">
      {/* Dialog Hapus Kategori */}

      {/* Dialog Tamabah Kategori */}
      <Dialog size="xs" open={modalVisible} className="bg-transparent shadow-none">
        <Card className="mx-auto w-full max-w-[24rem]">
          <CardBody className="flex flex-col gap-4">
            <Typography variant="h4" color="blue-gray">
              Tambah Kategori
            </Typography>
            <div className="flex justify-between border-b-2 pb-2">
              <Input label="Nama" onChange={(e) => setValueForm({ ...valueForm, nama: e.target.value })}></Input>
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
                  handleTambahKategori();
                }}
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
        <Input variant="outlined" label="Search" placeholder="Search" onChange={(e) => setSearchQuery(e.target.value)} />
        <div className="my-5">
          <Button onClick={() => setModalVisible(true)}>Tambah Kategori</Button>
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
              {filteredKategories &&
                filteredKategories.map((item, index) => {
                  const isLast = index === filteredKategories.length - 1;
                  const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

                  return <TableRow key={index} index={index} classes={classes} nama={item.nama} id={item.id}></TableRow>;
                })}
            </tbody>
          </table>
        </Card>
      </div>
    </div>
  );
}
const TableRow = ({ index, classes, nama, id }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const usaha_id = user[1].usaha_id;
  const dataKategoriRedux = useSelector((state) => state.kategori.data);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(!open);
  const [isLoading, setLoading] = React.useState(false);
  const dispatch = useDispatch();

  const handleHapusKategori = async (id) => {
    setLoading(true);
    if (!id) return;
    await hapusKategori(id, usaha_id);
    const filter = dataKategoriRedux.filter((item) => item.id !== id);
    dispatch(setKategoriRedux([...filter]));
    const result = await ambilProduk(usaha_id);
    dispatch(setProdukRedux(result));
    setLoading(false);
  };

  return (
    <tr key={index}>
      <Dialog open={open} handler={handleOpen} size="xs">
        <DialogHeader>Anda Yakin Ingin Mengapus Kategori Ini ?</DialogHeader>
        <DialogBody className="border-2">Semua Item/Produk yang terkait dengan kategori ini akan di hapus</DialogBody>
        <DialogFooter>
          <Button variant="outlined" color="red" onClick={handleOpen} className="mr-1">
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" onClick={() => handleHapusKategori(id)}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
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
        <Tooltip content="Hapus Kategori">
          <IconButton variant="text" onClick={() => handleOpen()}>
            <TrashIcon className="h-4 w-4" />
          </IconButton>
        </Tooltip>
      </td>
    </tr>
  );
};
