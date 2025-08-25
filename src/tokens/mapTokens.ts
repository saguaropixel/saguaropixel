// src/tokens/mapTokens.ts
import raw from './design-tokens.tokens.json';

type Hex = string;

const hex8ToRgba = (hex: Hex) => {
  // supports #RRGGBBAA or #RRGGBB
  if (/^#([A-Fa-f0-9]{8})$/.test(hex)) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    const a = parseInt(hex.slice(7, 9), 16) / 255;
    return `rgba(${r}, ${g}, ${b}, ${a})`;
  }
  return hex;
};

export const tokenColors = (() => {
  const rc = (raw as any)['raw colors'] as Record<string, any>;
  const out: Record<string, any> = {};
  for (const family of Object.keys(rc)) {
    const branch = rc[family];
    if (branch?.type === 'color' && branch?.value) {
      out[family] = hex8ToRgba(branch.value);
    } else {
      out[family] = {};
      for (const step of Object.keys(branch)) {
        const v = branch[step]?.value;
        if (v) out[family][step] = hex8ToRgba(v);
      }
    }
  }
  return out;
})();

export const tokenShadows = (() => {
  const effects = (raw as any).effect;
  // Helper to build CSS box-shadow from your shape
  const make = (v: any) =>
    `${v.offsetX}px ${v.offsetY}px ${v.radius}px ${v.spread}px ${hex8ToRgba(v.color)}`;

  return {
    // single-layer
    '2xs': make(effects['shadow-2xs'].value),
    xs: make(effects['shadow-xs'].value),
    // multi-layer (arrays 0,1 in your JSON)
    sm: [
      make(effects['shadow-sm']['0'].value),
      make(effects['shadow-sm']['1'].value),
    ].join(', '),
    md: [
      make(effects['shadow-md']['0'].value),
      make(effects['shadow-md']['1'].value),
    ].join(', '),
    lg: [
      make(effects['shadow-lg']['0'].value),
      make(effects['shadow-lg']['1'].value),
    ].join(', '),
    xl: [
      make(effects['shadow-xl']['0'].value),
      make(effects['shadow-xl']['1'].value),
    ].join(', '),
    '2xl': make(effects['shadow-2xl'].value),
    focus: make(effects['focus'].value),
    'focus-error': make(effects['focus error'].value),
  };
})();

type AnyRec = Record<string, any>;

// use the JSON you imported as `raw`
const T = (raw as AnyRec).typography as AnyRec;

// safe getter for nested keys like ["paragraph","regular"]
const tget = (path: string[]) =>
  path.reduce<any>((acc, key) => (acc && key in acc ? acc[key] : undefined), T);

const must = (node: any, label: string) => {
  if (!node) throw new Error(`Missing typography token: ${label}`);
  return node;
};

// EXPLICIT MUTABLE RETURN TYPE (no "as const")
type TailwindFontSizeTuple = [
  string,
  { lineHeight: string; letterSpacing: string; fontWeight: number },
];

const pack = (node: any): TailwindFontSizeTuple => {
  node = must(node, 'typography node');
  const fs = must(node.fontSize?.value, 'fontSize') as number;
  const lh = must(node.lineHeight?.value, 'lineHeight') as number;
  const ls = (node.letterSpacing?.value ?? 0) as number;
  const fw = (node.fontWeight?.value ?? 400) as number;

  return [
    `${fs}px`,
    {
      lineHeight: `${lh}px`,
      letterSpacing: `${ls}px`, // ensure string
      fontWeight: fw,
    },
  ];
};

export const fontSizes = {
  // Tiny5 headings
  'h-xxl': pack(tget(['huge heading 1'])),
  'h-xl': pack(tget(['huge heading 2'])),
  h1: pack(tget(['heading 1'])),
  h2: pack(tget(['heading 2'])),
  h3: pack(tget(['heading 3'])),
  h4: pack(tget(['heading 4'])),

  // Nunito body
  'body-lg': pack(tget(['paragraph large', 'regular'])),
  body: pack(tget(['paragraph', 'regular'])),
  'body-md': pack(tget(['paragraph', 'medium'])),
  'body-sm': pack(tget(['paragraph small', 'regular'])),
  'body-xs': pack(tget(['paragraph mini', 'regular'])),

  // Buttons + mono
  btn: pack(tget(['button text'])),
  mono: pack(tget(['monospaced'])),
} satisfies Record<string, TailwindFontSizeTuple>;
