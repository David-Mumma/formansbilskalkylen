'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wallet, ArrowRight } from 'lucide-react';
import { formatCurrency } from '@/lib/calculator';

interface MobileStickyBarProps {
  monthlyNetCost: number;
  onCompare: () => void;
}

export function MobileStickyBar({ monthlyNetCost, onCompare }: MobileStickyBarProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const calcEl = document.getElementById('kalkylator');
      if (!calcEl) return;
      const rect = calcEl.getBoundingClientRect();
      setVisible(rect.bottom < 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="fixed bottom-0 left-0 right-0 z-40 md:hidden"
        >
          <div className="bg-white border-t border-slate-200 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-100">
                  <Wallet className="h-4 w-4 text-emerald-600" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-slate-500 leading-tight">Nettokostnad förmånsbil</p>
                  <p className="text-lg font-bold text-emerald-600 leading-tight">
                    {formatCurrency(monthlyNetCost)}<span className="text-xs text-slate-400 font-normal">/mån</span>
                  </p>
                </div>
              </div>
              <button
                onClick={onCompare}
                className="flex items-center gap-1.5 rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm active:bg-emerald-700 transition-colors whitespace-nowrap"
              >
                Jämför mot privatköp
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
