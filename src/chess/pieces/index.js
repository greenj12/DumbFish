import bishop from 'src/chess/pieces/bishop';
import king from 'src/chess/pieces/king';
import knight from 'src/chess/pieces/knight';
import pawn from 'src/chess/pieces/pawn';
import queen from 'src/chess/pieces/queen';
import rook from 'src/chess/pieces/rook';

const algebraicRow = {a:1, b:2, c:3, d:4, e:5, f:6, g:7, h:8};

const pieceConstructor = (name, notation, material, getMoves) => {
	return (row, col, player) => {
		name,
		notation,
		material,
		getMoves,
		row,
		col,
		player
	};
};

const move = (r1, c1, r2, c2) => {
	return {
		from: {
			row: r1,
			col: c1
		},
		to: {
			row: r2,
			col: c2 
		}
	};
};

export {
	bishop,
	king,
	knight,
	pawn,
	queen,
	rook,
	pieceConstructor,
	move
};
