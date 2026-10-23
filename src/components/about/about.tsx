import { aboutParagraphs } from '../../data/about';
import { brandAssets } from '../../data/assets';
import { ImageSlot } from '../image-slot/image-slot';
import styles from './about.module.css';

export function About() {
  const photo = brandAssets.about || undefined;

  return (
    <section className={styles.section} id="about" aria-labelledby="about-title">
      <div className={styles.copy}>
        <p className={styles.kicker}>Магазин</p>
        <h2 className={styles.title} id="about-title">
          О нас
        </h2>
        {aboutParagraphs.map(paragraph => (
          <p key={paragraph} className={styles.text}>
            {paragraph}
          </p>
        ))}
      </div>
      <div className={styles.photo}>
        <ImageSlot name="about" src={photo} />
      </div>
    </section>
  );
}
