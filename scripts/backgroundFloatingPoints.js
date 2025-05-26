// canvas is a API(Application Programming Interface) for browsers, used through Javascript
// floating dots effect background

const canvas = document.getElementById("background"); // element canvas
const ctx = canvas.getContext("2d"); // get element with the context of the rederization

// adjusts the canvas element on the screen
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// object mouse with parameters
const mouse = {
  x: null,
  y: null,
  radius: 350 // circumference that the mouse occupies
};

// wait an event of mouse movement, thorugh event listener
canvas.addEventListener('mousemove', (event) => {
  mouse.x = event.x;
  mouse.y = event.y;
});

// add dots in canvas element in event listener 
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  init();
});

let particlesArray = [];

/* class to create the "particle" object through the "constructor" function, 
and functions necessary for its movement */
class Particle {
  // creates the "particle" object with its definitions
  constructor(x, y, size, speedX, speedY) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.speedX = speedX;
    this.speedY = speedY;
  }

  // function that updates the movement and behavior of the object "particle"
  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    // Check for canvas boundaries after moving, 
    if (this.x + this.size > canvas.width) {
      this.x = canvas.width - this.size;
      this.speedX *= -1;
    } else if (this.x - this.size < 0) {
      this.x = this.size;
      this.speedX *= -1;       
    }

    if (this.y + this.size > canvas.height) {
      this.y = canvas.height - this.size;
      this.speedY *= -1;
    } else if (this.y - this.size < 0) {
      this.y = this.size;
      this.speedY *= -1;
    }
      
    // pixel spacing effect according to mouse movement
    const dx = this.x - mouse.x; /* calculates the difference between the width area that the
    mouse occupies and the width area of ​​the canvas element */  
    const dy = this.y - mouse.y; /* calculate the difference between the y position mouse and 
    position y the canvas element */

    /* calculates the distance according to the x and y position of the mouse in relation
    to the pixel in area of ​​the canvas element, using the Pythagorean theorem */
    const distance = Math.sqrt(dx * dx + dy * dy); 

    /* if the distance is less than the mouse radius, then the pixel is within the mouse's
    actin area  */
    if (distance < mouse.radius) {
      const angle = Math.atan2(dy, dx); /* calculates the direction in which the particle
      should move, calculating the angle between the particle object and the mouse. */

      const force = (mouse.radius - distance) / mouse.radius; /* the force that must be 
      applied to the particles is inversely proportional to the distance */

      /* calculates the force values ​​that should be applied to the x and y positions of the particles and the direction in which they should move, using the force multiplied by
      the cosine and sine of the angle in relation to the mouse */
      // const min = 5;
      // const max = 10;
      const moveX = force * Math.cos(angle) * 10; //Math.floor(Math.random() * (min - max)) + min;
      const moveY = force * Math.sin(angle) * 10;

      this.x += moveX;
      this.y += moveY;
    }
  }
  // creates a pixel and draw the paticle object in element canvas
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); // set a circle for the particle
    ctx.fillStyle = 'rgba(0, 0, 130, 1)'; // colorize the pixel
    ctx.fill();
  }
}

// initialize the points
function init() {
  particlesArray = [];
  const numberParticles = 200;
  for (let i = 0; i < numberParticles; i++) {
    const size = Math.random() * 5; // length the pixel
    const x =  Math.random() * canvas.width;
    const y =  Math.random() * canvas.height;
    const speedX = (Math.random() - 0.5) * 5; // horizontal speed
    const speedY = (Math.random() - 0.5) * 5; // vertical speed

    // create a Particle object with its values
    particlesArray.push(new Particle(x, y, size, speedX, speedY));
  }
}

/* function responsible for the animation loop, calling update() and draw() for each particle
in the array */
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); /* clears the canvas before redrawing
  the particles */
  particlesArray.forEach((particle) => {
    particle.update();
    particle.draw();
  });
  requestAnimationFrame(animate); /* function required to create fluid animation synchronized
  with the screen's FPS */
}

init();
animate();
