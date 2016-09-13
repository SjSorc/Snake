(function(module){

    "use strict";
    
    module.BoardDrawer =  function(element, board){
        
        this.board = board;
        this.element = element;
        
        this.draw = function(){

            var cellWidth = 10;
            var cellHeight = 10;

            var boardDimension = calculateBoardDimension(cellWidth, cellHeight, this.board.maxX + 1, this.board.maxY + 1);
            var boardElement = createBoard(boardDimension.width, boardDimension.height);
            $(this.element).append(boardElement);

            for(var y = this.board.minY; y <= this.board.maxY; y++){
                for(var x = this.board.minX; x <= this.board.maxX; x++){     
                    var cellId = createCellId(x, y);
                    var cell = createBoardCell(cellWidth, cellHeight,  cellId);
                    this.board.setCell(cell, x, y);
                    $(boardElement).append(cell);
                }
            }
        }
        
        function calculateBoardDimension(cellWidth, cellHeight, horizontalCells, verticalCells){
            return {
                width: horizontalCells * cellWidth,
                height: verticalCells * cellHeight
            }
        };

        function createBoard(width, height){
            var board = $('<div class="board"></div>');
            board.css("width", width);
            board.css("height", height);
            return board;
        };

        function createBoardCell(cellWidth, cellHeight, cellId){
            var cell = $('<div class="board-cell" id=' + cellId + '></div>');
            cell.css("width", cellWidth);
            cell.css("height", cellHeight);

            return cell;
        };

        function createCellId(x, y){
            return (x + '-' + y);
        }
    }

})(window);