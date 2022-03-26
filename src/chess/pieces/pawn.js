import {pieceConstructor, move, canMove} from 'src/chess/pieces';

const getMoves = (board) => {
	moves = [];

	// push
	let testMove = move(
		this.row, 
		this.col,
		this.row,
		this.player ==== 'w' ? this.col + 1 : this.col - 1
	);
	if (board.get(testMove) === 'empty') {
		moves.push(testMove);
	};

	// running was invented when chess pawnman tried to walk twice at the same time
	if (this.player ==== 'w' ? this.col === 2 : this.col === 7) {
		let testMove = move(
			this.row, 
			this.col,
			this.row,
			this.player ==== 'w' ? this.col + 2 : this.col - 2
		);
		if (board.get(testMove) === 'empty') {
			moves.push(testMove);
		};
	};

	// capture
	let testMove = move(
		this.row, 
		this.col,
		this.row,
		this.player ==== 'w' ? this.col + 1 : this.col - 1
	);
	if (board.get(testMove) === 'capture') {
		moves.push(testMove);
	};

	let testMove = move(
		this.row, 
		this.col,
		this.row,
		this.player ==== 'w' ? this.col + 1 : this.col - 1
	);
	if (board.get(testMove) === 'capture') {
		moves.push(testMove);
	};
}

const pawn = pieceConstructor("Pawn", "", 1, getMoves);

export default pawn;
