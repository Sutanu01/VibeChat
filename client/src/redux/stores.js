import {configureStore} from '@reduxjs/toolkit';
import authSlice from './reducers/auth';
import miscSlice from './reducers/misc';
import api from './api/api';
const store = configureStore({
    reducer:{
        [authSlice.name]:authSlice.reducer,
        [miscSlice.name]:miscSlice.reducer,
        [api.reducerPath]:api.reducer,
    },
    middleware: (Mid) =>
       [...Mid(), api.middleware],
});

export default store;