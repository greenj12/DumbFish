import {
	bishop,
	king,
	knight,
	pawn,
	queen, 
	rook
} from 'src/chess/pieces';

class Game {
	constructor(fen) {
		this.baord = this.readFen(fen);
	}
};

const fenKey = {
	p: [pawn, 'b'],
	n: [knight, 'b'],
	b: [bishop, 'b'],
	r: [rook, 'b'],
	q: [queen, 'b'],
	k: [king, 'b'],
	P: [pawn, 'w'],
	N: [knight, 'w'],
	B: [bishop, 'w'],
	R: [rook, 'w'],
	Q: [queen, 'w'],
	K: [king, 'w'],
}

function readFen(fen) {
	board = [];
	const {
		pieces, active, castling, enPassentTarget, halfmove, fullmove
	} = fen.split(' ');
	var rowNum = 0;
	var colNum = 0;
	for row in pieces.split('/') {
		rowNum++;
		board[rowNum] = [];
		for char in row.split('') {
			if (Number.isInteger(char)) {
				colNum += char;
			} else if (fenKey[char]) {
				board[rowNum][colNum] = fenKey[char][0](rowNum, colNum, fenKey[char][1]);
			} else {
				console.log("Unrecognized char while reading fen");
			}
		};
	};
	return board;
}

export default Game;