//const { cpuUsage } = require("process");

let content = document.getElementById("content");
let height = window.innerHeight;
let width = window.innerWidth;
let container = document.getElementById("container");
let topScroll = 0;

let canvas;
let ctx;

let href;



let path;

window.addEventListener("resize", reset);
window.addEventListener("scroll", reset);




function setup() {
  frameRate(10);

  if (path != "/01.html") {
    path = window.location.pathname
    caseSite();
    canvas = createCanvas(width, height);
    canvas.background(0);
    canvas.scrollTop = 0;
    noLoop();
    colorMode(HSB, 255);

    canvas.id("myCanvas");
  }



  if (path != "/") {
    content.style.paddingBottom = parseInt(footer.offsetHeight) + "px";
    //header.innerHTML=""

    cIndex();

    if (screenWidth >= 1000) {
      //container.style.paddingTop=headerHeight +"px";

      container.style.width = "60%";

      //container.style.minHeight= (screenHeight + 500) + "px";
      console.log("tried to change width of content");
    } else {
      //container.style.paddingTop = headerHeight +"px";

      container.style.width = "100%";

      //container.style.minHeight=screenHeight + "px";
    }

  }


  if (path == "/01.html") {
    resetWebGL();
    cIndex();

  }
  document.documentElement.scrollTop = 1;

}


let c = 0;
let cinc = true;
function draw() {
  if (path != "/01.html") {
    waveBackground();

  } else {
    loop();

    background(20)
    //fill(120,255,255)
    //sphere(50)
    console.log("trying to draw")

    stroke(c, 0, 0)
    //ambientMaterial(255, 255, 255);

    //ambientLight(150, 150, 250, 20);
    //pointLight(250, 250, 255, 400, 0, 10);

    translate(0, 0, -50);
    rotateX(90);
    mySphere();

    rorigin += rmove;
    yorigin += ymove;

    if (c <= 255 && cinc == true) {
      c += 1
      if (c >= 255) { cinc = false }
    } else {
      c -= 1;
      if (c >= 100) {
        cinc = false;
      } else {
        cinc = true
      }
    }

  }

  //var page = path.split("/").pop();

  //caseSite();

}

var el = document.querySelector('div');
let code;
let innercode;
//are used to make new pre and code tags
let clone;
let child;

let linkText
function caseSite() {
  switch (path) {
    case "/":
      console.log("I am on the start page")
      break;
    case "/ga/main.html":
      code = document.getElementById("code")
      innercode = document.getElementById("innercode");

      content.innerHTML = "";

      cH1("Project Results")
      cH2("Short Introduction")
      cP("When you click on the documentation in the menu you will find a bunch of pictures and descriptions to the process I have made in the HSLU module 'Generative Computer Graphics'. There are also some links beneath certain pictures that will lead to a p5 sketch that can be tried out right away.");
      cP("I hope you enjoy my work :)")
      break;
    case "/ga/documentation.html":
      linkText = "Link to Sketch"
      code = document.getElementById("code")
      innercode = document.getElementById("innercode");
      content.innerHTML = "";

      cH1("Documentation Project");

      //==================================================================
      //--------------------------- DAY 1 -------------------------------
      //==================================================================
      cH2("Day 1");
      cP("First off I set up a project in Atom and started looking at some of the references. The WebGL projects look super cool so I decided to start with p5.js and the WEBGL mode for 3D projects. Started out easy by rotating a rectangle. By not resetting the canvas it then creates a circle background of itself. I then made another rotating box and by rotating not only the Z but also the Y axis in different speeds it created a splatter underneath the box.");

      cImage("/ga/Doku/01.rotating_box.png")
      cP("The effect is quite nice so I might come back to it later on. I wanted to try out a 2D project first that came to mind when we were talking about grid systems in the daily input.")

      cH3("2D experiment");
      cP("First step was creating segments on the canvas. When the mouse is hovering over a segment, squares with randoms size are created inside that element. The amount of squares on the screen can be set to any number and as soon as the mouse is klicked once the loop stops and the final picture stayes on the screen. Stopping the loop is achived by simply calling on the p5 noLoop() function with the preset mouseClicked() function.")

      cImage("/ga/Doku/02.2D Squaregrid.png")

      cP("Further on I edited it so that the squares are only drawn when the mouse is actively moving over the screen. So if the cursor is standing still over a segment nothing happens.");
      createNewClone();
      child.innerHTML = (
        function movement() {

          let x = Math.round(map(mouseX, 0, screenWidth, 0, amount - 1));
          let y = Math.round(map(mouseY, 0, screenWidth, 0, amount - 1));

          if (x < amount && y < amount) {
            segments[x][y].pulsate();
          }
        }
      );
      cPre();
      cP("The function above is called when the mouse is moved over the screen. I found out later on that if I called it mouseMoved() it would do that automatically but this way I have to call on it seperately.")
      cImage("/ga/Doku/03.compact_squaregrid.png");
      cLink("https://editor.p5js.org/Oblivia/present/m0jfD-OXq", linkText);

      cH3("Bugs")
      cP("while trying to get some rotation in to the whole thing I have made some mistaces in my calculations which resulted in a unexpected image.");
      cImage("/ga/Doku/04.coding_error.png");

      cP("It was turning the whole grid instead of the elements in their grid cells.");
      cImage2("Doku/05 turning grid.png", "Doku/06 more errors.png");

      cP("I made a lot of coding errors actually. I obviously was not thinking straight. Even when it seemed to work at first it actually did not.");

      cImage("/ga/Doku/07 almost there.png")

      cP("In the end I figured out I was thinking of the wrong transformation point. Point (0,0) is on the top left corner of the screen and not in the middle like I was thinking. I figured it out by simply placing a seperate square in the middle of the screen and rotating it.")
      cImage("Doku/08 rotation solve.png");

      cH3("Correct Transformation");
      createNewClone();
      child.innerHTML = (

        class Segment {
          constructor(x, y, w) {
            this.x = x + w / 2;
            this.y = y + w / 2;
            this.w = w;
            this.rec = w;
            this.angle = 0;
            this.draw()
          }

          pulsate() {
            this.w = random(0, this.rec + random(0, 10));
            this.draw();
          }

          draw() {
            stroke(0);
            translate(this.x, this.y);
            rotate(this.angle);
            translate(-this.x, -this.y);
            noFill();
            rect(this.x, this.y, this.w);
            this.angle += random(-2, 5);
          }
        }


      )
      cP("After that it wasn't that much of a bother anymore making it (mostly) work correctly. So for the correct transformation each square first has to be moved to the rotation center, be rotated and then moved back. A different solution would have been working with the functions push() and pop() the basics of what is happening is the same though.")

      cPre();

      cP("Oddly enough there are still a few rectangles that just seem to have a different center point than others.")
      cImage2("Doku/09 working rotation.png", "Doku/10 rotation grid with extras.png")
      cLink("https://editor.p5js.org/Oblivia/present/a5BGlCQpF", "Link to Sketch");

      cH3("Gridless")
      cP("Decided to not draw the first, straight grid so the results are more surprising and the grid system is not recognisable from the start. To do this I simply commented out the calling of the first this.draw() function in the constructor of the Segments class. This can be seen in the code above.")


      cImage("/ga/Doku/12.png");
      cLink("https://editor.p5js.org/Oblivia/present/npfhd6uKa", linkText);

      //==================================================================
      //--------------------------- DAY 2 -------------------------------
      //==================================================================
      cH2("Day 2")
      cP("I did a last adjustment to the prior script I made and added some colour. Until a certain darkness is achived, the colour just gets darker when a grid part is activated. Every Segment has its own darkness parameter so it doesn't simultaniously turn everything darker.");
      cImage("/ga/Doku/13.png")
      cLink("https://editor.p5js.org/Oblivia/present/hKEAKG21X", linkText);

      cP("How fast it gets darker varries from one to another since the parameter added is randomly choosen in between a certain range.");
      cH3("Inspiration")
      cP("I took a look at example 01_06 which was pretty simular to what I was working on already.")

      cImage("/ga/Doku/Ex01.png");

      cP("I adjusted my grid so it also fills the whole screen with rectangles instead of trying to partually fill it with squares. Second step was adding prefixed rectangles to every Grit Element and giving them a certain rotation that applies to all of them simultaniously. Since I already have a prefixed Method that checks the x and y mouse position and applies changes to just the closest one I kept on working with that.")

      cH3("Adjustments")
      cP("After adjusting the grid system I did notice a small glitch that looked quite nice though.")

      cImage("/ga/Doku/14.png");

      cP("The reason for the glitch was quite obvious. I hadn't ajusted all code parts to rectangles yet, so while the width changed the height stayed static. I played with that for a moment and saved it in a seperate script so I wouldn't loose it in the process.")

      cImage("/ga/Doku/15.png")
      cLink("https://editor.p5js.org/Oblivia/present/um-8CdOss", linkText);

      cP("The adjustment then went pretty well.")

      cImage("/ga/Doku/16.png")
      cLink("https://editor.p5js.org/Oblivia/present/FDE_JgICp", linkText);


      cP("Adding the rectangles within the other rectangles also went down quickly.")
      cImage("/ga/Doku/18.png")
      cH3("Surprise")
      cP("An unexpected but very welcome result occured though when moving the mouse over the screen and seeing my movement effect in action. <br> Mostly I just added a pulsate Method to the Segment class that is activated by the mouse moving over the screen and the different grid segments.")
      createNewClone();
      child.innerHTML = (
        class Segments {
          //...
          pulsate() {

            for (let i = 0; i < 5; i++) {
              if (this.w <= -200) {
                this.w = this.recw;
              }
              this.w -= 10;
              this.h = map(this.w, 0, this.recw, 0, this.rech);
              if (this.dark > maxDark) {
                this.dark -= random(0, 10);
              }
              this.draw();
            }
          }
          //...
        }
      );
      cPre();
      cImage("/ga/Doku/17.png")
      cLink("https://editor.p5js.org/Oblivia/present/ruieMRhIO", linkText);

      cP("Since working result here is actually less interesting than the accidental glitch I mentioned just before, I'm decided to ditch the original plan and go along with this now. With a small adjustment for the maximum size of the effect I see this as a sucess. The patterns you can create can be really nice and it is just fun to go over it.")
      //18 was here
      cImage2("/ga/Doku/20.png", "/ga/Doku/22.png")

      cP("I then opened up a different project based on this one, where the grid in the background stayes visible while you draw over it")
      cImage("/ga/Doku/19.png")
      cLink("https://editor.p5js.org/Oblivia/present/ZpsbzlHMo", linkText);
      cP("I started using a Grafics variable in p5 in which i created the grid background. I use this since this way I don't have to calculate all the Segments every Time I want to draw the background. On top of that graphic background the mouse movement triggers the effect. The fading out is achived by drawing the background after every frame but with decreased visability.")

      //B19, 20, 22

      cP("Next I wanted to add a consistent movement. I first thought about starting with a rectangular one, since everything is so nice and rectangular. I redicided though and did a circular movement. To actually see the movement nicely after it is drawn I had to change the fading effect a little.")
      cImage("/ga/Doku/21.png") //B21
      cP("Implementing a circle pattern for the effect to follow wasn't that hard anymore. It is really just circle calculation and then braking the coordinates down to the grid system with the map() function. To make it more interesting I made two circles moving in opposite directions and additionally the mouse movement can still be seen on the screen.")
      //B23, 23, 25
      cImage2("/ga/Doku/23.png", "/ga/Doku/24.png")
      cLink("https://editor.p5js.org/Oblivia/present/wpsCmH9b4", linkText);

      //==================================================================
      //--------------------------- DAY 3 -------------------------------
      //==================================================================

      cH2("Day 3");

      cP("Staring on a screen with multiplying rectangles can be quite exausting for the eyes so for this day I decided to start a different project. If later on I decide to go back to this grid I could implement a random movement of the effect instead of just a circular one.")

      cP("After looking at some of the examples I chose to work with noise today. Specifically the one below caught my eye and I started recreating it myself.")
      //Ex02
      cImage("/ga/Doku/Ex02.png")
      cP("I started ba simply making a normal circle with points at certain angles. Then the radius of those points were moved by a noise value. By increasing the radius every time and decreasing it again when it reached a certain value I created a somewhat mesmerising graphic.")
      //B26
      cImage("/ga/Doku/26.png")
      cP("By changing some values I managed to make a smoother movement.")
      //B27,28
      cImage2("/ga/Doku/27.png", "/ga/Doku/28.png")
      cLink("https://editor.p5js.org/Oblivia/present/ROjPgl-TL", linkText);

      cP("I then made a class and function to trigger these effects by clicking on the screen and have the circle expand from the mouse coordinates of the click")
      //code?
      createNewClone();
      child.innerHTML = (
        class Hypno {
          constructor(x, y, n, r, xn, xoff, c) {
            this.x = x;
            this.y = y;
            this.n = n;
            this.r = r;
            this.xn = xn;
            this.xoff = xoff;
            this.increasing = true;
            this.amount = num;
            num++;
            this.colour = c;
            this.ended = false;
          }

          start() {
            //coordinates are given to the circlePoints() function which then actually draws the noise circle.
            colour = this.colour;
            xn = this.xn;
            circlePoints(this.x, this.y, this.n, this.r);
            this.xn += incrementXn;
            if (this.r <= diagonal / 4 && this.increasing == true) {
              this.r += speed;
            } else {
              this.r -= speed;
              if (this.r < 0 && this.ended == false) {
                this.ended = true;
                this.end();
              } else {
                this.increasing = false;
              }
            }
          }

          end() {
            //decreases the number of elements in the array and moves the elements up to simulate a Queue
            //There is a queue function in p5 I know it but I already had an array.
            num--;
            queueSimulator();
          }
        }
      )
      cPre();
      cImage2("/ga/Doku/29.png", "/ga/Doku/30.png")
      cLink("https://editor.p5js.org/Oblivia/present/SOwtrKTuV", linkText);
      //B29,B30


      //==================================================================
      //--------------------------- DAY 4 -------------------------------
      //==================================================================
      cH2("Day 4")

      cP("On this day I started working more on my actual documentation. I always wrote down my progress directly but up until now I didn't decide in what format I should make it. I decided here to do a Website since this way I can also use it as a portfolio start.")

      cP("Besides working on my webpage for the documentation I also tried some new things with perlin noise method. I remembered a work from another digital artist that was shown to us in an article. John Maedis made an infinity loop that seemed to have a noise effect changing the lines.")
      cImage("/ga/Doku/infinity.png")

      cP("So I tried to make different forms which then get a perlin Noise Effect to animate them. I tried to kind of recreate the infinity loop at first but I had problems making a nice transition from one circle to another, so I basically just made two circles with a Perlin Noise effect.")

      //B31
      cImage("/ga/Doku/31.png")
      cLink("https://editor.p5js.org/Oblivia/present/izSW2vZxM", linkText)
      cP("I was not and am still not really happy with the result. It works but I think it is kind of boring with just two circle. I might try another approach later on but for the moment I have decided to stick to working on the documentation website and not waste too much time on a sketch I don't really like.")

      cP("After a while I went through my notes again and figured I could work on the rectangle grid again. I read the suggestions in my documentation notes where I described that a random movement could be added. So I did exactly that. I added a noise movement to the scene and it does work and looks alright but I am not quite satisfied with it.")
      //B32
      cImage("/ga/Doku/32.png")
      cLink("https://editor.p5js.org/Oblivia/present/C-yVG_TS6", linkText);
      cP("The noise movement isn't really recognizable and I think it would be nice if you could see the noise 'worm'. So I wanted to start a new project more or less from scratch. Though speaking of a noise 'worm' I had an idea to combine it with the hypno circle, which was the circle with a noise value changing the radius on every step.")


      cP("A little side note: I realized just now seeing all my entries on my documentation website that I should have started with a dark background in the first place. I just like it better.")

      //==================================================================
      //--------------------------- DAY 5 -------------------------------
      //==================================================================
      cH2("Day 5");

      cP("We got a hint in the daily input today, that if we run into performance issues with p5.js we could try out q5.js wich should work simularly and jst has a better performance. Might be usefull at some point.");
      cP("So my plan for the day was to add an additional effect to my hypno circle. When it reaches a maximun of it's radius it shall stop and the Dots then become seperate objects that move via noise over the screen. So let's see how that works out.");
      cP("I had a nice effect in between while checking if the methods still worked when I changed a few things about it.");
      //33
      cImage("/ga/Doku/33.png")
      cP("So now after the 'Hypno Ring' expanded the dots turn into little worms crawling arround the screen. I added a short method so they would reapear at the other end of the screen when they go over the edges of the canvas.")
      createNewClone();
      child.innerHTML = (
        //the function is in the Worm class itself and 
        //checks the coordinates of every circle that is drawn.
        function stayInScreen() {
          if (this.x < 0) {
            this.x = screenWidth + this.x;
          } else if (this.x > screenWidth) {
            this.x -= screenWidth;
          }
          if (this.y < 0) {
            this.y = screenHeight + this.y;
          } else if (this.y > screenHeight) {
            this.y -= screenHeight;
          }
        }
      )
      cPre();
      //34
      cImage("/ga/Doku/34.png");
      cLink("https://editor.p5js.org/Oblivia/present/pBH6w7cGa", linkText)

      cP("If you forget that the Canvas is still looping and let it run for quite a while you will suddenly come back to a screen that looks somewhat like this.")

      //35
      cImage("/ga/Doku/35.png")
      cP("This happens since I have not defined a maximum size for the circles. They are actually scaled by a random function but random can make things huge too.")

      cP("I made some p5 sliders now for the first time so I could play arround with some variables. Also remembered, that I could make the hypno circle a little more smooth by adding more points that can be calculated.")
      //36
      cImage("/ga/Doku/36.png")

      cP("So while playing with the variables I also figured I could fill the whole form with colour instead of only making outlines")
      //37,38, 39, 40
      cImage2("/ga/Doku/37.png", "/ga/Doku/38.png");
      cImage2("/ga/Doku/39.png", "/ga/Doku/40.png")


      //==================================================================
      //--------------------------- DAY 6 -------------------------------
      //==================================================================
      cH2("Day 6")
      cP("So for today I was thinking I could try to implement sound to my noise circle. The sound waves should then change radius and height of the noise waves. Maybe the colour can change by it too.")
      cP("I had some problems with the functionality at first an am still looking for a solution to just add the soundtrack from a youtube video as an input but sofar it seems to work.");
      //41 make picture of the working thing.
      cImage2("/ga/Doku/39.7.png", "/ga/Doku/39.8.png")
      cLink("https://editor.p5js.org/Oblivia/present/kBEHjG76G", linkText)
      cP("I should add another changing variable that sets the radius offset amount.")

      cP("In the input today we also got to see highlight.js from a classmate, which I did not know yet. I used it to add the colouring of the displayed code blocks you can see on this website.");
      cP("for some reason there was a lot of bugfixing involved and I don't think I managed to actually do a lot. The bugs weren't that bad but it just doesn't seem to be a good day for programming.");
      //Add Code example 
      cP("I started another sketch where I am trying to make a 3D Sphere with vertecies. The plan is to later on set those verticies with a noise offset amount. I didn't get very far on this day and had to finish thinking through how to calculate all the vertecies and connecting them. <br> In a first tryout code I simply tried out making the veritces and connecting them to a simple form.");
      //cP("Using my own canvas on the website works in the context of it is drawing something. Sadly it also does not show the WebGL sketch correctly.")

      createNewClone();
      child.innerHTML = (
        function tryout() {
          let x;
          let y;
          beginShape();
          for (let i = 0; i < 4; i++) {
            x = 0 + 50 * sin(360 / 4 * i);
            y = 0 + 50 * cos(360 / 4 * i);
            console.log(x, y)
            coordinates[i] = [];
            coordinates[i][0] = x;
            coordinates[i][1] = y;
          }
          for (let i = 0; i < 4; i++) {
            let y2 = coordinates[i][1];
            let x2 = coordinates[i][0];
            vertex(x2, y2)
            console.log(x2, y2);
          }
          endShape(CLOSE)
        }
      );
      cPre();

      cP("Also since creating a queue did not work for me in p5.js I am again just using arrays. Instead of a p5 queue I got a stack when I tried it but I was probably just using it wrong.")

      //==================================================================
      //--------------------------- DAY 7 -------------------------------
      //==================================================================
      cH2("Day 7");
      cP("I knew from the start that I will have some errors in my calculation. What happened was still interesting to watch.");
      //B50
      cImage("/ga/Doku/50.png")

      cP("Besides the y height calculation which I knew from the start were just wrong, there was something off with the vertecies connection. For a long Time I was not sure what was happening but some console logs helped pinpoint the problem. In fact it worked out pretty fast after that. I accidentally overwrote the coordinates in the second array so there were Nan there when I tried to use them.");
      cImage2("/ga/Doku/51.png", "/ga/Doku/52.png")
      //51,52
      cP("After some more confusion I finally figured some more things out. The sphere is still not perfect but thankfully that isn't exactly my aim. It's an Egg now and that's fine.")
      cImage2("/ga/Doku/53.png", "/ga/Doku/54.png")
      //53,54
      cP("Next I'll have to add some light source, otherwise the Noise effect probably won't really be seen.")
      cP("Sadly the light doesn't really seem to work with self made objects in p5 and WebGL mode. If I don't set a sphere into it it does nothing with point lights, which it actually should. It is an odd little bug but beginShape(), endShape() and normalMaterial(), pointLight() aperantly should not be used together at this point in p5.js. A forum seemed to adress the same issue with no solution to it.")
      cImage2("/ga/Doku/55.png", "/ga/Doku/56.png")
      cImage("/ga/Doku/57.png")
      cP("In the picture above on the left you can see part of the default p5 sphere at the top of my droplet. The sphere is nicely showing me how the normal Material is supposed to look. If i draw my drop with the normal material it just turns out white like you can see on the two pictures before.")

      cH3("Recomendation")
      cP("My recomendation at this point is to not use custom 3D objects with p5.js. The result is not worth the effort. Plus saving sketches seperately that have accidentaly created cool forms is a good thing that I have indeed forgotten about today.")

      cH3("Fixes")
      cP("Since the Materials don't work on my selfmade object, I have gotten the suggestion to just use the strokes. That does look quite nice I just can't make too many height or rotation segments since it seems to be a little to much to render when looping the whole sketch.")
      cImage2("/ga/Doku/58.png", "/ga/Doku/59.png")
      cP("It looks really nice this way and can still be animated or rather looped.")
      cP("I then added some colour and tried out what would happen when I change the beginShape parameter to TRIANGLES for example as you can see in the following picture on the right.")
      //60,61
      cImage2("/ga/Doku/60.png", "/ga/Doku/61.png")
      cLink("https://editor.p5js.org/Oblivia/present/yawOEXscL", linkText);

      createNewClone();

      child.innerHTML = (
        function mySphere() {
          let r = 0;
          let increasing = true;
          let z = 0;
          let x = 0;
          let origin = -height / 2;

          //stroke is defined outside of this method
          noFill()
          beginShape(TRIANGLES)
          for (let j = 0; j <= segments; j++) {
            let a = map(j, 0, segments, 0, 90);
            let y = j * (height / segments) * sin(a)

            for (let i = 0; i <= rotsegments; i++) {
              coordinates[i] = [];
              //changing r y and the offset variables for the closing noise effect
              roff = rorigin + 5 * sin(i * (360 / (rotsegments)));
              let p = map(noise(roff), 0, 1, -20, 20)
              r = j * (height / segments * 2) * cos(a) + p
              yoff = yorigin + 50 * sin(i * (360 / (rotsegments)));
              p = map(noise(yoff), 0, 1, -50, 50)
              y = j * (height / segments) * sin(a) + p

              //last coordinates shall not be changed by noise to create a closed object.
              if (j == segments) {
                y = j * (height / segments) * sin(a)
                r = j * (height / segments * 2) * cos(a)
              }

              if (j > 0) {
                x = r * sin(i * (360 / rotsegments))
                z = r * cos(i * (360 / rotsegments));
                coordinates[i][0] = x;
                coordinates[i][1] = y;
                coordinates[i][2] = z;
              } else {
                if (j == 0) {
                  //same as with the last coordinates basically
                  //the first ones shall just origin at one point.
                  coordinates2[i] = [];
                  coordinates2[i][0] = 0;
                  coordinates2[i][1] = y;
                  coordinates2[i][2] = 0;
                } else {
                  coordinates[i][0] = 0;
                  coordinates[i][1] = y;
                  coordinates[i][2] = 0;
                }
              }

              if (j != 0) {
                let x1 = coordinates[i][0];
                let y1 = coordinates[i][1]
                let z1 = coordinates[i][2];
                let x2 = coordinates2[i][0];
                let y2 = coordinates2[i][1]
                let z2 = coordinates2[i][2];
                vertex(x1, y1, z1);
                vertex(x2, y2, z2);
                coordinates2[i][0] = x1;
                coordinates2[i][1] = y1
                coordinates2[i][2] = z1;
              }
              rorigin += rmove;
            }
            endShape(CLOSE);
          }
        }
      );

      cPre();

      cH3("WebGL Problems")
      cP("Besides all that I started putting my sketches into the p5 web editor and had to make an unpleseant discovery. Sadly WebGL does not seem to be working correctly in the web editor, the forums didn't help eighter so I tried to make another canvas on my website the next day.");

      //==================================================================
      //--------------------------- DAY 7 -------------------------------
      //==================================================================
      cH2("Day 8")
      cP("Plan for this day was to do some ajustments to my music reaction noise sketch and mostly work on the documentation since the WebGL thing seemed to need quite some more work to display it on this website.");
      cP("I first off suddenly knew how to fix my sphere calculation so it would actually turn out as a sphere. I had to map the sin and cos values to the height and radius of the sphere. Since I already knew how now I also felt the need to implement it.");
      //62
      cImage("/ga/Doku/62.png")
      cLink("https://editor.p5js.org/Oblivia/present/11fvmlVWl", linkText);

      cP("Now for the documentation I tried and make a second canvas on my website that didn't interfere with the one I already have in the background. I tried it out real quick in a sketch and creating a second canvas with a background colour on a already existing canvas leads to somewhat of a bug. The second canvas is displayed in the size it is supposed to but it takes the colour from the first canvas and makes everything else white. In this case instead of creating a second canvas I can link the document to a page where my sketch is then drawn on the already existing canvas. I did that and the resuld was dissapointing. The same problem as with the p5.js web editor.");
      cH3("Bugs");
      cP("So I spent the whole morning trying to make this work and I was ready to give up at some point and just display a video of it. I just wanted to try one more thing. Instead of using the prefixed p5.js files in the online editor I imported the ones I used in the Atom editor. Surprisingly that made it work. I will not question why I'm just glad it works.");
      cP("After my bugfixes I continued adding links to my p5 Sketches. Seperate ones on the P5.js Sketch site and links on this documentation page so the sketches can be accessed directly. Also published my site today for the first time ever on github. It can now be accessed on any computer :) (It's not optimised for phone use yet though)");


      break;

    case "/ga/examples.html":
      content.innerHTML = "";
      linkText = "Link to Sketch"
      cH1("p5.js sketches")
      cP("Following are seperate links to the different p5.js sketches I made in the Generative Computer Graphics module. The links will always lead you to the sketch belonging to the picture you can see above them.")
      cP("I could have linked the pictures themselves but I only realized that half way through.")
      cH2("Gridsystem")
      cH3("Darkening Windows")
      cImage("/ga/Doku/03.compact_squaregrid.png");
      cLink("https://editor.p5js.org/Oblivia/present/m0jfD-OXq", linkText);

      cH3("Turning Houses")
      cImage("/ga/Doku/09 working rotation.png")
      cLink("https://editor.p5js.org/Oblivia/present/a5BGlCQpF", linkText);

      cH3("Housless Swirl")
      cImage("/ga/Doku/12.png");
      //FIX SKETCH MOUSE POSITION TO GRID METHOD
      cLink("https://editor.p5js.org/Oblivia/present/npfhd6uKa", linkText);

      cH3("Colouring Rotation");
      cImage("/ga/Doku/13.png");
      //append changes of method here too
      cLink("https://editor.p5js.org/Oblivia/present/hKEAKG21X", linkText);

      cH2("Dark Mode Grid")
      cH3("Rectangle Chaos");
      cImage("/ga/Doku/15.png");
      cLink("https://editor.p5js.org/Oblivia/present/um-8CdOss", linkText);

      cH3("Rectangular World");
      cImage("/ga/Doku/16.png");
      cLink("https://editor.p5js.org/Oblivia/present/FDE_JgICp", linkText);


      cH3("Multiplying");
      cImage("/ga/Doku/17.png");
      cLink("https://editor.p5js.org/Oblivia/present/ruieMRhIO", linkText);

      cH3("Glowmove");
      cImage("/ga/Doku/19.png");
      cLink("https://editor.p5js.org/Oblivia/present/ZpsbzlHMo", linkText);

      cH3("Auto Circling");
      cImage("/ga/Doku/23.png");
      cLink("https://editor.p5js.org/Oblivia/present/wpsCmH9b4", linkText);

      cH2("Perlin Noise");
      cH3("Hypno");
      cImage("/ga/Doku/27.png");
      cLink("https://editor.p5js.org/Oblivia/present/ROjPgl-TL", linkText);

      cH3("Clicking Hypnosis");
      cImage("/ga/Doku/29.png");
      cLink("https://editor.p5js.org/Oblivia/present/SOwtrKTuV", linkText);

      cH3("Noisy Move");
      cImage("/ga/Doku/32.png");
      cLink("https://editor.p5js.org/Oblivia/present/C-yVG_TS6", linkText);

      cH3("Infinity Noise");
      cImage("/ga/Doku/31.png");
      cLink("https://editor.p5js.org/Oblivia/present/izSW2vZxM", linkText)

      cH3("Worm Break");
      cImage("/ga/Doku/34.png")
      cLink("https://editor.p5js.org/Oblivia/present/pBH6w7cGa", linkText)

      cH3("Noise but Different");
      cImage("/ga/Doku/39.8.png");
      cLink("https://editor.p5js.org/Oblivia/present/kBEHjG76G", linkText)

      cH2("3D");
      cH3("Pumpkin");
      cImage("/ga/Doku/61.png")
      cLink("https://editor.p5js.org/Oblivia/present/yawOEXscL", linkText);

      cH3("Noisy Marble");
      cImage("/ga/Doku/62.png");
      cLink("https://editor.p5js.org/Oblivia/present/11fvmlVWl", linkText);

      cLink("https://editor.p5js.org/Oblivia/present/ETVgOX2Xm", "Same Skript but with TRIANGLES as beginShape argument");


      //let c2 = createCanvas(500, 500);
      //c2.background(20);
      //c2.parent("canvas")
      break;

    case "/overview.html":
      content.innerHTML = "";
      cH1("Welcome to my Page")
      cP("First off, this site is a work in progress. It gets worked on when I get the time, which apperantly isn't very much at the moment. Nether the less it will be updated.")
      cH2("What you will find on here");
      cP("You'll get to know me and my code a little bit. I try to take in good examples but frankly I have no idea what others might find interesting in my code. If you'd like me to elaborate what I did you may try to contact me ^^")
      break;
    case "/ux/main.html":
      content.innerHTML = "";
      cH1("Importance of UX")
      cP("Sorry there is no content in this page yet since I have to convert my Projects to a web format that also looks alright. I'm working on it but have no Idea when I'll be done with it.")
      break;
    case "/me/main.html":
      code = document.getElementById("code")
      innercode = document.getElementById("innercode");

      content.innerHTML = "";
      cH1("Little bit about me");
      cH2("Interests")
      cP("Right now I am a Digital Ideation student at the HSLU in Luzern. I'm interested in AI and all of it's sub genres but also visual coding like the generative art that can be found on this page. I'm thinking about trying out Three.js some time soon since a lot of cool 3D graphics can be made with less lag than in p5.js.")
      cP("Besides Coding I also like to draw. I'm not quite sure how much of that I'll show on here.")

      cH2("career");
      cP("I won't tell you every detail about my career on here but what you may know is I have quite some design experience but also a lot of technical skills. Before I decided to start coding I did an apprenticeship as a car mechanic. Yes, I said car mechanic. After my apprenticeship I decided to follow a different path though. I found out about the Digital Ideation degree course and what I love about it is that it is inbetween designing and technic. I could never decide between those two things so this was perfect for me.");
      cP("Before I could begin my studies at the HSLU I did have to complete an internship at a web development company plus complete a course about the informatic basics. It went really well and I could type my first shell scripts to automatically backup the data on an ubuntu system.");
      cP("So basically I had absolutly no idea about programming before I started this career path in 2019. I really learned a lot since then.")


      break;
      case "/plotter/main.html":
        code = document.getElementById("code")
      innercode = document.getElementById("innercode");

      content.innerHTML = "";
      cH1("Stift Plotter");
      cP("Das Modul 'Prototyping Extended' hat für uns in diesem Jahr ein anderes Format angenommen. Durch die Corona Virus Pandemie konnten wir und nicht vor Ort treffen und zusammen an einem Projekt arbeiten. Jedoch wurde organisiert, dass jedem von uns ein Paket zugesendet wurde. Dafin befanden sich ettliche Werkzeuge und Materialien mit denen wir unseren Plotter zusammenbauen konnten.");
      //cP("Hier ist unter anderem eine Dokumentation zu meinem Vorgang zu finden. Wenn es jemand gerne selber ausprobieren möchte, kann den Code in meinem Github repository einsehen.")
      cP("Die Dokumentation des Projektes wird in Zukunft hier erscheinen. Im Github Repository kann jedoch auch jetzt schon der Code eingesehen werden und allenfalls aufprobiert.");
      cLink("https://github.com/OblivionLS/stutprox20", "Github Repository")

      
      break;
  }
}


function elementToHTML(theTag, Element) {
  content.appendChild(theTag);
  theTag.appendChild(Element);
}




//this function creates the indey
function cIndex() {
  let doku;
  let examples;
  if ( path == "/ga/main.html" || path == "/ga/examples.html") {
    let h1 = document.createElement("h1");
    let a = document.createElement("a")
    a.setAttribute("href", "/");
    a.innerHTML = "Generative <br> Art"
    header.appendChild(h1);
    h1.appendChild(a);
    let ul = document.createElement("ul");
    doku = document.createElement("li");
    examples = document.createElement("li")
    let linkDoku = document.createElement("a");
    let linkExamples = document.createElement("a");

    linkDoku.setAttribute("href", "/ga/documentation.html");
    linkDoku.innerHTML = "Documentation"
    if(path == "/ga/examples.html"){
      linkExamples.setAttribute("href", "/ga/main.html");
      
    }else{
      linkExamples.setAttribute("href", "/ga/examples.html");
      
    }
    linkExamples.innerHTML = "P5 Sketches"
  
      header.appendChild(ul);
      ul.appendChild(doku);
      doku.appendChild(linkDoku);
  
      ul.appendChild(examples);
      examples.appendChild(linkExamples);
   


  } else if (path == "/overview.html") {
    let h1 = document.createElement("h1");
    let a = document.createElement("a")
    a.setAttribute("href", "/overview.html");
    a.innerHTML = "Creating <br> Oblivion"
    header.appendChild(h1);
    h1.appendChild(a);
    let ul = document.createElement("ul");

    //===============================================
    //Generative Art
    //=============================================
    let doku = document.createElement("li");
    let linkDoku = document.createElement("a");
    linkDoku.setAttribute("href", "/ga/main.html");
    linkDoku.innerHTML = "Generative Art"

    header.appendChild(ul);
    ul.appendChild(doku);
    doku.appendChild(linkDoku);

    // //===============================================
    // //UX
    // //=============================================
    // let ux = document.createElement("li");
    // let linkux = document.createElement("a");
    // linkux.setAttribute("href", "/ux/main.html");
    // linkux.innerHTML = "UX"

    // header.appendChild(ul);
    // ul.appendChild(ux);
    // ux.appendChild(linkux);

    // //===============================================
    // //Prototyping Extended
    // //=============================================
    // doku = document.createElement("li");
    // linkDoku = document.createElement("a");
    // linkDoku.setAttribute("href", "/plotter/main.html");
    // linkDoku.innerHTML = "Prototyping"

    // header.appendChild(ul);
    // ul.appendChild(doku);
    // doku.appendChild(linkDoku);

    // //===============================================
    // //About Me
    // //=============================================
    // doku = document.createElement("li");
    // linkDoku = document.createElement("a");
    // linkDoku.setAttribute("href", "/me/main.html");
    // linkDoku.innerHTML = "About Me"

    // header.appendChild(ul);
    // ul.appendChild(doku);
    // doku.appendChild(linkDoku);

    //ul.appendChild(examples);
    //examples.appendChild(linkExamples);
  } else if (path == "/ux/main.html") {
    let h1 = document.createElement("h1");
    let a = document.createElement("a")
    a.setAttribute("href", "/overview.html");
    a.innerHTML = "User <br> Experience"
    header.appendChild(h1);
    h1.appendChild(a);

  } else if (path == "/me/main.html" || path == "/plotter/doku.html") {
    let h1 = document.createElement("h1");
    let a = document.createElement("a")
    a.setAttribute("href", "/overview.html");
    a.innerHTML = "Who <br> Am I"
    header.appendChild(h1);
    h1.appendChild(a);
  }else if (path == "/plotter/main.html") {
    let h1 = document.createElement("h1");
    let a = document.createElement("a")
    a.setAttribute("href", "/overview.html");
    a.innerHTML = "Prototyping <br> Extended "
    header.appendChild(h1);
    h1.appendChild(a);
    let ul = document.createElement("ul");

    let doku = document.createElement("li");
    let linkDoku = document.createElement("a");
    linkDoku.setAttribute("href", "/plotter/doku.html");
    linkDoku.innerHTML = "Dokumentation"

    //header.appendChild(ul);
    //ul.appendChild(doku);
    //doku.appendChild(linkDoku);


  }

  
  if (path == "/ga/documentation.html") {
    let h1 = document.createElement("h1");
    let a = document.createElement("a")
    a.setAttribute("href", "/overview.html");
    a.innerHTML = "Generative <br> Art"
    header.appendChild(h1);
    h1.appendChild(a);
    let ul = document.createElement("ul");
    doku = document.createElement("li");
    examples = document.createElement("li")
    let linkDoku = document.createElement("a");
    let linkExamples = document.createElement("a");

    linkDoku.setAttribute("href", "/ga/main.html");
    linkDoku.innerHTML = "Documentation"

    linkExamples.setAttribute("href", "/ga/examples.html");
    linkExamples.innerHTML = "P5 Sketches"

    header.appendChild(ul);
    ul.appendChild(doku);
    doku.appendChild(linkDoku);

    ul.appendChild(examples);
    examples.appendChild(linkExamples);

    let ul2 = document.createElement("ul");
    let list1 = document.createElement("li");
    let day1 = document.createElement("a");
    day1.innerHTML = "Day 1"
    day1.setAttribute("href", "#Day 1");
    doku.appendChild(ul2);
    ul2.appendChild(list1);
    list1.appendChild(day1);

    let list2 = document.createElement("li")
    let day2 = document.createElement("a");
    day2.innerHTML = "Day 2"
    day2.setAttribute("href", "#Day 2")//link einfügen!!!
    ul2.appendChild(list2)
    list2.appendChild(day2)

    let list3 = document.createElement("li")
    let day3 = document.createElement("a");
    day3.innerHTML = "Day 3"
    day3.setAttribute("href", "#Day 3")//link einfügen!!!
    ul2.appendChild(list3)
    list3.appendChild(day3)

    let list4 = document.createElement("li")
    let day4 = document.createElement("a");
    day4.innerHTML = "Day 4"
    day4.setAttribute("href", "#Day 4")//link einfügen!!!
    ul2.appendChild(list4)
    list4.appendChild(day4)

    let list5 = document.createElement("li")
    let day5 = document.createElement("a");
    day5.innerHTML = "Day 5"
    day5.setAttribute("href", "#Day 5")//link einfügen!!!
    ul2.appendChild(list5)
    list5.appendChild(day5)

    let list6 = document.createElement("li")
    let day6 = document.createElement("a");
    day6.innerHTML = "Day 6"
    day6.setAttribute("href", "#Day 6")//link einfügen!!!
    ul2.appendChild(list6)
    list6.appendChild(day6)

    let list7 = document.createElement("li")
    let day7 = document.createElement("a");
    day7.innerHTML = "Day 7"
    day7.setAttribute("href", "#Day 7")//link einfügen!!!
    ul2.appendChild(list7)
    list7.appendChild(day7)

    let list8 = document.createElement("li")
    let day8 = document.createElement("a");
    day8.innerHTML = "Day 8"
    day8.setAttribute("href", "#Day 8")//link einfügen!!!
    ul2.appendChild(list8)
    list8.appendChild(day8)

  } else if (path == "/overview.html") {
    let h1 = document.createElement("h1");
    let a = document.createElement("a")
    a.setAttribute("href", "/overview.html");
    a.innerHTML = "Creating <br> Oblivion"
    header.appendChild(h1);
    h1.appendChild(a);
    let ul = document.createElement("ul");

    //Link to Generative Art page
    let doku = document.createElement("li");
    let linkDoku = document.createElement("a");
    linkDoku.setAttribute("href", "/ga/main.html");
    linkDoku.innerHTML = "Generative Art"

    header.appendChild(ul);
    ul.appendChild(doku);
    doku.appendChild(linkDoku);

    // //Link to UX main page
    // let ux = document.createElement("li");
    // let linkux = document.createElement("a");
    // linkux.setAttribute("href", "/ux/main.html");
    // linkux.innerHTML = "UX"

    // header.appendChild(ul);
    // ul.appendChild(ux);
    // ux.appendChild(linkux);

    // doku = document.createElement("li");
    // linkDoku = document.createElement("a");
    // linkDoku.setAttribute("href", "/me/main.html");
    // linkDoku.innerHTML = "About Me"

    // header.appendChild(ul);
    // ul.appendChild(doku);
    // doku.appendChild(linkDoku);
  }


  //let s = document.createElement("li");
  //s.innerHTML = "inner list"
  //sketch01.appendChild(ul2);
  //ul2.appendChild(s);


}
//creating html elements
//hat to use c instead of create since createP already exists as a p5 function.
//h1 Tag on Element
function cH1(t) {
  let tag = document.createElement("H1")
  let text = document.createTextNode(t);
  elementToHTML(tag, text);
}
//h2 Tag on Element
function cH2(t) {
  let tag = document.createElement("H2")
  tag.setAttribute("id", t)
  let text = document.createTextNode(t);
  elementToHTML(tag, text);
}
//h3 Tag on Element
function cH3(t) {
  let tag = document.createElement("H3")
  let text = document.createTextNode(t);
  elementToHTML(tag, text);
}
//p Tag on Element
function cP(t) {
  let tag = document.createElement("p")
  let text = document.createTextNode(t);
  elementToHTML(tag, text);
}
//adding a link
function cLink(link, text) {
  let linkTag = document.createElement("a");
  let p = document.createElement("p");
  linkTag.setAttribute("href", link);
  linkTag.innerHTML = text;
  elementToHTML(p, linkTag);

}
//!!!!
//NEEDS to be Used before every innerHTML declaration of the child element since it is otherwise overwritten.
function createNewClone() {
  clone = code.cloneNode(true);
  child = clone.childNodes[1];
}
//appends pre child with the inner html of child.
//Need to use this seperately to display code inside of html. Giving the Code along with a String is a pain since it has to be in a line
function cPre() {
  //content.appendChild(code)
  //let clone = code.cloneNode(true);
  //let child = clone.childNodes[1];
  child.setAttribute("class", "javascript");
  /*
  child.innerHTML = (
  function cPre(t){
      //content.appendChild(code)
      let clone = code.cloneNode(true);
      clone.innerHTML = (t);
      content.appendChild(clone);
  });
  */
  content.appendChild(clone);
  hljs.highlightBlock(child);
}

//creating two images in a row
function cImage2(src, src2) {
  let i = document.createElement("IMG");
  i.setAttribute("src", src);
  i.setAttribute("id", "pics")
  i.setAttribute("height", screenWidth * 0.6 * 0.5 + "px")

  let i2 = document.createElement("IMG");
  i2.setAttribute("src", src2);
  i2.setAttribute("id", "pics")
  i2.setAttribute("height", screenWidth * 0.6 * 0.5 + "px")

  let r = document.createElement("div")
  r.setAttribute("class", "row");
  r.style.height = screenWidth * 0.6 * 0.5 + "px";
  let c = document.createElement("div")
  c.setAttribute("class", "column")

  let c2 = document.createElement("div")
  c2.setAttribute("class", "column")

  c.appendChild(i)
  r.appendChild(c)
  c2.appendChild(i2)
  r.appendChild(c2)
  content.appendChild(r);
}
//creates one image same height
function cImage(src) {
  let i = document.createElement("IMG");
  i.setAttribute("src", src);
  i.setAttribute("id", "pic")
  i.setAttribute("height", screenWidth * 0.6 * 0.5 + "px")

  content.appendChild(i);
}







//defining the color of the Canvas
let canvasColor = 0;

//Variables are used for making the waves
let increment = 0.01;
let startNoise = 0;
let scl = 10;
let cols, rows;
let zoff = 0;
//for perlin noise Methods
let waveStartY = 0;
let waveXincrement = 0.005;
let waveYincrement = 0.03;
let waveColor = 150;
let wavePositioning = -100;
let increasingBrightness = 10;  //very low if pg Canvas is used else arround 10
let xoff = 0;
let yoff = 1;
let amplitude = 100;
let frequenz = 10;
let yoffAddition = 0.005;
let points = [];
let waveAmount = 20;
let waveSpeed = 0.015;
//colour definition
let wormBase = 0;
let wormWhite = 250;
let wormDark = 100;
let wormStroke = 245;
let wormStrokeWhite = 255;
let wormStrokeDark = 230;
//for the colors of second Canvas
//RGB colors
let waveRed = 250;
let waveGreen = 250
let waveBlue = 250;


//random Circles Method
let x_old = 300;
let y_old = 300;
let r_old = Math.random(10, 30);
let base_old = 250;
let baserc;
let whiteMin = 200;
let darkMin = 200;


let waves = function () {
  //console.log("I tried to draw something");
  fill(100, 255, 255);
  circle(0, 0, 200);
}

function myWaves(min2, max2, colour) {
  fill(colour);
  //noStroke();
  stroke(colour);
  beginShape();
  xoff = yoff;
  for (let x = 0; x < width; x++) {

    //  stroke(255);
    //let y = noise(xoff)*height;
    let n = map(noise(xoff, yoff), 0, 1, min2, max2);
    let s = map(sin(xoff), -1, 1, min2 / 8, max2 / 8);
    let y = s + n;


    xoff += waveXincrement;
    vertex(x, y);
  }
  // increment y dimension for noise
  yoff += waveYincrement;
  vertex(width + 50, height);
  vertex(-50, height);
  endShape(CLOSE);
}
//making a wavelike background that also moves slightly if looping
function waveBackground() {
  waveYincrement = 0.2;
  yoff = waveStartY;
  fill(0, 0, 0);
  rect(0, 0, width, height);
  let spacing = height / waveAmount;
  for (let j = 0; j <= waveAmount; j += 1) {
    let myColor = color(waveColor, 80 + j * 50, j * increasingBrightness);
    let wh = height / waveAmount;
    myWaves(wavePositioning + j * wh, j * wh + amplitude, myColor);
  }
  waveStartY += waveSpeed;
}

let scrollHeight = 1;
function reset() {
  height = window.innerHeight;
  width = window.innerWidth;
  canvas = createCanvas(width, height);
  background(canvasColor);
  colorMode(HSB, 255);

  scrollHeight = document.documentElement.scrollTop;
  //sentence = sentenceOne;
  //len = initialLength;
  //generation = 1;
  //setColors();
  //switchRule();
  draw();


}







//==================================================================================================
//------------------------------- Sketches ------------------------------------------------
//==================================================================================================
function resetWebGL() {
  height = window.innerHeight;
  width = window.innerWidth;
  canvas = document.getElementById("myCanvas")
  canvas = createCanvas(width, height, WEBGL);
  angleMode(DEGREES)
  console.log("reset as WEBGL canvas")
  //canvas.id("myCanvas");

  createEasyCam();
  oncontextmenu = function () { return false; };

}


let heightS = 500;
let segments = 30;
let rotsegments = 30;
let maxR = 500;
let coordinates = []
let coordinates2 = []
let roffS = 1;
let yoffS = 0;
let rorigin = 2;
let yorigin = 5;
let ymove = 0.05;
let rmove = 0.01;

function mySphere() {
  let r = 0;
  let z = 0;
  let x = 0;
  let origin = -heightS / 2;

  noFill()
  beginShape(TRIANGLES)
  for (let j = 0; j <= segments; j++) {

    let a = map(j, 0, segments, 0, 180);
    let y;
    for (let i = 0; i <= rotsegments; i++) {
      coordinates[i] = [];
      //coordinates2[i+1] = [];
      if (j < segments) {
        roffS = rorigin + 5 * sin(i * (360 / (rotsegments)));
        let p = map(noise(roffS), 0, 1, -100, 100)
        r = map(sin(a), 0, 1, 0, maxR) + p;

        yoffS = yorigin + 50 * sin(i * (360 / (rotsegments)));
        p = map(noise(yoffS), 0, 1, -100, 100)
        y = map(cos(a), -1, 1, 0, heightS * 2);

      }

      if (j >= segments || j == 0) {
        y = map(cos(a), -1, 1, 0, heightS * 2);
        r = 0;
      }

      if (j > 0 && j < segments) {
        x = r * sin(i * (360 / rotsegments))
        z = r * cos(i * (360 / rotsegments));
        coordinates[i][0] = x;
        coordinates[i][1] = y;
        coordinates[i][2] = z;
      } else {
        if (j == 0) {
          coordinates2[i] = [];
          coordinates2[i][0] = 0;
          coordinates2[i][1] = y;
          coordinates2[i][2] = 0;
        } else {
          coordinates[i][0] = 0;
          coordinates[i][1] = y;
          coordinates[i][2] = 0;
        }
      }

      if (j != 0) {

        let x1 = coordinates[i][0];
        let y1 = coordinates[i][1]
        let z1 = coordinates[i][2];
        let x2 = coordinates2[i][0];
        let y2 = coordinates2[i][1]
        let z2 = coordinates2[i][2];
        vertex(x1, y1, z1);
        vertex(x2, y2, z2);
        coordinates2[i][0] = x1;
        coordinates2[i][1] = y1
        coordinates2[i][2] = z1;
      }

    }
    rorigin += rmove;

    endShape(CLOSE);
  }

}