/////////////////////////////////////////////////// eegloo

var injectBorder = document.getElementById('injectBorder');

var hid = document.getElementById('hid');
var none = document.getElementById('none');
var transparent = document.getElementById('transparent');
var comment = document.getElementById('comment');
var btn = document.getElementById('monBouton');

function action() {
    
    var code = [`console.clear();var count = 0;var allElements = document.querySelectorAll("*");`, "console.log('     _           _         _ \\n ___| |_ ___ ___| |_ ___ _| |\\n| . |   | . |_ -|  _| -_| . |\\n|_  |_|_|___|___|_| |___|___|\\n|___|                        ');console.log(window.location.href );console.log(' ');" ]
    
    if (hid.checked) {
        code.push(`allElements.forEach((e) => ( (window.getComputedStyle(e, null).visibility == "hidden")&& !(e.id.includes("ghostery")) ) ? console.log('%c Invisible', 'background: white; color: red' , e) : true );`);
        code.push(`allElements.forEach((e) => ( (window.getComputedStyle(e, null).visibility == "hidden")&& !(e.id.includes("ghostery")) ) ? count++ : true );console.log("\\t total elements invisibles : " + count );count = 0;`);
        code.push("console.log('');");
    }
    if (none.checked) {
        code.push(`allElements.forEach((e) => ((window.getComputedStyle(e, null).display == "none")&& !(e.id.includes("ghostery")) ) ? console.log('%c Disparue', 'background: white; color: red' , e)  : true );`);
        code.push(`allElements.forEach((e) => ((window.getComputedStyle(e, null).display == "none")&& !(e.id.includes("ghostery")) ) ? count++  : true );console.log("\\t total elements disparues : " + count );count = 0;`);
        code.push("console.log('');");
    }
    if (transparent.checked) {
        code.push(`allElements.forEach((e) => ((window.getComputedStyle(e, null).opacity == 0)&& !(e.id.includes("ghostery")) ) ? console.log('%c Transparent', 'background: white; color: red' , e)  : true );`);
        code.push(`allElements.forEach((e) => ((window.getComputedStyle(e, null).opacity == 0)&& !(e.id.includes("ghostery")) ) ? count++  : true );console.log("\\t total elements transparents : " + count );count = 0;`);
        code.push("console.log('');");

    }
    if (injectBorder.checked) {
        code.push(borderIt(hid.checked, none.checked, transparent.checked));
    }
    return code.join('');
}

function borderIt(hidE,noneE,transparentE) {
    var buffer = [''];
    if (noneE) {
        buffer.push('allElements.forEach((e) => ( (window.getComputedStyle(e, null).display == "none")&& !(e.id.includes("ghostery")) ) ? '+ reverseElt('disparue') +' : true );');  
    }
    if (hidE) {
        buffer.push('allElements.forEach((e) => ( (window.getComputedStyle(e, null).visibility == "hidden")&& !(e.id.includes("ghostery")) ) ? '+ reverseElt('invisible') +' : true );');  
    }
    if (transparentE) {
        buffer.push('allElements.forEach((e) => ( (window.getComputedStyle(e, null).opacity == "0") && !(e.id.includes("ghostery")) ) ? '+ reverseElt('transparent') +' : true );');  
    }
    return buffer.join('');
} 

function reverseElt(type) {
    var border = [ '(','e.style.border = "solid 1px red"',",e.style.zIndex = '9999'" ]
    if (type == 'disparue') {
        border.push(",e.style.display = 'block'");
    }
    if (type == 'invisible') {
        border.push(",e.style.visibility = 'visible'");
    } 
    if (type == 'transparent') {
        border.push(",e.style.opacity = 1");
    } 
    border.push("");
    border.push(")");
    return border.join("");
}

btn.addEventListener('click',function() {
  chrome.windows.getCurrent(function (currentWindow) {
        chrome.tabs.query({active: true, windowId: currentWindow.id}, function(activeTabs) {
            chrome.tabs.executeScript( activeTabs[0].id, {code : action() } );
        });
    });
   setTimeout(function() { window.close(); }, 500);
});
    
window.onload = function() {

    chrome.windows.getCurrent(function (currentWindow) {
        chrome.tabs.query({active: true, windowId: currentWindow.id}, function(activeTabs) {
            chrome.tabs.executeScript( activeTabs[0].id, {file: 'ghostContent.js', allFrames: true} );
        });
    });
    
// chrome.browserAction.setBadgeText({"text": ghostHidden(), tabId: tab.id});
};
/////////////////////////////////////////////////////////////////////////////eegloo