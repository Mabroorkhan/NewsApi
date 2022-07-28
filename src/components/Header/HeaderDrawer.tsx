import {
  Button,
  InputLabel,
  Paper,
  Select,
  TextField,
  MenuItem,
  Grid,
  makeStyles,
  Theme
} from "@material-ui/core";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider
} from "@material-ui/pickers";
import { Field, Form, Formik, FormikHelpers } from "formik";
import { useDispatch } from "react-redux";
import DateFnsUtils from "@date-io/date-fns";
import { Values } from "../types/types";
import { addApi } from "../redux/Slices";
import React, { useState } from "react";

const useStyles = makeStyles((theme: Theme) => ({
  newsContainer: {
    width: "100%",
    height: "100%"
  },
  formikContainer: {
    width: "100%",
    margin: "0px",
    padding: "2vw 0vw",
    display: "flex",
    // flexDirection: "column",
    justifyContent: "center"
  },
  field: {
    width: "16%",
    marginRight: "2vw",
    [theme.breakpoints.down("xs")]: {
      width: "40%"
    },
  },
  textField: {
    width: "16%",
    marginRight: "2vw",
    marginTop: "0vh !important",
    [theme.breakpoints.down("xs")]: {
      width: "40%"
    },
  },
  select: {
    display: "inline-block",
    marginRight: "2vw"
  },
  formWrapper: {
    margin: "0px",
    marginLeft: "2vw",
    padding: "0px",
    width: "100%"
  },
  button: {
    marginLeft: "0vh"
  }
}));

const HeaderDrawer:React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [from, setFrom] = useState<string>(new Date().toISOString());
  const [to, setTo] = useState<string>(new Date().toISOString());
  const category = [
    "currency",
    "samsung",
    "laptop",
    "movie",
    "wrestling",
    "politics",
    "technology",
    "weather",
    "programming",
    "apple",
    "religion",
    "music",
    "tesla",
    "mobile",
    "pakistan",
    "crime",
    "sports",
    "bitcoin",
    "cars",
    "flight"
  ];
  const sort: Array<{ key: string; name: string }> = [
    { key: "publishedAt", name: "Published At" },
    { key: "title", name: "Title" },
    { key: "author", name: "Author" }
  ];
  const values: Values = {
    title: "",
    from,
    to,
    sortBy: "",
    sourceId: ""
  };

  const handleSubmit = (
    values: Values,
    formikHelpers: FormikHelpers<Values>
  ) => {
    dispatch(addApi(values));
  };

  const handleFromDateChange = (e: any) => {
    setFrom(new Date(e).toISOString());
  };

  const handleToDateChange = (e: any) => {
    setTo(new Date(e).toISOString());
  };
  return (
    <div className={classes.newsContainer}>
      <Paper>
        <div className={classes.formikContainer}>
          <Formik initialValues={values} onSubmit={handleSubmit}>
            {(formikProps) => {
              return (
                <Form onSubmit={formikProps.handleSubmit} autoComplete="off">
                  <Grid container justifyContent="center">
                    <div className={classes.formWrapper}>
                      <Field
                        id="title"
                        type="search"
                        name="title"
                        label="News Search"
                        component={TextField}
                        margin="normal"
                        placeholder="Search for news here..."
                        className={classes.textField}
                        onChange={formikProps.handleChange}
                      />
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <Field
                          id="from"
                          label="From"
                          format="yyyy-MM-dd"
                          value={from}
                          onChange={(e: any) => {
                            handleFromDateChange(e);
                            formikProps.setFieldValue(
                              "from",
                              new Date(e).toISOString()
                            );
                          }}
                          component={KeyboardDatePicker}
                          className={classes.field}
                          KeyboardButtonProps={{
                            "aria-label": "change date"
                          }}
                        />
                        <Field
                          id="to"
                          name="to"
                          label="To"
                          format="yyyy-MM-dd"
                          value={to}
                          onChange={(e: any) => {
                            handleToDateChange(e);
                            formikProps.setFieldValue(
                              "to",
                              new Date(e).toISOString()
                            );
                          }}
                          component={KeyboardDatePicker}
                          className={classes.field}
                          KeyboardButtonProps={{
                            "aria-label": "change date"
                          }}
                        />
                      </MuiPickersUtilsProvider>
                      <div className={classes.select}>
                        <InputLabel htmlFor="sortBy" shrink>
                          Sort By
                        </InputLabel>
                        <Select
                          id="sortBy"
                          name="sortBy"
                          value={formikProps.values.sortBy}
                          onChange={formikProps.handleChange}
                          displayEmpty
                        >
                          <MenuItem value="">Select One</MenuItem>
                          {sort.map((sortVal, index) => {
                            return (
                              <MenuItem value={sortVal.key} key={index}>
                                {sortVal.name}
                              </MenuItem>
                            );
                          })}
                        </Select>
                      </div>
                      <div className={classes.select}>
                        <InputLabel htmlFor="category" shrink>
                          Category
                        </InputLabel>
                        <Select
                          id="sourceId"
                          name="sourceId"
                          value={formikProps.values.sourceId}
                          onChange={formikProps.handleChange}
                          displayEmpty
                        >
                          <MenuItem value="">Select One</MenuItem>
                          {category.map((str, idx) => {
                            return (
                              <MenuItem value={str} key={idx}>
                                {str}
                              </MenuItem>
                            );
                          })}
                        </Select>
                      </div>
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        className={classes.button}
                      >
                        Search
                      </Button>
                    </div>
                  </Grid>
                </Form>
              );
            }}
          </Formik>
        </div>
      </Paper>
    </div>
  );
};

export default HeaderDrawer;
