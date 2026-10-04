/* =========================================================
   ULTRA MEDICAL CENTER - BASIC FRONTEND CONTENT PROTECTION
   ========================================================= */

document.addEventListener("contextmenu", function (e) {
  e.preventDefault();
});

document.addEventListener("keydown", function (e) {
  const key = e.key.toUpperCase();

  if (
    e.key === "F12" ||
    (e.ctrlKey && e.shiftKey && ["I", "J", "C"].includes(key)) ||
    (e.ctrlKey && ["U", "S", "P"].includes(key))
  ) {
    e.preventDefault();
    return false;
  }
});

/* Add the approved accreditation row consistently above every site footer. */
document.addEventListener("DOMContentLoaded", function () {
  /* Display the confirmed DoH approval number beneath the shared logo. */
  document.querySelectorAll(".brand").forEach(function (brand) {
    if (!brand.querySelector(".doh-approval")) {
      const approval = document.createElement("span");
      approval.className = "doh-approval";
      approval.textContent = "DoH Approval No.: DM81526";
      brand.appendChild(approval);
    }
  });

  /* Temporarily remove unfinished package entry points while keeping their files. */
  document.querySelectorAll(
    "a[href*='health-packages.html'], a[href*='package-']"
  ).forEach(function (element) {
    element.remove();
  });

  document.querySelectorAll(".package-card").forEach(function (element) {
    const packageSection = element.closest("section");
    if (packageSection && packageSection.children.length === 1) {
      packageSection.remove();
    } else {
      element.remove();
    }
  });

  /* Remove the Featured Doctors block as requested. */
  document.querySelectorAll("h2").forEach(function (heading) {
    if (heading.textContent.trim().toLowerCase() === "featured doctors") {
      const block = heading.closest(".doctors-block") || heading.closest("section");
      if (block) block.remove();
    }
  });

  /* Remove WhatsApp and live-chat controls everywhere. */
  document.querySelectorAll(
    ".whatsapp-link, .chat-card, .chat-fab, .chat-panel, " +
    "button[onclick*='openChat'], a[href*='wa.me'], a[href*='whatsapp']"
  ).forEach(function (element) {
    element.remove();
  });

  /* Keep booking and package content in the project, but disable its links. */
  function isDisabledTarget(link) {
    const href = (link && link.getAttribute("href") || "").toLowerCase();
    return (
      href.includes("registration.html") ||
      href.includes("health-packages.html") ||
      href.includes("package-") ||
      href.includes("coverage-assistance.html")
    );
  }

  function disableLink(link) {
    if (isDisabledTarget(link)) {
      link.setAttribute("href", "#");
      link.setAttribute("aria-disabled", "true");
      link.setAttribute("tabindex", "-1");
      link.classList.add("is-disabled-link");
    }
  }

  document.querySelectorAll("a[href]").forEach(function (link) {
    disableLink(link);
  });

  /* Also block links created later by search/filter scripts. */
  document.addEventListener("click", function (event) {
    const link = event.target.closest("a[href]");
    if (link && (link.getAttribute("aria-disabled") === "true" || isDisabledTarget(link))) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  }, true);

  /* Availability remains in the source but is disabled until approved. */
  document.querySelectorAll("select[name='availability']").forEach(function (select) {
    select.selectedIndex = 0;
    select.disabled = true;
    select.setAttribute("aria-disabled", "true");
    const field = select.closest(".filter-field");
    if (field) field.classList.add("is-disabled-control");
  });

  const updatedDoctorImages = {
    "assets/DR.%20AYMAN%20ABDELMAWGOUD.png": "assets/doctor-new-5.jpg",
    "assets/DR. AYMAN ABDELMAWGOUD.png": "assets/doctor-new-5.jpg",
    "assets/DR%20SUHA.png": "assets/doctor-new-31.jpeg",
    "assets/DR SUHA.png": "assets/doctor-new-31.jpeg"
  };

  document.querySelectorAll("img[src]").forEach(function (image) {
    const currentSource = image.getAttribute("src");
    if (updatedDoctorImages[currentSource]) {
      image.setAttribute("src", updatedDoctorImages[currentSource]);
    }
  });

  const dermatologyDoctorPhoto = document.querySelector(".doctor-pic");
  if (dermatologyDoctorPhoto && getComputedStyle(dermatologyDoctorPhoto).backgroundImage.includes("DR%20SUHA")) {
    dermatologyDoctorPhoto.style.backgroundImage = "url('assets/doctor-new-31.jpeg')";
  }

  const footer = document.querySelector(".site-footer");
  if (!footer || document.querySelector(".footer-accreditations")) return;

  const accreditationItems = [
    { image: "assets/badge-jawda-tasneef.jpeg", name: "JAWDA Data Certification", detail: "TASNEEF / DOH Standard" },
    { image: "assets/badge-iaf.jpeg", name: "ISO Certified Systems", detail: "ISO 9001:2015 · ISO 14001:2015 · ISO 45001:2018" },
    { image: "assets/badge-scc-cb-ms.jpeg", name: "SCC Accredited", detail: "CB-MS" }
  ];

  const section = document.createElement("section");
  section.className = "footer-accreditations";
  section.setAttribute("aria-label", "Accreditations");
  section.innerHTML = `
    <div class="container footer-accreditations__inner">
      <p class="footer-accreditations__title">ISO Certifications</p>
      ${accreditationItems.map(function (item) {
        return `
          <div class="footer-accreditation">
            <img class="footer-accreditation__certificate" src="${item.image}" alt="${item.name} certificate">
            <span class="footer-accreditation__text">
              <strong>${item.name}</strong>
              <span>${item.detail}</span>
            </span>
          </div>`;
      }).join("")}
    </div>`;

  footer.parentNode.insertBefore(section, footer);
});
