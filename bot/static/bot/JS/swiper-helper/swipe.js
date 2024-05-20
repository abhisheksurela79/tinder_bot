const mainBox = document.querySelector(".main-box");
const cards = () => mainBox.querySelectorAll(".card");
const crushLikeText = mainBox.querySelectorAll(".crush-like-text");
const crushDislikeText = mainBox.querySelectorAll(".crush-dislike-text");
const rewindUserBtn = mainBox.querySelector(".rewind-user");
const dislikeUserBtn = mainBox.querySelector(".dislike-user");
const likeUserBtn = mainBox.querySelector(".like-user");
const hammer = new Hammer(mainBox); // Creating a new Hammer object to handle touch gestures on the main container
let currentCardIndex = () => Number(mainBox.getAttribute("current-card")); // Function to get the index of the current card being swiped
let currentImageIndex = () => Number(mainBox.getAttribute("current-image"));
const nextBtn = document.querySelector(".next-img");
const prevBtn = document.querySelector(".prev-img");


export const initializeSwipe = () => {
  hammer.on("pan", (event) => {
    // Getting the horizontal and vertical displacement of the pan gesture
    let valueX = event.deltaX;
    let valueY = event.deltaY;
    // Calculating the rotation based on horizontal displacement
    let rotateX = event.deltaX / 25;

    if (valueX < -50 && (currentCardIndex()+1) <= cards().length) {
      likeUserBtn.classList.add("like-user-active");
      crushLikeText[currentCardIndex()].classList.add("opacity");

    }
    else if (valueX > 50 && (currentCardIndex()+1) <= cards().length) {
      dislikeUserBtn.classList.add("dislike-user-active");
      crushDislikeText[currentCardIndex()].classList.add("opacity");
    }
    else {
      if ((currentCardIndex()+1) <= cards().length) {
        likeUserBtn.classList.remove("like-user-active");
        dislikeUserBtn.classList.remove("dislike-user-active");
        crushLikeText[currentCardIndex()].classList.remove("opacity");
        crushDislikeText[currentCardIndex()].classList.remove("opacity");
      }
    }

    if ((currentCardIndex()+1) <= cards().length) {
      // Applying the transform to the current card being swiped
      cards()[currentCardIndex()].style.transform = `translate3d(${valueX}px, ${valueY}px, 0px) rotate(${rotateX}deg) scale(1, 1)`;
    }
  });
};


export const handleSwipeEnd = () => {
  // Event listener for the end of a pan gesture
  hammer.on("panend", async (event) => {
    // Getting the horizontal displacement of the pan gesture
    let valueX = event.deltaX;

    if (valueX < -70) {
      // Call handleLike function which handles the like action
      await handleLike();

    }
    else if (valueX > 70) {
      // Call handleDislike function which handles the dislike action
      await handleDislike();
    } 
    else {
      crushLikeText[currentCardIndex()].classList.remove("opacity");
      crushDislikeText[currentCardIndex()].classList.remove("opacity");
      // Resetting transform style of the current card to default
      cards()[currentCardIndex()].style.transform =
        "translate3d(0px, 0px, 0px) rotate(0deg) scale(1, 1)";
    }
  });
};


export const handleLike = async () => {
  return new Promise((resolve) => {
    likeUserBtn.click();
    resolve();
  });
};

export const handleDislike = async () => {
  return new Promise((resolve) => {
    dislikeUserBtn.click();
    resolve();
  });
};


likeUserBtn.addEventListener("click", async () => {
  if ((currentCardIndex()+1) <= cards().length) {

    for (let index = currentImageIndex(); index >= 2; index--) {
      prevBtn.click();
    }

    cards()[currentCardIndex()].style.transform = "translate3d(-100vw, -31px, 0px) rotate(-18.96deg) scale(1, 1)";
    
    const currentCard = () => Array.from(cards()[currentCardIndex()].querySelectorAll(".crush-img"));


    likeUserBtn.classList.remove("like-user-active");
    crushLikeText[currentCardIndex()].classList.remove("opacity")

    mainBox.setAttribute("current-card", currentCardIndex()+1);
    mainBox.setAttribute("current-image", 1);


    nextBtn.classList.remove("hidden");
    prevBtn.classList.add("hidden");



  }
  
});

dislikeUserBtn.addEventListener("click", async () => {
  if ((currentCardIndex()+1)<= cards().length) {

    for (let index = currentImageIndex(); index >= 2; index--) {
      prevBtn.click();
    }

    cards()[currentCardIndex()].style.transform = "translate3d(100vw, 31px, 0px) rotate(18.96deg) scale(1, 1)";

    dislikeUserBtn.classList.remove("dislike-user-active");
    crushDislikeText[currentCardIndex()].classList.remove("opacity")

    mainBox.setAttribute("current-card", currentCardIndex()+1);



    mainBox.setAttribute("current-image", 1);
    nextBtn.classList.remove("hidden");
    prevBtn.classList.add("hidden");
  }
});

rewindUserBtn.addEventListener("click", async () => {
  if (currentCardIndex() > 0) {

    for (let index = currentImageIndex(); index >= 2; index--) {
      prevBtn.click();
    }

    cards()[currentCardIndex()-1].style.transform = "translate3d(0px, 0px, 0px) rotate(0deg) scale(1, 1)";
    mainBox.setAttribute("current-card", currentCardIndex()-1);
  }
});
