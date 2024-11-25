var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// redux/slices/commanderSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
const initialState = {
    users: [],
    stats: null,
    loading: false,
    error: null,
    selectedUser: null
};
// Thunk לטעינת משתמשים
export const fetchUsers = createAsyncThunk('commander/fetchUsers', (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { rejectWithValue }) {
    try {
        const response = yield fetch('http://localhost:3000/api/users', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'role': 'commander'
            }
        });
        if (!response.ok) {
            throw new Error('Failed to fetch chat users');
        }
        const data = yield response.json();
        return data.filter(user => user.role !== 'commander' && user.role !== 'soldier');
    }
    catch (error) {
        return rejectWithValue(error.message);
    }
}));
// Thunk לטעינת סטטיסטיקות
export const fetchStats = createAsyncThunk('commander/fetchStats', (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { rejectWithValue }) {
    try {
        const response = yield fetch('http://localhost:3000/api/commander/stats', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        if (!response.ok) {
            throw new Error('Failed to fetch stats');
        }
        const data = yield response.json();
        return data;
    }
    catch (error) {
        return rejectWithValue(error.message);
    }
}));
// Thunk לעדכון רמת איום של משתמש
export const updateUserThreatLevel = createAsyncThunk('commander/updateThreatLevel', (_a, _b) => __awaiter(void 0, [_a, _b], void 0, function* ({ userId, threatLevel }, { rejectWithValue }) {
    try {
        const response = yield fetch(`http://localhost:3000/api/commander/users/${userId}/threat-level`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ threatLevel })
        });
        if (!response.ok) {
            throw new Error('Failed to update threat level');
        }
        const data = yield response.json();
        return data;
    }
    catch (error) {
        return rejectWithValue(error.message);
    }
}));
const commanderSlice = createSlice({
    name: 'commander',
    initialState,
    reducers: {
        setSelectedUser: (state, action) => {
            state.selectedUser = action.payload;
        },
        clearSelectedUser: (state) => {
            state.selectedUser = null;
        },
        filterUsers: (state, action) => {
            // אפשר להוסיף לוגיקת סינון מקומית אם צריך
        }
    },
    extraReducers: (builder) => {
        // טיפול בטעינת משתמשים
        builder
            .addCase(fetchUsers.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
            .addCase(fetchUsers.fulfilled, (state, action) => {
            state.loading = false;
            state.users = action.payload;
        })
            .addCase(fetchUsers.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        // טיפול בטעינת סטטיסטיקות
        builder
            .addCase(fetchStats.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
            .addCase(fetchStats.fulfilled, (state, action) => {
            state.loading = false;
            state.stats = action.payload;
        })
            .addCase(fetchStats.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        // טיפול בעדכון רמת איום
        builder
            .addCase(updateUserThreatLevel.fulfilled, (state, action) => {
            const updatedUser = action.payload;
            const index = state.users.findIndex(user => user.id === updatedUser.id);
            if (index !== -1) {
                state.users[index] = updatedUser;
            }
        });
    }
});
export const { setSelectedUser, clearSelectedUser, filterUsers } = commanderSlice.actions;
// Selectors
export const selectAllUsers = (state) => state.commander.users;
export const selectStats = (state) => state.commander.stats;
export const selectLoading = (state) => state.commander.loading;
export const selectError = (state) => state.commander.error;
export const selectSelectedUser = (state) => state.commander.selectedUser;
export default commanderSlice.reducer;
