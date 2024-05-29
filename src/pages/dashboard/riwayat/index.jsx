import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Card,
  Typography,
  IconButton,
  Tooltip,
  Input,
  Popover,
  PopoverHandler,
  PopoverContent,
} from "@material-tailwind/react";
import { WindowIcon } from "@heroicons/react/24/solid";
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/24/outline";

import { useSelector } from "react-redux";

import { ambilDetailTransaksi } from "../../../service/transaksiServices";

export default function Index() {
  const TABLE_HEAD = ["No", "Kasir", "Tanggal", "Metode", "Total", ""];
  const dataRiwayatRedux = useSelector((state) => state.riwayat.data);

  const [date, setDate] = React.useState(null);
  const [filteredData, setFilteredData] = React.useState(dataRiwayatRedux);

  React.useEffect(() => {
    if (date) {
      const filtered = dataRiwayatRedux.filter((item) => format(new Date(item.tanggal), "PPP") === format(date, "PPP"));
      setFilteredData(filtered);
    } else {
      setFilteredData(dataRiwayatRedux);
    }
  }, [date, dataRiwayatRedux]);

  return (
    <div className="p-5 mt-10 w-full">
      <h1 className="font-bold px-10 text-4xl">Riwayat Transaksi</h1>
      <div className="p-10">
        <div className="flex items-center space-x-4 mb-4">
          <Popover placement="bottom">
            <PopoverHandler>
              <Input label="Select a Date" onChange={() => null} value={date ? format(date, "PPP") : ""} />
            </PopoverHandler>
            <PopoverContent>
              <DayPicker
                mode="single"
                selected={date}
                onSelect={setDate}
                showOutsideDays
                className="border-0"
                classNames={{
                  caption: "flex justify-center py-2 mb-4 relative items-center",
                  caption_label: "text-sm font-medium text-gray-900",
                  nav: "flex items-center",
                  nav_button: "h-6 w-6 bg-transparent hover:bg-blue-gray-50 p-1 rounded-md transition-colors duration-300",
                  nav_button_previous: "absolute left-1.5",
                  nav_button_next: "absolute right-1.5",
                  table: "w-full border-collapse",
                  head_row: "flex font-medium text-gray-900",
                  head_cell: "m-0.5 w-9 font-normal text-sm",
                  row: "flex w-full mt-2",
                  cell: "text-gray-600 rounded-md h-9 w-9 text-center text-sm p-0 m-0.5 relative",
                  day: "h-9 w-9 p-0 font-normal",
                  day_selected: "rounded-md bg-gray-900 text-white hover:bg-gray-900 hover:text-white focus:bg-gray-900 focus:text-white",
                  day_today: "rounded-md bg-gray-200 text-gray-900",
                  day_outside: "text-gray-500 opacity-50",
                  day_disabled: "text-gray-500 opacity-50",
                  day_hidden: "invisible",
                }}
                components={{
                  IconLeft: ({ ...props }) => <ChevronLeftIcon {...props} className="h-4 w-4 stroke-2" />,
                  IconRight: ({ ...props }) => <ChevronRightIcon {...props} className="h-4 w-4 stroke-2" />,
                }}
              />
            </PopoverContent>
          </Popover>
          <Button variant="outlined" onClick={() => setDate(null)}>
            Tampilkan Semua
          </Button>
        </div>
        <Card className="w-full mt-5 overflow-y-scroll h-[510px] scrollbar-thin scrollbar-webkit">
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
              {filteredData &&
                filteredData.map(({ id, usaha_id, user, tanggal, metode, total, kembalian }, index) => {
                  const isLast = index === filteredData.length - 1;
                  const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
                  return <RowRiwayat key={index} classes={classes} index={index} nama={user.nama} tanggal={tanggal} metode={metode} total={total.toLocaleString()} id={id} usaha_id={usaha_id} kembalian={kembalian}></RowRiwayat>;
                })}
            </tbody>
          </table>
        </Card>
      </div>
    </div>
  );
}

const RowRiwayat = ({ index, classes, nama, tanggal, metode, total, id, usaha_id, kembalian }) => {
  const [modalVisible, setModalVisible] = React.useState(false);

  const [detail, setDetail] = React.useState();
  const [item, setItem] = React.useState([]);

  const handleDetailProduk = async () => {
    const result = await ambilDetailTransaksi(usaha_id, id);
    console.log(result.data.detail);
    setDetail(result.data.detail);
    console.log(result.data.item);
    setItem(result.data.item);
  };

  return (
    <tr key={index}>
      <Dialog open={modalVisible} size="md">
        <DialogHeader className="flex justify-center">Detail</DialogHeader>
        <DialogBody className="flex flex-col items-center">
          <div className="w-[70%] text-black">
            <Typography variant="h5">Detail Transaksi</Typography>
            <div className="flex justify-between">
              <Typography>Kasir :</Typography>
              <Typography>{nama}</Typography>
            </div>
            <div className="flex justify-between">
              <Typography>Tanggal</Typography>
              <Typography>{tanggal}</Typography>
            </div>
            <div className="flex justify-between">
              <Typography>Metode</Typography>
              <Typography>{metode}</Typography>
            </div>
            <div className="w-full h-[1.3px] my-2 bg-black"></div>
            <Typography variant="h5">Detail Pembelian</Typography>
            <div className="h-[150px] overflow-y-scroll scrollbar-thin scrollbar-webkit">
              {item &&
                item.map((item, i) => (
                  <div key={i} className="flex">
                    <div className="w-full border-b-[1px] border-gray-400 pb-2">
                      <div className="flex justify-between">
                        <Typography>{item.produk.nama}</Typography>
                      </div>
                      <div className="flex justify-between">
                        <Typography>
                          Rp.{item.produk.harga.toLocaleString()} x {item.qty}
                        </Typography>
                        <Typography>Rp.{item.total.toLocaleString()}</Typography>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
            <div className="flex mt-2 justify-between">
              <Typography>Sub Total</Typography>
              <Typography>Rp.{total}</Typography>
            </div>
            <div className="w-full h-[2px] my-2 bg-black"></div>
            <div className="flex justify-between">
              <Typography variant="h6">Total</Typography>
              <Typography variant="h6">Rp.{total}</Typography>
            </div>
            <div className="w-full h-[2px] my-2 bg-black"></div>
            <div className="flex justify-between">
              <Typography>Dibayar</Typography>
              <Typography>Rp.{total}</Typography>
            </div>
            <div className="flex justify-between">
              <Typography>Kembalian</Typography>
              <Typography>Rp.{kembalian}</Typography>
            </div>
            <div className="flex justify-center mt-5">
              <Button variant="outlined" onClick={() => null} className="mr-1">
                <span>Kirim Struk</span>
              </Button>
              <Button variant="outlined" onClick={() => null} className="mr-1">
                <span>Cetak Struk</span>
              </Button>
            </div>
          </div>
        </DialogBody>
        <DialogFooter>
          <Button variant="gradient" onClick={() => setModalVisible(false)}>
            Close
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
        <Typography variant="small" color="blue-gray" className="font-normal">
          {tanggal}
        </Typography>
      </td>
      <td className={classes}>
        <Typography variant="small" color="blue-gray" className="font-normal">
          {metode}
        </Typography>
      </td>
      <td className={classes}>
        <Typography variant="small" color="blue-gray" className="font-normal">
          Rp.{total}
        </Typography>
      </td>
      <td className={classes}>
        <Tooltip content="Open Detail">
          <IconButton
            variant="text"
            onClick={() => {
              handleDetailProduk();
              setModalVisible(true);
            }}
          >
            <WindowIcon className="h-4 w-4" />
          </IconButton>
        </Tooltip>
      </td>
    </tr>
  );
};
