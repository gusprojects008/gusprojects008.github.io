const canvas = document.getElementById("background");

function isMobile() {
  return /Mobi|Android|iPhone|iPad|iPod|Windows Phone/i.test(navigator.userAgent);
}

if (!isMobile()) {
  const canvas = document.getElementById("background");
  canvas.style.width = "100%";
  canvas.style.height = "100%";
  canvas.style.position = "fixed";
  canvas.style.zIndex = 0;
  const ctx = canvas.getContext("2d");
  const particleStyle = 'rgba(0, 0, 130, 1)';

  const dpi = window.devicePixelRatio || 1;

  canvas.width = window.innerWidth * dpi;
  canvas.height = window.innerHeight * dpi;
  ctx.scale(dpi, dpi);

  const mouse = {
    x: null,
    y: null,
    radius: 350
  };

  canvas.addEventListener('mousemove', (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
  });

  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth * dpi;
    canvas.height = window.innerHeight * dpi;
    ctx.scale(dpi, dpi);
  });

  class Particle {
    constructor(x, y, size, speedX, speedY) {
      this.x = x;
      this.y = y;
      this.size = size;
      this.speedX = speedX;
      this.speedY = speedY;
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;

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

      if (mouse.x !== null && mouse.y !== null) {
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const distanceSq = dx * dx + dy * dy; 
        const radiusSq = mouse.radius * mouse.radius;

        if (distanceSq < radiusSq) {
          const distance = Math.sqrt(distanceSq);
          const angle = Math.atan2(dy, dx);
          const force = (mouse.radius - distance) / mouse.radius;
          this.x += force * Math.cos(angle) * 10;
          this.y += force * Math.sin(angle) * 10;
        }
      }
    }

    draw() {
      ctx.fillStyle = particleStyle;
      ctx.fillRect(this.x, this.y, this.size, this.size);
    }
  }

  function init() {
    particlesArray = [];
    const numberParticles = Math.floor((canvas.width * canvas.height) / 8000);
    for (let i = 0; i < numberParticles; i++) {
      const size = Math.random() * 10;
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const speedX = (Math.random() - 0.5) * 5;
      const speedY = (Math.random() - 0.5) * 5;

      particlesArray.push(new Particle(x, y, size, speedX, speedY));
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particlesArray.forEach((particle) => {
      particle.update();
      particle.draw();
    });
    requestAnimationFrame(animate);
  }

  init();
  animate();
} else {
  if (canvas) {
    canvas.remove();
  }
}

