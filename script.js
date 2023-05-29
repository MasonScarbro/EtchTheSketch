let rainbowBool = false;
let eraserBool = false;
let tradBool = false;
let colorPickerBool = false;
let numRows = 0;
let numColumns = 0
let selectedColor = 'rgb(0, 0, 0)';
for (numColumns = 0; numColumns < 16; numColumns++){
    const gridContainer = document.querySelector('.gridContainer');
    const gridColumn = document.createElement('div');
    gridColumn.classList.add('gridColumn')
    gridContainer.appendChild(gridColumn);

   
    for (numRows = 0; numRows < 16; numRows++){
        const row = document.createElement('div');
        row.classList.add('row');
        gridColumn.appendChild(row);
        
            row.addEventListener('mouseenter', () => {
                if (rainbowBool == true){
                    // if rainbow is clicked change the color every 10 miliseconds 
                    let intervalR = setInterval(() => {
                        row.style.backgroundColor = rainbowF();
                       
                     }, 10);
                     
                     row.addEventListener('mouseleave', () => {
                        clearInterval(intervalR);
                     })
                     // other wise traditional is black
                } else if (tradBool == true){
                    selectedColor = 'black';
                    row.style.backgroundColor = selectedColor;
                    // other wise eraser
                } else if (eraserBool == true){
                    selectedColor = 'white';
                    row.style.backgroundColor = selectedColor;
                    // other wise use the color selector
                } else if (colorPickerBool == true){
                    row.style.backgroundColor = selectedColor;
                }
                
             });
               
         
      
    }
   
}

class Picker {
    constructor(target, width, height) {
        // target is element i.e canvas in this case 
        this.target = target;
        this.width = width;
        this.height = height;
        this.target.width = width;
        this.target.height = height;
        // Get Context
        // Change to 3d if well... 3d 
        this.context = this.target.getContext("2d");
        // Circle Picker the little circle that shows up when you pick a color
        this.pickerCircle = { x: 10, y: 10, width: 7, height: 7 };

        this.listenForEvents();
    }
    draw() {
        this.build();
    }
    // builds the gradient 
    build() {
        // x pos, y pos, width, and height height set to zero due to nature of a color picker (not a nice pretty gradient)
        let clrGradient = this.context.createLinearGradient(0, 0, this.width, 0);

        //Color 'switches' when the color switches on the gradient just like a normal gradient but more values
        clrGradient.addColorStop(0, "rgb(255, 0, 0)");
        clrGradient.addColorStop(0.16, "rgb(255, 0, 255)");
        clrGradient.addColorStop(0.33, "rgb(0, 0, 255)");
        clrGradient.addColorStop(0.5, "rgb(0, 255, 255)");
        clrGradient.addColorStop(0.66, "rgb(0, 255, 0)");
        clrGradient.addColorStop(0.83, "rgb(255, 255, 0)");
        clrGradient.addColorStop(0.1, "rgb(255, 0, 0)");
        
        this.context.fillStyle = clrGradient;
        this.context.fillRect(0, 0, this.width, this.height);

        // circlemouse
        this.context.beginPath();
        this.context.arc(this.pickerCircle.x, this.pickerCircle.y, this.pickerCircle.width, 0, Math.PI * 2);
        this.context.strokeStyle = "black";
        this.context.stroke();
        this.context.closePath();
      
    }

    listenForEvents() {
        let isMouseDown = false;
        const onMouseDown = (e) => {
            // takes the x position of the global page and subtracts the offset in order to get the x position inside the box
            let currentX = e.clientX - this.target.offsetLeft;
            let currentY = e.clientY - this.target.offsetTop;
            if (currentY > this.pickerCircle.y && currentY < this.pickerCircle.y + this.pickerCircle.width
                && currentX > this.pickerCircle.x && currentX < this.pickerCircle.x + this.pickerCircle.width){
                    isMouseDown = true;
                } else {
                    this.pickerCircle.x = currentX;
                    this.pickerCircle.y = currentY;

                }
        }
        const onMouseMove = (e) => {
            if (isMouseDown) {
                let currentX = e.clientX - this.target.offsetLeft;
                let currentY = e.clientY - this.target.offsetTop;
                this.pickerCircle.x = currentX;
                this.pickerCircle.y = currentY;
            }
            
        }
        const onMouseUp = () => {
            isMouseDown = false;
        }

        this.target.addEventListener('mousedown', onMouseDown);
        this.target.addEventListener('mousemove', onMouseMove)
        this.target.addEventListener('mousemove', () =>
            this.onChangeCallback(this.getPickedColor()));
        document.addEventListener('mouseup', onMouseUp);
    }

    getPickedColor(){
        // variable to get the image data works like an array
        let imageData = this.context.getImageData(this.pickerCircle.x, this.pickerCircle.y, 1, 1);
        // works imageData/getImagedata works like array so red is index 0 and green index 1 and so forth
        return {r: imageData.data[0], g: imageData.data[1], b: imageData.data[2] };
    }

    onChange(callback){
       this.onChangeCallback = callback;
    }
}
let picker = new Picker(document.getElementById("colorPicker"), 250, 220);

setInterval(() => picker.draw(), 1);
// when You change a color it changes the variable so that it will now be whatever the circle is under
picker.onChange((color) => {
    selectedColor = `rgb(${color.r}, ${color.g}, ${color.b})`;
    colorPickerBool = true;
    rainbowBool = false;
    eraserBool = false;
    tradBool = false;
});

const traditional = document.querySelector('.blackOut');
traditional.addEventListener('click', () => {
    selectedColor = 'black';
    rainbowBool = false;
    eraserBool = false;
    tradBool = true;
   
});

const eraser = document.querySelector('.whiteOut');
eraser.addEventListener('click', () => {
    
    eraserBool = true;
    rainbowBool = false;
    tradBool = false;
    
});

function rainbowF(selectedColor){
    let r = Math.floor(Math.random() * 255);
    let g = Math.floor(Math.random() * 255);
    let b = Math.floor(Math.random() * 255);

   
    return selectedColor = 'rgb(' + r + ', ' + g + ', ' + b + ')';
}
const rainbow = document.querySelector('.randbow');
rainbow.addEventListener('click', () => {
    rainbowBool = true;
    tradBool = false;
    eraserBool = false;
    
});
rainbow.addEventListener('mousedown', () => {
    rainbow.style.backgroundColor = 'rgba(16, 194, 194, 0.836)';
});
rainbow.addEventListener('mouseup', () => {
    rainbow.style.backgroundColor = 'aqua';
});

traditional.addEventListener('mousedown', () => {
    traditional.style.backgroundColor = 'rgba(16, 194, 194, 0.836)';
});
traditional.addEventListener('mouseup', () => {
    traditional.style.backgroundColor = 'aqua';
});

eraser.addEventListener('mousedown', () => {
    eraser.style.backgroundColor = 'rgba(16, 194, 194, 0.836)';
});
eraser.addEventListener('mouseup', () => {
    eraser.style.backgroundColor = 'aqua';
});




