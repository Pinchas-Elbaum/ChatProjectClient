var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// chatSlice.ts:
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
const initialState = {
    messages: [],
    loading: false,
    error: null,
};
// פעולה אסינכרונית לשליחת הודעה
export const sendMessage = createAsyncThunk('chat/sendMessage', (data) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    return response.json();
}));
// פעולה אסינכרונית לקבלת הודעות
export const fetchMessages = createAsyncThunk('chat/fetchMessages', (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch(`/api/messages/${userId}`);
    return response.json();
}));
// יצירת הסלייס
const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(sendMessage.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
            .addCase(sendMessage.fulfilled, (state, action) => {
            state.loading = false;
            state.messages.push(action.payload.message);
        })
            .addCase(sendMessage.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Send message failed';
        })
            .addCase(fetchMessages.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
            .addCase(fetchMessages.fulfilled, (state, action) => {
            state.loading = false;
            state.messages = action.payload.messages;
        })
            .addCase(fetchMessages.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Fetch messages failed';
        });
    },
});
export default chatSlice.reducer;
