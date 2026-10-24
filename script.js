const heading = document.getElementById('jasper');
heading.innerHTML = heading.textContent
  .split('')
  .map((letter, index) => {
    const delay = index * 0; 
    return `<span style="animation-delay: ${delay}s">${letter}</span>`;
  })
  .join('');
