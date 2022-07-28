import {
  Button,
  Card,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Drawer,
  IconButton,
  makeStyles,
  MenuItem,
  Popover,
  Theme
} from "@material-ui/core";
import { ApiData } from "../types/types";
import image from "../../images/dummy-img.jpg";
import { CardContent, CardMedia, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import NewsDrawer from "./NewsDrawer";
import Paginate from "./Paginate";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import DeleteIcon from "@material-ui/icons/Delete";
import { useDispatch, useSelector } from "react-redux";
import { addIds } from "../redux/Slices";
import fetchNews, { deleteNews } from "../redux/Newsthunk";
import EditNews from "./EditNews";
import HeaderDrawer from "../Header/HeaderDrawer";
import FilterListIcon from "@material-ui/icons/FilterList";

interface NewsGridProps {
  data: any;
}

const useStyles = makeStyles((theme: Theme) => ({
  gridContainer: {
    padding: "0 24px"
  },
  image: {
    height: "240px !important",
    width: "200px",
    borderRadius: "5px"
  },
  newsPaper: {
    padding: "0px 12px",
    maxWidth: "500px",
    minHeight: "600px",
    maxHeight: "600px"
  },
  newsHeadings: {
    fontWeight: "bold"
  },
  pagination: {
    display: "flex",
    justifyContent: "space-between",
    padding: "0px 16px",
    marginTop: "50px",
    marginBottom: "8px"
  },
  page: {
    marginLeft: "auto"
  },
  menuButton: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-end",
    margin: "8px"
  },
  typography: {
    padding: theme.spacing(2)
  },
  navDrawer: {
    marginTop: "9vh"
  },
  iconButton: {
    margin: "0px 4px",
    padding: "0px 8px"
  },
  iconText: {
    padding: "0px 0px 0px 8px"
  },
  iconDelText: {
    padding: "0px 0px 0px 4px"
  },
  popOver:{
    padding: "8px 16px"
  }
}));

const NewsGrid:React.FC<NewsGridProps> = ({data}) => {
  const classes = useStyles();
  const [showNewsDrawer, setShowNewsDrawer] = useState<boolean>(false);
  const [searchId, setSearchId] = useState<String>("");
  const [PopOver, setPopOver] = useState<HTMLButtonElement | null>(null);
  const [selectedId, setSelectedId] = useState<String>("");
  const [selectedIds, setSelectedIds] = useState<Array<String>>([]);
  const [selectedSingleId, setSelectedSingleId] = useState<String>("");
  const [openEditNews, setOpenEditNews] = useState<boolean>(false);
  const [showDialog, setShowDialog] = useState(false);
  const [drawer, setDrawer] = useState<boolean>(false);
  const dispatch = useDispatch();
  const NewsIds: any = useSelector<{
    ReducerSlice: {
      ids: String[];
    };
  }>((state) => state.ReducerSlice.ids);
  const News_API: any = useSelector<{
    ReducerSlice: {
      api: string;
    };
  }>((state) => state.ReducerSlice.api);

  const delAndFetchNews = async () => {
    await dispatch(deleteNews(NewsIds));
    await dispatch(fetchNews(News_API));
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {delAndFetchNews()},[NewsIds]);

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    id: String
  ) => {
    setSelectedId(id);
    setPopOver(event.currentTarget);
  };

  const handleClose = () => {
    setSelectedId("");
    setPopOver(null);
  };

  const open = Boolean(PopOver);
  const id = open ? "simple-popover" : undefined;

  const handleShowNews = (_id: String) => {
    setShowNewsDrawer(!showNewsDrawer);
    setSearchId(_id);
  };

  const handleCheckChange = (id: String) => {
    if (selectedIds.some((val) => val === id)) {
      setSelectedIds(selectedIds.filter((val: String) => val !== id));
    } else {
      setSelectedIds((prev) => [...prev, id]);
    }
  };

  const handleBulkOperations = (id: String) => {
    setSelectedIds((prev) => [...prev, id]);
  };

  const handleDelete = () => {
    if (selectedSingleId !== "") {
      dispatch(addIds([selectedSingleId]));
    } else {
      dispatch(addIds(selectedIds));
    }
    setSelectedIds([]);
    setSelectedId("");
    setSelectedSingleId("");
    setShowDialog(false);
  };

  const handleDeleteNews = (id: String) => {
    setSelectedSingleId(id);
    setShowDialog(true);
  };

  const handleCloseDeleteNews = () => {
    setShowDialog(false);
    setSelectedId("");
    setSelectedIds([]);
    setSelectedSingleId("");
  };

  const handleMultipleDeleteNews = () => {
    setShowDialog(true);
  };

  const handleEditNewsDialog = (val: boolean) => {
    setOpenEditNews(val);
    // setSelectedId("");
  };

  const handleDrawer = (handle: boolean) => {
    setDrawer(handle);
  };

  const dataEdit = data.find((obj: ApiData) => obj._id === selectedId);

  return (
    <div>
      <Drawer
        anchor="top"
        open={drawer}
        onClose={() => setDrawer(false)}
        className={classes.navDrawer}
      >
        <HeaderDrawer />
      </Drawer>
      <EditNews
        openEditNews={openEditNews}
        onChange={(val: boolean) => handleEditNewsDialog(val)}
        data={dataEdit}
      />
      <Dialog
        open={showDialog}
        onClose={handleCloseDeleteNews}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Are you sure you want to Delete Selected News
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            The Selected News Will be Deleted
          </DialogContentText>
          <DialogActions>
            <Button color="primary" onClick={handleCloseDeleteNews}>
              Cancel
            </Button>
            <Button color="secondary" onClick={() => handleDelete()}>
              Delete
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
      <div className={classes.pagination}>
        {selectedIds.length ? (
          <>
            <Button
              onClick={handleMultipleDeleteNews}
              className={classes.iconButton}
            >
              <DeleteIcon />
              <Typography className={classes.iconDelText}>
                Delete Selected ({selectedIds.length})
              </Typography>
            </Button>
            <Button
              onClick={handleCloseDeleteNews}
              className={classes.iconButton}
            >
              <Typography>Clear</Typography>
            </Button>
          </>
        ) : (
          <Button
            onClick={() => handleDrawer(!drawer)}
            className={classes.iconButton}
          >
            <FilterListIcon />
            <Typography className={classes.iconText}>Filters</Typography>
          </Button>
        )}
        <div className={classes.page}>
          <Paginate />
        </div>
      </div>
      <Grid
        container
        spacing={2}
        className={classes.gridContainer}
        justifyContent="center"
      >
        <Popover
          id={id}
          open={open}
          anchorEl={PopOver}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center"
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center"
          }}
        >
          <div onClick={handleClose}>
            <MenuItem onClick={() => handleDeleteNews(selectedId)} className={classes.popOver}>
              Delete News
            </MenuItem>
            <MenuItem onClick={() => handleBulkOperations(selectedId)} className={classes.popOver}>
              Bulk Operations
            </MenuItem>
          </div>
          <MenuItem onClick={() => setOpenEditNews(true)} className={classes.popOver}>Edit News</MenuItem>
        </Popover>
        {data.map((obj: ApiData, idx: number) => (
          <Grid key={obj._id} item xs={12} sm={8} md={6} lg={4} xl={3}>
            <Card key={idx} className={classes.newsPaper}>
              <div className={classes.menuButton}>
                {selectedIds.length ? (
                  <Checkbox
                    checked={selectedIds.some((val) => val === obj._id)}
                    onChange={() => handleCheckChange(obj._id)}
                    inputProps={{ "aria-label": "primary checkbox" }}
                  />
                ) : (
                  <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="open poper"
                    onClick={(e) => handleClick(e, obj._id)}
                  >
                    <MoreVertIcon />
                  </IconButton>
                )}
              </div>
              <div onClick={() => handleShowNews(obj._id)}>
                <CardMedia
                  component="img"
                  alt="Loading..."
                  className={classes.image}
                  image={obj.imageUrl ? obj.imageUrl : image}
                  title="NewsImage"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {obj.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {obj.publishedAt}
                  </Typography>
                </CardContent>
              </div>
            </Card>
          </Grid>
        ))}
      </Grid>
        <Drawer
          anchor="right"
          open={showNewsDrawer}
          onClose={() => setShowNewsDrawer(false)}
        >
          <NewsDrawer
            searchId={searchId}
            onClose={() => setShowNewsDrawer(false)}
          />
        </Drawer>
    </div>
  );
};

export default NewsGrid;
