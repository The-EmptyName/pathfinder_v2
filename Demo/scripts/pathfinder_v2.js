var pathfinder = /** @class */ (function () {
    function pathfinder(b) {
        this.b = b;
        this.paths_1 = [""]; // example: ["URDL", "DLUR", "LURD", "RDLU"], gen 1 of paths
        this.paths_2 = []; // gen 2 of paths
        this.correct = ""; // correct path
        this.found = false; // found correct path?
        this.board = b;
        if (!this.find("S") || !this.find("D")) {
            alert("Add both starting point and destination.");
            return;
        }
        console.log(this.find("S"));
    }
    pathfinder.prototype.find = function (element) {
        for (var y = 0; y < this.board.length; y++) {
            for (var x = 0; x < this.board.length; x++) {
                if (this.board[y][x] == element) {
                    return [y, x];
                }
            }
        }
        return false;
    };
    pathfinder.prototype.find_path = function (start, end) {
        if (start === void 0) { start = this.find("S"); }
        if (end === void 0) { end = this.find("D"); }
        for (var i = 0; i < this.board.length * this.board[0].length; i++) {
            for (var n = 0; n < this.paths_1.length; n++) {
                if (!this.found) {
                    this.paths_2 = this.paths_2.concat(this.spread(parseInt(this.find_last(this.paths_1[n])[1]), parseInt(this.find_last(this.paths_1[n])[0]), this.paths_1[n]));
                }
                else {
                    return this.correct;
                }
            }
            this.paths_1 = this.paths_2;
            this.paths_2 = [];
        }
        return this.correct;
    };
    pathfinder.prototype.spread = function (x, y, path) {
        var _this = this;
        var temp = [];
        var last_action = path[path.length - 1];
        var go = function (direction) {
            if (direction == "U") {
                if (y - 1 >= 0 && !_this.visited(x, y - 1, path)) {
                    if (_this.check(x, y - 1, "E")) {
                        return path + "U";
                    }
                    else if (_this.check(x, y - 1, "D")) {
                        _this.found = true;
                        _this.correct = path + "U";
                        console.log(_this.correct);
                        return;
                    }
                }
                else {
                    return false;
                }
            }
            else if (direction == "D") {
                if (y + 1 <= _this.board.length - 1 && !_this.visited(x, y + 1, path)) {
                    if (_this.check(x, y + 1, "E")) {
                        return path + "D";
                    }
                    else if (_this.check(x, y + 1, "D")) {
                        _this.found = true;
                        _this.correct = path + "D";
                        console.log(_this.correct);
                        return;
                    }
                }
                else {
                    return false;
                }
            }
            else if (direction == "L") {
                if (x - 1 >= 0 && !_this.visited(x - 1, y, path)) {
                    if (_this.check(x - 1, y, "E")) {
                        return path + "L";
                    }
                    else if (_this.check(x - 1, y, "D")) {
                        _this.found = true;
                        _this.correct = path + "L";
                        console.log(_this.correct);
                        return;
                    }
                }
                else {
                    return false;
                }
            }
            else if (direction == "R") {
                if (x + 1 <= _this.board[0].length - 1 && !_this.visited(x + 1, y, path)) {
                    if (_this.check(x + 1, y, "E")) {
                        return path + "R";
                    }
                    else if (_this.check(x + 1, y, "D")) {
                        _this.found = true;
                        _this.correct = path + "R";
                        console.log(_this.correct);
                        return;
                    }
                }
                else {
                    return false;
                }
            }
        };
        if (!this.found) {
            if (last_action == "U") {
                if (go("U")) {
                    temp.push(go("U"));
                }
                if (go("L")) {
                    temp.push(go("L"));
                }
                if (go("R")) {
                    temp.push(go("R"));
                }
            }
            else if (last_action == "D") {
                if (go("D")) {
                    temp.push(go("D"));
                }
                if (go("L")) {
                    temp.push(go("L"));
                }
                if (go("R")) {
                    temp.push(go("R"));
                }
            }
            else if (last_action == "L") {
                if (go("D")) {
                    temp.push(go("D"));
                }
                if (go("L")) {
                    temp.push(go("L"));
                }
                if (go("U")) {
                    temp.push(go("U"));
                }
            }
            else if (last_action == "R") {
                if (go("D")) {
                    temp.push(go("D"));
                }
                if (go("U")) {
                    temp.push(go("U"));
                }
                if (go("R")) {
                    temp.push(go("R"));
                }
            }
            else {
                if (go("U")) {
                    temp.push(go("U"));
                }
                if (go("D")) {
                    temp.push(go("D"));
                }
                if (go("L")) {
                    temp.push(go("L"));
                }
                if (go("R")) {
                    temp.push(go("R"));
                }
            }
        }
        return temp;
    };
    pathfinder.prototype.check = function (x, y, element) {
        if (this.board[y][x] == element) {
            return true;
        }
        return false;
    };
    pathfinder.prototype.find_last = function (path) {
        var y = (this.find("S"))[0];
        var x = (this.find("S"))[1];
        for (var i = 0; i < path.length; i++) {
            if (path[i] == "U") {
                y--;
            }
            else if (path[i] == "D") {
                y++;
            }
            else if (path[i] == "L") {
                x--;
            }
            else if (path[i] == "R") {
                x++;
            }
        }
        if (path = "") {
            return this.find("S");
        }
        return [y, x];
    };
    pathfinder.prototype.decode = function (path) {
        var y = (this.find("S"))[0];
        var x = (this.find("S"))[1];
        var temp = [];
        for (var i = 0; i < path.length; i++) {
            if (path[i] == "U") {
                y--;
            }
            else if (path[i] == "D") {
                y++;
            }
            else if (path[i] == "L") {
                x--;
            }
            else if (path[i] == "R") {
                x++;
            }
            temp.push(y + "_" + x);
        }
        return temp;
    };
    pathfinder.prototype.visited = function (x, y, path) {
        var decoded = this.decode(path);
        for (var i = 0; i < decoded.length; i++) {
            var d_y = (decoded[i].split("_"))[0];
            var d_x = (decoded[i].split("_"))[1];
            if (x == parseInt(d_x) && y == parseInt(d_y)) {
                return true;
            }
        }
        return false;
    };
    return pathfinder;
}());
