import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import axios from "axios";
import { useSnackbar } from "notistack";
import validateEmail from "./utils/validator";
import {baseURL} from "./utils/baseURL";
require('dotenv').config()

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "100%",
    },
  },
}));

export default function UserQuery() {
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();
  const [query, setQuery] = useState({});
  const [error, setError] = useState({
    fullName: false,
    email: false,
    message: false,
  });
  const [busy, setBusy] = useState(false);

  const handleInput = (value, key) => {
    setError((oldError) => ({ ...oldError, [key]: false }));
    setQuery((oldQuery) => ({ ...oldQuery, [key]: value }));
  };

  const handleSubmit = () => {
    let isError = false;

    if (!Boolean(query.fullName)) {
      isError = true;
      setError((oldError) => ({ ...oldError, fullName: true }));
      enqueueSnackbar("Full Name is required", { variant: "error" });
    }

    if (!Boolean(query.email) || !validateEmail(query.email)) {
      isError = true;
      setError((oldError) => ({ ...oldError, email: true }));
      enqueueSnackbar("Email is required", { variant: "error" });
    }

    if (!Boolean(query.message)) {
      isError = true;
      setError((oldError) => ({ ...oldError, message: true }));
      enqueueSnackbar("Message is required", { variant: "error" });
    }

    if (!isError) {
      setBusy(true);
      axios
        .post(`${baseURL}/api/v1/queries`, {query: JSON.stringify(query),})
        .then(() => {
          setBusy(false);
          setQuery({});
          enqueueSnackbar("Success!", { variant: "success" });
        })
        .catch(() => {
          setBusy(false);
          enqueueSnackbar("Something went wrong", { variant: "error" });
        });
    }
  };

  return (
    <form className={classes.root}>
      <a href={ `${baseURL}/api/v1/queries/download-csv`} target="_blank" rel="noreferrer" >Download CSV</a>
      <div>
        <TextField
          value={query.fullName || ""}
          error={error.fullName}
          label="Full Name"
          helperText={Boolean(error.fullName) ? "Incorrect Full Name!" : ""}
          variant="outlined"
          required
          onChange={(e) => handleInput(e.target.value, "fullName")}
        />
        <TextField
          value={query.email || ""}
          error={error.email}
          label="Email"
          helperText={Boolean(error.email) ? "Incorrect Email!" : ""}
          variant="outlined"
          required
          onChange={(e) => handleInput(e.target.value, "email")}
        />
      </div>
      <div>
        <TextField
          error={error.message}
          value={query.message || ""}
          label="Message"
          multiline
          rows={4}
          helperText={Boolean(error.message) ? "Incorrect Message!" : ""}
          variant="outlined"
          required
          onChange={(e) => handleInput(e.target.value, "message")}
        />
      </div>
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        disabled={busy}
      >
        Submit
      </Button>
    </form>
  );
}
