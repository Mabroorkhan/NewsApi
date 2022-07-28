import DateFnsUtils from "@date-io/date-fns";
import {
  Backdrop,
  Button,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  makeStyles,
  MenuItem,
  Paper,
  Select,
  Snackbar,
  TextField,
  Theme,
  CircularProgress
} from "@material-ui/core";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider
} from "@material-ui/pickers";
import CloseIcon from "@material-ui/icons/Close";
import MuiAlert from "@material-ui/lab/Alert";
import { Field, Form, Formik, FormikHelpers } from "formik";
import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { importNews } from "../redux/Newsthunk";
import { ImportValues } from "../types/types";
import { updateImportStatus } from "../redux/Slices";

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing(4),
    backgroundColor: "#efefef"
  },
  containerPaper: {
    padding: theme.spacing(8),
    marginTop: theme.spacing(8),
    width: "100%",
    height: "100%",
    minHeight: "87vh",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(2)
    }
  },
  formWrapper: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4)
  },
  formPaper: {
    borderBottom: "1px solid",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      width: "100%"
    }
  },
  heading: {
    marginBottom: theme.spacing(4),
    border: "1px solid",
    borderRadius: "5px",
    color: "#ffff",
    backgroundColor: "#3f51b5",
    padding: "8px 4px"
  },
  field: {
    width: "100%"
  },
  buttonDiv: {
    textAlign: "right",
    marginBottom: theme.spacing(3)
  },
  formControl: {
    minWidth: 120,
    width: "100%"
  },
  deleteFormDiv: {
    minWidth: "63%",
    [theme.breakpoints.down("md")]: {
      width: "100%"
    }
  },
  mt16: {
    marginTop: theme.spacing(2)
  },
  close: {
    padding: theme.spacing(0.5)
  },
  loader: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    color: "black",
    height: "5vh !important",
    width: "5vw !important"
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff"
  }
}));

const NewsSettings: React.FC = () => {
  const classes = useStyles();
  const [from, setFrom] = useState<String | Date>(new Date().toISOString());
  const [to, setTo] = useState<String | Date>(new Date().toISOString());
  const [openSnack, setOpenSnack] = useState<boolean>(false);
  const [messageInfo, setMessageInfo] = useState<
    { key: string; message: string } | undefined
  >(undefined);
  const dispatch = useDispatch();
  const values: ImportValues = {
    q: "",
    from,
    to
  };
  const categories = { category: "" };
  const importStatus = useSelector<{
    ReducerSlice: { importStatus: string | null };
  }>((state) => state.ReducerSlice.importStatus);

  const handleFormikSubmit = async (
    values: ImportValues,
    formikHelpers: FormikHelpers<ImportValues>
  ) => {
    console.log("Values: ", values);

    await dispatch(importNews(values));
    if (importStatus === "success") {
      setOpenSnack(true);
      setMessageInfo({
        key: "success",
        message: "Import Successfull"
      });
    } else if (importStatus === "failed") {
      setOpenSnack(true);
      setMessageInfo({
        key: "failed",
        message: "Import Failed"
      });
    }

    setTimeout(() => {
      setOpenSnack(false);
      setMessageInfo(undefined);
      dispatch(updateImportStatus());
    }, 6000);
  };

  const handleFromDateChange = (e: any) => {
    setFrom(new Date(e).toISOString());
  };

  const handleToDateChange = (e: any) => {
    setTo(new Date(e).toISOString());
  };

  const handleSnackClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnack(false);
  };

  return (
    <>
      <Backdrop
        className={classes.backdrop}
        open={importStatus === "loading"}
        invisible={importStatus !== "loading"}
      >
        <CircularProgress color="inherit" className={classes.loader} />
      </Backdrop>
      <Snackbar
        key={messageInfo ? messageInfo.key : undefined}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left"
        }}
        open={openSnack}
        autoHideDuration={6000}
        onClose={handleSnackClose}
        message={messageInfo ? messageInfo.message : undefined}
        action={
          <React.Fragment>
            <IconButton
              aria-label="close"
              color="inherit"
              className={classes.close}
              onClick={handleSnackClose}
            >
              <CloseIcon />
            </IconButton>
          </React.Fragment>
        }
      >
        <MuiAlert severity={importStatus ==="success" ? "success" : "error"} variant="filled" elevation={6}></MuiAlert>
      </Snackbar>
      <div className={classes.container}>
        <Paper className={classes.containerPaper}>
          <div>
            <Formik initialValues={values} onSubmit={handleFormikSubmit}>
              {(formikProps) => {
                return (
                  <Grid container spacing={2} justifyContent="center">
                    <Grid item xs={10} md={8}>
                      <div className={classes.formWrapper}>
                        <div className={classes.formPaper}>
                          <div className={classes.heading}>
                            <h1>Settings</h1>
                          </div>
                          <Form
                            onSubmit={formikProps.handleSubmit}
                            autoComplete="off"
                          >
                            <Grid item xs={12}>
                              <h2>Import News</h2>
                            </Grid>
                            <Grid item xs={12}>
                              <Field
                                id="q"
                                name="q"
                                label="Search key"
                                component={TextField}
                                margin="normal"
                                placeholder="Enter Keyword to Import"
                                onChange={formikProps.handleChange}
                                className={classes.field}
                              />
                            </Grid>
                            <Grid container spacing={2}>
                              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <Grid item xs={6}>
                                  <Field
                                    id="from"
                                    name="from"
                                    label="From"
                                    component={KeyboardDatePicker}
                                    format="yyyy-MM-dd"
                                    value={from}
                                    margin="normal"
                                    disableFuture={true}
                                    className={classes.field}
                                    onChange={(e: any) => {
                                      handleFromDateChange(e);
                                      formikProps.setFieldValue(
                                        "from",
                                        new Date(e).toISOString()
                                      );
                                    }}
                                    KeyboardButtonProps={{
                                      "aria-label": "change date"
                                    }}
                                  />
                                </Grid>
                                <Grid item xs={6}>
                                  <Field
                                    id="to"
                                    name="to"
                                    label="To"
                                    component={KeyboardDatePicker}
                                    format="yyyy-MM-dd"
                                    value={to}
                                    margin="normal"
                                    disableFuture={true}
                                    className={classes.field}
                                    onChange={(e: any) => {
                                      handleToDateChange(e);
                                      formikProps.setFieldValue(
                                        "to",
                                        new Date(e).toISOString()
                                      );
                                    }}
                                    KeyboardButtonProps={{
                                      "aria-label": "change date"
                                    }}
                                  />
                                </Grid>
                              </MuiPickersUtilsProvider>
                            </Grid>
                            <Grid item xs={12}>
                              <div
                                className={`${classes.buttonDiv} ${classes.mt16}`}
                              >
                                <Button
                                  variant="outlined"
                                  color="primary"
                                  type="submit"
                                >
                                  Import
                                </Button>
                              </div>
                            </Grid>
                          </Form>
                        </div>
                      </div>
                    </Grid>
                  </Grid>
                );
              }}
            </Formik>
          </div>

          <div>
            <Formik initialValues={categories} onSubmit={() => {}}>
              {(formikProps) => {
                return (
                  <Grid container justifyContent="center">
                    <Grid item xs={10} md={8}>
                      <div className={classes.formWrapper}>
                        <div className={classes.formPaper}>
                          <Form
                            onSubmit={formikProps.handleSubmit}
                            autoComplete="off"
                          >
                            <Grid item xs={12}>
                              <h2>Delete Category</h2>
                            </Grid>
                            <Grid item xs={12}>
                              <FormControl className={classes.formControl}>
                                <InputLabel htmlFor="category">
                                  Categories
                                </InputLabel>
                                <Select
                                  id="category"
                                  name="category"
                                  value={formikProps.values.category}
                                  onChange={formikProps.handleChange}
                                >
                                  <MenuItem value="">Select</MenuItem>
                                </Select>
                              </FormControl>
                            </Grid>
                            <Grid item xs={12} style={{ marginTop: "16px" }}>
                              <div className={classes.buttonDiv}>
                                <Button variant="outlined" color="secondary">
                                  Delete
                                </Button>
                              </div>
                            </Grid>
                          </Form>
                        </div>
                      </div>
                    </Grid>
                  </Grid>
                );
              }}
            </Formik>
          </div>
        </Paper>
      </div>
    </>
  );
};

export default NewsSettings;
