function createToken() {  
    var fuck = document.querySelector(".tokenCont");  
    const token = document.createElement("img");
    let size = Math.random() * 50;
    token.className = "token";
    token.style.borderRadius = 100 + "%";
    token.style.zIndex = 6;
    token.style.background = "rgb(63, 63, 63)";
    token.src = "vapur.svg";
    token.style.padding = "5px";
    token.style.width = 20 + size + "px";
    token.style.height = 20 + size + "px";
 

    token.style.bottom = 0 + "px";
    token.style.left = Math.random() * (innerWidth - 100) + "px";

    fuck.appendChild(token);

    setTimeout(() => {
     token.remove();
    }, 200000);
   }

setInterval(createToken, 2500);