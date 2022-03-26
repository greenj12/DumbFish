import {pieceConstructor} from 'src/chess/pieces';

const getMoves = () => {
	return [];
}

const king = pieceConstructor("King", "k", 100, getMoves);

export default king;
