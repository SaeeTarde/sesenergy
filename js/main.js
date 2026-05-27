// ── SAI ENERGY SERVICES — main.js ──

document.addEventListener("DOMContentLoaded", () => {
  // ── Hamburger Menu ──
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");
  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      navLinks.classList.toggle("open");
      hamburger.classList.toggle("active");
    });
    document.addEventListener("click", (e) => {
      if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove("open");
      }
    });
  }

  // ── Active nav link ──
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a").forEach((a) => {
    if (a.getAttribute("href") === currentPage) a.classList.add("active");
  });

  // ── Scroll-triggered fade-in ──
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add("visible"), i * 80);
        }
      });
    },
    { threshold: 0.12 },
  );

  document.querySelectorAll(".fade-in").forEach((el) => observer.observe(el));

  // ── Navbar scroll shadow ──
  const navbar = document.querySelector(".navbar");
  if (navbar) {
    window.addEventListener("scroll", () => {
      navbar.style.boxShadow =
        window.scrollY > 10
          ? "0 4px 24px rgba(0,0,0,0.12)"
          : "0 2px 20px rgba(0,0,0,0.08)";
    });
  }

  // contact submitting request
  const form = document.querySelector(".contact-form");

  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const data = new FormData(form);

      const response = await fetch(form.action, {
        method: "POST",
        body: data,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        document.getElementById("formSuccess").style.display = "block";
        form.reset();
      } else {
        alert("❌ Something went wrong. Please try again.");
      }
    });
  }

  // ── Animated counters ──
  const counters = document.querySelectorAll("[data-count]");
  const countObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !entry.target.dataset.done) {
          entry.target.dataset.done = true;
          const target = +entry.target.dataset.count;
          const suffix = entry.target.dataset.suffix || "";
          let current = 0;
          const step = Math.ceil(target / 60);
          const timer = setInterval(() => {
            current = Math.min(current + step, target);
            entry.target.textContent = current + suffix;
            if (current >= target) clearInterval(timer);
          }, 25);
        }
      });
    },
    { threshold: 0.5 },
  );
  counters.forEach((c) => countObserver.observe(c));
});
