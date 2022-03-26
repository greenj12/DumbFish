import {pieceConstructor} from 'src/chess/pieces';

const getMoves = () => {
	return [];
}

const knight = pieceConstructor("Knight", "N", 3, getMoves);

export default knight;
