import './styles/App.scss';

import Calculator from './components/Calculator';
import Histories from './components/Histories';

function App() {
	return (
		<div id='app'>
			<Calculator />
			<Histories />
		</div>
	);
}

export default App;
