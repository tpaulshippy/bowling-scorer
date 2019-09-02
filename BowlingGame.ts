import Frame from "./Frame";
import IBowler from './IBowler';
export default class BowlingGame implements IBowler {
    Frames: Frame[] = [];
    CurrentFrame: Frame = null;

    Hit(pins: number): void {
        if (!this.CurrentFrame || (this.CurrentFrame && this.CurrentFrame.IsClosed())) {
            if (this.Frames.length === 10 && this.CurrentFrame.IsClosed()) {
                throw new Error("game over");
            }

            this.CurrentFrame = new Frame(this.Frames.length);
            // Push current frame to array of frames
            this.Frames.push(this.CurrentFrame);
        }
        this.CurrentFrame.AddToFrame(pins);
    }

    Score(): number {
        let currentScore: number = 0;
        let framePlusOne: Frame = null;
        let framePlusTwo: Frame = null;

        for (let index = 0; index < this.Frames.length; index++) {
            const frame = this.Frames[index];

            if (frame.Index < 9) {
                framePlusOne = this.Frames[index + 1];
            }
            else {
                framePlusOne = null;
            }
            if (frame.Index < 8) {
                framePlusTwo = this.Frames[index + 2];
            }
            else {
                framePlusTwo = null;
            }

            if (frame.Hits && frame.Hits.length > 1 && frame.TotalPins() === 10) {
                // Spare
                if (framePlusOne) {
                    frame.ScoreBonus.push(framePlusOne.Hits[0]);
                }
            }

            if (frame.Hits[0] === 10) {
                // Strike
                if (framePlusOne) {
                    frame.ScoreBonus.push(framePlusOne.Hits[0]);
                    if (framePlusOne.Hits.length > 1) {
                        frame.ScoreBonus.push(framePlusOne.Hits[1]);
                    }
                    else if (framePlusTwo) {
                        frame.ScoreBonus.push(framePlusTwo.Hits[0]);
                    }
                }
            }
            currentScore += frame.Score();
        }


        return currentScore;
    }


}

