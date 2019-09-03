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
            frame.ScoreBonus = [];

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

    ShowState(pins: number, score: number) {
        let scoreOutput = "FRAMES\n";
        for (let i = 0; i < 10; i++) {
            const frameNumber = i + 1;
            scoreOutput += `[${frameNumber.toString().padStart(2, '0')}] `
        }
        scoreOutput += `\n`;
        for (let i = 0; i < 10; i++) {
            if (this.Frames.length > i) {
                const frame = this.Frames[i];
                scoreOutput += `[${stringifyScore(frame)}] `
            }
            else {
                scoreOutput += `[  ] `
            }
        }
        console.log(scoreOutput);

        console.log(`Your current score is ${score}`);

        if (this.CurrentFrame.Hits[0] === 10) {
            console.log("Nice strike!");
        }
        else if (this.CurrentFrame.TotalPins() == 10) {
            console.log("Nice spare!");
        }
        else if (pins === 0) {
            console.log("Aww, gutter ball.");
        }

    }


}

function stringifyScore(frame: Frame) {
    if (frame.TotalPins() < 10) {
        return frame.Score().toString().padStart(2, '0');
    }
    else if (frame.Hits[0] === 10) {
        return ' X';
    }
    else if (frame.TotalPins() === 10) {
        return ' /';
    }

}
