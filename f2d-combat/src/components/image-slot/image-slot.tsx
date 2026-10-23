import type { ReactNode } from 'react';
import styles from './image-slot.module.css';

interface ImageSlotProps {
  name: string;
  src?: string;
  className?: string;
  children?: ReactNode;
}

export function ImageSlot({ name, src, className, children }: ImageSlotProps) {
  const slotClassName = className ? `${styles.slot} ${className}` : styles.slot;

  return (
    <span className={slotClassName} data-image={name} aria-hidden="true">
      {src ? <img src={src} alt="" /> : children}
    </span>
  );
}
