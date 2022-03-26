import {pieceConstructor} from 'src/chess/pieces';

const getMoves = () => {
	return [];
}

const queen = pieceConstructor("Queen", "Q", 9, getMoves);

export default queen;
