import React, { useState } from 'react';
import { Sliders, Check } from 'lucide-react';
import { INITIAL_RULES } from '../../services/mockData';

export const RuleSettingsCard: React.FC = () => {
  const [rules, setRules] = useState(INITIAL_RULES);

  const toggleRule = (id: string) => {
    setRules((prev) =>
      prev.map((r) => (r.id === id ? { ...r, enabled: !r.enabled } : r))
    );
  };

  return (
    <div className="glass-light p-6 flex flex-col justify-between col-span-1 md:col-span-2 lg:col-span-2">
      <div>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-neutral-800 dark:text-neutral-200" />
            <h3 className="text-sm md:text-base font-semibold tracking-normal text-neutral-900 dark:text-white">
              Detection Rules & Engine Controls
            </h3>
          </div>
          <span className="text-[11px] font-mono font-medium px-2 py-0.5 rounded-full bg-black/10 dark:bg-white/10 text-neutral-800 dark:text-neutral-200">
            {rules.filter((r) => r.enabled).length}/{rules.length} Active
          </span>
        </div>
        <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mb-4">
          Configure rule thresholds and enforcement parameters for live inspection.
        </p>

        {/* Pill Toggle Switches */}
        <div className="space-y-3">
          {rules.map((rule) => (
            <div
              key={rule.id}
              className="flex items-center justify-between p-3 rounded-2xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/5 dark:border-white/10 hover:bg-black/[0.05] transition-colors"
            >
              <div className="pr-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-neutral-900 dark:text-white">
                    {rule.name}
                  </span>
                  <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-black/10 dark:bg-white/10 text-neutral-600 dark:text-neutral-300">
                    {rule.type}
                  </span>
                </div>
                <p className="text-[10px] text-neutral-500 dark:text-neutral-400 line-clamp-1 mt-0.5">
                  Threshold: {rule.threshold} events in {rule.timeWindow}s window
                </p>
              </div>

              {/* Pill toggle switch */}
              <button
                type="button"
                onClick={() => toggleRule(rule.id)}
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden ${
                  rule.enabled
                    ? 'bg-black dark:bg-white'
                    : 'bg-neutral-300 dark:bg-neutral-700'
                }`}
                role="switch"
                aria-checked={rule.enabled}
              >
                <span
                  aria-hidden="true"
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white dark:bg-black shadow-sm ring-0 transition duration-200 ease-in-out ${
                    rule.enabled ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-black/5 dark:border-white/10 flex items-center justify-between text-[11px] text-neutral-500 dark:text-neutral-400">
        <span className="flex items-center gap-1">
          <Check className="w-3 h-3 text-neutral-700 dark:text-neutral-300" />
          Hot Rule Reload Enabled
        </span>
        <span className="font-mono text-[10px]">Admin Auth Required</span>
      </div>
    </div>
  );
};
