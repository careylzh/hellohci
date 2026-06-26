const documents = [
  {
    id: "HCI_TANGIBLE_BITS_PARADIGMS_NOTES",
    file: "HCI_TANGIBLE_BITS_PARADIGMS_NOTES.md",
    title: "HCI Tangible Bits Paradigms Notes"
  },
  {
    id: "SYNTHESIS_SEED_PROMPT",
    file: "SYNTHESIS_SEED_PROMPT.md",
    title: "Synthesis Seed Prompt"
  },
  {
    id: "TODO",
    file: "TODO.md",
    title: "Todo"
  },
  {
    id: "TRENDS_IN_HCI_2021-2026",
    file: "TRENDS_IN_HCI_2021-2026.md",
    title: "Trends In HCI 2021 2026"
  },
  {
    id: "README",
    file: "README.md",
    title: "Readme"
  }
];

const concepts = [
  {
    id: "desktop",
    year: 1984,
    title: "Desktop GUI",
    author: "Screen-based HCI",
    role: "ancestor",
    lane: 2,
    color: "#d8dee9",
    summary: "The default scene Tangible Bits argues against: digital information is mostly trapped as screen representations controlled by generic input devices."
  },
  {
    id: "ubicomp",
    year: 1991,
    title: "Ubiquitous Computing",
    author: "Weiser",
    role: "ancestor",
    lane: 0,
    color: "#8fbcbb",
    summary: "Computation recedes into everyday environments as many networked devices distributed across rooms, work practices, and scales."
  },
  {
    id: "ar",
    year: 1993,
    title: "Augmented Reality",
    author: "Feiner, MacIntyre & Seligmann",
    role: "ancestor",
    lane: 4,
    color: "#81a1c1",
    summary: "Digital annotations and guidance are spatially registered with the physical world, turning the world into an annotated display."
  },
  {
    id: "digitaldesk",
    year: 1993,
    title: "DigitalDesk",
    author: "Wellner",
    role: "ancestor",
    lane: 1,
    color: "#d08770",
    summary: "Paper, projected computation, cameras, and recognition combine into an augmented work surface that preserves familiar material practice."
  },
  {
    id: "media",
    year: 1993,
    title: "Media Spaces",
    author: "Bly, Harrison & Irwin",
    role: "ancestor",
    lane: 5,
    color: "#b48ead",
    summary: "Persistent audio, video, and computing links make remote collaboration feel like a shared social place with background awareness."
  },
  {
    id: "context",
    year: 1994,
    title: "Context-Aware Computing",
    author: "Schilit, Adams & Want",
    role: "ancestor",
    lane: 0,
    color: "#8fbcbb",
    summary: "Systems adapt behavior to location, nearby people and objects, available devices, and changing situations."
  },
  {
    id: "graspable",
    year: 1995,
    title: "Graspable UIs",
    author: "Fitzmaurice, Ishii & Buxton",
    role: "ancestor",
    lane: 2,
    color: "#d08770",
    summary: "Physical handles provide space-multiplexed, two-handed, tactile control over virtual objects and functions."
  },
  {
    id: "calm",
    year: 1995,
    title: "Calm Technology",
    author: "Weiser & Brown",
    role: "ancestor",
    lane: 3,
    color: "#ebcb8b",
    summary: "Good technology moves fluidly between peripheral awareness and focused attention without constant interruption."
  },
  {
    id: "wearable",
    year: 1997,
    title: "Wearable Computing",
    author: "Mann",
    role: "ancestor",
    lane: 5,
    color: "#81a1c1",
    summary: "Computing becomes body-worn, continuous, hands-free, and aligned with the user's first-person perception and activity."
  },
  {
    id: "reactive",
    year: 1997,
    title: "Reactive Environments",
    author: "Cooperstock, Fels, Buxton & Smith",
    role: "ancestor",
    lane: 1,
    color: "#8fbcbb",
    summary: "Architectural settings sense human activity and respond through media, computation, or physical effects."
  },
  {
    id: "tangible",
    year: 1997.5,
    title: "Tangible Bits",
    author: "Ishii & Ullmer",
    role: "anchor",
    lane: 2.85,
    color: "#88c0d0",
    summary: "The anchor paradigm: physical objects, surfaces, and ambient media become interfaces to digital information."
  },
  {
    id: "embodied",
    year: 2001,
    title: "Embodied Interaction",
    author: "Dourish",
    role: "descendant",
    lane: 2,
    color: "#b48ead",
    summary: "A theoretical vocabulary for why tangible systems work: meaning emerges through skilled bodily, social, and situated practice."
  },
  {
    id: "slow",
    year: 2001,
    title: "Slow Technology",
    author: "Hallnas & Redstrom",
    role: "descendant",
    lane: 4,
    color: "#ebcb8b",
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

const conceptById = new Map(concepts.map((concept) => [concept.id, concept]));
const relatedIdsByConcept = new Map(concepts.map((concept) => [concept.id, new Set([concept.id])]));
const roleLabels = {
  anchor: "Anchor concept",
  descendant: "Afterlife",
  ancestor: "Ancestor"
};

edges.forEach(([sourceId, targetId]) => {
  relatedIdsByConcept.get(sourceId).add(targetId);
  relatedIdsByConcept.get(targetId).add(sourceId);
});

const svg = document.querySelector("#timeline");
const buttons = Array.from(document.querySelectorAll(".filter"));
const detailRole = document.querySelector("#detail-role");
const detailTitle = document.querySelector("#detail-title");
const detailMeta = document.querySelector("#detail-meta");
const detailCopy = document.querySelector("#detail-copy");
const detailImage = document.querySelector("#detail-image");
const detailCaption = document.querySelector("#detail-caption");

let selected = "tangible";
let activeFilter = "all";

const width = 1080;
const height = 680;
const nodeWidth = 164;
const nodeHeight = 62;
const nodeRadius = 8;
const margin = { top: 78, right: 104, bottom: 52, left: 104 };
const minYear = 1984;
const maxYear = 2001;
const laneHeight = 82;
const axisYears = [1984, 1991, 1993, 1995, 1997, 2001];
const conceptVisuals = {
  desktop: {
    caption: "A screen, pointer, and input device foreground the workstation as the center of interaction.",
    elements: [
      ["rect", { x: 66, y: 36, width: 140, height: 86, rx: 8, fill: "#3b4252", stroke: "#d8dee9", "stroke-width": 4 }],
      ["rect", { x: 90, y: 58, width: 92, height: 42, rx: 3, fill: "#4c566a" }],
      ["path", { d: "M136 122 L126 146 L176 146 L166 122", fill: "#d8dee9", opacity: 0.22 }],
      ["rect", { x: 226, y: 106, width: 42, height: 26, rx: 13, fill: "#eceff4", stroke: "#d8dee9", "stroke-width": 3 }],
      ["path", { d: "M240 64 L258 82 L249 86 L256 101 L248 105 L241 89 L233 96 Z", fill: "#d8dee9" }]
    ]
  },
  ubicomp: {
    caption: "Many small devices move computation from one desktop into the surrounding environment.",
    elements: [
      ["path", { d: "M62 128 L62 62 L160 28 L258 62 L258 128", fill: "none", stroke: "#8fbcbb", "stroke-width": 4 }],
      ["rect", { x: 88, y: 84, width: 36, height: 30, rx: 5, fill: "#eceff4", stroke: "#8fbcbb", "stroke-width": 3 }],
      ["rect", { x: 147, y: 60, width: 28, height: 44, rx: 6, fill: "#eceff4", stroke: "#8fbcbb", "stroke-width": 3 }],
      ["circle", { cx: 218, cy: 96, r: 16, fill: "#eceff4", stroke: "#8fbcbb", "stroke-width": 3 }],
      ["path", { d: "M106 80 C122 62, 198 62, 218 86", fill: "none", stroke: "#ebcb8b", "stroke-width": 3, "stroke-dasharray": "6 7" }]
    ]
  },
  ar: {
    caption: "Augmented reality overlays situated annotations onto a viewed physical scene.",
    elements: [
      ["rect", { x: 72, y: 42, width: 176, height: 98, rx: 14, fill: "#3b4252", stroke: "#81a1c1", "stroke-width": 4 }],
      ["path", { d: "M96 118 L142 76 L178 108 L204 82 L230 118 Z", fill: "#4c566a" }],
      ["rect", { x: 126, y: 54, width: 54, height: 22, rx: 5, fill: "#eceff4", stroke: "#81a1c1", "stroke-width": 3 }],
      ["path", { d: "M153 76 L174 100", fill: "none", stroke: "#81a1c1", "stroke-width": 3 }],
      ["circle", { cx: 218, cy: 66, r: 12, fill: "#eceff4", stroke: "#d08770", "stroke-width": 3 }]
    ]
  },
  digitaldesk: {
    caption: "Paper, projection, and sensing turn an ordinary desk into a mixed physical-digital surface.",
    elements: [
      ["path", { d: "M54 124 L266 124 L226 152 L92 152 Z", fill: "#3b4252", stroke: "#d08770", "stroke-width": 4 }],
      ["rect", { x: 94, y: 82, width: 54, height: 38, rx: 3, fill: "#eceff4", stroke: "#d8dee9", "stroke-width": 2 }],
      ["rect", { x: 158, y: 74, width: 62, height: 46, rx: 3, fill: "#3b4252", stroke: "#d8dee9", "stroke-width": 2 }],
      ["path", { d: "M132 28 L190 28 L220 118 L100 118 Z", fill: "#ebcb8b", opacity: 0.18 }],
      ["circle", { cx: 160, cy: 32, r: 14, fill: "#eceff4", stroke: "#d08770", "stroke-width": 3 }]
    ]
  },
  media: {
    caption: "Distributed screens and live channels make remote rooms feel socially present.",
    elements: [
      ["rect", { x: 56, y: 54, width: 82, height: 62, rx: 8, fill: "#eceff4", stroke: "#b48ead", "stroke-width": 4 }],
      ["rect", { x: 182, y: 54, width: 82, height: 62, rx: 8, fill: "#eceff4", stroke: "#b48ead", "stroke-width": 4 }],
      ["circle", { cx: 97, cy: 78, r: 11, fill: "#4c566a" }],
      ["path", { d: "M78 104 C84 90, 110 90, 116 104", fill: "none", stroke: "#d8dee9", "stroke-width": 3 }],
      ["circle", { cx: 223, cy: 78, r: 11, fill: "#4c566a" }],
      ["path", { d: "M204 104 C210 90, 236 90, 242 104", fill: "none", stroke: "#d8dee9", "stroke-width": 3 }],
      ["path", { d: "M140 84 L180 84", fill: "none", stroke: "#ebcb8b", "stroke-width": 4, "stroke-dasharray": "5 7" }]
    ]
  },
  context: {
    caption: "Location, nearby people, and available devices become inputs to system behavior.",
    elements: [
      ["path", { d: "M160 40 C136 40, 118 58, 118 82 C118 116, 160 146, 160 146 C160 146, 202 116, 202 82 C202 58, 184 40, 160 40 Z", fill: "#eceff4", stroke: "#8fbcbb", "stroke-width": 4 }],
      ["circle", { cx: 160, cy: 82, r: 18, fill: "#4c566a", stroke: "#8fbcbb", "stroke-width": 3 }],
      ["circle", { cx: 86, cy: 64, r: 14, fill: "#eceff4", stroke: "#d08770", "stroke-width": 3 }],
      ["rect", { x: 220, y: 104, width: 34, height: 42, rx: 6, fill: "#eceff4", stroke: "#81a1c1", "stroke-width": 3 }],
      ["path", { d: "M100 70 L142 80 M202 94 L220 116", fill: "none", stroke: "#ebcb8b", "stroke-width": 3, "stroke-dasharray": "5 6" }]
    ]
  },
  graspable: {
    caption: "Physical blocks become handles for manipulating digital objects and operations.",
    elements: [
      ["path", { d: "M60 128 L260 128", fill: "none", stroke: "#4c566a", "stroke-width": 6 }],
      ["rect", { x: 82, y: 86, width: 48, height: 40, rx: 6, fill: "#eceff4", stroke: "#d08770", "stroke-width": 4 }],
      ["rect", { x: 142, y: 62, width: 52, height: 64, rx: 6, fill: "#eceff4", stroke: "#d08770", "stroke-width": 4 }],
      ["rect", { x: 206, y: 92, width: 36, height: 34, rx: 6, fill: "#eceff4", stroke: "#d08770", "stroke-width": 4 }],
      ["path", { d: "M106 86 C118 58, 150 46, 168 62 M194 94 C204 76, 220 72, 234 92", fill: "none", stroke: "#d8dee9", "stroke-width": 3 }]
    ]
  },
  calm: {
    caption: "Ambient signals stay peripheral until attention needs to move toward them.",
    elements: [
      ["circle", { cx: 160, cy: 90, r: 50, fill: "#ebcb8b", opacity: 0.12 }],
      ["circle", { cx: 160, cy: 90, r: 30, fill: "#ebcb8b", opacity: 0.18 }],
      ["rect", { x: 136, y: 66, width: 48, height: 48, rx: 10, fill: "#eceff4", stroke: "#ebcb8b", "stroke-width": 4 }],
      ["path", { d: "M92 90 L118 90 M202 90 L228 90 M160 22 L160 48 M160 132 L160 158", fill: "none", stroke: "#ebcb8b", "stroke-width": 3, "stroke-linecap": "round" }]
    ]
  },
  wearable: {
    caption: "Computation travels with the body and aligns with first-person perception.",
    elements: [
      ["circle", { cx: 160, cy: 54, r: 22, fill: "#eceff4", stroke: "#81a1c1", "stroke-width": 4 }],
      ["path", { d: "M122 142 C128 102, 142 78, 160 78 C178 78, 192 102, 198 142", fill: "none", stroke: "#81a1c1", "stroke-width": 5 }],
      ["rect", { x: 134, y: 48, width: 20, height: 12, rx: 5, fill: "#eceff4", stroke: "#d8dee9", "stroke-width": 2 }],
      ["rect", { x: 166, y: 48, width: 20, height: 12, rx: 5, fill: "#eceff4", stroke: "#d8dee9", "stroke-width": 2 }],
      ["path", { d: "M154 54 L166 54 M186 54 C216 60, 232 76, 244 104", fill: "none", stroke: "#ebcb8b", "stroke-width": 3, "stroke-dasharray": "5 7" }]
    ]
  },
  reactive: {
    caption: "The room senses activity and responds through light, media, or physical effects.",
    elements: [
      ["path", { d: "M72 136 L72 58 L248 58 L248 136", fill: "none", stroke: "#8fbcbb", "stroke-width": 4 }],
      ["circle", { cx: 104, cy: 82, r: 10, fill: "#eceff4", stroke: "#8fbcbb", "stroke-width": 3 }],
      ["circle", { cx: 216, cy: 82, r: 10, fill: "#eceff4", stroke: "#8fbcbb", "stroke-width": 3 }],
      ["path", { d: "M126 132 C130 110, 146 96, 160 96 C174 96, 190 110, 194 132", fill: "none", stroke: "#d8dee9", "stroke-width": 4 }],
      ["path", { d: "M104 94 C124 112, 138 120, 160 120 C182 120, 196 112, 216 94", fill: "none", stroke: "#ebcb8b", "stroke-width": 3, "stroke-dasharray": "6 6" }]
    ]
  },
  tangible: {
    caption: "Objects, surfaces, and ambient media couple digital information to physical materials.",
    elements: [
      ["rect", { x: 64, y: 98, width: 192, height: 44, rx: 8, fill: "#eceff4", stroke: "#88c0d0", "stroke-width": 4 }],
      ["circle", { cx: 104, cy: 92, r: 24, fill: "#eceff4", stroke: "#d08770", "stroke-width": 4 }],
      ["rect", { x: 146, y: 58, width: 48, height: 48, rx: 8, fill: "#eceff4", stroke: "#88c0d0", "stroke-width": 4 }],
      ["path", { d: "M214 52 L246 86 L214 120 L182 86 Z", fill: "#eceff4", stroke: "#ebcb8b", "stroke-width": 4 }],
      ["path", { d: "M104 116 C132 138, 190 138, 224 116", fill: "none", stroke: "#d8dee9", "stroke-width": 3, "stroke-dasharray": "5 7" }]
    ]
  },
  embodied: {
    caption: "Meaning emerges through skilled action, social practice, and bodily engagement.",
    elements: [
      ["circle", { cx: 160, cy: 54, r: 18, fill: "#eceff4", stroke: "#b48ead", "stroke-width": 4 }],
      ["path", { d: "M160 74 L160 120 M118 96 C138 82, 182 82, 202 96 M138 148 L160 120 L184 148", fill: "none", stroke: "#b48ead", "stroke-width": 5, "stroke-linecap": "round", "stroke-linejoin": "round" }],
      ["circle", { cx: 98, cy: 120, r: 16, fill: "#eceff4", stroke: "#d08770", "stroke-width": 3 }],
      ["circle", { cx: 222, cy: 120, r: 16, fill: "#eceff4", stroke: "#8fbcbb", "stroke-width": 3 }],
      ["path", { d: "M114 120 C130 134, 190 134, 206 120", fill: "none", stroke: "#ebcb8b", "stroke-width": 3 }]
    ]
  },
  slow: {
    caption: "Interaction stretches across time, inviting reflection rather than instant completion.",
    elements: [
      ["circle", { cx: 160, cy: 90, r: 48, fill: "#eceff4", stroke: "#ebcb8b", "stroke-width": 4 }],
      ["path", { d: "M160 58 L160 92 L188 108", fill: "none", stroke: "#ebcb8b", "stroke-width": 5, "stroke-linecap": "round" }],
      ["path", { d: "M82 134 C116 116, 204 116, 238 134", fill: "none", stroke: "#d8dee9", "stroke-width": 3 }],
      ["circle", { cx: 100, cy: 132, r: 6, fill: "#d8dee9" }],
      ["circle", { cx: 160, cy: 120, r: 6, fill: "#d8dee9" }],
      ["circle", { cx: 220, cy: 132, r: 6, fill: "#d8dee9" }]
    ]
  }
};

function xFor(year) {
  return margin.left + ((year - minYear) / (maxYear - minYear)) * (width - margin.left - margin.right);
}

function yFor(lane) {
  return margin.top + lane * laneHeight;
}

function nodeById(id) {
  return conceptById.get(id);
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
  return relatedIdsByConcept.get(selected).has(id);
}

function updateDetail(concept) {
  detailRole.textContent = roleLabels[concept.role];
  detailTitle.textContent = concept.title;
  detailMeta.textContent = `${concept.author}, ${Math.floor(concept.year)}`;
  detailCopy.textContent = concept.summary;
  updateDetailImage(concept);
}

function updateDetailImage(concept) {
  const visual = conceptVisuals[concept.id];
  const fragment = document.createDocumentFragment();
  const title = makeSvg("title", { id: "detail-image-title" });
  const desc = makeSvg("desc", { id: "detail-image-desc" });

  title.textContent = `${concept.title} visual summary`;
  desc.textContent = visual.caption;
  fragment.append(title, desc);

  fragment.appendChild(makeSvg("rect", {
    class: "detail-image-bg",
    x: 1,
    y: 1,
    width: 318,
    height: 178,
    rx: 8
  }));

  visual.elements.forEach(([tag, attributes]) => {
    fragment.appendChild(makeSvg(tag, attributes));
  });

  detailImage.replaceChildren(fragment);
  detailCaption.textContent = visual.caption;
}

function selectConcept(concept) {
  if (selected === concept.id) return;
  selected = concept.id;
  updateDetail(concept);
  render();
}

function render() {
  const fragment = document.createDocumentFragment();
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
  marker.appendChild(makeSvg("path", { d: "M 0 0 L 10 5 L 0 10 z", fill: "#81a1c1" }));
  defs.appendChild(marker);
  fragment.appendChild(defs);

  const title = makeSvg("title", { id: "chart-title" });
  title.textContent = "Timeline of HCI ideas leading to Tangible Bits";
  const desc = makeSvg("desc", { id: "chart-desc" });
  desc.textContent = "Nodes are arranged by year and conceptual lane. Arrows show intellectual influence into Tangible Bits and later theoretical afterlives.";
  fragment.append(title, desc);

  axisYears.forEach((year) => {
    const x = xFor(year);
    fragment.appendChild(makeSvg("line", {
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
    fragment.appendChild(label);
  });

  edges.forEach(([sourceId, targetId]) => {
    const source = nodeById(sourceId);
    const target = nodeById(targetId);
    const sourceVisible = visibleFor(source);
    const targetVisible = visibleFor(target);
    const dim = !(sourceVisible && targetVisible) || !(relatedToSelected(sourceId) || relatedToSelected(targetId));
    const sx = xFor(source.year) + nodeWidth / 2 - 6;
    const sy = yFor(source.lane) + 28;
    const tx = xFor(target.year) - nodeWidth / 2;
    const ty = yFor(target.lane) + 28;
    const mid = Math.max(30, Math.abs(tx - sx) * 0.45);

    fragment.appendChild(makeSvg("path", {
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
      "aria-label": `${concept.title}, ${Math.floor(concept.year)}`,
      "aria-pressed": String(concept.id === selected)
    });

    const x = xFor(concept.year) - nodeWidth / 2;
    const y = yFor(concept.lane);
    group.appendChild(makeSvg("rect", {
      x,
      y,
      width: nodeWidth,
      height: nodeHeight,
      rx: nodeRadius,
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
      selectConcept(concept);
    });
    group.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        selectConcept(concept);
      }
    });

    fragment.appendChild(group);
  });

  svg.replaceChildren(fragment);
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function inlineMarkdown(value) {
  return escapeHtml(value)
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/`(.+?)`/g, "<code>$1</code>")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
}

function renderTable(rows) {
  const parsed = rows.map((row) => row.trim().replace(/^\||\|$/g, "").split("|").map((cell) => cell.trim()));
  const [head, , ...body] = parsed;
  const header = head.map((cell) => `<th>${inlineMarkdown(cell)}</th>`).join("");
  const tableRows = body
    .map((row) => `<tr>${row.map((cell) => `<td>${inlineMarkdown(cell)}</td>`).join("")}</tr>`)
    .join("");

  return `<table><thead><tr>${header}</tr></thead><tbody>${tableRows}</tbody></table>`;
}

function renderMarkdown(markdown) {
  const lines = markdown.split(/\r?\n/);
  const output = [];
  let index = 0;
  let listItems = [];
  let quoteItems = [];
  let codeItems = [];

  function flushList() {
    if (!listItems.length) return;
    output.push(`<ul>${listItems.map((item) => `<li>${inlineMarkdown(item)}</li>`).join("")}</ul>`);
    listItems = [];
  }

  function flushQuote() {
    if (!quoteItems.length) return;
    output.push(`<blockquote>${quoteItems.map((item) => `<p>${inlineMarkdown(item)}</p>`).join("")}</blockquote>`);
    quoteItems = [];
  }

  function flushCode() {
    if (!codeItems.length) return;
    output.push(`<pre><code>${escapeHtml(codeItems.join("\n"))}</code></pre>`);
    codeItems = [];
  }

  while (index < lines.length) {
    const line = lines[index];

    if (line.startsWith("```")) {
      flushList();
      flushQuote();
      index += 1;
      while (index < lines.length && !lines[index].startsWith("```")) {
        codeItems.push(lines[index]);
        index += 1;
      }
      flushCode();
      index += 1;
      continue;
    }

    if (/^\|.+\|$/.test(line) && index + 1 < lines.length && /^\|[\s:-]+\|/.test(lines[index + 1])) {
      flushList();
      flushQuote();
      const tableRows = [line, lines[index + 1]];
      index += 2;
      while (index < lines.length && /^\|.+\|$/.test(lines[index])) {
        tableRows.push(lines[index]);
        index += 1;
      }
      output.push(renderTable(tableRows));
      continue;
    }

    const heading = /^(#{1,3})\s+(.+)$/.exec(line);
    if (heading) {
      flushList();
      flushQuote();
      const level = heading[1].length;
      output.push(`<h${level}>${inlineMarkdown(heading[2])}</h${level}>`);
      index += 1;
      continue;
    }

    const list = /^\s*[-*]\s+(.+)$/.exec(line);
    if (list) {
      flushQuote();
      listItems.push(list[1]);
      index += 1;
      continue;
    }

    const quote = /^>\s?(.*)$/.exec(line);
    if (quote) {
      flushList();
      quoteItems.push(quote[1]);
      index += 1;
      continue;
    }

    if (!line.trim()) {
      flushList();
      flushQuote();
      index += 1;
      continue;
    }

    flushList();
    flushQuote();
    output.push(`<p>${inlineMarkdown(line)}</p>`);
    index += 1;
  }

  flushList();
  flushQuote();
  return output.join("\n");
}

function populateDocNav(activeDocId) {
  const nav = document.querySelector("[data-doc-nav]");
  if (!nav) return;

  const links = documents.map((doc) => {
    const active = doc.id === activeDocId ? " active" : "";
    return `<a class="nav-link${active}" href="docs.html?doc=${encodeURIComponent(doc.id)}">${doc.title}</a>`;
  });

  nav.insertAdjacentHTML("beforeend", `${links.join("")}<a class="nav-link" href="sources.html">Sources</a>`);
}

async function loadDocumentPage() {
  const params = new URLSearchParams(window.location.search);
  const requested = params.get("doc") || documents[0].id;
  const doc = documents.find((item) => item.id === requested) || documents[0];
  const title = document.querySelector("#doc-title");
  const rendered = document.querySelector("#doc-rendered");
  const raw = document.querySelector("#doc-raw");
  const toggle = document.querySelector("#raw-toggle");

  populateDocNav(doc.id);
  document.title = `${doc.title} | HCI History`;
  title.textContent = doc.title;

  try {
    const response = await fetch(`content/${doc.file}`);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const markdown = await response.text();
    rendered.innerHTML = renderMarkdown(markdown);
    raw.textContent = markdown;
  } catch (error) {
    rendered.innerHTML = `<p>Could not load <code>${escapeHtml(doc.file)}</code>.</p>`;
    raw.textContent = String(error);
  }

  toggle.addEventListener("change", () => {
    const showRaw = toggle.checked;
    rendered.hidden = showRaw;
    raw.hidden = !showRaw;
  });
}

if (svg) {
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      activeFilter = button.dataset.filter;
      buttons.forEach((item) => {
        const active = item === button;
        item.classList.toggle("active", active);
        item.setAttribute("aria-pressed", String(active));
      });
      render();
    });
  });

  updateDetail(nodeById(selected));
  render();
}

if (document.body.dataset.page === "docs") {
  loadDocumentPage();
}
