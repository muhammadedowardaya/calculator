import { useSelector } from 'react-redux';
import parse from 'html-react-parser';
import '../styles/Histories.scss';

export default function Histories() {
	const histories = useSelector((state) => state.calculator.histories);
	// const [data, setData] = React.useState([]);

	return (
		<div id="histories">
			<h2>History</h2>
			<ul className="list-histories">
				{histories &&
					histories
						.slice()
						.reverse()
						.slice(0, 10)
						.map((item, index) => <li key={index}>{parse(item)}</li>)}
			</ul>
		</div>
	);
}
