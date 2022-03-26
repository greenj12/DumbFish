import RandomFish from './RandomFish.js';
import GreedyFish from './GreedyFish.js';
import AlphaFish from './AlphaFish.js';

const Player = {
	// constants
	white: 'w',
	black: 'b',
	human: 'player',
	// AI
	latest: AlphaFish,
	ai: {
		RandomFish,
		GreedyFish,
		AlphaFish,
	}
}

export default Player;