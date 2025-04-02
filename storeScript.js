
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

    console.log(priceValue);

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