import nonograms from '../nonograms/nonograms';
import PlayGround from '../playground/Playground';
import '../settingsGame/settingsGame';

const current = 'snowman';
const currentNonograms = nonograms.filter((item) => item.title === current);
console.log(currentNonograms);

const playGround = new PlayGround(currentNonograms[0].matrix);
