class pathfinder {
    private board: string[][];
    private paths_1: string[] = [""];
    private paths_2: string[] = [];
    private correct: string = "";
    private found: boolean = false;
    private cleared: boolean = false;
    private start: string[] = [];
    constructor( private b: string[][] ) {
        this.board = b;
        if ( !this.find("S") || !this.find("D") ) {
            alert("Add both starting point and destination.");
            return;
        }
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
    public find_path(start: string[] = this.find["S"]): string {
        this.start = start;
        for ( var i = 0; i < this.board.length * this.board[0].length; i ++ ) {
            for ( var n = 0; n < this.paths_1.length; n ++ ) {
                if ( !this.found && this.paths_1.length < 5000 ) {
                    this.paths_2 = this.paths_2.concat(this.spread(parseInt(this.find_last(this.paths_1[n])[1]), parseInt(this.find_last(this.paths_1[n])[0]), this.paths_1[n]));
                } else if ( !this.found && this.paths_1.length >= 5000 ) {
                    var best = this.find_best();
                    this.paths_1 = [""];
                    this.paths_2 = [];
                    return best + ( this.find_path( this.find_last( best ) ) );
                } else {
                    return this.correct;
                }
            }
            this.paths_1 = this.paths_2;
            this.paths_2 = [];
            this.clear();
        }
        return this.correct;
    }
    private spread(x: number, y: number, path: string): string[] {
        var temp = [];
        var last_action = path[path.length-1];
        var go = (direction: string): any => {
            if ( direction == "U" ) {
                if ( y - 1 >= 0 ) {
                    if ( this.check(x, y - 1, "E") ) {
                        return path + "U";
                    } else if ( this.check(x, y - 1, "D") ) {
                        this.found = true;
                        this.correct = path + "U";
                        return;
                    }
                } else {
                    return false;
                }
            } else if ( direction == "D" ) {
                if ( y + 1 <= this.board.length - 1 ) {
                    if ( this.check(x, y + 1, "E") ) {
                        return path + "D";
                    } else if ( this.check(x, y + 1, "D") ) {
                        this.found = true;
                        this.correct = path + "D";
                        return;
                    }
                } else {
                    return false;
                }
            } else if ( direction == "L" ) {
                if ( x - 1 >= 0 ) {
                    if ( this.check(x - 1, y, "E") ) {
                        return path + "L";
                    } else if ( this.check(x - 1, y, "D") ) {
                        this.found = true;
                        this.correct = path + "L";
                        return;
                    }
                } else {
                    return false;
                }
            } else if ( direction == "R" ) {
                if ( x + 1 <= this.board[0].length - 1 ) {
                    if ( this.check(x + 1, y, "E") ) {
                        return path + "R";
                    } else if ( this.check(x + 1, y, "D") ) {
                        this.found = true;
                        this.correct = path + "R";
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
        var y = parseInt(this.start[0]);
        var x = parseInt(this.start[1]);
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
        return [String(y), String(x)];
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
    private clear(): void {
        this.cleared = false;
        if ( this.paths_1.length > 1000 ) {
            var sum = 0;
            for ( var i = 0; i < this.paths_1.length - 1; i ++ ) {
                sum += (Math.abs(parseInt(this.find("S")[0]) - parseInt(this.find_last(this.paths_1[i])[0])) + Math.abs(parseInt(this.find("S")[1]) - parseInt(this.find_last(this.paths_1[i])[1])));
            }
            var avg = Math.ceil(sum / (this.paths_1.length - 1));
            for ( var i = this.paths_1.length - 1; i > 0; i -- ) {
                if(Math.abs(parseInt(this.find("S")[0]) - parseInt(this.find_last(this.paths_1[i])[0])) + Math.abs(parseInt(this.find("S")[1]) - parseInt(this.find_last(this.paths_1[i])[1])) < avg) {
                    this.paths_1.splice(i, 1);
                    this.cleared = true;
                }
            }
            if ( this.cleared ) {
                this.clear();
            } else {
                return;
            }
        } else {
            return;
        }
    }
    private find_best(): string {
        var index = 0;
        var distance = Infinity;
        for ( var i = 0; i < this.paths_1.length - 1; i ++ ) {
            var temp = Math.abs(parseInt(this.find("D")[0]) - parseInt(this.find_last(this.paths_1[i])[0])) + Math.abs(parseInt(this.find("D")[1]) - parseInt(this.find_last(this.paths_1[i])[1]));
            if ( temp < distance ) {
                index = i;
                distance = temp;
            }
        }
        return this.paths_1[index];
    }
}