sconst planets = document.querySelectorAll('.planet');
const planetNames = ['Mercury', 'Venus', 'Earth', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune'];
const distances = [100, 160, 220, 280, 360, 460, 560, 640]; // Orbital distances from the sun
const speeds = [0.1, 0.07, 0.05, 0.03, 0.01, 0.008, 0.005, 0.003]; // Orbital speeds of the planets

const planetInfo = document.getElementById('planet-info');

function displayPlanetName(index) {
  planetInfo.textContent = planetNames[index];
}

function hidePlanetName() {
  planetInfo.textContent = '';
}

planets.forEach((planet, index) => {
  planet.addEventListener('mouseover', () => {
    displayPlanetName(index);
  });

  planet.addEventListener('mouseout', () => {
    hidePlanetName();
  });
});

function orbitPlanets() {
  let time = performance.now();

  planets.forEach((planet, index) => {
    const distanceX = distances[index];
    const distanceY = distances[index] * 0.6; // Adjust the Y-axis distance for elliptical orbit
    const speed = speeds[index];
    const angle = (time * speed) / 20; // Convert time to seconds and adjust speed
    const x = distanceX * Math.cos(angle);
    const y = distanceY * Math.sin(angle);
    planet.style.transform = `translate(${x}px, ${y}px)`;
  });

  requestAnimationFrame(orbitPlanets);
}

orbitPlanets();

function createRandomStars() {
    const numberOfStars = 100; // Adjust the number of stars as desired
    const starsContainer = document.querySelector('.stars');
  
    for (let i = 0; i < numberOfStars; i++) {
      const star = document.createElement('div');
      star.className = 'star';
      star.style.left = `${Math.random() * 100}vw`;
      star.style.top = `${Math.random() * 100}vh`;
      star.style.width = `${Math.random() * 80}px`;
      star.style.height = star.style.width;
      // Generate a random twinkling time between 0.5s and 2s
      const twinklingTime = Math.random() * 5 + 0.5;
      star.style.animation = `twinkle ${twinklingTime}s infinite`;
  
      starsContainer.appendChild(star);
    }
  }
  
  createRandomStars();
  
