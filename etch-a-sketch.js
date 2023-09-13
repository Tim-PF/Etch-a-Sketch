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
   }
}
