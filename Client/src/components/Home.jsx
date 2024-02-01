import { useContext, useState } from "react";

import { Box } from "@mui/material";
import { makeStyles } from "@mui/styles";

import { DataContext } from "../context/DataProvider";
import { checkParams } from "../utils/common-utils";
import { getData } from "../service/api";

//components
import Form from "./Form";
import SelectTab from "./SelectTab";
import SnackBar from "./SnackBar";
import Header from "./Header";
import Response from "./Response";
import ErrorScreen from "./ErrorScreen";
import PrevRequests from "./PrevRequests";

const useStyles = makeStyles({
  component: {
    width: "60%",
    margin: "20px auto 0 auto",
  },
});

const Home = () => {
  const classes = useStyles();

  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [errorResponse, setErrorResponse] = useState(false);
  const [apiResponse, setApiResponse] = useState({});

  const { formData, jsonText, paramData, headerData } = useContext(DataContext);

  const onSendClick = async () => {
    setError(false);
    setErrorResponse(false);
    setErrorMsg("");
    if (!checkParams(formData, jsonText, paramData, headerData, setErrorMsg)) {
      setError(true);
    }

    let response = await getData(formData, jsonText, paramData, headerData);
    if (response === "error") {
      setErrorResponse(true);
    }
    setApiResponse(response?.data);
  };

  const responseFromHistory = (data) => {
    setApiResponse(JSON.parse(data));
  };

  // return (
  //   <>
  //     <Header />
  //     <Box className={classes.component}>
  //       <Form onSendClick={onSendClick} />
  //       <SelectTab />
  //       {errorResponse ? <ErrorScreen /> : <Response data={apiResponse} />}
  //     </Box>
  //     {/* // <PrevRequests /> */}
  //     {error && (
  //       <SnackBar errorMsg={errorMsg} error={error} setError={setError} />
  //     )}
  //   </>
  // );

  return (
    <>
      <Header />
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div className={classes.sidebar}>
          <PrevRequests responseFromHistory={responseFromHistory} />
        </div>
        <Box className={classes.component}>
          <Form onSendClick={onSendClick} />
          <SelectTab />
          {errorResponse ? <ErrorScreen /> : <Response data={apiResponse} />}
        </Box>
      </div>
      {error && (
        <SnackBar errorMsg={errorMsg} error={error} setError={setError} />
      )}
    </>
  );
};

export default Home;
