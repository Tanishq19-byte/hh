import React from 'react';
import { CheckCircle2, AlertTriangle, AlertOctagon } from 'lucide-react';

export const StatusBadge = ({ status, size = "md" }) => {
  const getBadgeProps = () => {
    switch (status) {
      case 'Good':
        return {
          bg: 'bg-emerald-50 text-emerald-800 border-emerald-300',
          dot: 'bg-emerald-500',
          icon: CheckCircle2,
          label: 'Good Information Status',
          emoji: '🟢'
        };
      case 'Needs Attention':
        return {
          bg: 'bg-amber-50 text-amber-900 border-amber-300',
          dot: 'bg-amber-500',
          icon: AlertTriangle,
          label: 'Needs Attention',
          emoji: '🟡'
        };
      case 'Important Information':
      case 'Urgent':
        return {
          bg: 'bg-rose-50 text-rose-900 border-rose-300',
          dot: 'bg-rose-600',
          icon: AlertOctagon,
          label: 'Important Information',
          emoji: '🔴'
        };
      default:
        return {
          bg: 'bg-slate-100 text-slate-800 border-slate-300',
          dot: 'bg-slate-500',
          icon: CheckCircle2,
          label: status || 'Informational',
          emoji: '⚪'
        };
    }
  };

  const config = getBadgeProps();
  const Icon = config.icon;

  const sizeClasses = size === 'lg' 
    ? 'px-4 py-2 text-sm gap-2 font-bold' 
    : size === 'sm'
    ? 'px-2 py-0.5 text-[11px] gap-1 font-semibold'
    : 'px-3 py-1 text-xs gap-1.5 font-semibold';

  return (
    <span className={`inline-flex items-center rounded-full border shadow-xs ${config.bg} ${sizeClasses}`}>
      <Icon className={size === 'lg' ? 'w-4 h-4' : 'w-3.5 h-3.5'} />
      <span>{config.label}</span>
    </span>
  );
};
