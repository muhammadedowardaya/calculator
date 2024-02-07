import { useDispatch, useSelector } from 'react-redux';
import '../styles/Calculator.scss';
import {
	appendToDisplay,
	evaluateResult,
	removeFromDisplay,
	resetCalculator,
} from '../features/calculator/reducer';

function Calculator() {
	const display = useSelector((state) => state.calculator.display);
	const formula = useSelector((state) => state.calculator.formulaToDisplay);

	const dispatch = useDispatch();

	const handleClick = (event) => {
		const operators = ['+', '-', 'x', '/'];
		operators.includes(formula);

		const value = event.target.textContent;
		switch (event.target.getAttribute('id')) {
			case 'clear':
				dispatch(resetCalculator());
				break;
			case 'equals':
				dispatch(evaluateResult());
				break;
			case 'delete':
				dispatch(removeFromDisplay());
				break;
			default:
				dispatch(appendToDisplay(value));
		}
	};

	return (
		<div className="calculator">
			<div className="formula-screen">{formula}</div>
			<div id="display">{display === '' ? 0 : display}</div>
			<div className="action">
				<button id="clear" onClick={handleClick}>
					AC
				</button>
				<button id="divide" onClick={handleClick}>
					/
				</button>
				<button id="multiply" onClick={handleClick}>
					x
				</button>
				<button id="seven" onClick={handleClick}>
					7
				</button>
				<button id="eight" onClick={handleClick}>
					8
				</button>
				<button id="nine" onClick={handleClick}>
					9
				</button>
				<button id="subtract" onClick={handleClick}>
					-
				</button>
				<button id="four" onClick={handleClick}>
					4
				</button>
				<button id="five" onClick={handleClick}>
					5
				</button>
				<button id="six" onClick={handleClick}>
					6
				</button>
				<button id="add" onClick={handleClick}>
					+
				</button>
				<button id="one" onClick={handleClick}>
					1
				</button>
				<button id="two" onClick={handleClick}>
					2
				</button>
				<button id="three" onClick={handleClick}>
					3
				</button>
				<button id="equals" onClick={handleClick}>
					=
				</button>
				<button id="delete" onClick={handleClick}>
					Del
				</button>
				<button id="zero" onClick={handleClick}>
					0
				</button>
				<button id="decimal" onClick={handleClick}>
					.
				</button>
			</div>
		</div>
	);
}

export default Calculator;
