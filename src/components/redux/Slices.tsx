import { createSlice } from "@reduxjs/toolkit";
import { Values } from "../types/types";
import fetchNews, { importNews } from "./Newsthunk";

interface Pagination {
  page: number;
  pageSize: number;
}

interface InitialData {
  data: any[];
  status: string | null;
  importStatus: string | null;
  api: string;
  details: any;
  pagination: Pagination;
  filter: Values;
  ids: String[];
}

const initialState: InitialData = {
  data: [],
  status: null,
  importStatus: null,
  api: "http://localhost:8080/news",
  details: {},
  pagination: {
    page: 1,
    pageSize: 10
  },
  filter: {
    title: "",
    from: "",
    to: "",
    sortBy: "",
    sourceId: ""
  },
  ids: []
};

const ReducerSlice = createSlice({
  name: "News",
  initialState,
  reducers: {
    addApi: (state: InitialData, action: any) => {
      state.filter = action.payload;
      let obj: Partial<Values> = state.filter;
      obj = { ...obj, ...state.pagination };
      obj.from = new Date(obj.from!).toISOString();
      obj.to = new Date(obj.to!).toISOString();
      if (!obj.sortBy) {
        obj.sortBy = "publishedAt";
      }
      if (!obj.title) {
        obj.title = "a";
      }
      if (!obj.sourceId) {
        delete obj.sourceId;
      }

      const params = new URLSearchParams(obj).toString();
      state.api = `http://localhost:8080/news?${params}`;
    },
    addPagination: (state: InitialData, action: any) => {
      state.pagination = action.payload;
      let obj: any = { ...state.filter, ...state.pagination };
      Object.keys(obj).forEach((key) => {
        if (obj[key] === "") {
          delete obj[key];
        }
      });
      const params = new URLSearchParams(obj).toString();
      state.api = `http://localhost:8080/news?${params}`;
    },
    addIds: (state: InitialData, action: any) => {
      state.ids = [...action.payload];
    },
    updateImportStatus: (state: InitialData) => {
      state.status = null;
    }
  },
  extraReducers: (builder: any) => {
    builder.addCase(fetchNews.pending, (state: any) => {
      state.status = "loading";
    });
    builder.addCase(fetchNews.fulfilled, (state: any, action: any) => {
      const { data } = action.payload;
      state.data = [...data?.docs];
      state.details = { ...data };
      state.status = "success";
    });
    builder.addCase(fetchNews.rejected, (state: any) => {
      state.status = "failed";
    });
    builder.addCase(importNews.fulfilled, (state: any) => {
      state.importStatus = "Success";
    });
    builder.addCase(importNews.pending, (state: any) => {
      state.importStatus = "loading";
    });
    builder.addCase(importNews.rejected, (state: any) => {
      state.importStatus = "failed";
    });
  }
});

export const { addApi, addPagination, addIds, updateImportStatus } =
  ReducerSlice.actions;
export default ReducerSlice.reducer;
