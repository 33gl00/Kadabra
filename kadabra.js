// eegloo

console.clear();
function ghostHidden() {
    let compteur = 0;
    const allElements = document.querySelectorAll("*");

    allElements.forEach((e) => { 
        if ( ((window.getComputedStyle(e, null).opacity == "0") || (window.getComputedStyle(e, null).visibility == "hidden") || (window.getComputedStyle(e, null).display == "none") ) && !(e.id.includes("ghostery")) ) {
            compteur++;
        } 
    });
    
    
    return compteur.toString() 
}

//    //chrome.browserAction.setBadgeText({"text": ghostHidden(), tabId: tab.id});

var url =  window.location.href;

console.log("     _           _         _ \n ___| |_ ___ ___| |_ ___ _| |\n| . |   | . |_ -|  _| -_| . |\n|_  |_|_|___|___|_| |___|___|\n|___|                        ")
console.log(`%c${ghostHidden()}`, "background: white; color: red" , "hidden elements");
console.log(`%c sur : ${url}`, "color: blue");

/////////////////////////////////////////////// eegloo