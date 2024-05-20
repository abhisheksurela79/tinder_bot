const passwordInput = document.querySelector("#input-password-container input");
const passwordVisibility = document.querySelector("#input-password-container img");


passwordVisibility.addEventListener("click", ()=> {
    const srcParts = passwordVisibility.src.split("/")
    const fileName = srcParts[srcParts.length -1]

    if (fileName === "show-password.svg") {
        passwordVisibility.src = passwordVisibility.src.replace("show-password.svg", "hide-password.svg");
        passwordVisibility.alt = "hide-password";
        passwordVisibility.title = "hide-password";
        passwordInput.type = "password";

          

    }
    else {
        passwordVisibility.src = passwordVisibility.src.replace("hide-password.svg", "show-password.svg");
        passwordVisibility.alt = "show-password";
        passwordVisibility.title = "show-password";
        passwordInput.type = "text";
    }
})
