it("throws error when negative number input", () => {
    // GIVEN
    // Initialize game
    const game = new BowlingGame();

    // WHEN
    function bowl() {
        // Try to bowl a negative number
        game.hit(-2);
    }
    // THEN
    // Expect an error
    expect(bowl).toThrowError(/negative/);
});

it("throws error when more than 10 pins are hit in one attempt", () => {
    // GIVEN
    // Initialize game
    const game = new BowlingGame();

    // WHEN
    function bowl() {
        // Try to hit eleven
        game.hit(11);
    }
    // THEN
    // Expect an error
    expect(bowl).toThrowError(/too many/);

});

it("throws error when more than 10 pins are hit in two successive attempts (where first is not a strike)", () => {
    // GIVEN
    // Initialize game
    const game = new BowlingGame();

    // WHEN
    function bowl() {
        // Try to hit eleven in two attempts
        game.hit(2);
        game.hit(9);
    }
    // THEN
    // Expect an error
    expect(bowl).toThrowError(/too many/);

});


it("throws error when more than 10 pins are hit in two successive attempts after a strike", () => {
    // GIVEN
    // Initialize game
    const game = new BowlingGame();

    // WHEN
    function bowl() {
        game.hit(10);
        // Try to hit eleven in two attempts
        game.hit(2);
        game.hit(9);
    }
    // THEN
    // Expect an error
    expect(bowl).toThrowError(/too many/);

});

it("throws error when game is over after ten frames", () => {
    // GIVEN
    // Initialize game
    const game = new BowlingGame();

    // WHEN
    function bowl() {
        // Try to hit after game is over
        for (let i = 0; i < 10; i++) {
            game.hit(0);
            game.hit(0);
        }
        game.hit(1);
    }
    // THEN
    // Expect an error
    expect(bowl).toThrowError(/game over/);

});
it("throws error when game is over after ten frames but allow extra throw when spare is in tenth frame", () => {
    // GIVEN
    // Initialize game
    const game = new BowlingGame();
    let throwCount = 0;

    // WHEN
    function bowl() {
        // Try to hit after game is over
        for (let i = 0; i < 10; i++) {
            game.hit(9);
            throwCount++;
            game.hit(1);
            throwCount++;
        }
        game.hit(1);
        throwCount++;
        game.hit(1);
        throwCount++;
    }
    // THEN
    // Expect an error
    expect(bowl).toThrowError(/game over/);
    // Expect 21 throws
    expect(throwCount).toEqual(21);
});
it("throws error when game is over after ten frames but allow extra two throws when strike is in tenth frame", () => {
    // GIVEN
    // Initialize game
    const game = new BowlingGame();
    let throwCount = 0;

    // WHEN
    function bowl() {
        // Try to hit after game is over
        for (let i = 0; i < 10; i++) {
            game.hit(10);
            throwCount++;
        }
        game.hit(1);
        throwCount++;
        game.hit(1);
        throwCount++;
        game.hit(1);
        throwCount++;
    }
    // THEN
    // Expect an error
    expect(bowl).toThrowError(/game over/);
    // Expect 21 throws
    expect(throwCount).toEqual(12);
});
