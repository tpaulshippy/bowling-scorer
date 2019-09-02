import IScorer from './IScorer';
export default interface IBowler extends IScorer {
    Hit(pins: number): void;
}