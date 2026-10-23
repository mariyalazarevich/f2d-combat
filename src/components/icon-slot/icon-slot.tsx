import type { CSSProperties, ReactNode } from 'react';
import styles from './icon-slot.module.css';

interface IconSlotProps {
  name: string;
  size?: number;
  children?: ReactNode;
}

const icons: Record<string, ReactNode> = {};

export function IconSlot({ name, size = 24, children }: IconSlotProps) {
  const icon = icons[name] ?? children;
  const style: CSSProperties = { width: size, height: size };

  return (
    <span className={styles.slot} data-icon={name} style={style} aria-hidden="true">
      {icon}
    </span>
  );
}
