
function onSelector(selectorEl){

    if (selectorEl.dataset.state === "Active") {
        selectorEl.dataset.state = "notActive"
        selectorEl.style.backgroundColor = "rgb(5, 5, 5)";
        selectorEl.style.color = "rgb(169,169,169)";
        selectorEl.style.fontWeight = 'normal';
    }
    else {
        selectorEl.dataset.state = "Active";
        selectorEl.style.backgroundColor = "rgb(220, 255, 103)";
        selectorEl.style.color = "rgb(0,0,0)";
        selectorEl.style.fontWeight = 'bold';
    }

}

let selectedFilters = new Set();
let excludebyprice = new Set();
let excludebymass = new Set();

let selectedPanel;
let selectedDialog;

let amountLeft = {} ;

function initAmount() {
    amountLeft["Espresso"] = 38;
    amountLeft["Crema"] = 35;
    amountLeft["Classic blend"] = 85;
    amountLeft["Lungo"] = 27;
    amountLeft["Filter Coffee"] = 24;
    amountLeft["Cold Brew Blend"] = 52;
    amountLeft["Decaf Coffee"] = 30;
    amountLeft["Single-Origin Coffee"] = 19;
}

window.onload = function () {
    initAmount();
    document.querySelectorAll("h2.leftinfo").forEach(updateAmount);
}
function updateAmount(info) {
    
    let inputblock = info.parentElement;
    let panel = inputblock.parentElement;

    let title = panel.querySelector(".Title");  

    let productName = title.textContent.trim();  
    let amount = amountLeft[productName];  

    info.textContent = "Left: " + amount;

}

function onFilterChange(filter) {
    if (filter.dataset.state === "Active") {
        selectedFilters.add(filter.dataset.filtertype);
     
    }
    else {
        selectedFilters.delete(filter.dataset.filtertype);
    }

   

    filterAgain();

}


function filterAgain() {

    let panels = document.querySelectorAll(".panel");

    panels.forEach(panel => {

        panel.style.display = "block";


        if (excludebyprice.has(panel) || excludebymass.has(panel)) {
            panel.style.display = "none";
        }

        for (let filter_ of selectedFilters) {
            
            if (!panel.dataset.all.includes(filter_)) { panel.style.display = "none"; break; }


        };


    });
}

let prevSearch = "";
function onSearchChange(userinput) {
  
    let text = userinput.value.trim().toLowerCase();

    selectedFilters.delete(prevSearch);
    

    prevSearch = text;

    if (text) {
        selectedFilters.add(text);
    }

    filterAgain();
}



function onPriceChange(userinput) {
    let priceValue = parseFloat(userinput.value.trim());

    excludebyprice.clear(); 

    if (!isNaN(priceValue)) {

        let panels = document.querySelectorAll(".panel");
        panels.forEach(panel => {
            let panelPrice = parseFloat(panel.dataset.price);
          
            if (panelPrice > priceValue) {
                excludebyprice.add(panel);
            }
        });

    }
    

    filterAgain();
}

function onMassChange(userinput) {
    let massValue = parseFloat(userinput.value.trim());

    excludebymass.clear();

    if (!isNaN(massValue)) {
  
        let panels = document.querySelectorAll(".panel");
        panels.forEach(panel => {
            let panelMass = parseFloat(panel.dataset.mass);
            if (panelMass > massValue) {
                excludebymass.add(panel);
            }
        });

    }


    filterAgain();
}

function onPanelHover(btn) {
    let panel = btn.parentElement;
   
    panel.style.backgroundColor = "rgba(66, 66, 66, 1)";
    btn.style.backgroundColor = "rgba(0, 0, 0, 1)";
    btn.style.color = "rgba(255, 255, 255, 1)";
}

function onPanelLeave(btn) {
    let panel = btn.parentElement;

    panel.style.backgroundColor = "rgba(20, 20, 20, 1)";
    btn.style.backgroundColor = "rgba(255, 220, 92, 1)";
    btn.style.color = "rgba(0, 0, 0, 1)";
}

function turnOnDialog(btn) {

    let panel = btn.parentElement;
    
    let dialog = document.querySelector(".blur");
    dialog.style.display = "block";
    let amountinput = dialog.querySelector(".inputField");
    amountinput.value = "1";

    let dialogDesc = dialog.querySelector(".desc");
    let panelDesc = panel.querySelector(".desc");

    dialogDesc.innerHTML = panelDesc.innerHTML;

    computePrice();

}

function computePrice() {
    let amountinput = document.getElementById("numberin");
    let dialog = amountinput.closest(".dialog");

    let button = document.getElementById("dialogbuybtn");
    button.style.display = "block";
    console.log(button);

    let currTitle = dialog.querySelector(".Title");
    console.log(currTitle);
    let panels = document.querySelectorAll(".panel");
    let price;
    for (let p of panels) {
        let t_title = p.querySelector(".Title");
        if (t_title.textContent === currTitle.textContent) {
            console.log(t_title);
            price = p.dataset.price;
            break;
        }
    }
    if (parseFloat(amountinput.value) > 0 && parseFloat(amountinput.value) < 100) {
        let final_val = parseFloat(price) * Math.abs(parseFloat(amountinput.value));
        console.log(parseFloat(amountinput.value));
        console.log(parseFloat(price));
        button.textContent = "Buy for " + final_val;
    }
    else {
        button.style.display = "none";
    }

    if (parseFloat(amountinput.value) > amountLeft[currTitle.textContent]) {
        document.getElementById("amounterror").style.display = "block";
        button.style.display = "none";
    }
    else {
        document.getElementById("amounterror").style.display = "none";
        button.style.display = "block";
    }

}

function buybtn(btn) {
    let dialog = btn.closest(".dialog");

    let amountinput = dialog.querySelector(".inputField");
    let amount = parseInt(amountinput.value);

    if (amount) {
        amount = Math.abs(amount);
        let coffeename = dialog.querySelector(".Title");
        if (amountLeft[coffeename.textContent] >= amount) {
            amountLeft[coffeename.textContent] = amountLeft[coffeename.textContent] - amount;
        }
    }

    document.querySelectorAll("h2.leftinfo").forEach(updateAmount);
    turnOffDialog();
}

function turnOffDialog() {
    let dialog = document.querySelector(".blur");
    dialog.style.display = "none";
}

