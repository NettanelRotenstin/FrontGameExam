import { ActionReducerMapBuilder, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { json } from "react-router-dom"
import { DataStatus } from "../types/reduxTypes"
import { IUser, LoginDTO } from "../types/User"

interface userState {
    _id?: string
    error: string | null
    status: DataStatus
    user: null | IUser
}

const initialData: userState = {
    error: null,
    status: DataStatus.IDLE,
    user: null
}

export const fetchLogin = createAsyncThunk('users/login',
    async (user: LoginDTO, thunkApi) => {
        try {
            const res = await fetch(`http://localhost:1212/users/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "Application/Json"
                },
                body: JSON.stringify(user)
            })
            if (!res.ok) {
                thunkApi.rejectWithValue("can't login")
            }
            const data = await res.json()
            const token = data.token
            localStorage.setItem('token', token)
            return data
        } catch (error) {
            thunkApi.rejectWithValue("cant login")
        }
    }
)

export const fetchRegister = createAsyncThunk(
    "users/register",
    async (user: IUser, thunkApi) => {
        try {
            const res = await fetch("http://localhost:1212/users/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user),
            });
            if (res.status != 200) {
                thunkApi.rejectWithValue("Can't create new user ,please try again");
            }

        } catch (err) {
            thunkApi.rejectWithValue(`Cant create new user ,please try again`);
        }
    }
);



const userSlice = createSlice({
    name: "user",
    initialState: initialData,
    reducers: {
    },
    extraReducers: (builder: ActionReducerMapBuilder<userState>) => {
        builder.addCase(fetchLogin.pending, (state) => {
            state.status = DataStatus.LOADING
        })
            .addCase(fetchLogin.fulfilled, (state, action) => {
                state.status = DataStatus.SUCCESS
                state.user = action.payload as IUser
            })
            .addCase(fetchLogin.rejected, (state, action) => {
                state.status = DataStatus.FAILED
                state.error = action.error as string
                state.user = null
            }).addCase(fetchRegister.pending, (state) => {
                state.status = DataStatus.LOADING
                state.error = null
                state.user = null
            })
            .addCase(fetchRegister.fulfilled, (state, action) => {
                state.status = DataStatus.SUCCESS
                state.error = null
                state.user = null
            })
            .addCase(fetchRegister.rejected, (state, action) => {
                state.status = DataStatus.FAILED
                state.error = action.error as string
                state.user = null
            })

    }
})

export default userSlice