import Chess from 'chess.js';

const RandomFish = {
	toString: () => "RandomFish",

	getMove: (game) => {
		//const game = new Chess(fen);
		const moves = game.moves();
		const i = Math.floor(Math.random() * moves.length);
		return {
			move: moves[i],
			eval: (Math.random() * 20) - 10,
		}
	}
}

export default RandomFish;