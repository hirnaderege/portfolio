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


function highlightLink(href, duration = 3500) {
  const link = document.querySelector(`a[href="${href}"]`);
  if (link) {
      link.classList.add('highlight-effect');
      setTimeout(() => { 
            link.classList.remove('highlight-effect'); }
        , duration);
  }
}

function startTyping() {
  const messages = [
      "hello!!",
      "i'm hirna derege", 
      "i love making cool things...",
      "thank you for visiting my portfolio!!",
      "want to work together?"
  ];

  typeWriter(document.getElementById('my-text'), messages[messageIndex], 120);
  
  switch(messages[messageIndex]) {
      case "want to work together?":
          highlightLink("contactME.html");
          break;
      case "i love making cool things...":
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
