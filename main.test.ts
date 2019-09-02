it("scores perfect game", () => {
    // GIVEN
    // Initialize game
    const game = new BowlingGame();

    // WHEN
    // Bowl twelve strikes
    for (let i = 0; i < 12; i++) {
        game.hit(10);
    }

    // THEN
    // Expect score of 300
    const score = game.score();
    expect(score).toEqual(300);

});
it("scores all gutter balls", () => {
    // GIVEN
    // Initialize game
    const game = new BowlingGame();

    // WHEN
    // Bowl twenty gutter balls
    for (let i = 0; i < 20; i++) {
        game.hit(0);
    }

    // THEN
    // Expect score of 0
    const score = game.score();
    expect(score).toEqual(0);

});
it("scores all nines and spares", () => {
    // GIVEN
    // Initialize game
    const game = new BowlingGame();

    // WHEN
    // Bowl ten spares
    for (let i = 0; i < 10; i++) {
        game.hit(9);
        game.hit(1);
    }
    // Bowl extra shot from 10th frame
    game.hit(9);

    // THEN
    // Expect score of 19 * 10 = 190
    const score = game.score();
    expect(score).toEqual(190);

});

it("scores all nines", () => {
    // GIVEN
    // Initialize game
    const game = new BowlingGame();

    // WHEN
    // Bowl ten nines
    for (let i = 0; i < 10; i++) {
        game.hit(9);
        game.hit(0); // second ball is gutter ball
    }

    // THEN
    // Expect score of 9 * 10 = 90
    const score = game.score();
    expect(score).toEqual(90);

});


it("scores 0 - 10", () => {
    // GIVEN
    // Initialize game
    const game = new BowlingGame();

    // WHEN
    // Bowl ten times starting with a gutter ball and then each time hitting one more ball
    for (let i = 0; i < 10; i++) {
        game.hit(i);
        game.hit(0); // second ball is gutter ball
    }

    // THEN
    // Expect score of 0 + 1 + 2 + 3 + 4 + 5 + 6 + 7 + 8 + 9
    const score = game.score();
    expect(score).toEqual(0 + 1 + 2 + 3 + 4 + 5 + 6 + 7 + 8 + 9);

});