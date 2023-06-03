import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../axios.js'

export const fetchCreateReport = createAsyncThunk('report/fetchCreateReport', async (params, {rejectWithValue}) => {
    try {
        const  response  = await axios.post('/api/report', params)
          return response.data  
      } catch (error) {
          if (!error.response) {
              throw error
          }
          return rejectWithValue(error.response.data)
      } 
})


export const fetchSetResponse = createAsyncThunk('report/fetchSetResponse', async (params, {rejectWithValue}) => {
    try {
        const  response  = await axios.patch('/api/report', params)
          return response.data
      } catch (error) {
          if (!error.response) {
              throw error
          }
          return rejectWithValue(error.response.data)
      }    
})

/////////////////////////////////////////////////////

export const fetchGetAll = createAsyncThunk('report/fetchGetAll', async () => {
    const { data } = await axios.get('/api/report/all')    
    return data
})


const initialState = {
    items: [],
    data: null,
    status: 'loading',
    error: ''
}

const reportSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
    },
    
    extraReducers: {

        [fetchGetAll.pending]: (state) => {
            state.status = 'loading'
            state.items = null
        },
        [fetchGetAll.fulfilled]: (state, action) => {
            state.status = 'loaded'
            state.items = action.payload
        },
        [fetchGetAll.rejected]: (state) => {
            state.status = 'error'
            state.items = null
        },


    }
})

export const reportReducer = reportSlice.reducer

