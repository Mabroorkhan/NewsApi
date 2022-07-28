import {
  makeStyles,
  Paper,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Backdrop,
  CircularProgress,
  Theme
} from "@material-ui/core";
import image from "../../images/error.png";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import fetchNews from "../redux/Newsthunk";
import { ApiData } from "../types/types";
import NewsGrid from "./NewsGrid";

const useStyles = makeStyles((theme: Theme) => ({
  paperContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%"
  },
  spinnerPaper: {
    height: "100vh",
    width: "100vw",
    backgroundColor: "#efefef",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "2vw"
  },
  background: {
    width: "100%",
    minHeight: "100vh",
    backgroundColor: "#efefef",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "2vw"
  },
  loaderContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
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
  heading: {
    margin: "15vh"
  },
  image: {
    height: "50vh",
    width: "70vh",
    borderRadius: "5px"
  },
  errorCard: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "60vh"
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const Home: React.FC = () => {
  const styles = useStyles();
  const dispatch: any = useDispatch<any>();
  const data: any = useSelector<{
    ReducerSlice: {
      data: ApiData;
    };
  }>((state) => state.ReducerSlice.data);
  const News_API: any = useSelector<{
    ReducerSlice: {
      api: string;
    };
  }>((state) => state.ReducerSlice.api);
  const loader: any = useSelector<{
    ReducerSlice: {
      status: string;
    };
  }>((state) => state.ReducerSlice.status);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {dispatch(fetchNews(News_API))}, [News_API]);

  return (
    <div className={styles.paperContainer}>
      <>
        {data.length ? (
          <Paper className={styles.background}>
            <NewsGrid data={data} />
            <Backdrop className={styles.backdrop} open={loader==="loading"} invisible={loader!=="loading"} >
              <CircularProgress color="inherit" className={styles.loader} />
            </Backdrop>
          </Paper>
        ) : (
          <div>
            <div className={styles.heading}>
              <Card className={styles.errorCard}>
                <CardMedia
                  component="img"
                  alt=""
                  className={styles.image}
                  image={image}
                  title="News"
                />
                <CardContent>
                  <Typography gutterBottom variant="h2" component="h2">
                    No Data Found
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    No data matches your filter options... please select other
                    filter options to get NEWS.
                  </Typography>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </>
    </div>
  );
};

export default Home;
