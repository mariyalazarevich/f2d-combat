import deliveryIcon from '../../assets/delivery.svg';
import originalityIcon from '../../assets/originality.svg';
import qualityIcon from '../../assets/quality.svg';
import supportIcon from '../../assets/support.svg';
import { advantages as advantageItems } from '../../data/advantages';
import { IconSlot } from '../icon-slot/icon-slot';
import styles from './advantages.module.css';

const advantageIcons: Record<string, string> = {
  delivery: deliveryIcon,
  originality: originalityIcon,
  quality: qualityIcon,
  support: supportIcon,
};

export function Advantages() {
  return (
    <section className={styles.section} aria-labelledby="advantages-title">
      <h2 id="advantages-title" className="visually-hidden">
        Преимущества
      </h2>
      <ul className={styles.list}>
        {advantageItems.map(advantage => {
          const iconSrc = advantageIcons[advantage.id];

          return (
            <li key={advantage.id} className={styles.item}>
              {iconSrc ? (
                <img className={styles.icon} src={iconSrc} alt="" />
              ) : (
                <IconSlot name={advantage.icon} size={28} />
              )}
              <p className={styles.title}>{advantage.title}</p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
