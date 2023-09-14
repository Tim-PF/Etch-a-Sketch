//Initial GridSize 

let gridSize = 10;
grid = gridSize * gridSize;
let flexBasisCalculator = 100 / gridSize;


let darken = false;
let lighten = false;
let rainbow = false;

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
   let newcolor = 0;
   if (darken == true) {
      const computedStyle = getComputedStyle(container);
      const backgroundColorComputed = computedStyle.backgroundColor;
      const adjustedRGB  = adjustBrightnessRGB(backgroundColorComputed , -0.1);
      container.style.backgroundColor = adjustedRGB;
      
   }
   else if (lighten == true) {
      const computedStyle = getComputedStyle(container);
      const backgroundColorComputed = computedStyle.backgroundColor;
      const adjustedRGB  = adjustBrightnessRGB(backgroundColorComputed , 0.1);
      container.style.backgroundColor = adjustedRGB;
      
   }
   else if (rainbow == true) {
      let rainbowRGB = adjustBrightness();
      console.log(rainbowRGB);
      container.style.backgroundColor = rainbowRGB;
   }
   else {
    let newColor = colorpicker(); 
    container.style.backgroundColor = newColor; // Change the background color of the element
 } })
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



function adjustBrightness() {
  randomNumberGenerator();


  


   const adjustedR = randomNumberGenerator()
   const adjustedG = randomNumberGenerator()
   const adjustedB = randomNumberGenerator()


   const clamp = value => Math.min(255, Math.max(0, value));

   const adjustedHex =
   '#' +
   clamp(adjustedR).toString(16).padStart(2, '0') +
   clamp(adjustedG).toString(16).padStart(2, '0') +
   clamp(adjustedB).toString(16).padStart(2, '0');

   return adjustedHex;
}


const lightenButton = document.querySelector('#lighten');
const darkenButton = document.querySelector('#darken');
const rainbowButton = document.querySelector('#rainbow-button')

darkenButton.addEventListener("click", () => {
   if (lighten || rainbow == true) {
      lighten, rainbow = false;
      lightenButton.classList.remove('activeButton');
      rainbowButton.classList.remove('activeButton');
    }
   darken = !darken;
   darkenColor();
})


lightenButton.addEventListener("click", () => {
   if (darken || rainbow == true) {
      darken, rainbow = false;
      darkenButton.classList.remove('activeButton');
      rainbowButton.classList.remove('activeButton');
    }
   lighten = !lighten;
   lightenColor();
})

rainbowButton.addEventListener("click", () => {
   if (darken || lighten == true) {
      darken, lighten = false;
      darkenButton.classList.remove('activeButton');
      lightenButton.classList.remove('activeButton');
    }
   rainbow = !rainbow;
   rainbowColor();
})


if (darken == true) {
   darkenButton.classList.add('activeButton')
   containers = document.querySelectorAll('small-grid');
   containers.forEach(container => {
      container.addEventListener('mouseover', () => {
         let colorDarken = container.style.backgroundColor ;
         console.log(colorDarken)
        let newDarkenColor = adjustBrightness(colorDarken , -0.1);
         container.style.backgroundColor = newDarkenColor;
      })
   })

}

function darkenColor() {
   if (darken == true) {
      darkenButton.classList.add('activeButton')
      containers = document.querySelectorAll('small-grid');
      containers.forEach(container => {
         container.addEventListener('mouseover', () => {
            let colorDarken = container.style.backgroundColor ;
            console.log(colorDarken)
           let newDarkenColor = adjustBrightness(colorDarken , -0.1);
            container.style.backgroundColor = newDarkenColor;
         })
      })
   }
   else {
      darkenButton.classList.remove('activeButton')
   }
};


function lightenColor() {
   if (lighten == true) {
      lightenButton.classList.add('activeButton')
   }
   else {
      lightenButton.classList.remove('activeButton')
   }
};

function rainbowColor() {
   if (rainbow == true) {
      rainbowButton.classList.add('activeButton')
   }
   else {
      rainbowButton.classList.remove('activeButton')
   }
};



function adjustBrightnessRGB(rgb, factor) {
   // Parse the RGB components
   const match = rgb.match(/(\d+),\s*(\d+),\s*(\d+)/);
   
   if (!match) {
       // Invalid RGB format, return null or handle the error
       return null;
   }

   // Extract the RGB components
   let [r, g, b] = match.slice(1).map(Number);

   // Ensure the factor is within the valid range (-1 to 1)
   if (factor > 1) factor = 1;
   if (factor < -1) factor = -1;

   // Adjust the RGB values
   r = Math.round(r + (factor * 255));
   g = Math.round(g + (factor * 255));
   b = Math.round(b + (factor * 255));

   // Clamp the values to the valid range (0 to 255)
   const clamp = value => Math.min(255, Math.max(0, value));
   r = clamp(r);
   g = clamp(g);
   b = clamp(b);

   // Construct the adjusted RGB color string
   return `rgb(${r}, ${g}, ${b})`;
}


function randomNumberGenerator() {
   const randomNumber = Math.floor(Math.random() * 256);
   return randomNumber;
}