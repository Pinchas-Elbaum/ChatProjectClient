var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// authSlice.ts:
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
const initialState = {
    user: null,
    token: null,
    role: null,
    users: [],
    loading: false,
    error: null,
};
export const loginUser = createAsyncThunk('auth/loginUser', (data) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        mode: 'cors',
        body: JSON.stringify(data),
    });
    return response.json();
}));
export const registerUser = createAsyncThunk('auth/registerUser', (data) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch('http://localhost:3000/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        mode: 'cors',
        body: JSON.stringify(data),
    });
    return response.json();
}));
// פעולה אסינכרונית להבאת רשימת המשתמשים
export const fetchUsers = createAsyncThunk('auth/fetchUsers', () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch('http://localhost:3000/api/users', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    });
    console.log('Response from server:', response);
    if (!response.ok) {
        throw new Error('Failed to fetch users');
    }
    const data = yield response.json();
    console.log('Users data:', data);
    return data;
}));
// יצירת ה-Slice
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout(state) {
            state.user = null;
            state.token = null;
            state.role = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // רישום משתמש
            .addCase(registerUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
            .addCase(registerUser.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload.data.user;
            state.token = action.payload.data.token;
        })
            .addCase(registerUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Registration failed';
        })
            // התחברות משתמש
            .addCase(loginUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
            .addCase(loginUser.fulfilled, (state, action) => {
            if (action.payload.success) {
                const user = action.payload.user;
                state.loading = false;
                state.user = Object.assign(Object.assign({}, user), { name: user.username });
                state.token = action.payload.token;
                state.error = null;
            }
        })
            .addCase(loginUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Login failed';
        })
            // הבאת רשימת משתמשים
            .addCase(fetchUsers.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
            .addCase(fetchUsers.fulfilled, (state, action) => {
            state.loading = false;
            state.users = Array.isArray(action.payload) ? action.payload : [];
        })
            .addCase(fetchUsers.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Failed to fetch users';
        });
    },
});
export const { logout } = authSlice.actions;
export default authSlice.reducer;
