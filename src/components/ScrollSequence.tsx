import { useRef, useEffect, useState, useCallback } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ScrollSequenceProps {
  framesDir: string;
  totalFrames: number;
  frameExt: string;
  children?: React.ReactNode;
  height?: string;
}

export function ScrollSequence({
  framesDir,
  totalFrames,
  frameExt,
  children,
  height = "300vh",
}: ScrollSequenceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const framesRef = useRef<HTMLImageElement[]>([]);
  const [loaded, setLoaded] = useState(0);
  const [ready, setReady] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, totalFrames - 1]);

  const preloadFrames = useCallback(() => {
    const batchSize = 20;
    let currentIndex = 0;

    function loadBatch() {
      const end = Math.min(currentIndex + batchSize, totalFrames);
      for (let i = currentIndex; i < end; i++) {
        const img = new Image();
        img.src = `${framesDir}/frame_${String(i + 1).padStart(4, "0")}.${frameExt}`;
        img.onload = () => {
          setLoaded(prev => {
            const next = prev + 1;
            if (next >= totalFrames) setReady(true);
            return next;
          });
        };
        framesRef.current[i] = img;
      }
      currentIndex = end;

      if (currentIndex < totalFrames) {
        if ("requestIdleCallback" in window) {
          requestIdleCallback(loadBatch, { timeout: 1000 });
        } else {
          setTimeout(loadBatch, 200);
        }
      }
    }

    loadBatch();
  }, [framesDir, totalFrames, frameExt]);

  useEffect(() => {
    preloadFrames();
  }, [preloadFrames]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const unsubscribe = frameIndex.on("change", (value) => {
      const idx = Math.round(value);
      const img = framesRef.current[idx];
      if (img && img.complete && img.naturalWidth > 0) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const scale = Math.max(canvas.width / img.naturalWidth, canvas.height / img.naturalHeight);
        const x = (canvas.width - img.naturalWidth * scale) / 2;
        const y = (canvas.height - img.naturalHeight * scale) / 2;
        ctx.drawImage(img, x, y, img.naturalWidth * scale, img.naturalHeight * scale);
      }
    });

    return () => {
      window.removeEventListener("resize", resize);
      unsubscribe();
    };
  }, [frameIndex, ready]);

  return (
    <section ref={containerRef} className="relative" style={{ height }}>
      <div className="sticky top-0 h-screen overflow-hidden">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background/60 z-10" />
        {!ready && (
          <div className="absolute inset-0 z-20 flex items-center justify-center">
            <div className="text-center">
              <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-sm text-muted-foreground">
                Loading frames... {loaded}/{totalFrames}
              </p>
            </div>
          </div>
        )}
        {ready && (
          <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
            <div className="text-center max-w-2xl mx-auto px-4 pointer-events-auto">
              {children}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
