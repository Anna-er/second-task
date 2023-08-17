const onload = () => {

    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = width;
    canvas.height = height;

    const _renderSnake = (snake, x, y) => {
        snake.tail.forEach(s => {
            if(s.x === x && s.y === y){
                ctx.fillStyle = colors.snakeBody;
                ctx.fillRect(x * ceil, y * ceil + board.height, ceil, ceil);
                if(s.h){
                    ctx.fillStyle = colors.snakeHead;
                    ctx.fillRect(x * ceil, y * ceil + board.height, ceil, ceil);
                }
            }
        });
    };

    const _renderFood = (food, x, y) => {
        if(food.apples.x === x && food.apples.y === y){
            ctx.fillStyle = colors.apples;
            ctx.fillRect(x * ceil, y * ceil + board.height, ceil, ceil);
        }
    };

    const _renderScoreboard = (score, maxScore) => {
        ctx.fillStyle = colors.popup;
        ctx.fillRect(0, 0, board.width, board.height);

        ctx.fillStyle      = colors.text;
        ctx.font           = board.font;
        ctx.textAlign      = "left";
        ctx.textBaseline   = "top";
        ctx.fillText(score, board.textScore.x, board.textScore.y);

        ctx.fillStyle = colors.apples;
        ctx.fillRect(board.apple.x, board.apple.y, ceil, ceil);

        ctx.fillStyle      = colors.text;
        ctx.font           = board.font;
        ctx.textAlign      = "left";
        ctx.textBaseline   = "top";
        ctx.fillText(`Highest Score: ${maxScore}`, board.textMaxScore.x, board.textMaxScore.y);
    };

    const _renderPopup = (text) => {
        const halfW = (width / 2),
              halfH = (height / 2),
              x     = halfW - (popup.width / 2),
              y     = halfH - (popup.height / 2);
        ctx.fillStyle = colors.popup;
        ctx.fillRect(x, y, popup.width, popup.height);

        ctx.fillStyle      = colors.text;
        ctx.font           = popup.font;
        ctx.textAlign      = "center";
        ctx.textBaseline   = "middle";
        ctx.fillText(text, halfW, halfH);
    };

    const renderGame = () => {
        ctx.clearRect(0, 0, width, height);

        const { snake, food, score, maxScore, gameStart, win, gameOver } = state;

        _renderScoreboard(score, maxScore);


        for(let y = 0; y < row; y += 1){
            for(let x = 0; x < row; x += 1){
                _renderSnake(snake, x, y);
                _renderFood(food, x, y);
            }
        }

        if(!gameStart){
            _renderPopup("Press any key");
        }
        if(win){
            _renderPopup("You Win");
        }
        if(gameOver){
            _renderPopup("Game Over");
        }
    };

    renderGame();

    let startTime       = 0,
        currentTime     = 0,
        time            = 0,
        currentSecond   = 0;

    animateRAFInterval.start(() => {

        if(startTime === 0){
            startTime = new Date().getTime();
        }

        currentTime = new Date().getTime();
        time = currentTime - startTime;
        currentSecond = Math.floor(time / state.snake.speed);

        if(currentSecond > 0){
            startTime = 0;

            if(state.gameStart){

                checkWin();

                moveSnake();
                addNewFood();
                renderGame();
                if(state.win){
                    animateRAFInterval.cancel();
                    document.removeEventListener("keydown", onkeydown);
                }
                if(state.gameOver){
                    state.score = 0;
                    state.snake = {
                        tail: [
                            {x: 1, y: 1, d: "right", h: false},
                            {x: 2, y: 1, d: "right", h: false},
                            {x: 3, y: 1, d: "right", h: false},
                            {x: 4, y: 1, d: "right", h: true}
                        ],
                        direction: "right",
                        lastPositionTail: {},
                        speed: 300
                    }
                }
            }
        }
    });

    const onkeydown = (e) => {
        state.gameStart = true;
        state.gameOver = false;

        changeDirection(e.keyCode);
    };

    document.addEventListener("keydown", onkeydown);
};

window.addEventListener("load", onload);