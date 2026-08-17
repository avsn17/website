// Built-in shop items — ids must match what GardenPlot.tsx checks for.
export const BASE_SHOP_ITEMS = [
  {
    id: "glow-mushroom",
    name: "Glow Mushrooms",
    cost: 40,
    kind: "plant",
    description: "A cluster of softly bioluminescent mushrooms.",
    custom: false as const,
  },
  {
    id: "firefly-swarm",
    name: "Firefly Swarm",
    cost: 60,
    kind: "companion",
    description: "A swarm of fireflies that drifts around your garden.",
    custom: false as const,
  },
  {
    id: "moonvine",
    name: "Moonvine",
    cost: 80,
    kind: "plant",
    description: "A climbing vine that blooms only under moonlight.",
    custom: false as const,
  },
  {
    id: "lantern-path",
    name: "Lantern Path",
    cost: 100,
    kind: "backdrop",
    description: "A trail of paper lanterns lighting the way through the garden.",
    custom: false as const,
  },
];
