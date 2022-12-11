import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Unstable_Grid2";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import FlightLandIcon from "@mui/icons-material/FlightLand";
import TextField from "@mui/material/TextField";
import { useState, useEffect, useRef } from "react";
import ProduceMap from "./planMap";
import axios from "axios";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Input from "@mui/material/Input";
import FlightTakeoffRoundedIcon from "@mui/icons-material/FlightTakeoffRounded";
import FlightLandRoundedIcon from "@mui/icons-material/FlightLandRounded";
import { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import AirlinesIcon from "@mui/icons-material/Airlines";
import FlightIcon from "@mui/icons-material/Flight";
import FlightClassIcon from "@mui/icons-material/FlightClass";
import SendIcon from "@mui/icons-material/Send";
import { setTimeout } from "timers/promises";
import { Navigate, redirect, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ViewPlan() {
  const items = useSelector((state: any) => state.planid);
  console.log(items.value);
  const [pid, setPid] = useState([items.value]);
  let receivedpoly: string;

  const [noteditable, setNotEditable ] = useState(true);
  const [done, setDone] = useState(true);

  const [plan, setPlan] = useState({
    orig: "OPKC",
    dest: "OMDB",
    aircraft: "",
    flight: "",
    flightime: "",
    encodedpoly: "_p~iF~ps|U_ulLnnqC_mqNvxq`@",
    date: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:3000/getOne/${pid}`).then((res) => {
      setPlan({
        ...plan,
        orig: res.data.orig,
        dest: res.data.dest,
        aircraft: res.data.aircraft,
        flight: res.data.flight,
        flightime: res.data.flightime,
        encodedpoly: res.data.encodedpoly,
        date: res.data.createdAt,
      });
    });
  }, [pid]);

  let datestringed = plan.date.split("T");
  console.log(datestringed[0]);
  let x = Date.now();
  const [calvalue, setCalvalue] = useState(x);

  console.log(plan);
  /// later set this button to false after done edititng

  const [disableButton, setDisableButton] = useState(false);

  const [flightroute, setFlightroute] = useState("");
  const handleFlightRoute = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFlightroute(e.target.value.toUpperCase());
  };
let updatedOrig=""; let updatedDest = "";
  ////////////for edits///////////////////////////
  let name, value;
  const handleInputs = (e: { target: { name: any; value: any } }) => {
    name = e.target.name;
    value = e.target.value.toUpperCase();

    setPlan({ ...plan, [name]: value });
  };
  const performUpdations = () =>{


    axios.patch(`http://localhost:3000/update/${pid}`,plan).then((res)=>{
      updatedDest= res.data.dest
      updatedOrig=  res.data.orig
      console.log(res);
      if(res.status===200){
        navigate("/LogBook")
      }
    }).then((err)=>{
      console.log(err);
    })
  }
  ///////////////////////////////////////////////

  const GetPolyline = () => {
    axios
      .get(
        `https://api.flightplandatabase.com/search/plans?fromICAO=${plan.orig}&toICAO=${plan.dest}&limit=1`
      )
      .then((res) => {
        console.log(res.status);
        console.log(res.data[0].encodedPolyline);
        receivedpoly = res.data[0].encodedPolyline;
        setPlan({ ...plan, encodedpoly: receivedpoly });
      })
      .catch((error) => {
        if (error.res) {
          console.log(error.res.status);
        } else {
          console.log(error.message);
        }
      });

  };

  const Update = () => {
      setNotEditable(!true);
      setDone(false)
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: 640,
        backgroundColor: "gainsboro",
        borderRadius: "6px",
      }}
    >
      <Typography variant="h4" sx={{ pl: 1, pt: 3 }} gutterBottom></Typography>

      <Container maxWidth="xl">
        <Box
          className="leftPortion"
          sx={{
            bgcolor: "ghostwhite",
            height: "83vh",
            borderRight: 1,
            borderColor: "text.primary",
            width: 440,
          }}
        >
          <Box sx={{ "& > :not(style)": { m: 1, mt: 4 } }}>
            <FormControl variant="standard">
              <TextField
                sx={{ width: "13vw" }}
                inputProps={{ style: { textTransform: "uppercase" } }}
                id="orig"
                name="orig"
                label="ORIG"
                placeholder="ICAO"
                value={plan.orig}
                onChange={handleInputs}
                InputProps={{
                  readOnly: noteditable,
                  startAdornment: (
                    <InputAdornment
                      sx={{ width: "15px", color: "crimson", pr: 1 }}
                      position="start"
                    >
                      <FlightTakeoffRoundedIcon />
                    </InputAdornment>
                  ),
                }}
                variant="standard"
              />
            </FormControl>
            <FormControl variant="standard">
              <TextField
                sx={{ width: "13vw" }}
                inputProps={{ style: { textTransform: "uppercase" } }}
                id="dest"
                name="dest"
                label="DEST"
                value={plan.dest}
                placeholder="ICAO"
                onChange={handleInputs}
                InputProps={{
                  readOnly: noteditable,
                  startAdornment: (
                    <InputAdornment
                      sx={{ width: "15px", color: "green", pr: 1 }}
                      position="start"
                    >
                      <FlightLandRoundedIcon />
                    </InputAdornment>
                  ),
                }}
                variant="standard"
              />
            </FormControl>
            <SendIcon
              sx={{
                ":hover": {
                  // bgcolor: 'rose', // theme.palette.primary.main
                  color: "grey",
                },
                pt: 3,
              }}
              onClick={GetPolyline}
            />

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                readOnly={true}
                label="Date"
                value={datestringed[0]}
                onChange={(newValue) => {
                  //  setCalvalue(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>

            <TextField
              inputProps={{ style: { textTransform: "uppercase" } }}
              sx={{ width: "17.7vw" }}
              value={plan.aircraft}
              name="aircraft"
              onChange={handleInputs}
              placeholder="Aircraft Registration"
              InputProps={{
                readOnly: noteditable,
                endAdornment: (
                  <InputAdornment sx={{ width: "15px" }} position="end">
                    <AirlinesIcon sx={{ color: "#0089ff", fontSize: 28.3 }} />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              inputProps={{ style: { textTransform: "uppercase" } }}
              id="standard-basic"
              variant="standard"
              name="flight"
              onChange={handleInputs}
              InputProps={{
                readOnly: noteditable,
                value: plan.flight,
                endAdornment: (
                  <InputAdornment sx={{ width: "4vw" }} position="end">
                    <FlightIcon sx={{ color: "fffff", fontSize: 22 }} />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              sx={{ width: "12vw" }}
              label="Flight Duration"
              name="flightime"
              onChange={handleInputs}
              value={plan.flightime}
              InputProps={{
                readOnly: noteditable,
                startAdornment: (
                  <InputAdornment sx={{ width: "4vw" }} position="start">
                    <FlightClassIcon sx={{ color: "silver", fontSize: 28.3 }} />
                  </InputAdornment>
                ),
              }}
            />
            <Box>
              {done?  <Button
                sx={{ mt: 0.1, ml: 12 }}
                onClick={() => {
                  Update();
                }}
                variant="contained"
              >
                Edit Flight Plan
              </Button> : <Button
                sx={{ mt: 0.1, ml: 12 }}
                onClick={() => {
                  performUpdations();
                  setDone(true);
                  setNotEditable(!false);
                  navigate('/Logbook');
                }}
                variant="contained"
              >
                Done
              </Button> }
            </Box>
          </Box>
        </Box>

        <Box
          className="rightPortion"
          sx={{
            mt: -68.2,
            ml: 55.3,
            bgcolor: "ghostwhite",
            height: "82.5vh",
            borderColor: "text.primary",
            width: 840,
          }}
        >
          <div
            style={{
              border: "2px dashed black",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "272px",
            }}
          >
            <ProduceMap ePoly={plan.encodedpoly.toString()} />
          </div>

          <Box sx={{ pt: 2, ml: 1, width: 823, maxWidth: "100%" }}>
            <TextField
              placeholder="Description"
              name="route"
              disabled={disableButton}
              onChange={handleFlightRoute}
              fullWidth
              label="Text"
              id="flightroute"
              value={flightroute}
            />
          </Box>

          <Box
            sx={{
              mt: 1,
              ml: 1,
              width: 823,
              height: 180,
              backgroundColor: "whitesmoke",
              borderRadius: 3,
              "&:hover": {
                backgroundColor: "mintcream",
                // opacity: [0.9, 0.8, 0.7],
              },
            }}
          />
        </Box>
      </Container>
    </Box>
  );
}
