import React, {useState, useEffect} from 'react';

import Panel from '../components/Panel';

const ResultPanel = (props) => {
	
	if (!props.show) return null;

	return (
		<Panel title='Game Over' floating='true'>
			<div>
				{props.result}
			</div>
			<div>
				{props.explanation}
			</div>
			<div>
				<button onClick={props.reset}>Play Again</button>
			</div>
		</Panel>
	);
}

export default ResultPanel;
