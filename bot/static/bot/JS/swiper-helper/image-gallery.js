const mainBox = document.querySelector(".main-box");
const nextBtn = document.querySelector(".next-img");
const prevBtn = document.querySelector(".prev-img");
const cards = () => mainBox.querySelectorAll(".card");
const currentCardIndex = () => Number(mainBox.getAttribute("current-card"));
const currentImageIndex = () => Number(mainBox.getAttribute("current-image"));
const currentCard = () => Array.from(cards()[currentCardIndex()].querySelectorAll(".crush-img"));



nextBtn.addEventListener("click", () => {
    let translateX = -(currentImageIndex() * 100)
    const nextImg = currentCard()[currentImageIndex()];
    const previousImg = currentCard()[currentImageIndex()-1];

    if (currentImageIndex() < currentCard().length) {
        nextImg.style.transform = `translateX(${translateX}%)`;
        nextImg.style.visibility = `visible`;


        previousImg.style.visibility = `hidden`;
        mainBox.setAttribute("current-image", currentImageIndex()+1)

        if (currentImageIndex() === currentCard().length) {
            nextBtn.classList.add("hidden")
        }
    }
    prevBtn.classList.remove("hidden");

});


prevBtn.addEventListener("click", () => {
    let translateX = -((currentImageIndex()-1) * 100)+100;
    const nextImg = currentCard()[currentImageIndex()-2];
    const previousImg = currentCard()[currentImageIndex()-1];

    previousImg.style.transform = `translateX(${translateX}%)`;
    previousImg.style.visibility = `hidden`;

    nextImg.style.visibility = `visible`;
    mainBox.setAttribute("current-image", currentImageIndex()-1)

    prevBtn.classList.remove("hidden")
    nextBtn.classList.remove("hidden")

    if (currentImageIndex() === 1) {
        prevBtn.classList.add("hidden")
    }

});



