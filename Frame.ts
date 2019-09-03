export default class Frame {
    constructor(index: number) {
        this.Index = index;
        this.Hits = [];
        this.ScoreBonus = [];
    }
    Index: number;
    ScoreBonus: number[];
    Hits: number[];

    AddToFrame(pins: number): void {
        this.validate(pins);
        if (!this.IsClosed()) {
            this.Hits.push(pins);
        }
    }

    TotalPins(): number {
        if (this.Hits.length === 0) {
            return 0;
        }
        return this.Hits.reduce(sum);
    }

    Score(): number {
        return this.TotalPins() + (this.ScoreBonus.length > 0 ? this.ScoreBonus.reduce(sum) : 0);
    }

    IsClosed(): boolean {
        // frames one through nine
        if (this.Index < 9 && this.Hits.length > 0) {
            if (this.Hits.length > 1) {
                return true; // two attempts
            }
            else if (this.Hits[0] === 10) {
                return true; // strike
            }
        }
        // tenth frame
        if (this.Index == 9 && this.Hits.length > 0) {
            if (this.Hits.length > 2) {
                return true; // three attempts
            }
            else if (this.Hits.length > 1 &&
                this.Hits[0] + this.Hits[1] < 10) {
                return true; // no strike or spare
            }
        }

        return false;
    }

    validate(pins: number): void {
        if (pins < 0) {
            throw new Error("cannot be a negative number");
        }
        if (pins > 10) {
            throw new Error("too many pins hit")
        }
        if (!this.IsClosed() && this.Index < 9 && this.TotalPins() + pins > 10) {
            throw new Error(`too many pins hit in open frame ${this.Index + 1}`)
        }
        // TODO: Validate tenth frame
    }
}

const sum = (total: number, num: number): number => {
    return total + num;
}