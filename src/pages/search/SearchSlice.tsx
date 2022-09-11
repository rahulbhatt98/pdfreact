import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import api from 'lib/api'

export const searchTextApi = createAsyncThunk(
    'post/search_text',
    async ({ request }: { request: object | {} }, thunkAPI) => {

        try {
            const response: any = await api.post(`/backend/search_text`, request, {
                headers: {
                    'Authorization': `Token ${localStorage.getItem("user")}`
                }
            })
            return response
        } catch (err: any) {
            return thunkAPI.rejectWithValue({ status: 400, error: err.message });
        }
    }

)

export const searchTextCountApi = createAsyncThunk(
    'post/search_text_count',
    async ({ request }: { request: object | {} }, thunkAPI) => {

        try {
            const response: any = await api.post(`/backend/search_text_count`, request, {
                headers: {
                    'Authorization': `Token ${localStorage.getItem("user")}`
                }
            })
            return response
        } catch (err: any) {
            return thunkAPI.rejectWithValue({ status: 400, error: err.message });
        }
    }

)

export const saveSearchApi = createAsyncThunk(
    'post/search_text',
    async ({ request }: { request: object | {} }, thunkAPI) => {

        try {
            const response: any = await api.post(`/backend/save_search`, request, {
                headers: {
                    'Authorization': `Token ${localStorage.getItem("user")}`
                }
            })
            return response
        } catch (err: any) {
            return thunkAPI.rejectWithValue({ status: 400, error: err.message });
        }
    }

)

export const saveSearchPages = createAsyncThunk(
    'post/search_text',
    async ({ request }: { request: object | {} }, thunkAPI) => {

        try {
            const response: any = await api.post(`/backend/save_page_sets`, request, {
                headers: {
                    'Authorization': `Token ${localStorage.getItem("user")}`
                }
            })
            return response
        } catch (err: any) {
            return thunkAPI.rejectWithValue({ status: 400, error: err.message });
        }
    }

)

export const getSavedSearch = createAsyncThunk(
    'post/search_text',
    async () => {

        try {
            const response: any = await api.post(`/backend/get_searches`, {}, {
                headers: {
                    'Authorization': `Token ${localStorage.getItem("user")}`
                }
            })
            return response
        } catch (err: any) {
            return ({ status: 400, error: err.message });
        }
    }

)

export const displayDocuments = createAsyncThunk(
    'post/sql_query',
    async ({ request }: { request: object | {} }, thunkAPI) => {

        try {
            const response: any = await api.post(`/backend/sql_query`, request, {
                headers: {
                    'Authorization': `Token ${localStorage.getItem("user")}`
                }
            })
            //return { status:200,data:response.data[0]['page_pdf']}
            return response
        }
        catch (err: any) {
            return thunkAPI.rejectWithValue({ status: 400, error: err.message });
        }
    }
)

export const displayCoordinate = createAsyncThunk(
    'post/get_page_content',
    async ({ request }: { request: object | {} }, thunkAPI) => {

        try {
            const response: any = await api.post(`/backend/get_page_content`, request, {
                headers: {
                    'Authorization': `Token ${localStorage.getItem("user")}`
                }
            })
            //return { status:200,data:response.data[0]['page_pdf']}
            return response
        }
        catch (err: any) {
            return thunkAPI.rejectWithValue({ status: 400, error: err.message });
        }
    }
)

const getSearchData = createSlice({
    name: 'search Data',
    initialState: {
        searchData: [] as any,
        isErrored: false,
        isSearchLoading: false
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getSavedSearch.fulfilled, (state, action) => {
            state.isSearchLoading = false
            // Add user to the state array
            // state.isErrored = action.payload.status==400?true:false
            state.searchData = action.payload.status === 200 ? action.payload.data : []
        });
        builder.addCase(getSavedSearch.pending, (state) => {
            state.isSearchLoading = true
            state.isErrored = false;
            // state.isErroredDoc = true;;
        });
        builder.addCase(getSavedSearch.rejected, (state) => {
            state.isSearchLoading = false
            state.isErrored = true
        });
    }
});

const getPdfData = createSlice({
    name: 'pdf Data',
    initialState: {
        pdfData: [] as any,
        isErrored: false,
        isPdfLoading: false
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(displayDocuments.fulfilled, (state, action) => {
            state.isPdfLoading = false
            // Add user to the state array
            // state.isErrored = action.payload.status==400?true:false
            state.pdfData = action.payload.status === 200 ? action.payload.data : []
        });
        builder.addCase(displayDocuments.pending, (state) => {
            state.isPdfLoading = true
            state.isErrored = false;
            // state.isErroredDoc = true;;
        });
        builder.addCase(displayDocuments.rejected, (state) => {
            state.isPdfLoading = false
            state.isErrored = true
        });
    }
});


const getCoordinateData = createSlice({
    name: 'pdf Data',
    initialState: {
        coordinateData: [] as any,
        isErrored: false,
        isCoordinateLoading: false
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(displayCoordinate.fulfilled, (state, action) => {
            state.isCoordinateLoading = false
            // Add user to the state array
            // state.isErrored = action.payload.status==400?true:false
            state.coordinateData = action.payload.status === 200 ? action.payload.data : []
        });
        builder.addCase(displayCoordinate.pending, (state) => {
            state.isCoordinateLoading = true
            state.isErrored = false;
            // state.isErroredDoc = true;;
        });
        builder.addCase(displayCoordinate.rejected, (state) => {
            state.isCoordinateLoading = false
            state.isErrored = true
        });
    }
});

export { getSearchData, getPdfData, getCoordinateData };