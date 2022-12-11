import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import ResponsiveAppBar from "./navbar";
import { useState, useEffect } from "react";
import Licon from "./loader.svg";
import "./loader.css";
import Loader from "./loader";
import axios from "axios";
import { Box, Button, Modal, Typography } from "@mui/material";
import { Link, Navigate, useNavigate } from "react-router-dom";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { throwid } from "./store/PlanID";
import { useDispatch } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";

interface Column {
  id:
    | "flightno"
    | "orig"
    | "dest"
    | "reg"
    | "date"
    | "hours"
    | "Edit"
    | "Delete";
  label: string;
  minWidth?: number;
  align?: "right" | "left" | "center";
  format?: (value: number) => string;
}

const columns: Column[] = [
  { id: "flightno", label: "Flight #", minWidth: 8 },
  { id: "orig", label: "ORIG", minWidth: 100 },
  { id: "dest", label: "DEST", minWidth: 100 },
  {
    id: "reg",
    label: "Aircraft Registration",
    minWidth: 120,
    align: "left",
    // format: (value: number) => value.toLocaleString('en-US'),
  },
  {
    id: "date",
    label: "Date & time [UTC]",
    minWidth: 170,
    align: "center",
    format: (value: number) => value.toLocaleString(),
  },
  {
    id: "hours",
    label: "Total Flight Time",
    minWidth: 150,
    align: "center",
    format: (value: number) => value.toFixed(2),
  },
  { id: "Edit", label: "Edit", minWidth: 13 },
  { id: "Delete", label: "Delete", minWidth: 13, align: "center" },
];

interface Data {
  flightno: string;
  orig: string;
  dest: string;
  reg: string;
  date: string;
  hours: number;
}
// export function createData(
//   flightno: string,
//   orig: string,
//   dest: string,
//   reg: string,
//   date: number ,
// ): Data {
//   const hours = 120 /60;

//   return { flightno, orig, dest, reg, date, hours };
// }

let rows: any[] = [];


export default function ColumnGroupingTable() {
  const dispatch = useDispatch();
  const  navigate = useNavigate();
  //  for(let i = 0; i =1 ; i++){window.location.reload();}
  let [row, setRow] =useState(()=>[rows]);
  const [loading, setLoading] = useState(true);
 // const [plans, setPlans] = useState([rows]);
  const [del, setDel] = useState(false);
  const [showDel , setShowdel] = useState("")
  const [captureDel , setCaptureDel] = useState("")
  // console.log(location.state.uid)
  let i;
  setTimeout(() => {
    setLoading(!true);
  }, 2000);
  //
  let uid;
  useEffect(() => {
    fetchData();
  }, []);

  function fetchData() {
    //event.preventDefault();
    rows = []
    axios.get("http://localhost:3000/getAll").then((res) => {
      uid = res.data._id;
      console.log(res.data);

      for (i = 0; i < res.data.length; i++) {
        let plan = {
          flightno: res.data[i].flight,
          orig: res.data[i].orig,
          dest: res.data[i].dest,
          reg: res.data[i].aircraft,
          date: res.data[i].createdAt,
          hours: res.data[i].flightime,
          uid: res.data[i]._id,
        };
        console.log(res.data[i]._id);
        // let  updatePlans = [
        //    ...plan, plans
        //  ];
        // update the state to the updatedUsers
        rows.push(plan);
        // setRow((row)=>{row.push(plan)});
      //  setPlans(updatePlans);
         }
    });
  }

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const invokeDispatch = (id: string) => {
    dispatch(throwid(id));
  };
  const invokeDeleteModal = (id: string, flino:string) => {
    setDel(true);
    setShowdel(flino);
    setCaptureDel(id);
  };

const deletePermanently = async () =>{
  let deleteplan:object = {}
   let toDelete = captureDel;
   await axios.delete(`http://localhost:3000/delete/${toDelete}`).then(()=>
    //  rows.pop()
     setDel(false)

     )
     window.location.reload();
}
  return (
    <>
      <ResponsiveAppBar />
      {loading ? (
        <Loader />
      ) : (
        <Paper sx={{ width: "81%", mt: 10, ml: 13 }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableRow
                style={{ backgroundColor: "midnightblue ", color: "gold" }}
              >
                {columns.map((column) => (
                  <TableCell
                    sx={{ fontWeight: 600 }}
                    key={column.id}
                    align={column.align}
                    style={{ top: 57, minWidth: column.minWidth, height: 35 }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
              {/* </TableHead> */}
              <TableBody sx={{ backgroundColor: "azure" }}>
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        //key={row.orig}
                        key={row.uid}
                      >
                        {columns.map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.format && typeof value === "number"
                                ? column.format(value)
                                : value}
                              {column.id === "Edit" ? (
                                <Link to={`/viewplan/${row.uid}`}>
                                  <EditOutlinedIcon
                                    onClick={() => {
                                      invokeDispatch(row.uid);
                                    }}
                                  />
                                </Link>
                              ) : (
                                <></>
                              )}
                              {column.id === "Delete" ? (
                                <DeleteIcon
                                  onClick={() => {
                                    invokeDeleteModal(row.uid,row.flightno);
                                  }}
                                />
                              ) : (
                                <></>
                              )}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />

          {del ? (
            <div>
              <Modal
                //sx={{md:'50px' , height:'240px', width:'300px', ml:'33%', mt:'16%'}}
                open={del}
                onClose={() => setDel(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box
                  sx={{
                    position: "absolute" as "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 400,
                    bgcolor: "background.paper",
                    border: "2px solid #000",
                    boxShadow: 24,
                    p: 4,
                  }}
                >
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                  >
                    Are you sure you want to delete flight plan? {showDel}
                  </Typography>
                  <Button onClick={deletePermanently} >Yes</Button> <Button onClick={()=>{setDel(false)}}>No</Button>
                </Box>
              </Modal>
            </div>
          ) : (
            <></>)}


        </Paper>
      )}
    </>
  );
}


