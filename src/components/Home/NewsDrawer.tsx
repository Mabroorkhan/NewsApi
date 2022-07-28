import React from "react";
import { IconButton, makeStyles, Theme } from "@material-ui/core";
import { CardContent, CardMedia, Divider, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { ApiData } from "../types/types";
import image from "../../images/dummy-img.jpg";
import CloseIcon from '@material-ui/icons/Close';

interface NewsDrawerProps {
  searchId: String;
  onClose: any
}

const useStyles = makeStyles((theme: Theme) => ({
  NewsCard: {
    width: "55vw",
    [theme.breakpoints.down("sm")]: {
      width: "70vw"
    },
    [theme.breakpoints.down("xs")]: {
      width: "100vw"
    },
  },
  image: {
    width: "500px",
    height: "500px",
    borderRadius: "5px",
    padding: "0px 24px"
  },
  content: {
    paddingLeft: "1vw",
    paddingTop: "3vh !important"
  },
  closeButton:{
    margin: "8px"
  }
}));

const NewsDrawer:React.FC<NewsDrawerProps> = (props: NewsDrawerProps) => {
  const classes = useStyles();
  const dataArr: any = useSelector<{
    ReducerSlice: {
      data: ApiData;
    };
  }>((state) => state.ReducerSlice.data);
  const data = dataArr.find((obj: ApiData) => obj._id === props.searchId);

  return (
    <div className={classes.NewsCard}>
      <div className={classes.closeButton}>
        <IconButton onClick={()=> props.onClose()}>
          <CloseIcon />
        </IconButton>
      </div>
      <CardMedia
        component="img"
        alt="Loading..."
        className={classes.image}
        image={data.imageUrl ? data.imageUrl : image}
        title="NewsImage"
      />
      <CardContent>
        <Divider />
        <Typography
          gutterBottom
          variant="h5"
          component="h3"
          className={classes.content}
        >
          <h3>Title:</h3> {data.title ? data.title : "N/A"}
        </Typography>
        <br />
        <Divider />
        <Typography
          variant="body2"
          color="textSecondary"
          component="h3"
          className={classes.content}
        >
          <h3>Content:</h3> <div dangerouslySetInnerHTML={{__html: data.content ? data.content : "N/A"}} />
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          component="h3"
          className={classes.content}
        >
          <h3>Description:</h3> <div dangerouslySetInnerHTML={{__html: data.description ? data.description : "N/A"}} />
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          component="h3"
          className={classes.content}
        >
          <h3>Author:</h3> {data.author ? data.author : "N/A"}
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          component="h3"
          className={classes.content}
        >
          <h3>Published Date:</h3> {data.publishedAt ? data.publishedAt : "N/A"}
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          component="h3"
          className={classes.content}
        >
          <h3>Source:</h3> {data.source ? data.source : "N/A"}
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          component="h3"
          className={classes.content}
        >
          <h3>Category:</h3> {data.sourceId ? data.sourceId : "N/A"}
        </Typography>
      </CardContent>
    </div>
  );
};

export default NewsDrawer;
