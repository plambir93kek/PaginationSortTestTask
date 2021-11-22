import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchTodos = createAsyncThunk(
    'fetchTodos', 
    async () => {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos');
       const json = await response.json();
       return json;
    }
);