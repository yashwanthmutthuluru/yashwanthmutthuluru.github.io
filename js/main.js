const root = document.documentElement;
const themeToggle = document.getElementById("theme-toggle");
const menuToggle = document.getElementById("menu-toggle");
const siteNav = document.getElementById("site-nav");
const navLinks = document.querySelectorAll(".site-nav__link");
const revealElements = document.querySelectorAll("[data-reveal]");
const yearElement = document.getElementById("year");
const themeQuery = window.matchMedia("(prefers-color-scheme: dark)");
const themeStorageKey = "theme";
let savedTheme;

try {
  const preference = localStorage.getItem(themeStorageKey);
  if (preference === "light" || preference === "dark") savedTheme = preference;
} catch (error) {
  console.warn("Theme preference could not be read.", error);
}

const applyTheme = (theme) => {
  root.setAttribute("data-theme", theme);
  if (themeToggle) {
    themeToggle.setAttribute("aria-label", theme === "dark" ? "Switch to light theme" : "Switch to dark theme");
  }
};

applyTheme(savedTheme || (themeQuery.matches ? "dark" : "light"));

themeToggle?.addEventListener("click", () => {
  const nextTheme = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
  applyTheme(nextTheme);
  savedTheme = nextTheme;
  try {
    localStorage.setItem(themeStorageKey, nextTheme);
  } catch (error) {
    console.warn("Theme preference could not be saved.", error);
  }
});

themeQuery.addEventListener("change", (event) => {
  if (!savedTheme) {
    applyTheme(event.matches ? "dark" : "light");
  }
});

const closeMenu = () => {
  if (!siteNav || !menuToggle) return;
  siteNav.classList.remove("is-open");
  menuToggle.setAttribute("aria-expanded", "false");
};

const closeMenuAndRestoreFocus = () => {
  if (!siteNav?.classList.contains("is-open")) return;
  closeMenu();
  menuToggle?.focus();
};

menuToggle?.addEventListener("click", () => {
  if (!siteNav || !menuToggle) return;
  const isOpen = siteNav.classList.toggle("is-open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

document.addEventListener("click", (event) => {
  if (!siteNav || !menuToggle) return;
  const target = event.target;
  if (!(target instanceof Element)) return;
  if (!siteNav.contains(target) && !menuToggle.contains(target)) {
    closeMenu();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMenuAndRestoreFocus();
  }
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => closeMenu());
});

window.matchMedia("(max-width: 820px)").addEventListener("change", () => closeMenu());

if ("IntersectionObserver" in window && revealElements.length > 0) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -60px 0px" },
  );

  revealElements.forEach((element) => revealObserver.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("is-visible"));
}

const sections = document.querySelectorAll("section[id]");
if ("IntersectionObserver" in window && sections.length > 0) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const sectionId = entry.target.getAttribute("id");
        navLinks.forEach((link) => {
          const isCurrent = link.getAttribute("href") === `#${sectionId}`;
          link.classList.toggle("is-active", isCurrent);
          if (isCurrent) {
            link.setAttribute("aria-current", "location");
          } else {
            link.removeAttribute("aria-current");
          }
        });
      });
    },
    { threshold: 0, rootMargin: "-30% 0px -60% 0px" },
  );

  sections.forEach((section) => sectionObserver.observe(section));
}

if (yearElement) {
  yearElement.textContent = String(new Date().getFullYear());
}
