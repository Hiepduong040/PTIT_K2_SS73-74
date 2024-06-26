import axios from "axios";
import { Todo } from "../../interface";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Khởi tạo state ban đầu
const todoState = {
    todos: [] as Todo[], // Khai báo kiểu dữ liệu cho mảng todos
    loading: false,
    error: null as string | null, // Khai báo kiểu dữ liệu cho lỗi
};

// Hàm lấy tất cả todo
export const getTodo:any = createAsyncThunk(
    "todos/getAllTodo", 
    async () => {
        const response = await axios.get("http://localhost:8080/todo");
        return response.data;
    }
);

const reducerTodo = createSlice({
    name: "todo",
    initialState: {
        todo: todoState
    },
    reducers: {
        addTodo: {
            reducer(state, action: PayloadAction<Todo>) {
              state.todos.push(action.payload);
              state.error = null;
            },
            prepare(text: string) {
              return {
                payload: {
                  id: Date.now(),
                  text,
                  completed: false,
                },
              };
            },
          },
          toggleTodo: (state, action: any) => {
            const todo = state.todos.find((todo) => todo.id === action.payload);
            if (todo) {
              todo.completed = !todo.completed;
            }
          },
          deleteTodo: (state, action: any) => {
            state.todos = state.todos.filter((todo) => todo.id !== action.payload);
          },
          setError: (state, action: any) => {
            state.error = action.payload;
          },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getTodo.pending, (state) => {
                state.todo.loading = true;
                state.todo.error = null;
            })
            .addCase(getTodo.fulfilled, (state, action) => {
                state.todo.loading = false;
                state.todo.todos = action.payload;
            })
            .addCase(getTodo.rejected, (state, action) => {
                state.todo.loading = false;
                state.todo.error = action.error.message || "Failed to fetch todos";
            });
    }
});

// Xuất reducer
export default reducerTodo.reducer;

// Xuất các action
