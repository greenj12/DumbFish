import Chess from 'chess.js';
import {shuffle, getMaterialAdvantage} from './util.js';

const GreedyFish = {
	toString: () => "GreedyFish",

	getMove: (game) => {
		//const game = new Chess(fen);
		const moves = shuffle(game.moves());

		let bestMove = null;
		let bestValue = -9999;

		const player = game.turn();
		for (let i = 0; i < moves.length; i++) {
			let move = moves[i];
			game.move(move);
			let value = getMaterialAdvantage(game, player);
			game.undo();
			if (value > bestValue) {
				bestValue = value;
				bestMove = move;
			}
		}

		return {
			move: bestMove,
			eval: bestValue
		}
	}
}

export default GreedyFish;