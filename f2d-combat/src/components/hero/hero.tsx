import { brandAssets } from '../../data/assets';
import { Button } from '../button/button';
import { ImageSlot } from '../image-slot/image-slot';
import styles from './hero.module.css';

export function Hero() {
  const hero = brandAssets.hero || undefined;

  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <ImageSlot name="hero" className={styles.media} src={hero} />
      <div className={styles.overlay} aria-hidden="true" />
      <div className={styles.content}>
        <p className={styles.kicker}>Комплектующие для F2D Combat</p>
        <h1 id="hero-title" className={styles.title}>
          Надёжные детали
          <br />
          для побед в воздухе
        </h1>
        <p className={styles.text}>
          Двигатели, подшипники, топливо и комплектующие для кордового воздушного боя.
        </p>
        <Button href="#catalog">
          Перейти в каталог
        </Button>
      </div>
    </section>
  );
}
