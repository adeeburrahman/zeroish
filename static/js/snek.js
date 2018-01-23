//postion of snek
var snek_posx = 10;
var snek_posy = 10;
//map size
var height = 20;
var length = 20;
//time interval
var time = 100;
//how much snek grows by eating fruit
var snek_grow = 1;
//position of snek body
var tail_posx = [snek_posx];
var tail_posy = [snek_posy];
//position of fruit
var apple_posx = random(1,length-1);
var apple_posy = random(1,height-1);
//is the game currently playing? Use for play/pause
var playing = false;
var game_over = false;
//arrow key values used to determine snek direction
// 1 = up, 2 = right, down = 3, left = 4
var dir = 0;
//will be used to store function later for timer
var inital;
//necessary for length of snake
var len = 0;
//direction needs to be stored in var so that when update is made, direction can be updated
var temp_dir = dir;
//keeps track of user score
var score = 0;

//main function that runs
function main(){
  //preliminary setup fxn
  setup();
  //updater fxn
  inital = setInterval(loop, time)
}

var reset = function(){
  location.reload();
}

//randomness needed for apples
function random(min,max){
  return Math.floor(Math.random()*(max-min) +min);
}

function get_id(x,y){
  return document.getElementById(x+"-"+y);
}

function get_class(x,y){
    return get_id(x,y).getAttribute("class");
}

function set_class(x,y,claz){
  if(x != null && y != null){
        get_id(x,y).setAttribute("class", claz);
  }
}

function setup(){
  //make_map();
  draw_snek();
  draw_fruit();
//  poof_tetris();//implement later
}

function loop(){
    if(playing && !game_over){
        update();
    }else if(game_over){
      //this fxn stops the updater (setinterval)
        clearInterval(inital);
    }
}

function draw_snek() {
  draw(snek_posx,snek_posy,"snek")
}

function draw(x,y,type){
  var store = document.getElementById(x+"-"+y);
  return store.setAttribute("class",type);
}

function draw_fruit(){
      //check if the apple exist first
      var no_exist = true;
      //find a radom non-occupied location for apple
      while(no_exist && (0 < (length-2)*(height-2)+1)){
          var temp_apple_posx = random(1,length-1);
          var temp_apple_posy = random(1,height-1);
          //empty location is marked by the background property
          if(get_class(temp_apple_posx, temp_apple_posy) == "back")
              no_exist = false;
      }
      //sets the location for the new apple
      set_class(temp_apple_posx, temp_apple_posy, "apple");
      apple_posx = temp_apple_posx;
      apple_posy = temp_apple_posy;
  }

  //updates tail position based on array position
  function tail(){
      for(var i = len; i > 0; i--){
          tail_posx[i] = tail_posx[i-1];
          tail_posy[i] = tail_posy[i-1];
      }
      tail_posx[0] = snek_posx;
      tail_posy[0] = snek_posy;
  }


  window.addEventListener("keydown", function key(event){
      //W or up arrow set direction up
      var key = event.keyCode;
      if(dir != 3 && (key == 119 || key == 87 || key == 38))
          temp_dir = 1;
      //S oe down arrow set direction down
      else if(dir!= 1 && (key == 115 || key == 83 || key == 40))
          temp_dir = 3;
      //A or left arrow set direction left
      else if(dir != 2 && (key == 97 || key == 65 || key == 37))
          temp_dir = 4;
      //D or right arrow set direction right
      else if(dir != 4 && (key == 100 || key == 68 || key == 39))
          temp_dir = 2;
      //if spacebar is pressed pause game
      if(!playing)
          playing = true;
      else if(key == 32)
          playing = false;
      if((playing == false && game_over == true) && key == 32){
        reset();
      }
  });

  function update(){
      //set the actual direction to the direction given by keypress
      dir = temp_dir;
      set_class(apple_posx, apple_posy, "apple");
      //makes non snake cells back to background cells
      set_class(tail_posx[len], tail_posy[len], "back");
      //updates tail position
      tail();
      //shifts head and body based on dir
      if(dir == 1)//up
          snek_posy--;
      else if(dir == 3)//down
          snek_posy++;
      else if(dir == 4)//left
          snek_posx--;
      else if(dir == 2)//right
          snek_posx++;
      //new cells of snek made
      for(var i = tail_posx.length-1; i >=0; i--){
        // this checks for collision by checking of snek lands on a snek cell
          if((get_class(snek_posx, snek_posy) == "snek")){
              game_over = true;
              break;
          }
      }
      //snek collsion is being checked via borders
      if(get_class(snek_posx, snek_posy) == "border")
          game_over = true;
      //sets the new x,y postions of snek on the grid
      set_class(snek_posx, snek_posy, "snek");
      //if the snek eats apple, grow it and respawn apple
      if(snek_posx == apple_posx && snek_posy == apple_posy){
          score += 1;
          draw_fruit();
          len += snek_grow;
      }
  }


main()
