
let screenWidth = window.innerWidth;
let screenHeight = window.innerHeight;
let header = document.getElementById("header");
let footer = document.getElementById("footer")
let headerHeight;


window.addEventListener("resize", screenAjustment);
window.addEventListener("load", screenAjustment);


function screenAjustment(){

    if(document.location.pathname != "/"){
        screenWidth = window.innerWidth;
        screenHeight = window.innerHeight;
        headerHeight = header.offsetHeight;
        
        console.log("height of header is = " + headerHeight);

        //document.getElementById("pics").style.height = screenWidth*0.6*0.5 + "px";
        
        if(screenWidth >= 1000){
            //container.style.paddingTop=headerHeight +"px";

               // container.style.width="60%";
            
            //container.style.minHeight= (screenHeight + 500) + "px";
            console.log("tried to change width of content");
        } else {
            //container.style.paddingTop = headerHeight +"px";

              //  container.style.width="100%";
            
            //container.style.minHeight=screenHeight + "px";
        }
    }

   

}

//screenAjustment();