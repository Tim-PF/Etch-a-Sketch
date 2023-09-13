let gridSize = 16;
grid = gridSize * gridSize;

const mainContainer = document.querySelector(".sketch-container");
for(let i= 0; i<grid; i++) {
   
   const container = document.createElement('div');
   container.classList.add('small-grid');
   mainContainer.appendChild(container);

}