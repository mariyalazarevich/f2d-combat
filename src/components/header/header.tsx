import type { FormEvent } from 'react';
import searchIcon from '../../assets/search.svg';
import { brandAssets } from '../../data/assets';
import { navItems } from '../../data/navigation';
import { LogoSlot } from '../logo-slot/logo-slot';
import styles from './header.module.css';

function handleSearchSubmit(event: FormEvent<HTMLFormElement>) {
  event.preventDefault();
}

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

        <form className={styles.search} role="search" onSubmit={handleSearchSubmit}>
          <label className="visually-hidden" htmlFor="search">
            Поиск по названию или артикулу
          </label>
          <input
            id="search"
            name="query"
            type="search"
            placeholder="Поиск по названию или артикулу..."
            enterKeyHint="search"
          />
          <img className={styles.searchIcon} src={searchIcon} alt="" />
        </form>

        <div className={styles.actions}>
          <details className={styles.searchMenu}>
            <summary className={styles.iconButton} aria-label="Поиск">
              <img className={styles.searchIcon} src={searchIcon} alt="" />
            </summary>
            <form className={styles.searchPopover} role="search" onSubmit={handleSearchSubmit}>
              <label className="visually-hidden" htmlFor="mobile-search">
                Поиск по названию или артикулу
              </label>
              <input
                id="mobile-search"
                name="query"
                type="search"
                placeholder="Поиск по названию или артикулу..."
                enterKeyHint="search"
              />
              <img className={styles.searchIcon} src={searchIcon} alt="" />
            </form>
          </details>
        </div>
      </div>
    </header>
  );
}
