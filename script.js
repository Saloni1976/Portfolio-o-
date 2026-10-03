// 👉 The email your contact form sends to
var MY_EMAIL = "yourname@email.com";

// Turns on the scroll animations (content stays visible if JS ever fails)
document.documentElement.classList.add("js");

// 1. Friendly placeholder when an image file isn't added yet
document.querySelectorAll("img[data-missing]").forEach(function (img) {
  function showPlaceholder() {
    var box = document.createElement("div");
    box.className = "missing";
    box.innerHTML = img.dataset.missing;
    img.replaceWith(box);
  }
  img.addEventListener("error", showPlaceholder);
  if (img.complete && img.naturalWidth === 0) showPlaceholder();
});

// 2. Skill dots (reads data-l="1-5")
document.querySelectorAll(".skillbox i").forEach(function (el) {
  var level = +el.dataset.l;
  for (var n = 1; n <= 5; n++) {
    var dot = document.createElement("s");
    if (n <= level) dot.className = "on";
    el.appendChild(dot);
  }
});

// 3. Counting numbers in About
function countUp(el) {
  var target = +el.dataset.count, current = 0;
  var timer = setInterval(function () {
    current++;
    el.textContent = current;
    if (current >= target) clearInterval(timer);
  }, 350);
}

// 4. Fade-in sections on scroll
var observer = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (!entry.isIntersecting) return;
    entry.target.classList.add("in");
    entry.target.querySelectorAll("[data-count]").forEach(countUp);
    observer.unobserve(entry.target);
  });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach(function (el) { observer.observe(el); });

// 5. Project filter buttons
var chips = document.querySelectorAll(".chip");
chips.forEach(function (chip) {
  chip.onclick = function () {
    chips.forEach(function (c) { c.classList.remove("active"); });
    chip.classList.add("active");
    var f = chip.dataset.f;
    document.querySelectorAll(".project").forEach(function (p) {
      var show = f === "all" || p.dataset.cat.split(" ").indexOf(f) !== -1;
      p.classList.toggle("hide", !show);
    });
  };
});

// 6. Mobile menu
var menu = document.getElementById("menu");
document.getElementById("burger").onclick = function () { menu.classList.toggle("open"); };
menu.querySelectorAll("a").forEach(function (a) {
  a.onclick = function () { menu.classList.remove("open"); };
});

// 7. Highlight current section in the menu + back-to-top button
var sections = document.querySelectorAll("section[id]");
var navLinks = menu.querySelectorAll("a");
var topBtn = document.getElementById("top");
window.addEventListener("scroll", function () {
  var current = "";
  sections.forEach(function (s) {
    if (window.scrollY >= s.offsetTop - 140) current = s.id;
  });
  navLinks.forEach(function (a) {
    a.classList.toggle("active", a.getAttribute("href") === "#" + current);
  });
  topBtn.classList.toggle("show", window.scrollY > 600);
});
topBtn.onclick = function () { window.scrollTo({ top: 0, behavior: "smooth" }); };

// 8. Click a certificate to view it large
var lightbox = document.getElementById("lightbox");
var lightboxImg = lightbox.querySelector("img");
document.querySelectorAll(".cert").forEach(function (cert) {
  cert.onclick = function () {
    var img = cert.querySelector("img");
    if (!img) return;                       // no image added yet
    lightboxImg.src = img.src;
    lightbox.classList.add("open");
  };
});
lightbox.onclick = function () { lightbox.classList.remove("open"); };

// 9. Contact form opens the visitor's email app
document.getElementById("form").onsubmit = function (e) {
  e.preventDefault();
  var name = document.getElementById("fname").value;
  var email = document.getElementById("femail").value;
  var msg = document.getElementById("fmsg").value;
  location.href = "mailto:" + MY_EMAIL +
    "?subject=" + encodeURIComponent("Portfolio message from " + name) +
    "&body=" + encodeURIComponent(msg + "\n\nFrom: " + name + " (" + email + ")");
};