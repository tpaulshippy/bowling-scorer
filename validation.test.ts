import BowlingGame from './BowlingGame';

it("throws error when negative number input", () => {
    // GIVEN
    // Initialize game
    const game = new BowlingGame();

    // WHEN
    function bowl() {
        // Try to bowl a negative number
        game.Hit(-2);
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
        game.Hit(11);
    }
    // THEN
    // Expect an error
    expect(bowl).toThrowError(/too many/);

});

it("throws error when more than 10 pins are hit in two successive attempts where first is not a strike", () => {
    // GIVEN
    // Initialize game
    const game = new BowlingGame();

    // WHEN
    function bowl() {
        // Try to hit eleven in two attempts
        game.Hit(2);
        game.Hit(9);
    }
    // THEN
    // Expect an error
    expect(bowl).toThrowError(/too many pins hit in open frame/);

});


it("throws error when more than 10 pins are hit in two successive attempts after a strike", () => {
    // GIVEN
    // Initialize game
    const game = new BowlingGame();

    // WHEN
    function bowl() {
        game.Hit(10);
        // Try to hit eleven in two attempts
        game.Hit(2);
        game.Hit(9);
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
            game.Hit(0);
            game.Hit(0);
        }
        game.Hit(1);
        console.log(game);

    }
    // THEN
    // Expect an error
    expect(bowl).toThrowError(/game over/);


});
it("throws error when game is over but allow extra throw when spare is in tenth frame", () => {
    // GIVEN
    // Initialize game
    const game = new BowlingGame();
    let throwCount = 0;

    // WHEN
    function bowl() {
        // Try to hit after game is over
        for (let i = 0; i < 10; i++) {
            game.Hit(9);
            throwCount++;
            game.Hit(1);
            throwCount++;
        }
        game.Hit(1);
        throwCount++;
        game.Hit(1);
        throwCount++;
    }
    // THEN
    // Expect an error
    expect(bowl).toThrowError(/game over/);
    // Expect 21 throws
    expect(throwCount).toEqual(21);
});
it("throws error when game is over but allow extra two throws when strike is in tenth frame", () => {
    // GIVEN
    // Initialize game
    const game = new BowlingGame();
    let throwCount = 0;

    // WHEN
    function bowl() {
        // Try to hit after game is over
        for (let i = 0; i < 10; i++) {
            game.Hit(10);
            throwCount++;
        }
        game.Hit(1);
        throwCount++;
        game.Hit(1);
        throwCount++;
        game.Hit(1);
        throwCount++;
    }
    // THEN
    // Expect an error
    expect(bowl).toThrowError(/game over/);
    // Expect 21 throws
    expect(throwCount).toEqual(12);
});
