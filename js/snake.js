(function(module){

    "use strict";

    module.Snake =  function(board, staringCellData, speed){
        
        initialize.call(this);

        this.move = function(direction){

            if(isOppositeDirection(this.direction, direction)){
                return;
            }

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
                
                //snake needs to grow
                if(nextCell.x === this.board.currentObjective.x && nextCell.y === this.board.currentObjective.y){        
                    this.board.currentObjectiveEaten();
                    //add a node
                    newSnakeNode.next = this.head;
                    this.head.previous = newSnakeNode;
                    this.head = newSnakeNode;
                } 
                else{
                    resetCell(this.tail.cell);

                    if(this.head.x === this.tail.x && this.head.y === this.tail.y){
                        this.head = newSnakeNode;
                        this.tail = newSnakeNode;
                    } 
                    else{      
                        newSnakeNode.next = this.head;
                        this.head.previous = newSnakeNode;
                        this.head = newSnakeNode;
                        this.tail = this.tail.previous;
                        this.tail.next = null;
                    }
                }

                if(loopInSnake(this.tail)){
                    this.crash();
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

        function isOppositeDirection(dir1, dir2){
            if(dir1 === 'up' && dir2 === 'down'){
                return true;
            }
            else if(dir1 === 'down' && dir2 === 'up'){
                
            }
            else if(dir1 === 'right' && dir2 === 'left'){
                return true;
            }
            else if(dir1 === 'left' && dir2 === 'right'){
                return true;
            }

            return false;
        }

        function initialize(){
           this.board = board;
           this.head = new SnakeNode(staringCellData.cell, staringCellData.x, staringCellData.y);
           this.tail = this.head;
           this.direction = null;
           this.moving = false;
           this.speed = speed;
        };

        function loopInSnake(root){
            var loopFound = false;

            var fastPointer = root.next;
            var slowPointer = root;

            if(!root.next){
                return false;
            }

            while(fastPointer && fastPointer.next && fastPointer.next.next){
                fastPointer = fastPointer.next.next;
                if(fastPointer.x === slowPointer.x && fastPointer.y === slowPointer.y){
                    loopFound = true;
                    break;
                }
                else{
                    slowPointer = slowPointer.next;
                }
            }

            return loopFound;
        };

        function SnakeNode(cell, x, y){
            this.cell = cell;
            this.x = x;
            this.y = y;
            this.next = null;
            this.previous = null;

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