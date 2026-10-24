const heading = document.getElementById('jasper');
heading.innerHTML = heading.textContent
  .split('')
  .map(letter => `<span>${letter}</span>`)
  .join('');
