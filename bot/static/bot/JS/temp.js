const mainBox = document.querySelector("#main-box");
const cards = () => mainBox.querySelectorAll(".card");
const crushLikeText = mainBox.querySelectorAll(".crush-like-text");
const crushDislikeText = mainBox.querySelectorAll(".crush-dislike-text");
const dislikeUserBtn = mainBox.querySelector("#dislike-user");
const likeUserBtn = mainBox.querySelector("#like-user");
const hammer = new Hammer(mainBox); // Creating a new Hammer object to handle touch gestures on the main container
let isPanning = false; // Flag to indicate whether a pan gesture is currently in progress
let currentCardIndex = () => Number(mainBox.getAttribute("current-card")); // Function to get the index of the current card being swiped

hammer.on("panstart", () => {
  // Event listener for the start of a pan gesture
  isPanning = true;
});

export const initializeSwipe = () => {
  hammer.on("pan", (event) => {
    if (!isPanning)
      return; // If no pan gesture is in progress, exit the function
    else if (!cards().length <= 0) {
      // Getting the horizontal and vertical displacement of the pan gesture
      let valueX = event.deltaX;
      let valueY = event.deltaY;
      // Calculating the rotation based on horizontal displacement
      let rotateX = event.deltaX / 25;

      if (valueX < -50) {
        likeUserBtn.classList.add("like-user-active");
        crushLikeText[currentCardIndex()].classList.add("opacity");
      } else if (valueX > 50) {
        dislikeUserBtn.classList.add("dislike-user-active");
        crushDislikeText[currentCardIndex()].classList.add("opacity");
      } else {
        likeUserBtn.classList.remove("like-user-active");
        dislikeUserBtn.classList.remove("dislike-user-active");
        crushLikeText[currentCardIndex()].classList.remove("opacity");
        crushDislikeText[currentCardIndex()].classList.remove("opacity");
      }

      // Applying the transform to the current card being swiped
      cards()[0].style.transform = `translate3d(${valueX}px, ${valueY}px, 0px) rotate(${rotateX}deg) scale(1, 1)`;
    }
  });
};

export const handleSwipeEnd = () => {
  // Event listener for the end of a pan gesture
  hammer.on("panend", async (event) => {
    // If no pan gesture is in progress, exit the function
    if (!isPanning) return;
    else if (!cards().length <= 0) {
      // Resetting the flag indicating a pan gesture is in progress
      isPanning = false;

      // Getting the horizontal displacement of the pan gesture
      let valueX = event.deltaX;
      let valueY = event.deltaY;
      // Calculating the rotation based on horizontal displacement
      let rotateX = event.deltaX / 25;

      // Handling actions based on the direction and magnitude of the horizontal displacement
      if (valueX < -50) {
        // Log message for a swipe indicating liking
        console.log("like swipe");

        // Call handleLike function which handles the like action
        await handleLike();

        // Removing active classes from buttons
        likeUserBtn.classList.remove("like-user-active");
        dislikeUserBtn.classList.remove("dislike-user-active");

        // Calculating the index of the next card if available, else wrapping back to the first card
        const index =
          currentCardIndex() + 1 > cards().length ? 0 : currentCardIndex() + 1;
        // Updating the index attribute of the main container to reflect the next card
        mainBox.setAttribute("current-card", index);
      } else if (valueX > 50) {
        // Log message for a swipe indicating disliking
        console.log("dislike swipe");

        // Call handleDislike function which handles the dislike action
        await handleDislike();

        // Removing active classes from buttons
        likeUserBtn.classList.remove("like-user-active");
        dislikeUserBtn.classList.remove("dislike-user-active");

        // crushLikeText[currentCardIndex].classList.remove("opacity");
        // crushDislikeText[currentCardIndex].classList.remove("opacity");

        // Calculating the index of the next card if available, else wrapping back to the first card
        const index =
          currentCardIndex() + 1 > cards().length ? 0 : currentCardIndex() + 1;
        // Updating the index attribute of the main container to reflect the next card
        mainBox.setAttribute("current-card", index);
      }

      // Resetting card appearance and opacity of associated texts
      if (!cards().length <= 0) {
        // Removing opacity adjustments for text indicating liking or disliking
        crushLikeText[currentCardIndex()].classList.remove("opacity");
        crushDislikeText[currentCardIndex()].classList.remove("opacity");
        // Resetting transform style of the current card to default
        cards()[0].style.transform =
          "translate3d(0px, 0px, 0px) rotate(0deg) scale(1, 1)";
      }
    }
  });
};

export const handleLike = async () => {
  return new Promise((resolve) => {
    likeUserBtn.click();
    resolve();
  });
};

likeUserBtn.addEventListener("click", async () => {
  if (!cards().length <= 0) {
    cards()[0].style.transform =
      "translate3d(-974px, -31px, 0px) rotate(-18.96deg) scale(1, 1)";

    setTimeout(async () => {
      cards()[0].remove();
    }, 150);
  }
});

export const handleDislike = async () => {
  return new Promise((resolve) => {
    dislikeUserBtn.click();
    resolve();
  });
};

dislikeUserBtn.addEventListener("click", async () => {
  if (!cards().length <= 0) {
    cards()[0].style.transform =
      "translate3d(1080px, 68px, 0px) rotate(43.2deg) scale(1, 1)";

    setTimeout(async () => {
      cards()[0].remove();
    }, 150);
  }
});
