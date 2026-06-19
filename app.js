const concepts = [
  {
    id: "desktop",
    year: 1984,
    title: "Desktop GUI",
    author: "Screen-based HCI",
    role: "ancestor",
    lane: 2,
    color: "#657073",
    summary: "The default scene Tangible Bits argues against: digital information is mostly trapped as screen representations controlled by generic input devices."
  },
  {
    id: "ubicomp",
    year: 1991,
    title: "Ubiquitous Computing",
    author: "Weiser",
    role: "ancestor",
    lane: 0,
    color: "#00756f",
    summary: "Computation recedes into everyday environments as many networked devices distributed across rooms, work practices, and scales."
  },
  {
    id: "ar",
    year: 1993,
    title: "Augmented Reality",
    author: "Feiner, MacIntyre & Seligmann",
    role: "ancestor",
    lane: 4,
    color: "#2e6f9e",
    summary: "Digital annotations and guidance are spatially registered with the physical world, turning the world into an annotated display."
  },
  {
    id: "digitaldesk",
    year: 1993,
    title: "DigitalDesk",
    author: "Wellner",
    role: "ancestor",
    lane: 1,
    color: "#b65439",
    summary: "Paper, projected computation, cameras, and recognition combine into an augmented work surface that preserves familiar material practice."
  },
  {
    id: "media",
    year: 1993,
    title: "Media Spaces",
    author: "Bly, Harrison & Irwin",
    role: "ancestor",
    lane: 5,
    color: "#6c5aa8",
    summary: "Persistent audio, video, and computing links make remote collaboration feel like a shared social place with background awareness."
  },
  {
    id: "context",
    year: 1994,
    title: "Context-Aware Computing",
    author: "Schilit, Adams & Want",
    role: "ancestor",
    lane: 0,
    color: "#00756f",
    summary: "Systems adapt behavior to location, nearby people and objects, available devices, and changing situations."
  },
  {
    id: "graspable",
    year: 1995,
    title: "Graspable UIs",
    author: "Fitzmaurice, Ishii & Buxton",
    role: "ancestor",
    lane: 2,
    color: "#b65439",
    summary: "Physical handles provide space-multiplexed, two-handed, tactile control over virtual objects and functions."
  },
  {
    id: "calm",
    year: 1995,
    title: "Calm Technology",
    author: "Weiser & Brown",
    role: "ancestor",
    lane: 3,
    color: "#b98717",
    summary: "Good technology moves fluidly between peripheral awareness and focused attention without constant interruption."
  },
  {
    id: "wearable",
    year: 1997,
    title: "Wearable Computing",
    author: "Mann",
    role: "ancestor",
    lane: 5,
    color: "#2e6f9e",
    summary: "Computing becomes body-worn, continuous, hands-free, and aligned with the user's first-person perception and activity."
  },
  {
    id: "reactive",
    year: 1997,
    title: "Reactive Environments",
    author: "Cooperstock, Fels, Buxton & Smith",
    role: "ancestor",
    lane: 1,
    color: "#00756f",
    summary: "Architectural settings sense human activity and respond through media, computation, or physical effects."
  },
  {
    id: "tangible",
    year: 1997.5,
    title: "Tangible Bits",
    author: "Ishii & Ullmer",
    role: "anchor",
    lane: 2.85,
    color: "#00564f",
    summary: "The anchor paradigm: physical objects, surfaces, and ambient media become interfaces to digital information."
  },
  {
    id: "embodied",
    year: 2001,
    title: "Embodied Interaction",
    author: "Dourish",
    role: "descendant",
    lane: 2,
    color: "#6c5aa8",
    summary: "A theoretical vocabulary for why tangible systems work: meaning emerges through skilled bodily, social, and situated practice."
  },
  {
    id: "slow",
    year: 2001,
    title: "Slow Technology",
    author: "Hallnas & Redstrom",
    role: "descendant",
    lane: 4,
    color: "#b98717",
    summary: "Extends ambient and material concerns toward reflection, duration, meaningful pause, and technology lived with over time."
  }
];

const edges = [
  ["desktop", "ubicomp"],
  ["desktop", "digitaldesk"],
  ["desktop", "ar"],
  ["desktop", "media"],
  ["ubicomp", "calm"],
  ["ubicomp", "context"],
  ["ubicomp", "reactive"],
  ["digitaldesk", "tangible"],
  ["graspable", "tangible"],
  ["calm", "tangible"],
  ["context", "tangible"],
  ["reactive", "tangible"],
  ["ar", "tangible"],
  ["media", "tangible"],
  ["wearable", "tangible"],
  ["tangible", "embodied"],
  ["tangible", "slow"]
];

const svg = document.querySelector("#timeline");
const buttons = Array.from(document.querySelectorAll(".filter"));
const detailRole = document.querySelector("#detail-role");
const detailTitle = document.querySelector("#detail-title");
const detailMeta = document.querySelector("#detail-meta");
const detailCopy = document.querySelector("#detail-copy");

let selected = "tangible";
let activeFilter = "all";

const width = 1080;
const height = 680;
const margin = { top: 78, right: 46, bottom: 52, left: 46 };
const minYear = 1984;
const maxYear = 2001;
const laneHeight = 82;

function xFor(year) {
  return margin.left + ((year - minYear) / (maxYear - minYear)) * (width - margin.left - margin.right);
}

function yFor(lane) {
  return margin.top + lane * laneHeight;
}

function nodeById(id) {
  return concepts.find((concept) => concept.id === id);
}

function wrapText(text, maxChars) {
  const words = text.split(" ");
  const lines = [];
  let current = "";

  words.forEach((word) => {
    const next = current ? `${current} ${word}` : word;
    if (next.length > maxChars && current) {
      lines.push(current);
      current = word;
    } else {
      current = next;
    }
  });

  if (current) lines.push(current);
  return lines.slice(0, 3);
}

function makeSvg(tag, attributes = {}) {
  const element = document.createElementNS("http://www.w3.org/2000/svg", tag);
  Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, value));
  return element;
}

function visibleFor(concept) {
  return activeFilter === "all" || concept.role === activeFilter;
}

function relatedToSelected(id) {
  return id === selected || edges.some(([source, target]) => {
    return (source === selected && target === id) || (target === selected && source === id);
  });
}

function updateDetail(concept) {
  detailRole.textContent = concept.role === "anchor" ? "Anchor concept" : concept.role === "descendant" ? "Afterlife" : "Ancestor";
  detailTitle.textContent = concept.title;
  detailMeta.textContent = `${concept.author}, ${Math.floor(concept.year)}`;
  detailCopy.textContent = concept.summary;
}

function render() {
  svg.innerHTML = "";
  svg.setAttribute("viewBox", `0 0 ${width} ${height}`);

  const defs = makeSvg("defs");
  const marker = makeSvg("marker", {
    id: "arrow",
    viewBox: "0 0 10 10",
    refX: "9",
    refY: "5",
    markerWidth: "7",
    markerHeight: "7",
    orient: "auto-start-reverse"
  });
  marker.appendChild(makeSvg("path", { d: "M 0 0 L 10 5 L 0 10 z", fill: "#9d9283" }));
  defs.appendChild(marker);
  svg.appendChild(defs);

  const title = makeSvg("title", { id: "chart-title" });
  title.textContent = "Timeline of HCI ideas leading to Tangible Bits";
  const desc = makeSvg("desc", { id: "chart-desc" });
  desc.textContent = "Nodes are arranged by year and conceptual lane. Arrows show intellectual influence into Tangible Bits and later theoretical afterlives.";
  svg.append(title, desc);

  [1984, 1991, 1993, 1995, 1997, 2001].forEach((year) => {
    const x = xFor(year);
    svg.appendChild(makeSvg("line", {
      class: "axis",
      x1: x,
      y1: margin.top - 34,
      x2: x,
      y2: height - margin.bottom + 6
    }));
    const label = makeSvg("text", {
      class: "axis-label",
      x,
      y: margin.top - 46,
      "text-anchor": "middle"
    });
    label.textContent = year;
    svg.appendChild(label);
  });

  edges.forEach(([sourceId, targetId]) => {
    const source = nodeById(sourceId);
    const target = nodeById(targetId);
    const sourceVisible = visibleFor(source);
    const targetVisible = visibleFor(target);
    const dim = !(sourceVisible && targetVisible) || !(relatedToSelected(sourceId) || relatedToSelected(targetId));
    const sx = xFor(source.year) + 76;
    const sy = yFor(source.lane) + 28;
    const tx = xFor(target.year) - 82;
    const ty = yFor(target.lane) + 28;
    const mid = Math.max(30, Math.abs(tx - sx) * 0.45);

    svg.appendChild(makeSvg("path", {
      class: `edge${dim ? " dim" : ""}`,
      d: `M ${sx} ${sy} C ${sx + mid} ${sy}, ${tx - mid} ${ty}, ${tx} ${ty}`
    }));
  });

  concepts.forEach((concept) => {
    const group = makeSvg("g", {
      class: [
        "node",
        concept.id === selected ? "selected" : "",
        visibleFor(concept) && relatedToSelected(concept.id) ? "" : "dim"
      ].filter(Boolean).join(" "),
      tabindex: "0",
      role: "button",
      "aria-label": `${concept.title}, ${Math.floor(concept.year)}`
    });

    const x = xFor(concept.year) - 82;
    const y = yFor(concept.lane);
    group.appendChild(makeSvg("rect", {
      x,
      y,
      width: 164,
      height: 62,
      rx: 8,
      stroke: concept.color
    }));

    const lines = wrapText(concept.title, 18);
    lines.forEach((line, index) => {
      const text = makeSvg("text", {
        x: x + 12,
        y: y + 21 + index * 15
      });
      text.textContent = line;
      group.appendChild(text);
    });

    const year = makeSvg("text", {
      class: "year",
      x: x + 12,
      y: y + 52
    });
    year.textContent = Math.floor(concept.year);
    group.appendChild(year);

    group.addEventListener("click", () => {
      selected = concept.id;
      updateDetail(concept);
      render();
    });
    group.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        selected = concept.id;
        updateDetail(concept);
        render();
      }
    });

    svg.appendChild(group);
  });
}

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;
    buttons.forEach((item) => item.classList.toggle("active", item === button));
    render();
  });
});

updateDetail(nodeById(selected));
render();
