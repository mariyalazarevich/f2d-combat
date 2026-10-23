import type { ReactNode } from 'react';
import styles from './button.module.css';

interface ButtonProps {
  children: ReactNode;
  href?: string;
  type?: 'button' | 'submit';
}

export function Button({ children, href, type = 'button' }: ButtonProps) {
  if (href) {
    return (
      <a className={styles.button} href={href}>
        {children}
      </a>
    );
  }

  return (
    <button className={styles.button} type={type}>
      {children}
    </button>
  );
}
