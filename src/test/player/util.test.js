import {Chess} from 'chess.js';

import {getMaterialAdvantage} from '../../player/util.js';

test("getMaterialAdvantage, fool's mate", () => {
	const game = new Chess('rnb1kbnr/pppp1ppp/8/4p3/6Pq/5P2/PPPPP2P/RNBQKBNR w KQkq - 1 3');
	const advantage = getMaterialAdvantage(game, 'b');
	expect(advantage).toBe(9999);
});
