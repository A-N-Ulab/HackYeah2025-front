import React, { useState, useRef, useEffect } from 'react';
import './App.css';

function App() {
  const [cards, setCards] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);

  useEffect(() => {
    const handleGlobalMove = (e) => handleMove(e);
    const handleGlobalEnd = () => handleEnd();

    if (isDragging) {
      document.addEventListener('mousemove', handleGlobalMove);
      document.addEventListener('mouseup', handleGlobalEnd);
      document.addEventListener('touchmove', handleGlobalMove);
      document.addEventListener('touchend', handleGlobalEnd);
    }

    return () => {
      document.removeEventListener('mousemove', handleGlobalMove);
      document.removeEventListener('mouseup', handleGlobalEnd);
      document.removeEventListener('touchmove', handleGlobalMove);
      document.removeEventListener('touchend', handleGlobalEnd);
    };
  }, [isDragging, startPos, dragOffset]);

  const handleStart = (e) => {
    if (currentIndex >= cards.length) return;
    
    setIsDragging(true);
    const clientX = e.type === 'mousedown' ? e.clientX : e.touches[0].clientX;
    const clientY = e.type === 'mousedown' ? e.clientY : e.touches[0].clientY;
    setStartPos({ x: clientX, y: clientY });
    
    if (cardRef.current) {
      cardRef.current.style.transition = 'none';
    }
  };

  const handleMove = (e) => {
    if (!isDragging || currentIndex >= cards.length) return;
    
    e.preventDefault();
    const clientX = e.type === 'mousemove' ? e.clientX : e.touches[0].clientX;
    const clientY = e.type === 'mousemove' ? e.clientY : e.touches[0].clientY;
    
    const deltaX = clientX - startPos.x;
    const deltaY = clientY - startPos.y;
    
    setDragOffset({ x: deltaX, y: deltaY });
  };

  const handleEnd = () => {
    if (!isDragging || currentIndex >= cards.length) return;
    
    setIsDragging(false);
    
    if (cardRef.current) {
      cardRef.current.style.transition = 'transform 0.3s ease-out, opacity 0.3s ease-out';
    }
    
    const threshold = 100;
    
    if (Math.abs(dragOffset.x) > threshold) {
      // Card swiped away
      setTimeout(() => {
        setCurrentIndex(prev => prev + 1);
        setDragOffset({ x: 0, y: 0 });
      }, 300);
    } else {
      // Snap back
      setDragOffset({ x: 0, y: 0 });
    }
  };

  const handleAction = (action) => {
    if (currentIndex >= cards.length) return;
    
    if (cardRef.current) {
      cardRef.current.style.transition = 'transform 0.3s ease-out, opacity 0.3s ease-out';
    }
    
    const direction = action === 'like' ? 1 : -1;
    setDragOffset({ x: direction * 300, y: 0 });
    
    setTimeout(() => {
      setCurrentIndex(prev => prev + 1);
      setDragOffset({ x: 0, y: 0 });
    }, 300);
  };

  const resetStack = () => {
    setCurrentIndex(0);
    setDragOffset({ x: 0, y: 0 });
    setIsDragging(false);
  };

  const getCardStyle = (index) => {
    const isTopCard = index === currentIndex;
    const isVisible = index >= currentIndex && index < currentIndex + 3;
    
    if (!isVisible) return { display: 'none' };
    
    const scale = 1 - (index - currentIndex) * 0.05;
    const translateY = (index - currentIndex) * 10;
    const opacity = 1 - (index - currentIndex) * 0.2;
    
    let transform = `translate(0, ${translateY}px) scale(${scale})`;
    
    if (isTopCard && (isDragging || dragOffset.x !== 0 || dragOffset.y !== 0)) {
      const rotation = dragOffset.x * 0.1;
      transform = `translate(${dragOffset.x}px, ${dragOffset.y + translateY}px) rotate(${rotation}deg) scale(${scale})`;
    }
    
    return {
      transform,
      opacity: isTopCard && Math.abs(dragOffset.x) > 50 ? 0.8 : opacity,
      zIndex: cards.length - index,
    };
  };

  return (
    <div className="App">
      <div className="tinder-container">
        <h1>Swipe Numbers</h1>
        
        <div className="card-stack">
          {cards.map((number, index) => (
            <div
              key={number}
              ref={index === currentIndex ? cardRef : null}
              className="card"
              style={getCardStyle(index)}
              onMouseDown={index === currentIndex ? handleStart : undefined}
              onTouchStart={index === currentIndex ? handleStart : undefined}
            >
              <div className="card-content">
                <h2>{number}</h2>
                <p>Card Number {number}</p>
              </div>
              
              {index === currentIndex && Math.abs(dragOffset.x) > 50 && (
                <div className={`action-indicator ${dragOffset.x > 0 ? 'like' : 'dislike'}`}>
                  {dragOffset.x > 0 ? '❤️ LIKE' : '❌ NOPE'}
                </div>
              )}
            </div>
          ))}
          
          {currentIndex >= cards.length && (
            <div className="no-more-cards">
              <h2>No more cards!</h2>
              <button onClick={resetStack} className="reset-btn">
                Reset Stack
              </button>
            </div>
          )}
        </div>
        
        {currentIndex < cards.length && (
          <div className="action-buttons">
            <button 
              className="action-btn dislike-btn" 
              onClick={() => handleAction('dislike')}
            >
              ❌
            </button>
            <button 
              className="action-btn like-btn" 
              onClick={() => handleAction('like')}
            >
              ❤️
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
