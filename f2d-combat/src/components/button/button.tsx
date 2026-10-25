import type { ReactNode } from 'react';
import styles from './button.module.css';

interface ButtonProps {
  children: ReactNode;
  href?: string;
  type?: 'button' | 'submit';
  disabled?: boolean;
  compact?: boolean;
  title?: string;
  onClick?: () => void;
}

export function Button({
  children,
  href,
  type = 'button',
  disabled = false,
  compact = false,
  title,
  onClick,
}: ButtonProps) {
  const className = compact ? `${styles.button} ${styles.compact}` : styles.button;

  if (href) {
    return (
      <a className={className} href={href}>
        {children}
      </a>
    );
  }

  return (
    <button className={className} type={type} disabled={disabled} title={title} onClick={onClick}>
      {children}
    </button>
  );
}
