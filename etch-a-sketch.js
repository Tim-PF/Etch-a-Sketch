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

const slider = document.querySelector('#slider');
const sliderValue = document.querySelector('#sliderValue')
sliderValue.textContent = `${slider.value} x ${slider.value} `;
console.log(typeof(slider.value));
slider.addEventListener("input", () => {
   sliderValue.textContent = `${slider.value} x ${slider.value} `;
   updateGrid();
});

// Assuming you have a colorpicker function defined somewhere
colorValue();
// Get all elements with the class "small-grid"
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

function colorpicker() {
   const colorPicker = document.querySelector('#colorpicker');
   let colorValue = colorPicker.value;
   return colorValue;
}