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
    { x: 150, y: 150, color: "#009E73", proximity: "Search for signal" },
    { x: 160, y: 160, color: "#56B4E9", proximity: "Search for signal" },
    { x: 170, y: 170, color: "#E69F00", proximity: "Search for signal" },
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
      const speed = 10;
  
      // Check if searcher is inside the triangle
      if (isInsideTriangle(searcher.x, searcher.y)) {
        // Check for proximity and update
        const distance = calculateDistance(searcher.x, searcher.y, victimX, victimY);
        const proximity = Math.round(distance / (mountainCanvas.width / 4 / 40));
        searcher.proximity = proximity <= 40 ? proximity : "Search for signal";
  
        if (searcher.proximity <= 5 && !searcher.isProbing && !searcher.isHelping) {
          searcher.isProbing = true;
          searcher.proximity = "Probing...!";
          setTimeout(() => {
            searcher.proximity = "Probe Strike!";
            searcher.x = victimX;
            searcher.y = victimY;
  
            setTimeout(() => {
              searcher.proximity = "Digging...";
              searchers.forEach((helper) => {
                if (helper !== searcher && !helper.isHelping) {
                  const distanceToSearcher = calculateDistance(helper.x, helper.y, searcher.x, searcher.y);
                  if (distanceToSearcher <= 10) {
                    helper.isHelping = true;
                    helper.proximity = "Helping";
                    helper.x += Math.sign(searcher.x - helper.x) * 10;
                    helper.y += Math.sign(searcher.y - helper.y) * 10;
                  }
                }
              });
  
            }, 3000);
  
          }, Math.floor(Math.random() * 5000) + 1000);
  
        } else if (!searcher.isProbing && !searcher.isHelping) {
          
          const randomPercentage = Math.random() * 100;
          const angleToVictim = Math.atan2(victimY - searcher.y, victimX - searcher.x);
          const arcAngle = (Math.PI / 180) * 45; // 45 degrees in radians
        
          if (randomPercentage < 85) {
            // Move in an arc towards the victim
            searcher.x += Math.cos(angleToVictim + arcAngle) * speed;
            searcher.y += Math.sin(angleToVictim + arcAngle) * speed;
          } else {
            // 15% chance of moving in the wrong direction
            searcher.x += Math.cos(angle + Math.PI) * speed;
            searcher.y += Math.sin(angle + Math.PI) * speed;
          }
        }
        

      } else {
        
        // Signal search
        // Move searcher towards the center of the base of the triangle
        const centerX = (100 + 500) / 2;
        const centerY = 350;
        const angleToCenter = Math.atan2(centerY - searcher.y, centerX - searcher.x);
  
        searcher.x += Math.cos(angleToCenter) * speed;
        searcher.y += Math.sin(angleToCenter) * speed;
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