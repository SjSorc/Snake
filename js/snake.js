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

        this.pause = function(){
            this.moving = false;
        };

        this.keepMoving = function(){
            if(!this.moving){
                return;
            }
            var nextCell = this.board.canMove(this.head.x, this.head.y, this.direction);
            
            if(nextCell){
                var newSnakeNode = this.getNewSnakeNode(nextCell.cell, nextCell.x, nextCell.y);

                //snake needs to grow
                if(nextCell.x === this.board.currentObjective.x && nextCell.y === this.board.currentObjective.y){        
                    this.board.currentObjectiveEaten();
                    //add a node
                    newSnakeNode.next = this.head;
                    this.head.previous = newSnakeNode;
                    this.head = newSnakeNode;
                } 
                else{
                    this.removeNode(this.tail);

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

                                
                if(this.loopInSnake(this.head)){
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

        this.removeNode = function(node){
            resetCell(node.cell);
            this.allCoordinates[node.x + '-' + node.y] = 0;
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
           this.allCoordinates = {};
           this.allCoordinates[this.head.x + '-' + this.head.y] = 1;
           this.tail = this.head;
           this.direction = null;
           this.moving = false;
           this.speed = speed;
        };

        this.loopInSnake = function (node){
            var loopFound = false;
            var nodePresenceCount = this.allCoordinates[node.x + '-' + node.y];
            if(nodePresenceCount > 1){
                loopFound = true;
            }
            return loopFound;
        };

        this.getNewSnakeNode = function (cell, x, y){
            var newSnakeNode = new SnakeNode(cell, x, y);
            if(this.allCoordinates[x + '-' + y]){
                this.allCoordinates[x + '-' + y]++;
            }
            else{
                 this.allCoordinates[x + '-' + y] = 1;
             }
            return newSnakeNode;
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