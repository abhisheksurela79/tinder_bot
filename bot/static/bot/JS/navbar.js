const toggleSiteMode = document.querySelector("#toggle-site-mode img");
const hamburger = document.querySelector("#hamburger");
const hamburgerItemFirst = document.querySelector("#hamburger #first");
const hamburgerItemSecond = document.querySelector("#hamburger #second");
const hamburgerItemThird = document.querySelector("#hamburger #third");
const navLinks = document.querySelector("#nav-container ul");

const darkColors = {
  "--bg-color": "rgb(22 31 43)",
  "--text-color": "#ffffff",
  "--btn-text-color": "white",
  "--container-border-color": "#ffffff26",
  "--swiper-base-container-bg-color": "#1f2c3d73",
};

const lightColor = {
  "--bg-color": "rgb(255, 255, 255)",
  "--text-color": "#000000",
  "--btn-text-color": "white",
  "--container-border-color": "#bdbcbc7d",
  "--swiper-base-container-bg-color": "#e7e7e766",
};

function changeTheme(colors) {
  document.documentElement.style.setProperty(
    "--bg-color",
    colors["--bg-color"]
  );
  document.documentElement.style.setProperty(
    "--text-color",
    colors["--text-color"]
  );
  document.documentElement.style.setProperty(
    "--btn-text-color",
    colors["--btn-text-color"]
  );
  document.documentElement.style.setProperty(
    "--container-border-color",
    colors["--container-border-color"]
  );
  document.documentElement.style.setProperty(
    "--swiper-base-container-bg-color",
    colors["--swiper-base-container-bg-color"]
  );
}

toggleSiteMode.addEventListener("click", () => {
  const srcParts = toggleSiteMode.src.split("/");
  const fileName = srcParts[srcParts.length - 1];

  if (fileName === "dark-mode.svg") {
    toggleSiteMode.src = toggleSiteMode.src.replace(
      "dark-mode.svg",
      "light-mode.svg"
    );
    toggleSiteMode.alt = "light-mode";
    toggleSiteMode.title = "light-mode";

    changeTheme(darkColors);
    localStorage.setItem("theme", "dark-mode");

    console.log(localStorage.getItem("theme"));
  } else {
    toggleSiteMode.src = toggleSiteMode.src.replace(
      "light-mode.svg",
      "dark-mode.svg"
    );
    toggleSiteMode.alt = "dark-mode";
    toggleSiteMode.title = "dark-mode";

    changeTheme(lightColor);
    localStorage.setItem("theme", "light-mode");

    console.log(localStorage.getItem("theme"));
  }
});

hamburger.addEventListener("click", () => {
  hamburgerItemFirst.classList.toggle("first-open");
  hamburgerItemSecond.classList.toggle("second-open");
  hamburgerItemThird.classList.toggle("third-open");
  navLinks.classList.toggle("nav-links-open");
});

function getTheme() {
  const lastTheme = localStorage.getItem("theme");

  if (lastTheme === "dark-mode") {
    toggleSiteMode.src = toggleSiteMode.src.replace(
      "dark-mode.svg",
      "light-mode.svg"
    );
    toggleSiteMode.alt = "light-mode";
    toggleSiteMode.title = "light-mode";

    changeTheme(darkColors);
  } else if (lastTheme === "light-mode") {
    toggleSiteMode.src = toggleSiteMode.src.replace(
      "light-mode.svg",
      "dark-mode.svg"
    );
    toggleSiteMode.alt = "dark-mode";
    toggleSiteMode.title = "dark-mode";

    changeTheme(lightColor);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  // Function to be executed when DOM is fully loaded
  getTheme();
});
