import React, { useEffect, useRef } from 'react';
import './SnakeBackground.css';

const SnakeBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Game variables
    const gridSize = 20;
    let snake = [
      { x: 10, y: 10 },
      { x: 9, y: 10 },
      { x: 8, y: 10 }
    ];
    let direction = { x: 1, y: 0 };
    let apples = [];
    let score = 0;
    
    // Create initial apples
    const createApple = () => {
      const maxX = Math.floor(canvas.width / gridSize);
      const maxY = Math.floor(canvas.height / gridSize);
      
      return {
        x: Math.floor(Math.random() * maxX),
        y: Math.floor(Math.random() * maxY),
        opacity: 1,
        scale: 1
      };
    };

    // Initialize apples
    for (let i = 0; i < 5; i++) {
      apples.push(createApple());
    }

    // AI pathfinding - find nearest apple
    const findNearestApple = (head) => {
      let nearest = null;
      let minDistance = Infinity;
      
      apples.forEach(apple => {
        const distance = Math.abs(head.x - apple.x) + Math.abs(head.y - apple.y);
        if (distance < minDistance) {
          minDistance = distance;
          nearest = apple;
        }
      });
      
      return nearest;
    };

    // Simple AI to move towards nearest apple
    const updateDirection = () => {
      const head = snake[0];
      const targetApple = findNearestApple(head);
      
      if (!targetApple) return;
      
      const dx = targetApple.x - head.x;
      const dy = targetApple.y - head.y;
      
      // Prevent moving into itself
      const oppositeDirection = { x: -direction.x, y: -direction.y };
      
      // Choose direction based on largest distance
      if (Math.abs(dx) > Math.abs(dy)) {
        if (dx > 0 && !(direction.x === -1 && direction.y === 0)) {
          direction = { x: 1, y: 0 };
        } else if (dx < 0 && !(direction.x === 1 && direction.y === 0)) {
          direction = { x: -1, y: 0 };
        }
      } else {
        if (dy > 0 && !(direction.x === 0 && direction.y === -1)) {
          direction = { x: 0, y: 1 };
        } else if (dy < 0 && !(direction.x === 0 && direction.y === 1)) {
          direction = { x: 0, y: -1 };
        }
      }
    };

    // Move snake
    const moveSnake = () => {
      const head = { ...snake[0] };
      head.x += direction.x;
      head.y += direction.y;
      
      // Wrap around screen edges
      const maxX = Math.floor(canvas.width / gridSize);
      const maxY = Math.floor(canvas.height / gridSize);
      
      if (head.x < 0) head.x = maxX - 1;
      if (head.x >= maxX) head.x = 0;
      if (head.y < 0) head.y = maxY - 1;
      if (head.y >= maxY) head.y = 0;
      
      snake.unshift(head);
      
      // Check for apple collision
      let ateApple = false;
      apples.forEach((apple, index) => {
        if (head.x === apple.x && head.y === apple.y) {
          apples.splice(index, 1);
          apples.push(createApple());
          ateApple = true;
          score++;
        }
      });
      
      if (!ateApple) {
        snake.pop();
      }
    };

    // Draw functions
    const drawSnake = () => {
      snake.forEach((segment, index) => {
        const opacity = index === 0 ? 1 : 0.7 - (index * 0.1);
        const hue = 180 + (index * 10); // Cyan to blue gradient
        
        ctx.fillStyle = `hsla(${hue}, 70%, 60%, ${Math.max(opacity, 0.3)})`;
        ctx.fillRect(
          segment.x * gridSize + 2,
          segment.y * gridSize + 2,
          gridSize - 4,
          gridSize - 4
        );
        
        // Add glow effect for head
        if (index === 0) {
          ctx.shadowColor = '#64ffda';
          ctx.shadowBlur = 10;
          ctx.fillStyle = '#64ffda';
          ctx.fillRect(
            segment.x * gridSize + 4,
            segment.y * gridSize + 4,
            gridSize - 8,
            gridSize - 8
          );
          ctx.shadowBlur = 0;
        }
      });
    };

    const drawApples = () => {
      apples.forEach(apple => {
        ctx.save();
        ctx.translate(
          apple.x * gridSize + gridSize / 2,
          apple.y * gridSize + gridSize / 2
        );
        
        // Pulsing effect
        const time = Date.now() * 0.005;
        const pulseScale = 1 + Math.sin(time + apple.x + apple.y) * 0.1;
        ctx.scale(pulseScale, pulseScale);
        
        // Draw apple with glow
        ctx.shadowColor = '#ff6b6b';
        ctx.shadowBlur = 8;
        ctx.fillStyle = '#ff6b6b';
        ctx.beginPath();
        ctx.arc(0, 0, gridSize / 3, 0, Math.PI * 2);
        ctx.fill();
        
        // Apple highlight
        ctx.shadowBlur = 0;
        ctx.fillStyle = '#ff8e8e';
        ctx.beginPath();
        ctx.arc(-2, -2, gridSize / 6, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.restore();
      });
    };

    // Animation loop
    let lastTime = 0;
    const gameLoop = (currentTime) => {
      if (currentTime - lastTime > 150) { // Control speed
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        updateDirection();
        moveSnake();
        drawApples();
        drawSnake();
        
        lastTime = currentTime;
      }
      
      requestAnimationFrame(gameLoop);
    };

    gameLoop(0);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="snake-background"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
        opacity: 0.3
      }}
    />
  );
};

export default SnakeBackground;