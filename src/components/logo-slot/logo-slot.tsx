import type { ReactNode } from 'react';
import styles from './logo-slot.module.css';

interface LogoSlotProps {
  variant?: 'dark' | 'light';
  src?: string;
  children?: ReactNode;
}

export function LogoSlot({ variant = 'dark', src, children }: LogoSlotProps) {
  return (
    <span className={styles.slot} data-slot="logo" data-variant={variant} aria-hidden="true">
      {src ? <img src={src} alt="" /> : children}
    </span>
  );
}
