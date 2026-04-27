const data = {
  formacion: [
    {
      year: "2026",
      title: "Formación Superior en IA aplicada a la empresa",
      institution: "Fedeto",
      description:
        "Especialización en IA aplicada a empresas",
    },
    {
      year: "2022 - 2023",
      title: "Servicios Estéticos de Higiene, Depilación y Maquillaje",
      institution: "Escuela de Estética y Peluquería IDÓNEA",
      description:
        " Formación práctica en estética, depilación y maquillaje profesional.",
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
    { name: "Estrategia digital", level: 82 },
  ],
  softSkills: ["Liderazgo colaborativo", "Empatía", "Adaptabilidad", "Pensamiento crítico"],
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

renderTimeline("timeline-formacion", data.formacion);
renderTimeline("timeline-experiencia", data.experiencia);
renderSkills();
applyRevealAnimation();
