'use client';

import clsx from 'clsx';
import { Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from '@/lib/theme';

// Same three-way control as the platform sidebar.
export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const options = [
    { value: 'light' as const, icon: Sun, label: 'Light' },
    { value: 'dark' as const, icon: Moon, label: 'Dark' },
    { value: 'system' as const, icon: Monitor, label: 'System' },
  ];

  return (
    <div className={clsx('flex border border-border', className)}>
      {options.map((opt) => {
        const Icon = opt.icon;
        const active = theme === opt.value;
        return (
          <button
            key={opt.value}
            onClick={() => setTheme(opt.value)}
            aria-label={opt.label}
            aria-pressed={active}
            className={clsx(
              'flex items-center justify-center p-1.5 transition-colors',
              active
                ? 'bg-accent text-[var(--color-accent-foreground)]'
                : 'text-foreground-tertiary hover:text-foreground-secondary'
            )}
            title={opt.label}
          >
            <Icon size={13} strokeWidth={1.5} />
          </button>
        );
      })}
    </div>
  );
}
