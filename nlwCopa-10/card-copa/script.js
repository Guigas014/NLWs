let isExplorer = true

function changeCard() {
  const card = event.currentTarget 

  const bgImage = isExplorer ? "ignite" : "explorer"
  isExplorer = !isExplorer

  card.style.backgroundImage = `url(./assets/bg-${bgImage}.svg)`
}

