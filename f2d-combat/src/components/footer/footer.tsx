import darkLogo from '../../assets/dark_logo_mark.png';
import vkIcon from '../../assets/vk.svg';
import { contacts, socialLinks } from '../../data/navigation';
import { IconSlot } from '../icon-slot/icon-slot';
import { LogoSlot } from '../logo-slot/logo-slot';
import styles from './footer.module.css';

const socialIcons: Record<string, string> = {
  vk: vkIcon,
};

export function Footer() {
  return (
    <footer className={styles.footer} id="contacts">
      <div className={styles.inner}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <a className={styles.logoLink} href="/" aria-label="F2D Combat, на главную">
              <LogoSlot variant="light" src={darkLogo} />
            </a>
            <p className={styles.tagline}>Комплектующие для кордового воздушного боя</p>
          </div>
          <div className={styles.contacts}>
            <h2 className={styles.contactsTitle}>Контакты</h2>
            <ul className={styles.contactList}>
              {contacts.map(contact => (
                <li key={contact.id}>
                  <a className={styles.contactLink} href={contact.href}>
                    {contact.value}
                  </a>
                  {contact.note ? <p className={styles.note}>{contact.note}</p> : null}
                </li>
              ))}
              {socialLinks.map(link => {
                const iconSrc = socialIcons[link.id];

                return (
                  <li key={link.id}>
                    <a
                      className={styles.socialLink}
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {iconSrc ? (
                        <img className={styles.icon} src={iconSrc} alt="" />
                      ) : (
                        <IconSlot name={link.icon} size={18} />
                      )}
                      {link.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div className={styles.bottom}>
          <p>© 2025 F2D Combat. Все права защищены.</p>
          <a className={styles.privacy} href="#">
            Политика конфиденциальности
          </a>
        </div>
      </div>
    </footer>
  );
}
