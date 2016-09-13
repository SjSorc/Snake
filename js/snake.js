(function(module){

    "use strict";

    module.Snake =  function(board, staringCellData, speed){
        
        initialize.call(this);

        this.move = function(direction){
            this.direction = direction;
            if(!this.moving){
                this.moving = true;
                this.keepMoving();
            }
        };

        this.keepMoving = function(){
            if(!this.moving){
                return;
            }
            var nextCell = this.board.canMove(this.head.x, this.head.y, this.direction);
            if(nextCell){
                var newSnakeNode = new SnakeNode(nextCell.cell, nextCell.x, nextCell.y);
                this.head.next = newSnakeNode;
                this.head = newSnakeNode;

                if(nextCell.x === this.board.currentObjective.x && nextCell.y === this.board.currentObjective.y){        
                    this.board.currentObjectiveEaten();
                }
                else{
                    var prevTail = this.tail;
                    resetCell(this.tail.cell);
                    this.tail = prevTail.next;
                }

                setTimeout(this.keepMoving.bind(this), this.speed);
            }
            else{
                this.crash();
            }
        }

        this.crash = function(){
            this.destroy();
            $(this).trigger('destroy');
        };

        this.destroy = function(){
            this.board = undefined;
            this.head = undefined;
            this.tail = undefined;
            this.direction = undefined;
            this.moving = undefined;
            this.speed = undefined;
        };

        function initialize(){
           this.board = board;
           this.head = new SnakeNode(staringCellData.cell, staringCellData.x, staringCellData.y);
           this.tail = this.head;
           this.direction = null;
           this.moving = false;
           this.speed = speed;
        };

        function SnakeNode(cell, x, y){
            this.cell = cell;
            this.x = x;
            this.y = y;
            this.next = null;

            decorateSnakeCell(this.cell);
        };

        function decorateSnakeCell(cell){
            $(cell).addClass('snake-cell');
        };

        function resetCell(cell){
            $(cell).removeClass('snake-cell');
        }
    }

})(window);