import React, { useEffect, useRef } from 'react';
import './PuzzleBackground.css';

const PuzzleBackground = () => {
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

    // Puzzle piece shapes
    const puzzlePieces = [];
    const numberOfPieces = 15;

    // Create puzzle pieces
    for (let i = 0; i < numberOfPieces; i++) {
      puzzlePieces.push({
        x: Math.random() * canvas.width,
        y: canvas.height + Math.random() * 200,
        size: 30 + Math.random() * 40,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 0.5,
        speed: 0.3 + Math.random() * 0.7,
        opacity: 0.1 + Math.random() * 0.3,
        color: `hsl(${170 + Math.random() * 40}, 70%, 60%)`,
        drift: Math.random() * 0.2 - 0.1
      });
    }

    // Draw puzzle piece shape
    const drawPuzzlePiece = (ctx, x, y, size, rotation, opacity, color) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.globalAlpha = opacity;
      
      // Create gradient for puzzle piece
      const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, size);
      gradient.addColorStop(0, color);
      gradient.addColorStop(1, 'transparent');
      
      ctx.fillStyle = gradient;
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      
      // Draw puzzle piece shape
      ctx.beginPath();
      
      // Main square body
      const pieceSize = size * 0.8;
      ctx.moveTo(-pieceSize/2, -pieceSize/2);
      ctx.lineTo(pieceSize/2, -pieceSize/2);
      
      // Top tab (outward)
      ctx.lineTo(pieceSize/2, -pieceSize/4);
      ctx.arc(pieceSize/2 + pieceSize/6, -pieceSize/4, pieceSize/6, Math.PI, 0, false);
      ctx.lineTo(pieceSize/2, 0);
      
      // Right side
      ctx.lineTo(pieceSize/2, pieceSize/2);
      ctx.lineTo(pieceSize/4, pieceSize/2);
      
      // Bottom tab (inward)
      ctx.arc(pieceSize/4, pieceSize/2 + pieceSize/6, pieceSize/6, -Math.PI/2, Math.PI/2, true);
      ctx.lineTo(-pieceSize/4, pieceSize/2);
      
      // Left side
      ctx.lineTo(-pieceSize/2, pieceSize/2);
      ctx.lineTo(-pieceSize/2, pieceSize/4);
      
      // Left tab (outward)
      ctx.arc(-pieceSize/2 - pieceSize/6, pieceSize/4, pieceSize/6, 0, Math.PI, false);
      ctx.lineTo(-pieceSize/2, -pieceSize/2);
      
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      
      ctx.restore();
    };

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      puzzlePieces.forEach(piece => {
        // Update position
        piece.y -= piece.speed;
        piece.x += piece.drift;
        piece.rotation += piece.rotationSpeed;
        
        // Calculate fade based on distance from bottom-right corner
        const distanceFromCorner = Math.sqrt(
          Math.pow(piece.x - canvas.width, 2) + 
          Math.pow(piece.y - canvas.height, 2)
        );
        const maxDistance = Math.sqrt(canvas.width * canvas.width + canvas.height * canvas.height);
        const fadeOpacity = Math.max(0, 1 - (distanceFromCorner / maxDistance)) * piece.opacity;
        
        // Reset piece if it goes off screen
        if (piece.y < -100 || piece.x < -100 || piece.x > canvas.width + 100) {
          piece.x = Math.random() * canvas.width;
          piece.y = canvas.height + Math.random() * 200;
          piece.rotation = Math.random() * 360;
        }
        
        // Draw puzzle piece
        drawPuzzlePiece(
          ctx,
          piece.x,
          piece.y,
          piece.size,
          piece.rotation,
          fadeOpacity,
          piece.color
        );
      });
      
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <div className="puzzle-background">
      <canvas ref={canvasRef} className="puzzle-canvas" />
      <div className="puzzle-overlay" />
    </div>
  );
};

export default PuzzleBackground;