let interactionCount = 0;
const countDisplay = document.getElementById('countNum');

function incrementInteraction() {
  interactionCount++;
  countDisplay.textContent = interactionCount;
  countDisplay.parentElement.classList.add('shake');
  setTimeout(() => {
    countDisplay.parentElement.classList.remove('shake');
  }, 300);
}

// Subtle scroll progress indicator
window.addEventListener('scroll', () => {
  const scrollProgress = document.getElementById('scrollProgress');
  const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = (window.scrollY / windowHeight) * 100;
  scrollProgress.style.width = scrolled + '%';
});

// Smooth reveal on scroll for sections
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

document.querySelectorAll('.section').forEach(section => {
  observer.observe(section);
});

// Subtle parallax effect on scroll
let lastScroll = 0;
window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  const sections = document.querySelectorAll('.section');
  
  sections.forEach((section, index) => {
    const speed = (index + 1) * 0.05;
    const yPos = -(currentScroll * speed);
    section.style.transform = `translateY(${yPos}px)`;
  });
  
  lastScroll = currentScroll;
});

// Interactive section click to reveal hidden messages
document.querySelectorAll('.section').forEach(section => {
  section.addEventListener('click', function(e) {
    const hiddenMessage = this.querySelector('.hidden-message');
    const clickHint = this.querySelector('.click-hint');
    
    if (hiddenMessage.classList.contains('revealed')) {
      hiddenMessage.classList.remove('revealed');
      clickHint.textContent = 'Click to reveal more...';
    } else {
      hiddenMessage.classList.add('revealed');
      clickHint.textContent = 'Click to hide...';
      incrementInteraction();
      createFloatingHeart(e.clientX, e.clientY);
    }
  });
});

// Interactive quote rotation on click
const quotes = [
  "In the tapestry of my life, Prachi is the thread that holds everything together—the constant that makes sense of all the chaos, the light that guides me through darkness, the love that makes every struggle worthwhile.",
  "She is the answer to questions I didn't know I was asking, the peace I didn't know I was seeking, and the love I always knew I deserved.",
  "With Prachi, every moment becomes a memory worth cherishing, every day becomes a gift worth celebrating, and every breath becomes a thank you to the universe.",
  "She is not just a part of my story—she is the reason my story is worth telling.",
  "In a world of uncertainty, Prachi is my constant. In a life of questions, she is my answer.",
  "Every sunrise reminds me of her warmth, every sunset reflects her beauty, and every star shines with the hope she brings to my life."
];

let currentQuoteIndex = 0;
const quoteBox = document.getElementById('quoteBox');
const quoteText = document.getElementById('quoteText');

quoteBox.addEventListener('click', function(e) {
  currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
  quoteText.style.opacity = '0';
  incrementInteraction();
  createFloatingHeart(e.clientX, e.clientY);
  
  setTimeout(() => {
    quoteText.textContent = quotes[currentQuoteIndex];
    quoteText.style.transition = 'opacity 0.5s ease';
    quoteText.style.opacity = '1';
  }, 300);
});

// Prachi name interaction
const prachiName = document.getElementById('prachiName');
let nameClickCount = 0;

prachiName.addEventListener('click', function(e) {
  nameClickCount++;
  incrementInteraction();
  
  if (nameClickCount === 3) {
    const originalText = this.textContent;
    this.textContent = '💙 Prachi 💙';
    createFloatingHeart(e.clientX, e.clientY);
    
    setTimeout(() => {
      this.textContent = originalText;
      nameClickCount = 0;
    }, 2000);
  }
  
  setTimeout(() => {
    if (nameClickCount < 3) nameClickCount = 0;
  }, 2000);
});

// Keyboard navigation
let currentReadingSection = -1;
document.addEventListener('keydown', function(e) {
  // Press 'r' to read next section
  if (e.key === 'r' || e.key === 'R') {
    const sections = document.querySelectorAll('.section p:first-of-type');
    currentReadingSection = (currentReadingSection + 1) % sections.length;
    
    sections[currentReadingSection].style.background = 'rgba(0, 124, 199, 0.08)';
    sections[currentReadingSection].style.padding = '10px';
    sections[currentReadingSection].style.borderRadius = '5px';
    sections[currentReadingSection].style.transition = 'all 0.5s ease';
    
    sections[currentReadingSection].scrollIntoView({ 
      behavior: 'smooth', 
      block: 'center' 
    });
    
    incrementInteraction();
    
    setTimeout(() => {
      sections[currentReadingSection].style.background = 'transparent';
      sections[currentReadingSection].style.padding = '0';
    }, 3000);
  }
  
  // Press 'h' for floating hearts
  if (e.key === 'h' || e.key === 'H') {
    for (let i = 0; i < 10; i++) {
      setTimeout(() => {
        const x = Math.random() * window.innerWidth;
        const y = window.innerHeight;
        createFloatingHeart(x, y);
      }, i * 100);
    }
    incrementInteraction();
  }
  
  // Press 'space' to show special message
  if (e.key === ' ') {
    e.preventDefault();
    showSpecialMessage();
    incrementInteraction();
  }
});

// Signature interaction
const signatureName = document.getElementById('signatureName');
signatureName.addEventListener('mouseenter', function() {
  this.style.letterSpacing = '3px';
  this.style.transition = 'letter-spacing 0.3s ease';
});

signatureName.addEventListener('mouseleave', function() {
  this.style.letterSpacing = '0px';
});

signatureName.addEventListener('click', function(e) {
  this.style.transform = 'rotate(360deg) scale(1.2)';
  incrementInteraction();
  createFloatingHeart(e.clientX, e.clientY);
  
  setTimeout(() => {
    this.style.transform = 'rotate(0deg) scale(1)';
  }, 600);
});

// Decoration dots interaction
document.querySelectorAll('.decoration span').forEach((dot, index) => {
  dot.addEventListener('click', function(e) {
    this.style.background = `hsl(${Math.random() * 360}, 70%, 60%)`;
    incrementInteraction();
    createFloatingHeart(e.clientX, e.clientY);
    
    setTimeout(() => {
      this.style.background = 'linear-gradient(135deg, #007CC7, #4DA8DA)';
    }, 1000);
  });
});

// Divider interaction
const headerDivider = document.getElementById('headerDivider');
headerDivider.addEventListener('click', function(e) {
  this.style.width = '200px';
  incrementInteraction();
  createFloatingHeart(e.clientX, e.clientY);
  
  setTimeout(() => {
    this.style.width = '60px';
  }, 1000);
});

// Floating heart creator
function createFloatingHeart(x, y) {
  const hearts = ['💙', '💗', '💖', '💝', '💘'];
  const heart = document.createElement('div');
  heart.classList.add('floating-heart');
  heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
  heart.style.left = x + 'px';
  heart.style.top = y + 'px';
  document.body.appendChild(heart);
  
  setTimeout(() => heart.remove(), 3000);
}

// Double click anywhere for hearts
document.body.addEventListener('dblclick', function(e) {
  for (let i = 0; i < 5; i++) {
    setTimeout(() => {
      createFloatingHeart(
        e.clientX + (Math.random() - 0.5) * 100,
        e.clientY + (Math.random() - 0.5) * 100
      );
    }, i * 50);
  }
  incrementInteraction();
});

// Special message function
function showSpecialMessage() {
  const message = document.createElement('div');
  message.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(0);
    background: rgba(255, 255, 255, 0.98);
    color: #007CC7;
    padding: 40px 60px;
    border-radius: 20px;
    font-size: 1.8rem;
    font-weight: 700;
    text-align: center;
    z-index: 10000;
    box-shadow: 0 10px 50px rgba(0, 124, 199, 0.4);
    border: 3px solid #4DA8DA;
    transition: all 0.5s ease;
  `;
  message.textContent = '🙏 Prachi, I\'m grateful to know you 🙏';
  document.body.appendChild(message);
  
  setTimeout(() => {
    message.style.transform = 'translate(-50%, -50%) scale(1)';
  }, 10);
  
  setTimeout(() => {
    message.style.transform = 'translate(-50%, -50%) scale(0)';
    setTimeout(() => message.remove(), 500);
  }, 3000);
}

// Count visits
let visitCount = localStorage.getItem('prachiVisitCount') || 0;
visitCount++;
localStorage.setItem('prachiVisitCount', visitCount);

console.log(`🎉 Visit #${visitCount}! Interactive features: Click sections, press 'R' for reading, 'H' for hearts, 'SPACE' for message!`);
