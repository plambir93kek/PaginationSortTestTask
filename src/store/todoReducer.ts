import { createSlice } from "@reduxjs/toolkit";
import { fetchTodos } from "./todoAPI";

interface Todo {
    id: number;
    title: string;
};

interface TodoState {
    todos: Todo[],
    loading: boolean;
    error: boolean;
    pages: number[];
};

const initialState:TodoState = {
   todos: [],
   loading: false,
   error: false,
   pages: [],
}

const todoReducer = createSlice({
    name: 'todo',
    initialState,
    reducers: {
      decSortId: (state, action)=>{
        if(action.payload){
          state.todos = state.todos.sort((a,b) => b.id -a.id);
        } else {
          state.todos = state.todos.sort((a,b) => a.id -b.id);
        }
      },
      setPages: (state, action) => {
        state.pages = []
        for(let i=0; i <= Math.ceil(action.payload/50)-1; i++){
          state.pages.push(i)
        }
      },
      decSortText: (state, action) => {
        if(action.payload){
          state.todos = state.todos.sort((a,b) => b.title.localeCompare(a.title));
        } else {
          state.todos = state.todos.sort((a,b) => a.title.localeCompare(b.title));
        }
      }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchTodos.pending, (state) => {
            state.loading=true
          }),
          builder.addCase(fetchTodos.fulfilled, (state, action) => {
            state.loading=false;
            state.todos = action.payload;
            for(let i=0; i <= Math.ceil(action.payload.length/50)-1; i++){
              state.pages.push(i)
            }
          }),
          builder.addCase(fetchTodos.rejected, (state) => {
            state.loading=false;
            state.error = true;
          })
    }
});

export default todoReducer.reducer;
export const {decSortId, setPages, decSortText} = todoReducer.actions;