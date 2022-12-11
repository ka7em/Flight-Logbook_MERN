import React from "react";
import ReactDOM from "react-dom/client";
import Signin from "./components/signin";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./components/signup";
import ResponsiveAppBar from "./components/navbar";
import ColumnGroupingTable from "./components/flightlogs";
import CreatePlan from "./components/createpage";
import ViewPlan from "./components/viewPlan";
import { Provider } from "react-redux";
import {store} from "./components/store/store";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  //<React.StrictMode>
    <Provider store={store}>
    <BrowserRouter>
      {/* <CreatePlan/> */}
      <Routes>
        <Route path="/" element={<Signin />}></Route>
        <Route path="/register" element={<Signup />}></Route>
        <Route path="/LogBook"  element={<ColumnGroupingTable />}></Route>
        <Route path="/newplan" element={<CreatePlan />}></Route>
        <Route path="/viewplan/:id" element={<ViewPlan  />}></Route>
      </Routes>
    </BrowserRouter>
    </Provider>
  //</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
