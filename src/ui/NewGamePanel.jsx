import React, {useState, useEffect} from 'react';

import Panel from '../components/Panel';
import Player from '../player';

const AIList = Object.values(Player.ai);

const NewGamePanel = (props) => {
	
	// starting fen, "start" doesn't work
	const [fen, setFen] = useState('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1');
	const [white, setWhite] = useState(props.white);
	const [black, setBlack] = useState(props.black);

	if (!props.show) return null;

	const toggleWhite = () => {
		if (white === Player.human) {
			setWhite(Player.latest);
		} else {
			setWhite(Player.human);
		}
	}

	const setWhiteAI = (event) => {
		setWhite(Player.ai[event.target.value]);
	}

	const toggleBlack = () => {
		if (black === Player.human) {
			setBlack(Player.latest);
		} else {
			setBlack(Player.human);
		}
	}

	const setBlackAI = (event) => {
		setBlack(Player.ai[event.target.value]);
	}

	return (
		<Panel title="New Game" floating={true} >
			<Panel title="White">
				<div className="slideThree">  
	      			<input type="checkbox" id="slideWhite" onChange={toggleWhite} defaultChecked={white !== Player.human} />
	      			<label htmlFor="slideWhite"></label>
	    		</div>
	    		{white === Player.human ? 
	    			white :
	    			<select 
	    				value={white} 
	    				onChange={setWhiteAI}>
        				{AIList.map((ai, i) => (
        					<option value={ai} key={i}>{ai.toString()}</option>
        				))}
     				</select>
	    		}
			</Panel>

			<Panel title="Black">
				<div className="slideThree">  
	      			<input type="checkbox" id="slideBlack" onChange={toggleBlack} defaultChecked={black !== Player.human} />
	      			<label htmlFor="slideBlack"></label>
	    		</div>
	    		{black === Player.human ? 
	    			black :
	    			<select 
	    				value={black} 
	    				onChange={setBlackAI}>
        				{AIList.map((ai, i) => (
        					<option value={ai} key={i}>{ai.toString()}</option>
        				))}
     				</select>
	    		}
			</Panel>
			
			<button className="button-primary" onClick={() => {
				props.startGame(fen, white, black);
			}}>
				Play
			</button>
		</Panel>
	);
}

export default NewGamePanel;
