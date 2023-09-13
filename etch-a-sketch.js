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


// const gridDiv = document.querySelectorAll('.small-grid');

// gridDiv.forEach(item => {
//    const flexBasisValue = `${flexBasisCalculator}%`;
   
//    item.style.flexBasis = flexBasisValue;
//});
