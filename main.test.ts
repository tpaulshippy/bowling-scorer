it("scores perfect game", () => {
    // GIVEN
    // Initialize game
    const game = new BowlingGame();

    // WHEN
    // Bowl twelve strikes
    for (let i = 0; i < 12; i++) {
        game.bowl('X');
    }

    // THEN
    // Expect score of 300
    const score = game.score();
    expect(score).toEqual(300);

});