import BowlingGame from './BowlingGame';
it("scores perfect game", () => {
    // GIVEN
    // Initialize game
    const game = new BowlingGame();

    // WHEN
    // Bowl twelve strikes
    for (let i = 0; i < 12; i++) {
        game.Hit(10);
    }

    // THEN
    // Expect score of 300
    const score = game.Score();
    expect(score).toEqual(300);
    checkBonuses(game);

    expect(game).toMatchSnapshot();

});
it("scores all gutter balls", () => {
    // GIVEN
    // Initialize game
    const game = new BowlingGame();

    // WHEN
    // Bowl twenty gutter balls
    for (let i = 0; i < 20; i++) {
        game.Hit(0);
    }

    // THEN
    // Expect score of 0
    const score = game.Score();
    expect(score).toEqual(0);
    checkBonuses(game);

});
it("scores all nines and spares", () => {
    // GIVEN
    // Initialize game
    const game = new BowlingGame();

    // WHEN
    // Bowl ten spares
    for (let i = 0; i < 10; i++) {
        game.Hit(9);
        game.Hit(1);
    }
    // Bowl extra shot from 10th frame
    game.Hit(9);

    // THEN
    // Expect score of 19 * 10 = 190
    const score = game.Score();
    expect(score).toEqual(190);
    checkBonuses(game);

});

it("scores strike and then all nines and spares", () => {
    // GIVEN
    // Initialize game
    const game = new BowlingGame();

    // WHEN
    // Bowl strike
    game.Hit(10);

    // Bowl nine spares
    for (let i = 0; i < 9; i++) {
        game.Hit(9);
        game.Hit(1);
    }
    // Bowl extra shot from 10th frame
    game.Hit(9);

    // THEN
    // Expect score of 20 + (19 * 9) = 191
    const score = game.Score();
    expect(score).toEqual(191);
    checkBonuses(game);

});
it("scores two strikes and then all nines and spares", () => {
    // GIVEN
    // Initialize game
    const game = new BowlingGame();

    // WHEN
    // Bowl two strikes
    game.Hit(10);
    game.Hit(10);

    // Bowl eight spares
    for (let i = 0; i < 8; i++) {
        game.Hit(9);
        game.Hit(1);
    }
    // Bowl extra shot from 10th frame
    game.Hit(9);

    // THEN
    // Expect score of 29 + 20 + (19 * 8) = 201
    const score = game.Score();
    expect(score).toEqual(201);
    checkBonuses(game);
    expect(game).toMatchSnapshot();
});

it("scores all nines and spares except three strikes in tenth", () => {
    // GIVEN
    // Initialize game
    const game = new BowlingGame();

    // WHEN
    // Bowl ten spares
    for (let i = 0; i < 9; i++) {
        game.Hit(9);
        game.Hit(1);
    }
    // Bowl turkey
    game.Hit(10);
    game.Hit(10);
    game.Hit(10);

    // THEN
    // Expect score of 19 * 8 = 152 + 20 + 30 = 202
    const score = game.Score();
    expect(score).toEqual(202);
    checkBonuses(game);

});

it("scores all nines", () => {
    // GIVEN
    // Initialize game
    const game = new BowlingGame();

    // WHEN
    // Bowl ten nines
    for (let i = 0; i < 10; i++) {
        game.Hit(9);
        game.Hit(0); // second ball is gutter ball
    }

    // THEN
    // Expect score of 9 * 10 = 90
    const score = game.Score();
    expect(score).toEqual(90);
    checkBonuses(game);

});


it("scores 0 - 10", () => {
    // GIVEN
    // Initialize game
    const game = new BowlingGame();

    // WHEN
    // Bowl ten times starting with a gutter ball and then each time hitting one more ball
    for (let i = 0; i < 10; i++) {
        game.Hit(i);
        game.Hit(0); // second ball is gutter ball
    }

    // THEN
    // Expect score of 0 + 1 + 2 + 3 + 4 + 5 + 6 + 7 + 8 + 9
    const score = game.Score();
    expect(score).toEqual(0 + 1 + 2 + 3 + 4 + 5 + 6 + 7 + 8 + 9);
    checkBonuses(game);
});

function checkBonuses(game: BowlingGame) {
    // Ensure that spares have one bonus and strikes have two
    for (const frame of game.Frames) {
        if (frame.Hits[0] === 10 && frame.Index < 9) {
            expect(frame.ScoreBonus.length).toEqual(2);
        }
        else if (frame.TotalPins() === 10 && frame.Index < 9) {
            expect(frame.ScoreBonus.length).toEqual(1);
        }
    }
}