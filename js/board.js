(function(module){
    "use strict";

    module.Board =  function(horizontal, vertical){

        initialize.call(this);

        this.setCell = function(cell, x, y){
            this.boardModel[x][y] = {
                element: cell
            };
        };

        this.getMid = function(){
            var x = Math.ceil(this.maxX/2);
            var y = Math.ceil(this.maxY/2);

            return{
                x: x,
                y: y,
                cell: (this.boardModel[x][y]).element
            }
        };

        this.currentObjectiveEaten = function(){
            resetObjectiveCell(this.boardModel[this.currentObjective.x][this.currentObjective.y].element);
            this.putRandomObjective();
        };

        this.canMove = function(x, y, direction){
            var next = nextCellCoordinates(x, y, direction);
            if(!this.isCorner(next.x, next.y)){
                return {
                    x: next.x,
                    y: next.y,
                    cell: (this.boardModel[next.x][next.y]).element
                }
            }
            else{
                return undefined;
            }
        };

        this.isCorner = function(x, y){
            if(this.minX <= x && this.maxX >= x && this.minY <= y && this.maxY >= y){
                return false;
            }
            else{
                return true;
            }
        };

        this.putRandomObjective = function(){
            var x = getRandomInt(this.minX, this.maxX);
            var y = getRandomInt(this.minY, this.maxY);

            decorateObjectiveCell(this.boardModel[x][y].element);
            
            this.currentObjective.x = x;
            this.currentObjective.y = y;
        };

        function decorateObjectiveCell(cell){
            $(cell).addClass('cell-objective');
        }

        function resetObjectiveCell(cell){
            $(cell).removeClass('cell-objective');
        }

        function nextCellCoordinates(x, y, direction){
            var nextX;
            var nextY;

            if(direction === 'up'){
                nextX = x;
                nextY = y - 1;
            }
            else if(direction === 'down'){
                nextX = x;
                nextY = y + 1;
            }
            else if(direction === 'left'){
                nextX = x - 1;
                nextY = y;
            }
            else if(direction === 'right'){
                nextX = x + 1;
                nextY = y;
            }

            return {
                x: nextX,
                y: nextY
            }
        }


        function initialize(){
            this.minX = 0;
            this.maxX = horizontal - 1;
            this.minY = 0;
            this.maxY = vertical - 1;

            this.boardModel = [];

            for(var x = this.minX; x <= this.maxX; x++){
                this.boardModel[x] = [];
            }

            this.currentObjective = {};
        }

        function getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
    }

})(window);