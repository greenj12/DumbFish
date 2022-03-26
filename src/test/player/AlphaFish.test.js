import {Chess} from 'chess.js';

import AlphaFish from '../../player/AlphaFish.js';

test("AlphaFish getMove, fool's mate in 1", () => {
	const game = new Chess('rnbqkbnr/pppp1ppp/8/4p3/6P1/5P2/PPPPP2P/RNBQKBNR b KQkq g3 0 2');
	const bestMove = AlphaFish.getMove(game);
	expect(bestMove).toStrictEqual({"eval":9999,move:"Qh4#"});
	
});

test("AlphaFish getMove, mate in 2", () => {
	const game = new Chess('3r4/2p5/p1p3pk/P1R1B2p/1PP2p1P/5P2/2Pr3P/4K3 b - - 1 1');
	const bestMove = AlphaFish.getMove(game);
	expect(bestMove).toStrictEqual({"eval":9999,move:"Rd1+"});
})
// rnbqkbnr/pppp1ppp/8/4p3/6P1/5P2/PPPPP2P/RNBQKBNR b KQkq g3 0 2
