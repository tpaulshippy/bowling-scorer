import BowlingGame from './BowlingGame';
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

console.log("Welcome to the Bowling scorer (press CTRL-C to exit)");
const game = new BowlingGame();

rl.setPrompt("How many pins did you hit? ");
rl.prompt();

rl.on('line', function (line) {
    const pins = parseInt(line.trim());
    if (isNaN(pins)) {
        console.log("Please enter a number.")
    }
    else {
        try {
            game.Hit(pins);
            const totalScore = game.Score();
            game.ShowState(pins, totalScore);
        }
        catch (e) {
            console.error(e.message);
        }
    }

    rl.prompt();
}).on('close', function () {
    process.exit(0);
});

