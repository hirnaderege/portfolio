// script.js
let messageIndex = 0;

function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

function highlightLink(href, duration = 3000) {
  const link = document.querySelector(`a[href="${href}"]`);
  if (link) {
      link.classList.add('highlight-effect');
      setTimeout(() => {
          link.classList.remove('highlight-effect');
      }, duration);
  }
}

function startTyping() {
  const messages = [
      "Hi there! 👋",
      "I'm a web developer", 
      "I love creating beautiful things...",
      "Thanks for visiting my portfolio!",
      "Want to work together?"
  ];

  typeWriter(document.getElementById('my-text'), messages[messageIndex], 120);
  
  switch(messages[messageIndex]) {
      case "Want to work together?":
          highlightLink("webPlayer.html");
          break;
      case "I love creating beautiful things...":
          highlightLink("projects.html");
          break;
  }
  
  messageIndex = (messageIndex + 1) % messages.length;
}

// You can also add initialization code here
document.addEventListener('DOMContentLoaded', function() {
    console.log('Page loaded and JS file connected!');
    // Any code you want to run when page loads
});