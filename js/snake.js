const changeDirection = (keyCode) => {
    const direction = mapKeyCode(keyCode);

    if(_hasDirection(state.snake, direction)){
        state.snake.direction = direction;
    }
};

const moveSnake = () => {
    const headSnake = _getHeadSnake(state.snake);
    const direction = state.snake.direction;
    let newMovementSnake;

    if(direction === "left"){
        newMovementSnake = { x: headSnake.x - 1, y: headSnake.y, d: direction, h: true};
    }
    if(direction === "right"){
        newMovementSnake = { x: headSnake.x + 1, y: headSnake.y, d: direction, h: true};
    }
    if(direction === "up"){
        newMovementSnake = { x: headSnake.x, y: headSnake.y - 1, d: direction, h: true};
    }
    if(direction === "down"){
        newMovementSnake = { x: headSnake.x, y: headSnake.y + 1, d: direction, h: true};
    }

    newMovementSnake = _setTeleportSnake(state.snake, newMovementSnake);

    if(_getCollisionSnake(newMovementSnake)){
        state.gameStart = false;
        state.win = false;

        state.gameOver = true;
        return true;
    }

    state.snake.lastPositionTail =  state.snake.tail.shift();
    headSnake.h = false;

    state.snake.tail.push(newMovementSnake);

    _checkGrowth();
};

const _setTeleportSnake = (snake, newHeadSnake) => {
    const { direction } = snake;
    const rowEdge = row - 1;

    if(newHeadSnake.x > rowEdge && direction === "right"){
        return { ...newHeadSnake, x: 0 };
    }
    if(newHeadSnake.x < 0 && direction === "left"){
        return { ...newHeadSnake, x: rowEdge };
    }
    if(newHeadSnake.y < 0 && direction === "up"){
        return { ...newHeadSnake, y: rowEdge };
    }
    if(newHeadSnake.y > rowEdge && direction === "down"){
        return { ...newHeadSnake, y: 0 };
    }

    return { ...newHeadSnake };
};

const _hasDirection = (snake, direction) => {
    const headSnake = _getHeadSnake(snake);

    if(
        (direction === "left" && headSnake.d !== "right") ||
        (direction === "right" && headSnake.d !== "left") ||
        (direction === "up" && headSnake.d !== "down") ||
        (direction === "down" && headSnake.d !== "up")
    ){
        return true;
    }

    return false;
};

const _checkGrowth = () => {
    const { snake, food: { apples } } = state;
    const headSnake = _getHeadSnake(snake);

    if(apples.x === headSnake.x && apples.y === headSnake.y){
        state.food.didAte = true;
        state.snake.tail.unshift(state.snake.lastPositionTail);
        state.snake.speed -= 0.5;
        state.score += 1;
        state.maxScore = Math.max(state.score, state.maxScore);
    }
};

const _getCollisionSnake = (headSnake) => {
    const { snake } = state;
    const { tail } = snake;

    for(let t = 0; t < tail.length; t += 1){
        if(tail[t].x === headSnake.x && tail[t].y === headSnake.y){
            return true;
        }
    }
};

const _getHeadSnake = (snake) => {
    return snake.tail[snake.tail.length - 1];
};

const checkWin = () => {
    const { score } = state;
    if(score >= 394){
        state.gameStart = false;
        state.gameOver = false;

        state.win = true;
        return true;
    }
};