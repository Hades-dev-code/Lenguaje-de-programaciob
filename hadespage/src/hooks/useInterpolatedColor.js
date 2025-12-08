import { useMemo } from "react";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../../tailwind.config.js";
import useScrollProgress from "./useScrollProgress.js";

function interpolateColor(color1, color2, factor) {
  const c1 = parseInt(color1.slice(1), 16);
  const c2 = parseInt(color2.slice(1), 16);

  const r1 = (c1 >> 16) & 0xff,
        g1 = (c1 >> 8) & 0xff,
        b1 = c1 & 0xff;
  const r2 = (c2 >> 16) & 0xff,
        g2 = (c2 >> 8) & 0xff,
        b2 = c2 & 0xff;

  const r = Math.round(r1 + (r2 - r1) * factor);
  const g = Math.round(g1 + (g2 - g1) * factor);
  const b = Math.round(b1 + (b2 - b1) * factor);

  return `rgb(${r},${g},${b})`;
}

export default function useInterpolatedColor() {
  const progress = useScrollProgress();

  const { dark, accent } = useMemo(() => {
    const fullConfig = resolveConfig(tailwindConfig);
    const fallback = { dark: "#0f172a", accent: "#38bdf8" }; 
    const sky = fullConfig.theme?.colors?.sky || {};
    return {
      dark: sky.dark || fallback.dark,
      accent: sky.accent || fallback.accent,
    };
  }, []);

  return interpolateColor(dark, accent, progress);
}
