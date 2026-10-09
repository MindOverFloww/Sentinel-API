import React from 'react';
import { AlertCircle, TrendingUp } from 'lucide-react';

export const RiskAreaChartCard: React.FC = () => {
  // SVG points for 24h risk trend (0 to 100)
  // [x, y] coordinates on a 400x120 viewBox
  const points = [
    { x: 0, y: 95, label: '00:00', score: 20 },
    { x: 50, y: 90, label: '04:00', score: 25 },
    { x: 100, y: 80, label: '08:00', score: 35 },
    { x: 150, y: 40, label: '11:00', score: 75 }, // SQLi spike
    { x: 200, y: 55, label: '14:00', score: 60 },
    { x: 250, y: 25, label: '17:00', score: 85 }, // Peak Brute Force
    { x: 300, y: 45, label: '20:00', score: 68 },
    { x: 350, y: 65, label: '22:00', score: 50 },
    { x: 400, y: 70, label: 'Now', score: 45 },
  ];

  // SVG Area path closing at the bottom
  const linePath = `M ${points.map((p) => `${p.x},${p.y}`).join(' L ')}`;
  const areaPath = `${linePath} L 400,120 L 0,120 Z`;

  return (
    <div className="glass-light p-6 flex flex-col justify-between col-span-1 md:col-span-2 lg:col-span-2">
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-neutral-800 dark:text-neutral-200" />
            <h3 className="text-sm md:text-base font-semibold tracking-normal text-neutral-900 dark:text-white">
              Risk Score Velocity
            </h3>
          </div>
          <span className="px-2.5 py-0.5 rounded-full bg-black text-white dark:bg-white dark:text-black text-[10px] font-bold tracking-wider uppercase">
            0–100 Scale
          </span>
        </div>

        <div className="flex items-baseline gap-3">
          <span className="text-3xl md:text-4xl font-light tracking-tight text-neutral-900 dark:text-white">
            85
          </span>
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-black/10 dark:bg-white/15 text-neutral-900 dark:text-neutral-100 uppercase tracking-wider">
            Critical Peak
          </span>
        </div>
        <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-1">
          Max calculated incident severity observed during authentication flood attack.
        </p>
      </div>

      {/* Black Gradient Area Chart */}
      <div className="mt-4 pt-2">
        <div className="w-full h-28 relative">
          <svg className="w-full h-full overflow-visible" viewBox="0 0 400 120" preserveAspectRatio="none">
            <defs>
              <linearGradient id="areaGradientLight" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#000000" stopOpacity="0.35" />
                <stop offset="80%" stopColor="#000000" stopOpacity="0.05" />
                <stop offset="100%" stopColor="#000000" stopOpacity="0.0" />
              </linearGradient>
              <linearGradient id="areaGradientDark" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.38" />
                <stop offset="80%" stopColor="#ffffff" stopOpacity="0.06" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Gradient Area Fill */}
            <path
              d={areaPath}
              className="fill-[url(#areaGradientLight)] dark:fill-[url(#areaGradientDark)] transition-all"
            />

            {/* Stroke Line */}
            <path
              d={linePath}
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              className="text-black dark:text-white"
            />

            {/* Peak highlight dot */}
            <circle
              cx="250"
              cy="25"
              r="4.5"
              className="fill-black dark:fill-white stroke-2 stroke-white dark:stroke-black shadow-md"
            />
          </svg>
        </div>

        {/* Minimal Time labels */}
        <div className="flex justify-between items-center text-[10px] text-neutral-400 dark:text-neutral-500 font-mono mt-2 pt-1 border-t border-black/5 dark:border-white/10">
          <span>00:00</span>
          <span>08:00</span>
          <span className="font-bold text-neutral-800 dark:text-neutral-200">17:00 (Peak 85)</span>
          <span>Now</span>
        </div>
      </div>
    </div>
  );
};
