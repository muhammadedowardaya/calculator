import { createSlice } from '@reduxjs/toolkit';
import { evaluate } from 'mathjs';

// Fungsi untuk mengubah formula menjadi tampilan yang lebih terbaca
const formatFormulaToDisplay = (formula) => {
	const operators = ['+', 'x', '/', '-', '='];
	return formula
		.split('')
		.map((item) => {
			if (operators.includes(item)) {
				return ` ${item} `;
			} else {
				return item;
			}
		})
		.join('');
};

const initialState = {
	display: 0, // Menyimpan nilai yang ditampilkan pada layar kalkulator
	formula: '', // Menyimpan formula kalkulator
	formulaToDisplay: '', // Menyimpan formula kalkulator
	resultEvaluated: false, // Menandakan apakah hasil telah dievaluasi
	histories: [],
	lastResult: null,
};

export const calculatorSlice = createSlice({
	name: 'calculator',
	initialState,
	reducers: {
		appendToDisplay: (state, action) => {
			const value = action.payload;

			if (state.display === 'Error') {
				// Jika display berisi 'Error', restart dengan nilai baru
				if (/^0/.test(value)) {
					state.display = '';
				} else {
					state.display += value;
				}

				state.formula = state.display;
				state.resultEvaluated = false;
			} else {
				if (state.resultEvaluated) {
					// Jika hasil sudah dievaluasi, restart dengan nilai baru
					state.display = value;
					const operators = ['+', 'x', '/', '-'];
					if (operators.includes(value)) {
						state.formulaToDisplay = state.lastResult + ' ' + value;
					} else {
						state.formulaToDisplay = state.lastResult + value;
					}
					state.formula = state.lastResult + value;
					console.info(state.formula);
					state.resultEvaluated = false;
				} else {
					const operatorWithoutMin = ['+', 'x', '/'];

					if (/^0{1}/.test(state.formula) && value === '0') {
						// Jangan tambahkan lebih dari satu nol pada awal angka
						console.info('ada 2 angka nol');
						return;
					} else {
						if (
							operatorWithoutMin.includes(state.formula.slice(-1)) &&
							operatorWithoutMin.includes(value)
						) {
							// Gantilah operator terakhir
							state.formula = state.formula.slice(0, -1) + value;
						} else if (
							['-'].includes(state.formula.slice(-1)) &&
							operatorWithoutMin.includes(value)
						) {
							// ganti 2 operator terakhir dari formula
							state.formula = state.formula.slice(0, -2) + value;
						} else {
							// tambahkan value ke formula
							state.formula += value;
						}

						state.display = value;
						// Update formulaToDisplay
						state.formulaToDisplay = formatFormulaToDisplay(state.formula);
					}
				}
			}
		},

		// Reducer untuk menghapus satu karakter dari display
		removeFromDisplay: (state) => {
			const formulaWithoutSpace = state.formulaToDisplay.replace(/\s/g, '');
			const formula = formulaWithoutSpace.slice(0, -1);
			state.formulaToDisplay = formatFormulaToDisplay(formula);
			state.lastResult = state.lastResult.toString().slice(0,-1);
			state.display = 0;
		},

		// Reducer untuk mereset kalkulator
		resetCalculator: (state) => {
			state.display = '';
			state.formula = '';
			state.formulaToDisplay = '';
			state.lastResult = '';
			state.resultEvaluated = false;
		},

		evaluateResult: (state) => {
			try {
				// ubah x ke *
				const formula = state.formula.replace(/x/g, '*');
				const result = evaluate(formula);

				// Tambahkan formula dan hasil evaluasi ke dalam histories
				const formattedResult = parseFloat(result.toFixed(4));
				const historyItemToCalculator = `${state.formulaToDisplay} = ${formattedResult}`;
				const historyItemToHistories = `${state.formula}=${formattedResult}`;

				const historyItemArray = historyItemToHistories.split('');
				const resultWithSpan = historyItemArray.map((char) => {
					if (['+', '-', '/', 'x', '='].includes(char)) {
						return char.replace(char, `<span>${char}</span>`);
					}
					return char;
				});

				state.histories = [...state.histories, resultWithSpan.join('')];

				state.formulaToDisplay = historyItemToCalculator;
				state.display = formattedResult.toString();
				state.resultEvaluated = true;

				// Simpan hasil terakhir untuk digunakan pada operasi selanjutnya
				state.lastResult = result;

				// Reset formula setelah hasil dievaluasi
				// state.formula = result.toString(); // Perubahan di sini
			} catch (error) {
				console.error(error.message);
				state.display = 'Error';
				state.resultEvaluated = true;
			}
		},
	},
});

export const {
	appendToDisplay,
	removeFromDisplay,
	resetCalculator,
	evaluateResult,
} = calculatorSlice.actions;

export default calculatorSlice.reducer;
