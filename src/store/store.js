import { configureStore } from '@reduxjs/toolkit';
import calculatorReducer from '../features/calculator/reducer';

export const store = configureStore({
	reducer: {
        calculator: calculatorReducer
    },
});
