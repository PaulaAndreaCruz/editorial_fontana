// Splash Cursor - Efecto de fluido interactivo con Canvas 2D
class SplashCursor {
  constructor() {
    this.canvas = document.createElement('canvas');
    this.setupCanvas();
    this.particles = [];
    this.pointerX = 0;
    this.pointerY = 0;
    this.isDown = false;
    this.setupEventListeners();
    this.animate();
  }

  setupCanvas() {
    this.canvas.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      z-index: 50;
      pointer-events: none;
      width: 100%;
      height: 100%;
      display: block;
    `;
    document.body.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d');
    this.resizeCanvas();
  }

  resizeCanvas() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  setupEventListeners() {
    document.addEventListener('mousemove', (e) => {
      this.pointerX = e.clientX;
      this.pointerY = e.clientY;
      
      if (this.isDown) {
        this.createSplash();
      }
    });

    document.addEventListener('mousedown', () => {
      this.isDown = true;
      this.createSplash();
    });

    document.addEventListener('mouseup', () => {
      this.isDown = false;
    });

    window.addEventListener('resize', () => this.resizeCanvas());
  }

  createSplash() {
    const particleCount = 8;
    for (let i = 0; i < particleCount; i++) {
      const angle = (Math.PI * 2 * i) / particleCount;
      const velocity = 4 + Math.random() * 4;
      
      this.particles.push({
        x: this.pointerX,
        y: this.pointerY,
        vx: Math.cos(angle) * velocity,
        vy: Math.sin(angle) * velocity,
        life: 1,
        radius: 2 + Math.random() * 3,
        color: this.getColor()
      });
    }
  }

  getColor() {
    const colors = [
      'rgba(0, 212, 255, ',      // Cyan
      'rgba(0, 153, 255, ',      // Blue
      'rgba(0, 255, 136, '       // Green
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  animate() {
    // Limpiar canvas con fade
    this.ctx.fillStyle = 'rgba(10, 14, 39, 0.1)';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Actualizar y dibujar partículas
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];

      // Movimiento
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.1; // Gravedad
      p.life -= 0.015;

      // Dibujar
      const alpha = p.life * 0.6;
      this.ctx.fillStyle = p.color + alpha + ')';
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      this.ctx.fill();

      // Remover si murió
      if (p.life <= 0) {
        this.particles.splice(i, 1);
      }
    }

    requestAnimationFrame(() => this.animate());
  }
}

// Inicializar
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new SplashCursor();
  });
} else {
  new SplashCursor();
}
