import React, { useRef, useEffect } from 'react';

interface MeteorsProps {
  number?: number;
  className?: string;
}

export const Meteors: React.FC<MeteorsProps> = ({
  number = 26,
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    // Posição do cursor do mouse (sem gráficos na tela)
    const cursor = {
      x: -9999,
      y: -9999,
      isActive: false,
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      cursor.x = e.clientX - rect.left;
      cursor.y = e.clientY - rect.top;
      cursor.isActive = true;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const rect = canvas.getBoundingClientRect();
        cursor.x = e.touches[0].clientX - rect.left;
        cursor.y = e.touches[0].clientY - rect.top;
        cursor.isActive = true;
      }
    };

    const onMouseLeave = () => {
      cursor.isActive = false;
      cursor.x = -9999;
      cursor.y = -9999;
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('mouseleave', onMouseLeave);

    const onResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement.clientHeight || window.innerHeight;
    };

    window.addEventListener('resize', onResize);

    // Meteoro que surge em qualquer ponto da tela, anda um pouco e vai sumindo de leve
    class Meteor {
      x: number = 0;
      y: number = 0;
      vx: number = 0;
      vy: number = 0;
      baseVx: number = 0;
      baseVy: number = 0;
      tailLength: number = 90;
      size: number = 1.25;
      life: number = 0;
      maxLife: number = 2.2;
      alphaMax: number = 0.9;
      opacity: number = 0;

      constructor(prewarm = false) {
        this.reset(prewarm);
      }

      reset(prewarm = false) {
        // Surge espalhado organicamente por toda a extensão visível da tela
        this.x = Math.random() * (width + 120) - 20;
        this.y = Math.random() * (height * 0.92);

        this.tailLength = Math.random() * 35 + 75; // 75px a 110px de cauda com degradê suave
        this.size = Math.random() * 0.35 + 1.1; // 1.1px a 1.45px (fino e elegante)
        
        // Vida curta para andar apenas um pouco (1.6s a 2.6s de percurso total)
        this.maxLife = Math.random() * 1.0 + 1.6;
        this.alphaMax = Math.random() * 0.25 + 0.75;

        // Direção diagonal constante (caindo para esquerda e para baixo ~36°)
        const angleDeg = 36 + (Math.random() * 5 - 2.5);
        const angleRad = (angleDeg * Math.PI) / 180;
        const speed = Math.random() * 30 + 75; // 75 a 105 px por segundo (deslocamento ~160px a 240px)

        this.baseVx = -Math.cos(angleRad) * speed;
        this.baseVy = Math.sin(angleRad) * speed;
        this.vx = this.baseVx;
        this.vy = this.baseVy;

        if (prewarm) {
          // Pré-aquece idades aleatórias para já estarem ativos e desfasados na inicialização
          this.life = Math.random() * this.maxLife;
        } else {
          this.life = 0;
        }
      }

      update(dt: number) {
        this.life += dt;

        if (this.life >= this.maxLife) {
          this.reset(false);
          return;
        }

        // Curva senoidal perfeita: nasce do 0 invisível, atinge o brilho máximo no meio do percurso,
        // e vai sumindo de leve até desaparecer 100% no final
        const progress = this.life / this.maxLife; // 0 a 1
        const envelope = Math.sin(progress * Math.PI); // 0 -> 1 -> 0 perfeitamente contínuo
        this.opacity = this.alphaMax * envelope;

        // Repulsão suave e discreta ao redor do cursor (apenas se passar bem perto)
        if (cursor.isActive) {
          const dx = this.x - cursor.x;
          const dy = this.y - cursor.y;
          const distance = Math.hypot(dx, dy);

          const REPEL_RADIUS = 55; // Raio bem curto e preciso

          if (distance < REPEL_RADIUS && distance > 0.5) {
            const factor = Math.pow(1 - distance / REPEL_RADIUS, 1.4);
            const push = factor * 130 * dt;

            const ux = dx / distance;
            const uy = dy / distance;

            this.x += ux * push;
            this.y += uy * push;

            this.vx += ux * push * 0.8;
            this.vy += uy * push * 0.8;

            if (this.vy < 25) this.vy = 25; // Garante que nunca suba
          }
        }

        // Velocidade relaxa suavemente para a trajetória diagonal base
        this.vx += (this.baseVx - this.vx) * 0.05;
        this.vy += (this.baseVy - this.vy) * 0.05;

        this.x += this.vx * dt;
        this.y += this.vy * dt;

        // Se sair da tela, reinicia
        if (
          this.x < -120 ||
          this.x > width + 120 ||
          this.y > height + 120 ||
          this.y < -120
        ) {
          this.reset(false);
        }
      }

      draw() {
        if (this.opacity < 0.015) return;

        // Vetor que aponta para trás (na direção oposta ao movimento da cabeça)
        const speed = Math.hypot(this.vx, this.vy) || 1;
        const dirX = -this.vx / speed;
        const dirY = -this.vy / speed;

        const headX = this.x;
        const headY = this.y;
        const tailX = this.x + dirX * this.tailLength;
        const tailY = this.y + dirY * this.tailLength;

        // Leve degradê exatamente como na referência do MagicUI:
        // Cabeça brilhante branca -> azul gelo translúcido -> azul elétrico suave -> transparente na ponta
        const grad = ctx.createLinearGradient(headX, headY, tailX, tailY);
        grad.addColorStop(0, `rgba(255, 255, 255, ${this.opacity * 0.98})`);
        grad.addColorStop(0.18, `rgba(224, 242, 254, ${this.opacity * 0.75})`);
        grad.addColorStop(0.55, `rgba(56, 189, 248, ${this.opacity * 0.35})`);
        grad.addColorStop(0.85, `rgba(2, 132, 199, ${this.opacity * 0.08})`);
        grad.addColorStop(1, 'rgba(2, 132, 199, 0)');

        // Traço fino, aerodinâmico e retilíneo com degradê
        ctx.save();
        ctx.beginPath();
        ctx.strokeStyle = grad;
        ctx.lineWidth = this.size;
        ctx.lineCap = 'round';
        ctx.shadowColor = '#38BDF8';
        ctx.shadowBlur = 4;
        ctx.moveTo(headX, headY);
        ctx.lineTo(tailX, tailY);
        ctx.stroke();
        ctx.restore();

        // Ponto núcleo suave na ponta do meteoro
        ctx.save();
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.shadowColor = '#FFFFFF';
        ctx.shadowBlur = 4;
        ctx.beginPath();
        ctx.arc(headX, headY, 1.1, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    const meteors = Array.from({ length: number }, () => new Meteor(true));

    let lastTime = performance.now();

    function animate(currentTime: number) {
      const dt = Math.min((currentTime - lastTime) / 1000, 0.08);
      lastTime = currentTime;

      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < meteors.length; i++) {
        meteors[i].update(dt);
        meteors[i].draw();
      }

      animationFrameId = requestAnimationFrame(animate);
    }

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('resize', onResize);
    };
  }, [number]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none select-none ${className}`}
    />
  );
};

export default Meteors;
