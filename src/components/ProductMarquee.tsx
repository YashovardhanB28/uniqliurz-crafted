import { useMemo } from "react";
import allProducts from "@/data/products";

const ROW_COUNT = 3;

function shuffleArray<T>(arr: T[]): T[] {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function ProductMarquee() {
  const rows = useMemo(() => {
    const shuffled = shuffleArray(allProducts);
    const chunkSize = Math.ceil(shuffled.length / ROW_COUNT);
    return Array.from({ length: ROW_COUNT }, (_, i) =>
      shuffled.slice(i * chunkSize, (i + 1) * chunkSize)
    );
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/60 to-background z-10" />
      <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background z-10" />
      
      <div className="flex flex-col gap-4 h-full justify-center opacity-[0.06]">
        {rows.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className="flex gap-4 marquee-row"
            style={{
              animation: `marquee-${rowIndex % 2 === 0 ? "left" : "right"} ${60 + rowIndex * 15}s linear infinite`,
            }}
          >
            {[...row, ...row, ...row].map((product, i) => (
              <div
                key={`${product.id}-${i}`}
                className="w-20 h-20 md:w-28 md:h-28 rounded-xl overflow-hidden flex-shrink-0 bg-muted/20"
              >
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-contain p-2"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            ))}
          </div>
        ))}
      </div>

      <style>{`
        @keyframes marquee-left {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0%); }
        }
        .marquee-row {
          will-change: transform;
          width: max-content;
        }
      `}</style>
    </div>
  );
}
