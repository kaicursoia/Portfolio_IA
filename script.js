const data = {
  formacion: [
    {
      year: "2025",
      title: "Especialización en IA aplicada a contenido digital",
      institution: "Programa profesional · Formación continua",
      description:
        "Enfoque en diseño de prompts, narrativa audiovisual y uso de avatares para comunicación de marca.",
    },
    {
      year: "2023",
      title: "Diplomado en Marketing Digital",
      institution: "Institución de formación online",
      description:
        "Estrategia de contenidos, funnels, analítica y optimización de campañas multicanal.",
    },
    {
      year: "2020",
      title: "Grado en Comunicación",
      institution: "Universidad",
      description:
        "Base sólida en comunicación estratégica, storytelling y gestión de proyectos.",
    },
  ],
  experiencia: [
    {
      year: "2024 - Actualidad",
      title: "Creador/a de soluciones audiovisuales con IA",
      institution: "Freelance / Proyectos para marcas",
      description:
        "Diseño de piezas explicativas con avatares, guiones y estructura narrativa orientada a conversión.",
    },
    {
      year: "2021 - 2024",
      title: "Especialista en contenido digital",
      institution: "Agencia de marketing",
      description:
        "Producción de contenido para campañas, coordinación con equipos creativos y mejora de engagement.",
    },
    ,
    {
      year: "2021 - 2024",
      title: "Especialista en contenido digital",
      institution: "Agencia de marketing",
      description:
        "Producción de contenido para campañas, coordinación con equipos creativos y mejora de engagement.",
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
