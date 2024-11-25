var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
const initialState = {
    suspiciousUsers: [],
    organizations: [],
    loading: false,
    error: null,
};
// פעולה אסינכרונית לקבלת משתמשים חשודים
export const fetchSuspiciousUsers = createAsyncThunk('analytics/fetchSuspiciousUsers', () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch('/api/analytics/suspicious-users');
    return response.json();
}));
// פעולה אסינכרונית לקבלת נתוני ארגונים
export const fetchOrganizations = createAsyncThunk('analytics/fetchOrganizations', () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch('/api/analytics/organizations');
    return response.json();
}));
// יצירת הסלייס
const analyticsSlice = createSlice({
    name: 'analytics',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSuspiciousUsers.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
            .addCase(fetchSuspiciousUsers.fulfilled, (state, action) => {
            state.loading = false;
            state.suspiciousUsers = action.payload.users;
        })
            .addCase(fetchSuspiciousUsers.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Fetch suspicious users failed';
        })
            .addCase(fetchOrganizations.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
            .addCase(fetchOrganizations.fulfilled, (state, action) => {
            state.loading = false;
            state.organizations = action.payload.organizations;
        })
            .addCase(fetchOrganizations.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Fetch organizations failed';
        });
    },
});
export default analyticsSlice.reducer;
