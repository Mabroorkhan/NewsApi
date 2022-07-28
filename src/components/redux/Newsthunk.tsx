import { createAsyncThunk } from "@reduxjs/toolkit";
import { ApiData, ImportValues } from "../types/types";

const fetchNews = createAsyncThunk(
  "fetchNews",
  async (API: string, ThunkAPI: any) => {
    const response: any = await fetch(API);
    const respData = await response.json();
    return respData;
  }
);

export const deleteNews = createAsyncThunk(
  "deleteNews",
  async (ids: String[], ThunkApi: any) => {
    const response: any = await fetch("http://localhost:8080/news/delete", {
      method: "POST",
      body: JSON.stringify({ ids: [...ids] }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    });
    const result = await response.json();

    return result;
  }
);

export const updateNews = createAsyncThunk(
  "updateNews",
  async (obj: ApiData, ThunkAPI: any) => {
    const response: any = await fetch(`http://localhost:8080/news/${obj._id}`, {
      method: "PUT",
      body: JSON.stringify(obj),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    });
    const result = await response.json();

    return result;
  }
);

export const importNews = createAsyncThunk(
  "importNews",
  async (obj: ImportValues, ThunkAPI: any) => {
    console.log("Obj: ", obj)
    const response: any = await fetch(`http://localhost:8080/seed`, {
      method: "POST",
      body: JSON.stringify(obj),
      headers: {
        "Content-Type": "application/json"
      }
    });
    const result = await response.json();
    
    console.log("Result: ", result);

    return result;
  }
);

export default fetchNews;
