import { configureStore, combineReducers} from '@reduxjs/toolkit';

import authSlice from './authSlice';

const rootReducer = combineReducers({
    auth: authSlice.reducer,
})

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
