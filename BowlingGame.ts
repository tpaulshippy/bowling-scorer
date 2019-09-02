import Frame from "./Frame";
import IBowler from './IBowler';
export default class BowlingGame implements IBowler {
    frames: Frame[] = [];
    currentFrame: Frame = null;

    Hit(pins: number): void {
        if (!this.currentFrame || (this.currentFrame && this.currentFrame.IsClosed())) {
            if (this.frames.length === 10 && this.currentFrame.IsClosed()) {
                throw new Error("game over");
            }

            this.currentFrame = new Frame(this.frames.length);
            // Push current frame to array of frames
            this.frames.push(this.currentFrame);
        }
        this.currentFrame.AddToFrame(pins);
    }

    Score(): number {
        let currentScore = 0;

        return currentScore;
    }


}

