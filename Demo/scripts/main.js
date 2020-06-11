var board = /** @class */ (function () {
    function board(size) {
        this.tiles = [];
        this.tool = "empty";
        this.start = false;
        this.destination = false;
        this.size = size;
        this.make_new();
        this.draw();
    }
    board.prototype.make_new = function () {
        var _this = this;
        var fill = function () {
            var temp = new Array();
            for (var y = 0; y < _this.size; y++) {
                temp.push("E");
            }
            return temp;
        };
        for (var i = 0; i < this.size; i++) {
            this.tiles.push(fill());
        }
    };
    board.prototype.draw = function () {
        var element = document.getElementById("board");
        element.style.width = (window.innerWidth / 1.5) + "px";
        element.style.height = (window.innerWidth / 1.5) + "px";
        for (var y = 0; y < this.size; y++) {
            for (var x = 0; x < this.size; x++) {
                element.innerHTML += "<div id = '" + y + "_" + x + "' onclick = 'brd.use(this, " + x + ", " + y + ")' class = 'empty' style = 'width: " + ((window.innerWidth / 1.5) / this.size) + "px; height: " + ((window.innerWidth / 1.5) / this.size) + "px; left: " + x * ((window.innerWidth / 1.5) / this.size) + "px; top: " + y * ((window.innerWidth / 1.5) / this.size) + "px;'></div>";
            }
        }
    };
    board.prototype.use = function (element, x, y) {
        if (this.tool == "wall") {
            if (this.tiles[y][x] == "S") {
                this.start = false;
            }
            else if (this.tiles[y][x] == "D") {
                this.destination = false;
            }
            element.classList = "wall";
            this.tiles[y][x] = "W";
        }
        else if (this.tool == "start" && !this.start) {
            if (this.tiles[y][x] == "D") {
                this.destination = false;
            }
            element.classList = "start";
            this.tiles[y][x] = "S";
            this.start = true;
        }
        else if (this.tool == "destination" && !this.destination) {
            if (this.tiles[y][x] == "S") {
                this.start = false;
            }
            element.classList = "destination";
            this.tiles[y][x] = "D";
            this.destination = true;
        }
        else if (this.tool == "empty") {
            if (this.tiles[y][x] == "S") {
                this.start = false;
            }
            else if (this.tiles[y][x] == "D") {
                this.destination = false;
            }
            element.classList = "empty";
            this.tiles[y][x] = "E";
        }
        else if (this.tool == "path") {
            element.classList = "path";
            setTimeout(function () {
                element.classList = "empty";
            }, 5000);
        }
    };
    board.prototype.set_tool = function (tool) {
        this.tool = tool;
    };
    board.prototype.draw_path = function (path) {
        for (var i = 0; i < path.length - 1; i++) {
            this.set_tool("path");
            var temp = path[i].split("_");
            this.use(document.getElementById(path[i]), parseInt(temp[0]), parseInt(temp[1]));
            this.set_tool("start");
        }
    };
    return board;
}());
var brd = new board(25);
