//Initial GridSize 

let gridSize = 10;
grid = gridSize * gridSize;
let flexBasisCalculator = 100 / gridSize;

const mainContainer = document.querySelector(".sketch-container");
for(let i= 0; i<grid; i++) {
   
   const container = document.createElement('div');
   container.classList.add('small-grid');
   const flexBasisValue = `${flexBasisCalculator}%`;
   container.style.flexBasis = flexBasisValue;
   mainContainer.appendChild(container);

}

//Slider changes Grid Size
const slider = document.querySelector('#slider');
const sliderValue = document.querySelector('#sliderValue')
sliderValue.textContent = `${slider.value} x ${slider.value} `;
console.log(typeof(slider.value));
slider.addEventListener("input", () => {
   sliderValue.textContent = `${slider.value} x ${slider.value} `;
   updateGrid();
});

//lock a color to paint the grid by giving background-colorto each div
colorValue();

function colorValue() {
let containers = document.querySelectorAll('.small-grid');

// Iterate through each container and add the event listener
containers.forEach(container => {
  container.addEventListener('mouseover', () => {
    let newColor = colorpicker(); 
    container.style.backgroundColor = newColor; // Change the background color of the element
  })
});

}

//After Grid resize makes coloring againn possible
function updateGrid() {
   gridSize = slider.value;
   grid = gridSize * gridSize;
   flexBasisCalculator = 100 / gridSize;

   const gridDiv = document.querySelectorAll('.small-grid');

   gridDiv.forEach(item => {
       item.remove(); // Remove each individual item
   });

   // Now, recreate the grid elements based on the new values
   for (let i = 0; i < grid; i++) {
       const container = document.createElement('div');
       container.classList.add('small-grid');
       const flexBasisValue = `${flexBasisCalculator}%`;
       container.style.flexBasis = flexBasisValue;
       mainContainer.appendChild(container);
       container.addEventListener('mouseover', colorValue);
   }
}
//Returns the color user want to paint with
function colorpicker() {
   const colorPicker = document.querySelector('#colorpicker');
   let colorValue = colorPicker.value;
   return colorValue;
}

// Erase button

const eraseButton = document.querySelector('#eraseButton');
eraseButton.addEventListener("click", () => {
   console.log("clicked");
   const containers = document.querySelectorAll(".small-grid");
   containers.forEach(container => {
   container.style.backgroundColor = "white";
});
});



function adjustBrightness(hex , factor) {
   if (factor > 1) factor = 1;
   if (factor < -1) factor = -1;

   hex = hex.replace(/^#/, "");


   const r = parseint(hex.substring(0, 2), 16);
   const g = parseint(hex.substring(2, 4), 16);
   const b = parseint(hex.substring(4, 6), 16);

   const adjustedR = Math.round(r + (factor * 255));
   const adjustedG = Math.round(g + (factor * 255));
   const adjustedB = Math.round(b + (factor * 255));


   const clamp = value => Math.min(255, Math.max(0, value));

   const adjustedHex =
   '#' +
   clamp(adjustedR).toString(16).padStart(2, '0') +
   clamp(adjustedG).toString(16).padStart(2, '0') +
   clamp(adjustedB).toString(16).padStart(2, '0');

   return adjustedHex;
}


