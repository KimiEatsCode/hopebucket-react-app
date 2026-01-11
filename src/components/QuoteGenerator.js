import { useState, useEffect } from 'react';
import { quotes } from '../data/quotes';

function QuoteGenerator() {
  const [quote, setQuote] = useState({ text: '', author: '', backgroundImage: '' });
  const [loading, setLoading] = useState(false);

  // Array of beautiful scenery images from Unsplash
  const sceneryImages = [
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop',
    'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1920&h=1080&fit=crop',
    'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=1920&h=1080&fit=crop',
    'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1920&h=1080&fit=crop',
    'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=1920&h=1080&fit=crop',
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&h=1080&fit=crop',
    'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=1920&h=1080&fit=crop',
    'https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=1920&h=1080&fit=crop',
    'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1920&h=1080&fit=crop',
    'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1920&h=1080&fit=crop',
    'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1920&h=1080&fit=crop',
    'https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?w=1920&h=1080&fit=crop',
    'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=1920&h=1080&fit=crop',
    'https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=1920&h=1080&fit=crop',
    'https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=1920&h=1080&fit=crop',
    'https://images.unsplash.com/photo-1465056836041-7f43ac27dcb5?w=1920&h=1080&fit=crop',
    'https://images.unsplash.com/photo-1506260408121-e353d10b87c7?w=1920&h=1080&fit=crop',
    'https://images.unsplash.com/photo-1511884642898-4c92249e20b6?w=1920&h=1080&fit=crop',
    'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=1920&h=1080&fit=crop',
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop'
  ];

  const fetchQuote = () => {
    setLoading(true);
    
    try {
      // Get a random quote
      const randomIndex = Math.floor(Math.random() * quotes.length);
      const randomQuote = quotes[randomIndex];
      
      // Get a random image
      const randomImageIndex = Math.floor(Math.random() * sceneryImages.length);
      const randomImageUrl = sceneryImages[randomImageIndex];
      
      const data = {
        ...randomQuote,
        backgroundImage: randomImageUrl
      };
      
      setQuote(data);
      
      // Update background image
      if (data.backgroundImage) {
        document.body.style.backgroundImage = `linear-gradient(135deg, rgba(102, 126, 234, 0.7) 0%, rgba(118, 75, 162, 0.7) 100%), url('${data.backgroundImage}')`;
        document.body.style.backgroundSize = 'cover';
        document.body.style.backgroundPosition = 'center';
        document.body.style.backgroundRepeat = 'no-repeat';
        document.body.style.backgroundAttachment = 'fixed';
      }
    } catch (error) {
      console.error('Error fetching quote:', error);
      setQuote({
        text: "The only way to do great work is to love what you do.",
        author: "Steve Jobs",
        backgroundImage: ''
      });
    } finally {
      setTimeout(() => setLoading(false), 300);
    }
  };

  useEffect(() => {
    fetchQuote();
    
    // Cleanup: reset background when component unmounts
    return () => {
      document.body.style.backgroundImage = '';
    };
  }, []);

  return (
    <div className="quote-generator-container">
      <div className="quote-header">
        <h1>✨ Daily Motivation ✨</h1>
        <p>Get inspired with a new quote</p>
      </div>
      
      <div className={`quote-card ${loading ? 'loading' : ''}`}>
        <div className="quote-content">
          <div className="quote-text">
            {quote.text}
          </div>
          <div className="quote-author">
            {quote.author}
          </div>
        </div>
        
        <div className="quote-button-container">
          <button 
            className="new-quote-btn"
            onClick={fetchQuote}
            disabled={loading}
          >
            {loading ? 'Loading...' : 'New Quote'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default QuoteGenerator;
