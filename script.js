document.addEventListener("DOMContentLoaded", function () {

  function simulateLetsRide() {
      // Hide everything except the title
      document.querySelector(".options").style.display = "none";
      document.querySelector(".forecast").style.display = "none";
      document.querySelector(".actions").style.display = "none";
      document.querySelector(".forecast-choice").style.display = "none";

    
      // Show the avalanche gif
      avalancheGif.style.display = "block";
    
      setTimeout(() => {
        // Hide the gif and show the "Avalanche!" text
        avalancheGif.style.display = "none";
        avalancheText.style.display = "block";
    
        setTimeout(() => {
          // Hide the "Avalanche!" text and show the interactive mountain slope
          avalancheText.style.display = "none";
          showMountainCanvas();
        }, 1500);
      }, 1500);
    }
    

  function shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
    }
    
  const yesOptions = [
      "Yes! Of course! Let's anticipate the hazard",
      "Yes, that sounds worth checking",
      "Yes please read it aloud to me",
    ];
    
    const noOptions = [
      "Hell no, I don't plan on getting into any avalanches. Let's ride.",
      "Nah, it's a blue bird day nothing bad can happen. Let's ride.",
    ];
    
    // Generate random "yes" and "no" options
  const getRandomYes = () => {
      return yesOptions[Math.floor(Math.random() * yesOptions.length)];
    };
    
    let yes1 = getRandomYes();
    let yes2 = getRandomYes();
    
    // Make sure the two "yes" options are different
    while (yes1 === yes2) {
      yes2 = getRandomYes();
    }
    
    const no = noOptions[Math.floor(Math.random() * noOptions.length)];
    
    // Create buttons for the options
    const yesButton1 = document.createElement('button');
    yesButton1.textContent = yes1;
    yesButton1.onclick = () => {
      document.querySelector('.forecast').style.display = 'block';
    };
    
    const yesButton2 = document.createElement('button');
    yesButton2.textContent = yes2;
    yesButton2.onclick = () => {
      document.querySelector('.forecast').style.display = 'block';
    };

    const noButton = document.createElement('button');
    noButton.textContent = no;
      
  // Get the options div from the HTML
  const optionsDiv = document.querySelector('.options');

  // Add the buttons to an array and shuffle the array
  const buttons = [yesButton1, yesButton2, noButton];
  shuffleArray(buttons);

  // Add the shuffled buttons to the options div
  buttons.forEach((button) => {
      optionsDiv.appendChild(button);
    });
    
    const letsRideButton = document.getElementById("lets-ride");
    const avalancheGif = document.getElementById("avalanche-gif");
    const avalancheText = document.getElementById("avalanche-text");

  // Add this function to show the "Let's ride" button and hide the forecast-choice section
  function showLetsRide() {
      document.querySelector(".forecast-choice").style.display = "none";
      document.getElementById("lets-ride").style.display = "block";
    }
    
    // Update the existing yes button onclick functions
    yesButton1.onclick = () => {
      document.querySelector(".forecast").style.display = "block";
      showLetsRide();
    };
    
    yesButton2.onclick = () => {
      document.querySelector(".forecast").style.display = "block";
      showLetsRide();
    };
    
    // Update the no button onclick function
    noButton.onclick = () => {
      simulateLetsRide();
    };
      
  const mountainCanvas = document.getElementById("mountain-canvas");
  const ctx = mountainCanvas.getContext("2d");
  mountainCanvas.width = 600;
  mountainCanvas.height = 400;

  function drawMountain() {
      // Draw inverted mountain slope
      ctx.beginPath();
      ctx.moveTo(100, 350);
      ctx.lineTo(300, 50);
      ctx.lineTo(500, 350);
      ctx.closePath();
      ctx.stroke();
    
      // Draw cliffs
      ctx.beginPath();
      ctx.arc(200, 250, 30, 0, Math.PI, true);
      ctx.stroke();
    
      ctx.beginPath();
      ctx.arc(400, 250, 30, 0, Math.PI, true);
      ctx.stroke();
    
      // Draw trees
      ctx.beginPath();
      ctx.moveTo(150, 300);
      ctx.lineTo(160, 275);
      ctx.lineTo(170, 300);
      ctx.stroke();
    
      ctx.beginPath();
      ctx.moveTo(450, 300);
      ctx.lineTo(460, 275);
      ctx.lineTo(470, 300);
      ctx.stroke();

      // Draw wet loose avalanche slide path
      ctx.beginPath();
      ctx.moveTo(275, 100);
      ctx.lineTo(325, 250);
      ctx.stroke();

      // Draw roller balls
      ctx.beginPath();
      ctx.arc(290, 180, 5, 0, 2 * Math.PI);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(310, 220, 5, 0, 2 * Math.PI);
      ctx.stroke();

      // Draw skier
      if (proximityDisplay.textContent === "Probe strike") {
          ctx.fillStyle = "#ff0000";
          ctx.beginPath();
          ctx.moveTo(285, 240);
          ctx.lineTo(290, 250);
          ctx.lineTo(300, 245);
          ctx.lineTo(310, 250);
          ctx.lineTo(315, 240);
          ctx.lineTo(305, 235);
          ctx.closePath();
          ctx.fill();
        }
  }
    

    function showMountainCanvas() {
      mountainCanvas.style.display = "block";
      drawSearchers();
      drawMountain();
    }

    letsRideButton.addEventListener("click", () => {
      simulateLetsRide();
    });
    

  // Search phase
  const victimX = 275 + Math.random() * 50;
  const victimY = 200 + Math.random() * 100;

  function calculateDistance(x1, y1, x2, y2) {
      const dx = x1 - x2;
      const dy = y1 - y2;
      return Math.sqrt(dx * dx + dy * dy);
    }
    
    let lastUpdate = 0;
    
  // Create searchers array
  const searchers = [
    { x: 70, y: 340, color: "#009E73", proximity: "Search for signal" },
    { x: 80, y: 345, color: "#56B4E9", proximity: "Search for signal" },
    { x: 90, y: 350, color: "#E69F00", proximity: "Search for signal" },
  ];
  
  function isInsideTriangle(px, py) {
    const x1 = 100, y1 = 350, x2 = 300, y2 = 50, x3 = 500, y3 = 350;
  
    const denominator = ((y2 - y3) * (x1 - x3) + (x3 - x2) * (y1 - y3));
    const alpha = ((y2 - y3) * (px - x3) + (x3 - x2) * (py - y3)) / denominator;
    const beta = ((y3 - y1) * (px - x3) + (x1 - x3) * (py - y3)) / denominator;
    const gamma = 1.0 - alpha - beta;
  
    return alpha > 0 && beta > 0 && gamma > 0;
  }
  

  function drawSearchers() {
    searchers.forEach((searcher) => {
      ctx.fillStyle = searcher.color;
      ctx.beginPath();
      ctx.arc(searcher.x, searcher.y, 5, 0, 2 * Math.PI);
      ctx.fill();
  
      if (searcher.proximity !== "Search for signal") {
        ctx.font = "14px Arial";
        ctx.fillStyle = "black"; // Set fillStyle for the text
        ctx.fillText(searcher.proximity, searcher.x + 10, searcher.y - 10);
        ctx.fillStyle = searcher.color; // Reset fillStyle to the original value
      }
    });
  }
  

  function moveSearchers() {
    searchers.forEach((searcher) => {
      const angle = Math.random() * 2 * Math.PI;
      const speed = 4;
  
      // Check if searcher is inside the triangle
      if (isInsideTriangle(searcher.x, searcher.y)) {
        const distance = calculateDistance(searcher.x, searcher.y, victimX, victimY);
        const proximity = Math.round(distance / (mountainCanvas.width / 4 / 40));
        searcher.proximity = proximity <= 40 ? proximity : "Search for signal";
  
        // If proximity is within 5 and searcher is not probing
        if (proximity <= 5 && !searcher.isProbing) {
          searcher.x += Math.sign(victimX - searcher.x) * speed * 0.1;
          searcher.y += Math.sign(victimY - searcher.y) * speed * 0.1;
  
          if (Math.abs(victimX - searcher.x) < 0.1 && Math.abs(victimY - searcher.y) < 0.1) {
            searcher.isProbing = true;
            searcher.proximity = "Probing...!";
            setTimeout(() => {
              searcher.proximity = "Probe Strike!";
            }, Math.floor(Math.random() * 4000) + 1000);
          }
        } else if (!searcher.isProbing) {

        // Respond to the signal source (random walk)
        if (proximity <= 40) {
          const randomPercentage = Math.random() * 100;
          if (randomPercentage < 80) {
            searcher.x += Math.sign(victimX - searcher.x) * speed;
            searcher.y += Math.sign(victimY - searcher.y) * speed;
          } else if (randomPercentage < 95) {
            const arcAngle = Math.random() * Math.PI / 4;
            searcher.x += Math.cos(angle + arcAngle) * speed;
            searcher.y += Math.sin(angle + arcAngle) * speed;
          } else {
            searcher.x -= Math.sign(victimX - searcher.x) * speed;
            searcher.y -= Math.sign(victimY - searcher.y) * speed;
            setTimeout(() => {
              searcher.x += Math.sign(victimX - searcher.x) * speed;
              searcher.y += Math.sign(victimY - searcher.y) * speed;
            }, 1000);
          }
        }

        }
      } else {
        // Move searcher towards the triangle
        searcher.x += Math.cos(angle) * speed;
        searcher.y += Math.sin(angle) * speed;
      }
    });
  }


  function clearCanvas() {
    ctx.clearRect(0, 0, mountainCanvas.width, mountainCanvas.height);
  }

  // Start the searchers moving
  setInterval(() => {
    clearCanvas();
    moveSearchers();
    drawSearchers();
    drawMountain();
  }, 1000);

});