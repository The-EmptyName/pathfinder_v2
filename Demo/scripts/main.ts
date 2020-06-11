class board {
    public tiles: string[][] = [];
    private size: number;
    private tool: string = "empty";
    private start: boolean = false;
    private destination: boolean = false;
    private make_new(): void {
        var fill = (): string[] => {
            var temp = new Array();
            for ( var y = 0; y < this.size; y ++ ) {
                temp.push("E");
            }
            return temp;
        }
        for ( var i = 0; i < this.size; i ++ ) {
            this.tiles.push(fill());
        }
    }
    private draw(): void {
        var element = document.getElementById("board");
        element.style.width = (window.innerWidth / 1.5) + "px";
        element.style.height = (window.innerWidth / 1.5) + "px";
        for ( var y = 0; y < this.size; y ++ ) {
            for ( var x = 0; x < this.size; x ++ ) {
                element.innerHTML += "<div id = '" + y + "_" + x + "' onclick = 'brd.use(this, " + x + ", " + y + ")' class = 'empty' style = 'width: " + ((window.innerWidth / 1.5) / this.size) + "px; height: " + ((window.innerWidth / 1.5) / this.size) + "px; left: " + x * ((window.innerWidth / 1.5) / this.size) + "px; top: " + y * ((window.innerWidth / 1.5) / this.size) + "px;'></div>";
            } 
        } 
    }
    public use(element: any, x: number, y: number): void {
        if ( this.tool == "wall" ) {
            if ( this.tiles[y][x] == "S" ) {
                this.start = false;
            } else if ( this.tiles[y][x] == "D" ) {
                this.destination = false;
            }
            element.classList = "wall";
            this.tiles[y][x] = "W";
        } else if ( this.tool == "start" && !this.start ) {
            if ( this.tiles[y][x] == "D" ) {
                this.destination = false;
            }
            element.classList = "start";
            this.tiles[y][x] = "S";
            this.start = true;
        } else if ( this.tool == "destination" && !this.destination ) {
            if ( this.tiles[y][x] == "S" ) {
                this.start = false;
            }
            element.classList = "destination";
            this.tiles[y][x] = "D";
            this.destination = true;
        } else if ( this.tool == "empty" ) {
            if ( this.tiles[y][x] == "S" ) {
                this.start = false;
            } else if ( this.tiles[y][x] == "D" ) {
                this.destination = false;
            }
            element.classList = "empty";
            this.tiles[y][x] = "E";
        } else if ( this.tool == "path" ) {
            element.classList = "path";
            setTimeout( () => {
                element.classList = "empty";
            }, 5000);
        }
    }
    public set_tool(tool: string): void {
        this.tool = tool;
    }
    constructor( size: number ) {
        this.size = size;
        this.make_new();
        this.draw();
    }
    private draw_path( path: string[] ): void {
        for ( var i = 0; i < path.length - 1; i ++ ) {
            this.set_tool("path");
            var temp = path[i].split("_");
            this.use( document.getElementById(path[i]), parseInt(temp[0]), parseInt(temp[1]) );
            this.set_tool("start");
        }
    }
}

var brd = new board(25);