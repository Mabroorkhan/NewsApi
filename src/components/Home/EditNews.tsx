import React from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  makeStyles,
  TextField
} from "@material-ui/core";
import {
  KeyboardDateTimePicker,
  MuiPickersUtilsProvider
} from "@material-ui/pickers";
import { Field, Form, Formik, FormikHelpers } from "formik";
import { ApiData } from "../types/types";
import CloseIcon from "@material-ui/icons/Close";
import DateFnsUtils from "@date-io/date-fns";
import { useDispatch, useSelector } from "react-redux";
import fetchNews, { updateNews } from "../redux/Newsthunk";

interface EditNewsProps {
  openEditNews: boolean;
  onChange: any;
  data: ApiData;
}

const useStyles = makeStyles(() => ({
  button: {
    marginLeft: "auto"
  },
  title: {
    textAlign: "center"
  },
  field: {
    width: "100%"
  }
}));

const EditNews: React.FC<EditNewsProps> = ({data, onChange, openEditNews}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const News_API: any = useSelector<{
    ReducerSlice: {
      api: String;
    };
  }>((state) => state.ReducerSlice.api);

  const handleFormikSubmit = (
    values: ApiData,
    formikHelpers: FormikHelpers<ApiData>
  ) => {
    dispatch(updateNews(values));
    dispatch(fetchNews(News_API));
    onChange(false);
  };

  return (
    <div>
      <Dialog
        open={openEditNews}
        onClose={() => onChange(false)}
        aria-labelledby="edit-news"
      >
        <IconButton
          onClick={() => onChange(false)}
          className={classes.button}
        >
          <CloseIcon />
        </IconButton>
        <DialogTitle id="edit-news" className={classes.title}>
          <b>Edit News</b>
        </DialogTitle>
        <DialogContent>
          <Formik
            initialValues={data}
            onSubmit={handleFormikSubmit}
            enableReinitialize
          >
            {(formikProps) => (
              <Form onSubmit={formikProps.handleSubmit} autoComplete="off">
                <Grid container justifyContent="center">
                  <Grid item xs={10} sm={10} lg={10}>
                    <Field
                      id="_id"
                      type="text"
                      name="_id"
                      label="ID"
                      className={classes.field}
                      component={TextField}
                      margin="normal"
                      value={data?._id}
                    />
                  </Grid>
                  <Grid item xs={10} sm={10} lg={10}>
                    <Field
                      id="title"
                      type="text"
                      name="title"
                      label="Title"
                      component={TextField}
                      margin="normal"
                      placeholder="Enter Title of news"
                      className={classes.field}
                      onChange={formikProps.handleChange}
                      defaultValue={data?.title}
                    />
                  </Grid>
                  <Grid item xs={10} sm={10} lg={10}>
                    <Field
                      id="content"
                      type="text"
                      name="content"
                      label="Content"
                      component={TextField}
                      multiline={true}
                      margin="normal"
                      placeholder="Enter Content of news"
                      className={classes.field}
                      onChange={formikProps.handleChange}
                      defaultValue={data?.content}
                    />
                  </Grid>
                  <Grid item xs={10} sm={10} lg={10}>
                    <Field
                      id="description"
                      type="text"
                      name="description"
                      label="Description"
                      component={TextField}
                      multiline={true}
                      margin="normal"
                      placeholder="Enter Description of news"
                      className={classes.field}
                      onChange={formikProps.handleChange}
                      defaultValue={data?.description}
                    />
                  </Grid>
                  <Grid item xs={10} sm={10} lg={10}>
                    <Field
                      id="author"
                      type="text"
                      name="author"
                      label="Author"
                      component={TextField}
                      margin="normal"
                      placeholder="Enter Author of news"
                      className={classes.field}
                      onChange={formikProps.handleChange}
                      defaultValue={data?.author}
                    />
                  </Grid>
                  <Grid item xs={10} sm={10} lg={10}>
                    <Field
                      id="source"
                      type="text"
                      name="source"
                      label="Source"
                      component={TextField}
                      margin="normal"
                      placeholder="Enter Source of news"
                      className={classes.field}
                      onChange={formikProps.handleChange}
                      defaultValue={data?.source}
                    />
                  </Grid>
                  <Grid item xs={10} sm={10} lg={10}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <Field
                        id="publishedAt"
                        name="publishedAt"
                        label="Published At"
                        component={KeyboardDateTimePicker}
                        margin="normal"
                        className={classes.field}
                        onChange={(e: any) => {
                          formikProps.setFieldValue(
                            "publishedAt",
                            new Date(e).toISOString()
                          );
                        }}
                        format="yyyy-MM-dd, hh:mm"
                        value={
                          formikProps.values?.publishedAt || data?.publishedAt
                        }
                        InputLabelProps={{
                          shrink: true
                        }}
                      />
                    </MuiPickersUtilsProvider>
                  </Grid>
                  <Grid item xs={10} sm={10} lg={10}>
                    <Field
                      id="sourceId"
                      type="text"
                      name="sourceId"
                      label="Category"
                      component={TextField}
                      margin="normal"
                      placeholder="Enter Category of news"
                      className={classes.field}
                      onChange={formikProps.handleChange}
                      defaultValue={data?.sourceId}
                    />
                  </Grid>
                  <Grid item xs={10} sm={10} lg={10}>
                    <Field
                      id="imageUrl"
                      type="text"
                      name="imageUrl"
                      label="Image URL"
                      component={TextField}
                      margin="normal"
                      placeholder="Enter URL of news Image"
                      className={classes.field}
                      onChange={formikProps.handleChange}
                      defaultValue={data?.imageUrl}
                    />
                  </Grid>
                  <Grid item xs={10} sm={10} lg={10}>
                    <Button type="submit" variant="contained">
                      Submit
                    </Button>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditNews;
