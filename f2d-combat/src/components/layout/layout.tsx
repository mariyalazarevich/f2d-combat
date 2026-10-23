import type { ReactNode } from 'react';
import { Footer } from '../footer/footer';
import { Header } from '../header/header';
import styles from './layout.module.css';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className={styles.page}>
      <a className="visually-hidden" href="#main">
        К содержанию
      </a>
      <div className={styles.shell}>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </div>
    </div>
  );
}
