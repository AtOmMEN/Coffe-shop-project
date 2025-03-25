
function onSelector(selectorEl){

    if(selectorEl.style.backgroundColor === "rgb(220, 255, 103)"){
        selectorEl.style.backgroundColor = "rgb(5, 5, 5)";
        selectorEl.style.color = "rgb(169,169,169)";
        selectorEl.style.fontWeight = 'normal';
    }
    else {
        selectorEl.style.backgroundColor = "rgb(220, 255, 103)";
        selectorEl.style.color = "rgb(0,0,0)";
        selectorEl.style.fontWeight = 'bold';
    }

}

