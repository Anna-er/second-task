let width, height, board, popup, row, ceil, colors;

width = 600;

board = {
    width,
    height: 60,
    font: "normal 25px Arial, sans-serif",
    textScore: {
        x: 60,
        y: 19
    },
    textMaxScore: {
        x: 375,
        y: 19
    },
    apple: {
        x: 15,
        y: 15
    }
};


height = width + board.height;

popup = {
    width: 200,
    height: 100,
    font: "normal 25px Arial, sans-serif"
};

ceil = 30;

row = width / ceil;

colors = {
    snakeHead: "#4097f9",
    snakeBody: "#2f69e7",
    apples: "#ff3500",
    text: "#000000",
    popup: "#e0cd1e"
}