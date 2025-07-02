import { configureStore } from '@reduxjs/toolkit';
import subscriptionReducer from '../components/subscriptionSlice';

const store = configureStore({
  reducer: {
    subscription: subscriptionReducer,
  },
});

export default store;
