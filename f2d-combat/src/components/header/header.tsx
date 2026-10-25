import { brandAssets } from '../../data/assets';
import { navItems } from '../../data/navigation';
import { LogoSlot } from '../logo-slot/logo-slot';
import styles from './header.module.css';

export function Header() {
  const logo = brandAssets.logo || undefined;

  return (
    <header className={styles.header}>
      <div className={styles.bar}>
        <a className={styles.logoLink} href="/" aria-label="F2D Combat, на главную">
          <LogoSlot src={logo} />
        </a>

        <nav className={styles.nav} aria-label="Разделы страницы">
          {navItems.map(item => (
            <a key={item.id} className={styles.link} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
