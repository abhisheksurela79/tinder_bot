const mainBox = container.querySelector(".main-box");

export const resetCards = () => {
  const cards = mainBox.querySelectorAll(".card");
  const crushContainer = mainBox.querySelectorAll(".crush-img-container");

  mainBox.setAttribute("current-card", 0);
  mainBox.setAttribute("current-image", 1);

  cards.forEach((card, index) => {
    // Restoring the card sorting to its previous 
    // state before applying 'position: absolute'.
    card.style.zIndex = cards.length - index;
    card.setAttribute("index", index);
  });

  crushContainer.forEach((imgContainer) => {
    // Stacking each card on top of the other.
    let images = imgContainer.querySelectorAll(".crush-img");

    images.forEach((image, index) => {
      if (index === 0) {
        image.style.visibility = "visible";
      } else {
        image.style.visibility = "hidden";
      }
      image.setAttribute("index", index);
    });
  });
};
