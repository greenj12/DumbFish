
// Fisher–Yates shuffle ala Wikipedia
function shuffle(arr) {
	for (let i = arr.length-1; i > 0; i--) {
		const randomIndex = Math.floor(Math.random() * i);
		[arr[i], arr[randomIndex]] = [arr[randomIndex], arr[i]];
	}
	return arr;
};

const pieceEval = {
	P: 1,
	N: 3,
	B: 3,
	R: 5,
	Q: 9,
	K: 100,
	p: -1,
	n: -3,
	b: -3,
	r: -5,
	q: -9,
	k: -100
}

function getGameOverAdvantage(game) {
	if (game.in_checkmate()) {
		return 9999;
	} else if (game.in_draw() || game.in_stalemate() || game.in_threefold_repetition()) {
		return 0;
	} 
	return null;
}

// player should be 'b' or 'w' for the player making the evaluation
function getMaterialAdvantage(game, player) {
	let adv = 0;
	const fen = game.fen();
	let board = fen.split(' ', 1)[0];
	board.split('').forEach((c) => {
		if (c in pieceEval) {
			adv += pieceEval[c];
		}
	});
	return player === 'w' ? adv : -adv;
};

export {
	shuffle,
	getGameOverAdvantage,
	getMaterialAdvantage,
}
