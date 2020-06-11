class pathfinder {
    private board: string[][];
    private paths_1: string[] = [""];
    private paths_2: string[] = [];
    private correct: string = "";
    private found: boolean = false;
    constructor( private b: string[][] ) {
        this.board = b;
        if ( !this.find("S") || !this.find("D") ) {
            alert("Add both starting point and destination.");
            return;
        }
        console.log(this.find("S"));
    }
    private find(element: string): any {
        for ( var y = 0; y < this.board.length; y ++ ) {
            for ( var x = 0; x < this.board.length; x ++ ) {
                if ( this.board[y][x] == element ) {
                    return [y, x];
                }
            }
        }
        return false;
    }
    private find_path(start: string[] = this.find("S"), end: string[] = this.find("D")): string {
        for ( var i = 0; i < this.board.length * this.board[0].length; i ++ ) {
            for ( var n = 0; n < this.paths_1.length; n ++ ) {
                if ( !this.found ) {
                    this.paths_2 = this.paths_2.concat(this.spread(parseInt(this.find_last(this.paths_1[n])[1]), parseInt(this.find_last(this.paths_1[n])[0]), this.paths_1[n]));
                } else {
                    return this.correct;
                }
            }
            this.paths_1 = this.paths_2;
            this.paths_2 = [];
        }
        return this.correct;
    }
    private spread(x: number, y: number, path: string): string[] {
        var temp = [];
        var last_action = path[path.length-1];
        var go = (direction: string): any => {
            if ( direction == "U" ) {
                if ( y - 1 >= 0 && !this.visited(x, y - 1, path) ) {
                    if ( this.check(x, y - 1, "E") ) {
                        return path + "U";
                    } else if ( this.check(x, y - 1, "D") ) {
                        this.found = true;
                        this.correct = path + "U";
                        console.log(this.correct);
                        return;
                    }
                } else {
                    return false;
                }
            } else if ( direction == "D" ) {
                if ( y + 1 <= this.board.length - 1 && !this.visited(x, y + 1, path) ) {
                    if ( this.check(x, y + 1, "E") ) {
                        return path + "D";
                    } else if ( this.check(x, y + 1, "D") ) {
                        this.found = true;
                        this.correct = path + "D";
                        console.log(this.correct);
                        return;
                    }
                } else {
                    return false;
                }
            } else if ( direction == "L" ) {
                if ( x - 1 >= 0 && !this.visited(x - 1, y, path) ) {
                    if ( this.check(x - 1, y, "E") ) {
                        return path + "L";
                    } else if ( this.check(x - 1, y, "D") ) {
                        this.found = true;
                        this.correct = path + "L";
                        console.log(this.correct);
                        return;
                    }
                } else {
                    return false;
                }
            } else if ( direction == "R" ) {
                if ( x + 1 <= this.board[0].length - 1 && !this.visited(x + 1, y, path) ) {
                    if ( this.check(x + 1, y, "E") ) {
                        return path + "R";
                    } else if ( this.check(x + 1, y, "D") ) {
                        this.found = true;
                        this.correct = path + "R";
                        console.log(this.correct);
                        return;
                    }
                } else {
                    return false;
                }
            }
        }
        if ( !this.found ) {
            if ( last_action == "U" ) {
                if ( go("U") ) {
                    temp.push(go("U"));
                }
                if ( go("L") ) {
                    temp.push(go("L"));
                }
                if ( go("R") ) {
                    temp.push(go("R"));
                }
            } else if ( last_action == "D" ) {
                if ( go("D") ) {
                    temp.push(go("D"));
                }
                if ( go("L") ) {
                    temp.push(go("L"));
                }
                if ( go("R") ) {
                    temp.push(go("R"));
                }
            } else if ( last_action == "L" ) {
                if ( go("D") ) {
                    temp.push(go("D"));
                }
                if ( go("L") ) {
                    temp.push(go("L"));
                }
                if ( go("U") ) {
                    temp.push(go("U"));
                }
            } else if ( last_action == "R" ) {
                if ( go("D") ) {
                    temp.push(go("D"));
                }
                if ( go("U") ) {
                    temp.push(go("U"));
                }
                if ( go("R") ) {
                    temp.push(go("R"));
                }
            } else {
                if ( go("U") ) {
                    temp.push(go("U"));
                }
                if ( go("D") ) {
                    temp.push(go("D"));
                }
                if ( go("L") ) {
                    temp.push(go("L"));
                }
                if ( go("R") ) {
                    temp.push(go("R"));
                }
            }
        }
        return temp;
    }
    private check(x: number, y: number, element: string) {
        if ( this.board[y][x] == element ) {
            return true;
        }
        return false;
    }
    private find_last(path: string): string[] {
        var y = (this.find("S"))[0]
        var x = (this.find("S"))[1]
        for ( var i = 0; i < path.length; i ++ ) {
            if ( path[i] == "U" ) {
                y --;
            } else if ( path[i] == "D" ) {
                y ++;
            } else if ( path[i] == "L" ) {
                x --;
            } else if ( path[i] == "R" ) {
                x ++;
            }
        }
        if ( path = "" ) {
            return this.find("S");
        }
        return [y, x];
    }
    private decode(path: string): string[] {
        var y = (this.find("S"))[0]
        var x = (this.find("S"))[1]
        var temp = [];
        for ( var i = 0; i < path.length; i ++ ) {
            if ( path[i] == "U" ) {
                y --;
            } else if ( path[i] == "D" ) {
                y ++;
            } else if ( path[i] == "L" ) {
                x --;
            } else if ( path[i] == "R" ) {
                x ++;
            }
            temp.push(y + "_" + x);
        }
        return temp;
    }
    private visited(x: number, y: number, path: string): boolean {
        var decoded = this.decode(path);
        for ( var i = 0; i < decoded.length; i ++ ) {
            var d_y = (decoded[i].split("_"))[0];
            var d_x = (decoded[i].split("_"))[1];
            if ( x == parseInt(d_x) && y == parseInt(d_y) ) {
                return true;
            }
        }
        return false;
    }
}