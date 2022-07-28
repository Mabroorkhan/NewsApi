import TablePagination from "@material-ui/core/TablePagination";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPagination } from "../redux/Slices";

const Paginate: React.FC = () => {
  const [page, setPage] = useState(0);
  const details: any = useSelector<{
    ReducerSlice: {
      details: any;
    };
  }>((state) => state.ReducerSlice.details);
  const [pageSize, setPageSize] = useState<number>(details.limit);
  const dispatch = useDispatch();

// eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {const obj = {pageIndex: page + 1,pageSize};dispatch(addPagination(obj))}, [page, pageSize]);

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    event.preventDefault();
    setPageSize(Number(event.target.value));
    setPage(0);
  };
  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    event?.preventDefault();
    setPage(newPage);
  };
  return (
    <TablePagination
      component="div"
      count={details.totalDocs}
      page={page}
      onPageChange={handleChangePage}
      rowsPerPage={pageSize}
      rowsPerPageOptions={[
        10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95,
        100
      ]}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  );
};

export default Paginate;
