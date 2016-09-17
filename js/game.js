(function(module, $){

    "use strict";

    $.fn.attachGame = function(){
        this.each(function() {           
            var element = this;         
            var game = new Game(element);
            $(element).data('game', game);
        });

        return this;
    }

    function Game(element){

        initialize.call(this);

        this.start = function(){
            this.snake.move('up');
            this.started = true;
            this.paused = false;
        };

        this.resume = function(){
            
        };

        function initialize(){
            
            this.started = false;
            this.paused = false;

            //create board
            var board = new Board(75, 50);
            this.board = board;

            //draw the board
            var boardDrawer = new BoardDrawer(element, board);
            boardDrawer.draw();


            //put random objective
            this.board.putRandomObjective();

            //create snake
            var startPosition = board.getMid();
            var snake = new Snake(board, startPosition, 100);
            this.snake = snake;

            //start the game when user clicks the board
            $(element).on('click', function(){
                if(!this.started){
                    this.start();
                }
                else{
                    this.resume();
                }
            }.bind(this));

            //pause

            //arrow - play
            setArrowPressListeners(snake);

            //restart when snake is gone
            $(snake).on('destroy', function () {
                alert('GAME OVER');
            });
        } 

        function setArrowPressListeners(snake){
            
            $(document).keydown(function(e) {
                
                switch(e.which) {
                    case 37: // left
                    snake.move('left');
                    break;

                    case 38: // up
                    snake.move('up');
                    break;

                    case 39: // right
                    snake.move('right');
                    break;

                    case 40: // down
                    snake.move('down');
                    break;

                    case 32: //space
                    snake.pause();
                    break;

                    default: return; // exit this handler for other keys
                }

                e.preventDefault(); // prevent the default action (scroll / move caret)

            });
        }
    }

})(window, jQuery);