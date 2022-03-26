import Chess from 'chess.js';
import {shuffle, getGameOverAdvantage, getMaterialAdvantage} from './util.js';

// An implementation of minimax with just material advantage

const BetaFish = {
	toString: () => "BetaFish",

	getMove: (game) => {
		//const game = new Chess(fen);
		return BetaFish.alphabeta(3, game, game.turn(), null);
	},

	// getMoves: (fen) => {
	// 	const game = new Chess(fen);
	// 	const rootPlayer = game.turn();
	// 	const moves = game.moves();
	// 	const movesWithEval = [];
	// 	for (let move in moves) {
	// 		game.move(move);
	// 		const res = BetaFish.minimax(2, game, rootPlayer, move);
	// 		console.log(res);
	// 		movesWithEval.push(res);
	// 		game.undo();
	// 	}
	// 	return movesWithEval.sort(function(a, b) {
	// 		return a.eval - b.eval;
	// 	});
	// },

	alphabeta: (depth, game, rootPlayer, lastMove) => {
		const gameOver = getGameOverAdvantage(game);
		if (gameOver !== null) {
			return {
				move: lastMove,
				eval: (game.turn() === rootPlayer) ? -gameOver : gameOver,
			};
		};

		const moves = shuffle(game.moves());

		if (depth === 0 || moves.length === 0) {
			return {
				move: lastMove,
				eval: getMaterialAdvantage(game, rootPlayer),
			};
		};

		let bestMove = null;
		let bestValue = null;
		// let bestValue = (turn === rootPlayer) ? -9999 : 9999;
		// let bestValue = -9999;

		for (let i = 0; i < moves.length; i++) {
			let move = moves[i];
			game.move(move);
			let res = BetaFish.minimax(depth-1, game, rootPlayer, move);
			let value = res.eval;
			if (value === null) {
				console.warn("Bad eval, ", res, game.fen());
			}
			game.undo();

			if (bestMove === null) {
				bestValue = value;
				bestMove = move;
			} else {
				if (game.turn() === rootPlayer) {
					if (value > bestValue) {
						bestValue = value;
						bestMove = move;
					}
				} else {
					if (value < bestValue) {
						bestValue = value;
						bestMove = move;
					}
				}
			}		
		}

		return {
			move: bestMove,
			eval: bestValue
		}
	}
}

export default BetaFish;