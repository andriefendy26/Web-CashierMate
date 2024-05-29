import React from "react";
import { Button, Alert, Dialog, CardBody, CardFooter, Card, CardHeader, Input, Typography, IconButton, Tooltip } from "@material-tailwind/react";
import { TrashIcon } from "@heroicons/react/24/solid";
import { ambilPegawai, tambahPegawai, deleteUser } from "../../../service/AuthServices";

export default function index() {
  const TABLE_HEAD = ["No", "Name", "email", ""];
  const TABLE_ROWS = [
    {
      name: "Andri",
    },
    {
      name: "Efendy",
    },
    {
      name: "Winter",
    },
  ];

  const user = JSON.parse(localStorage.getItem("user"));
  const usaha_id = user[1].usaha_id;

  const [isTrue, setisTrue] = React.useState(false);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [valueForm, setValueForm] = React.useState({
    nama_pengguna: null,
    email: null,
    password: null,
  });

  const [pegawai, setPegawai] = React.useState([]);

  React.useEffect(() => {
    const runEffect = async () => {
      const result = await ambilPegawai(usaha_id);
      console.log(result.data.data);
      setPegawai(result.data.data);
    };
    runEffect();
  }, []);

  const handleDelete = async (id) => {
    const result = await deleteUser(id, usaha_id);
    console.log(result)
    // Alert.alert(result)
  };

  const hanldeTambahPegawai = async () => {
    const result = await tambahPegawai(usaha_id, valueForm);
    if (result.data.status == 200) {
      const result = await ambilPegawai(usaha_id);
      setPegawai(result.data.data);
      setValueForm({
        nama_pengguna: null,
        email: null,
        password: null,
      });
      setModalVisible(false);
      setisTrue(true);
      setTimeout(() => {
        setisTrue(false);
      }, 5000);
    }
  };


  return (
    <div className="p-5 mt-10 w-full">
      {isTrue ? (
        <Alert className="absolute z-10 w-[50%] bottom-4" color="green">
          Berhasil Menambahkan Pegawai
        </Alert>
      ) : (
        <></>
      )}
      <Dialog size="xs" open={modalVisible} className="bg-transparent shadow-none">
        <Card className="mx-auto w-full max-w-[24rem]">
          <CardBody className="flex flex-col gap-4">
            <Typography variant="h4" color="blue-gray">
              Tambah Pegawai
            </Typography>
            <div className="flex justify-between border-b-2 pb-2">
              <Input label="Nama" onChange={(e) => setValueForm({ ...valueForm, nama_pengguna: e.target.value })}></Input>
            </div>
            <div className="flex justify-between border-b-2 pb-2">
              <Input label="Email" type="email" onChange={(e) => setValueForm({ ...valueForm, email: e.target.value })}></Input>
            </div>
            <div className="flex justify-between border-b-2 pb-2">
              <Input label="Password" type="password" onChange={(e) => setValueForm({ ...valueForm, password: e.target.value })}></Input>
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
                  hanldeTambahPegawai();
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
        <Input variant="outlined" label="Search" placeholder="Search" />
        <div className="my-5">
          <Button onClick={() => setModalVisible(true)}>Tambah Pegawai</Button>
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
              {pegawai &&
                pegawai.map(({ id, nama, email }, index) => {
                  const isLast = index === TABLE_ROWS.length - 1;
                  const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

                  return (
                    <tr key={nama}>
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
                          {email}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Tooltip content="Edit User">
                          <IconButton variant="text" onClick={() => handleDelete(id)}>
                            <TrashIcon className="h-4 w-4" />
                          </IconButton>
                        </Tooltip>
                      </td>
                    </tr>
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
