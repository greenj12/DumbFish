import React, {useState, useEffect, useReducer} from 'react';
import { Chessboard } from "react-chessboard";
import Chess from 'chess.js';
import Player from '../player';

import NewGamePanel from './NewGamePanel';
import ResultPanel from './ResultPanel';

const Actions = {
	START_GAME: 'startgame',
	MOVE: 'move',
	PLAYER_MOVE: 'player',
	GAME_OVER: 'gameover',
	RESET: 'reset',
}

const GameState = {
	SETUP: 'setup',
	PLAY: 'play',
	OVER: 'over',
}

const initialState = {
	draggable: false,
	gameState: GameState.SETUP,
	fen: 'start',
	game: null,
	white: Player.human,
	black: Player.latest,
	turn: 'w',
	orientation: 'white',
	squareStyles: {},
	gameOver: {},
}

function reducer(state, action) {
	switch (action.type) {
		case Actions.START_GAME:
			return {
				gameState: GameState.PLAY,
				fen: action.payload.fen,
				game: new Chess(),
				white: action.payload.white,
				black: action.payload.black,
				turn: 'w',
				draggable: action.payload.draggable,
			}
		case Actions.MOVE:
			return {
				fen: action.payload.fen,
				turn: action.payload.turn,
				draggable: false,
			}
		case Actions.PLAYER_MOVE:
			return {
				draggable: true,
			}
		case Actions.GAME_OVER:
			return {
				gameState: GameState.OVER,
				draggable: false,
				gameOver: {
					result: action.payload.result,
					explanation: action.payload.explanation,
				}
			}
		case Actions.RESET:
			return {
				draggable: false,
				gameState: GameState.SETUP,
				fen: 'start',
			};
		default:
			throw new Error();
	}
}

const GameScreen = () => {
	const [boardWidth, setBoardWidth] = useState(undefined);
	const [state, dispatch] = useReducer(
		(state, action) => Object.assign({}, state, reducer(state, action)), 
		initialState);

	const startGame = (fen, white, black) => {
		dispatch({
			type: Actions.START_GAME,
			payload: {
				fen, 
				white, 
				black,
				draggable: (white === Player.human),
			}
		});
	};

	const onDrop = ({sourceSquare, targetSquare, piece}) => {
		const move = state.game.move({
	    	from: sourceSquare,
	    	to: targetSquare,
	    	promotion: "q"
		});
		// illegal move
		if (move === null) return;
		dispatch({type: Actions.MOVE, payload: {
			fen: state.game.fen(),
			turn: state.game.turn()
		}});
	};

	const reset = () => {
		dispatch({type: Actions.RESET});
	};

	// const onMouseOverSquare = (square) => {
	// 	if (!allowMove) return;
	// 	// console.log(square);
	// };

	// from the examples on react-chessboard.com
	useEffect(() => {
    	function handleResize() {
    		const display = document.getElementsByClassName('game-screen')[0];
    		setBoardWidth(display.offsetWidth);
    	}

    	window.addEventListener('resize', handleResize);
    	handleResize();
    	return () => window.removeEventListener('resize', handleResize);
	}, []);

	useEffect(() => {
		const player = state.turn === 'w' ? state.white : state.black;
		if (state.gameState === GameState.PLAY) {
			// look for game over conditions
			if (state.game.in_checkmate()) {
				dispatch({type: Actions.GAME_OVER, payload: {
					result: (state.turn === 'w' ? 'Black' : 'White') + ' Wins!',
					explanation: 'by checkmate',
				}});
			}
			else if (state.game.in_stalemate()) {
				dispatch({type: Actions.GAME_OVER, payload: {
					result: 'Draw',
					explanation: 'by stalemate',
				}});
			}
			else if (state.game.in_threefold_repetition()) {
				dispatch({type: Actions.GAME_OVER, payload: {
					result: 'Draw',
					explanation: 'by threefold repetition',
				}});
			}
			else if (state.game.insufficient_material()) {
				dispatch({type: Actions.GAME_OVER, payload: {
					result: 'Draw',
					explanation: 'by insufficient material',
				}});
			}
			// 50 move rule should be the only remaining draw condition
			else if (state.game.in_draw()) {
				dispatch({type: Actions.GAME_OVER, payload: {
					result: 'Draw',
					explanation: 'by 50-move rule',
				}});
			}

			// normal play
			else if (player === Player.human) {
				dispatch({type: Actions.PLAYER_MOVE});
			} else {
				setTimeout(() => {
					const aiMove = player.getMove(new Chess(state.fen));
					console.log(aiMove);
					state.game.move(aiMove.move);
					dispatch({type: Actions.MOVE, payload: {
						fen: state.game.fen(),
						turn: state.game.turn()
					}});			
				}, 200);
			};
		};
	}, [state.gameState, state.turn]);

	return  (
		<div className="game-screen">
			<NewGamePanel 
				show={state.gameState === GameState.SETUP} 
				startGame={startGame}
				white={state.white}
				black={state.black}
			/>
			<ResultPanel 
				show={state.gameState === GameState.OVER} 
				result={state.gameOver.result}
				explanation={state.gameOver.explanation}
				reset={reset}
			/>
			<Chessboard
				//calcWidth={({screenWidth, screenHeight}) => {return min(560, screenWidth - 16)}}
		 		arePiecesDraggable={state.draggable}
		 		boardWidth={boardWidth}
		 		// allowDrag={allowDrag}
		 		// onMouseOverSquare={onMouseOverSquare}
		 		// onSquareClick={(s) => this.onSquareClick(s)}
		 		position={state.fen}
		 		//squareStyles={state.squareStyles}
		 		onPieceDrop={onDrop}
		 	/>
		</div>
	);
}

export default GameScreen;
