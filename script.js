const data = {
  formacion: [
    {
      year: "2026",
      title: "Formación Superior en IA aplicada a la empresa",
      institution: "Fedeto - Universidad de Nebrija (Titulación propia universitaria equivalente a 27 ECTS)",
      description:
        "Especialización en IA aplicada a empresas",
    },
    {
      year: "2017 - 2019",
      title: "FP superior en Animaciones 3D, Juegos y Entornos Interactivos",
      institution: "CEV - Escuela Superior de Formación Audiovisual",
      description: "Diseño y desarollo de videojuegos y entorno Interactivos.",
    }
  ],
 
  hardSkills: [
    { name: "Comunicación audiovisual", level: 92 },
    { name: "Narrativa y guion", level: 89 },
    { name: "Prompt engineering", level: 85 },
    { name: "Creación e implementación de chatbots", level: 82 },
    { name: "Benchmarking", level: 92 },
    { name: "Automatización", level: 89 },
    { name: "Creación y diseño de avatares", level: 100 },
    { name: "Estrategia digital", level: 90 },
  ],
  softSkills: ["Liderazgo colaborativo", "Empatía", "Adaptabilidad", "Pensamiento crítico", "Atención automatizada al cliente","Identificación de necesidades del usuario"],
};

const timelineTemplate = document.getElementById("timeline-item-template");

const renderTimeline = (containerId, items) => {
  const container = document.getElementById(containerId);
  const fragment = document.createDocumentFragment();

  items.forEach((item) => {
    const node = timelineTemplate.content.cloneNode(true);
    node.querySelector(".year").textContent = item.year;
    node.querySelector("h4").textContent = item.title;
    node.querySelector(".institution").textContent = item.institution;
    node.querySelector(".description").textContent = item.description;
    fragment.appendChild(node);
  });

  container.appendChild(fragment);
};

const renderSkills = () => {
  const hardContainer = document.getElementById("skills-hard");
  const softContainer = document.getElementById("skills-soft");

  data.hardSkills.forEach((skill) => {
    const item = document.createElement("article");
    item.className = "skill";
    item.innerHTML = `
      <div class="skill-head">
        <strong>${skill.name}</strong>
        <span>${skill.level}%</span>
      </div>
      <div class="bar"><span style="width:${skill.level}%"></span></div>
    `;
    hardContainer.appendChild(item);
  });

  data.softSkills.forEach((skill) => {
    const chip = document.createElement("span");
    chip.textContent = skill;
    softContainer.appendChild(chip);
  });
};

const applyRevealAnimation = () => {
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("show");
        obs.unobserve(entry.target);
      });
    },
    { threshold: 0.15 }
  );

  document.querySelectorAll(".reveal, .reveal-item").forEach((element) => observer.observe(element));
};

const initializeProjectDropdown = () => {
  const dropdown = document.getElementById("projectDropdown");
  const dropdownMenu = document.getElementById("projectDropdownMenu");
  const dropdownItems = document.querySelectorAll(".dropdown-item");

  if (!dropdown || !dropdownMenu) return;

  dropdown.addEventListener("click", (e) => {
    e.stopPropagation();
    dropdownMenu.classList.toggle("show");
    dropdown.classList.toggle("active");
  });

  dropdownItems.forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      
      // Actualizar el item activo
      dropdownItems.forEach((i) => i.classList.remove("active"));
      item.classList.add("active");
      
      // Actualizar el texto del botón
      const sectionName = item.dataset.section === "avatares" ? "Avatares" : "Chatbot de IA";
      dropdown.innerHTML = `<strong>${sectionName}</strong><svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor"><path d="M6 6l4 4 4-4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
      
      // Cerrar el dropdown
      dropdownMenu.classList.remove("show");
      dropdown.classList.remove("active");
      
      // Navegar al apartado correcto con scroll suave
      const targetId = item.dataset.section === "avatares" ? "avatares" : "chatbot";
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        setTimeout(() => {
          targetElement.scrollIntoView({ behavior: "smooth", block: "center" });
        }, 100);
      }
    });
  });

  // Cerrar al hacer click fuera
  document.addEventListener("click", (e) => {
    if (!dropdown.contains(e.target) && !dropdownMenu.contains(e.target)) {
      dropdownMenu.classList.remove("show");
      dropdown.classList.remove("active");
    }
  });
};

renderTimeline("timeline-formacion", data.formacion);
renderSkills();
applyRevealAnimation();
initializeProjectDropdown();
