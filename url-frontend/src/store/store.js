import { configureStore, isRejectedWithValue } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { apiSlice } from './api/apiSlice';

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware()
      .concat(apiSlice.middleware)
      .concat(() => next => action => {
        if (isRejectedWithValue(action)) {
          const { message } = action.payload.data;

          toast.error(Array.isArray(message) ? message[0] : message);
        }

        return next(action);
      }),

  devTools: true,
});

setupListeners(store.dispatch);
