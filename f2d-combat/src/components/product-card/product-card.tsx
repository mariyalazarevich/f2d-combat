import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setOrderArticle } from '../../features/orderArticle/setOrderArticle';
import { Button } from '../button/button';
import { ImageSlot } from '../image-slot/image-slot';
import styles from './product-card.module.css';
import type { IProduct } from '../../interfaces/productInterface';

const MAX_DOTS = 5;
const SWIPE_THRESHOLD = 28;

interface ProductCardProps {
  product: IProduct;
}

function productImages(image: IProduct['image']): string[] {
  if (!Array.isArray(image)) {
    return [];
  }

  return image.filter(src => src.length > 0);
}

function visibleDotIndexes(total: number, current: number): number[] {
  const count = Math.min(total, MAX_DOTS);
  const start = Math.min(
    Math.max(current - Math.floor(MAX_DOTS / 2), 0),
    Math.max(total - count, 0)
  );

  return Array.from({ length: count }, (_, offset) => start + offset);
}

function Chevron({ direction }: { direction: 'left' | 'right' }) {
  const path = direction === 'left' ? 'M7.5 2.5 4 6l3.5 3.5' : 'M4.5 2.5 8 6l-3.5 3.5';

  return (
    <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
      <path
        d={path}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ProductCard({ product }: ProductCardProps) {
  const dispatch = useDispatch();
  const images = productImages(product.image);
  const [index, setIndex] = useState(0);
  const swipeStart = useRef<{ x: number; y: number } | null>(null);
  const currentIndex = images.length === 0 ? 0 : Math.min(index, images.length - 1);
  const hasGallery = images.length > 1;

  function showImage(nextIndex: number) {
    if (images.length === 0) {
      return;
    }

    setIndex(Math.min(Math.max(nextIndex, 0), images.length - 1));
  }

  function handleOrder() {
    dispatch(setOrderArticle({ productName: product.name, article: product.article }));
    document.getElementById('order')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function handlePointerDown(event: React.PointerEvent<HTMLDivElement>) {
    if (!hasGallery || event.pointerType !== 'touch') {
      return;
    }

    if (event.target instanceof Element && event.target.closest('button')) {
      return;
    }

    swipeStart.current = { x: event.clientX, y: event.clientY };
  }

  function finishSwipe(clientX: number, clientY: number) {
    if (!swipeStart.current) {
      return;
    }

    const deltaX = clientX - swipeStart.current.x;
    const deltaY = clientY - swipeStart.current.y;
    swipeStart.current = null;

    if (Math.abs(deltaX) < SWIPE_THRESHOLD || Math.abs(deltaX) <= Math.abs(deltaY)) {
      return;
    }

    showImage(currentIndex + (deltaX < 0 ? 1 : -1));
  }

  function handlePointerUp(event: React.PointerEvent<HTMLDivElement>) {
    finishSwipe(event.clientX, event.clientY);
  }

  function handlePointerLeave(event: React.PointerEvent<HTMLDivElement>) {
    finishSwipe(event.clientX, event.clientY);
  }

  function handlePointerCancel() {
    swipeStart.current = null;
  }

  return (
    <article className={styles.card}>
      <div
        className={styles.image}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerLeave}
        onPointerCancel={handlePointerCancel}
      >
        <ImageSlot name={product.article} src={images[currentIndex]} />
        {hasGallery ? (
          <>
            <button
              className={`${styles.arrow} ${styles.arrowPrev}`}
              type="button"
              aria-label="Предыдущее фото"
              disabled={currentIndex === 0}
              onClick={() => showImage(currentIndex - 1)}
            >
              <Chevron direction="left" />
            </button>
            <button
              className={`${styles.arrow} ${styles.arrowNext}`}
              type="button"
              aria-label="Следующее фото"
              disabled={currentIndex === images.length - 1}
              onClick={() => showImage(currentIndex + 1)}
            >
              <Chevron direction="right" />
            </button>
            <div className={styles.dots}>
              {visibleDotIndexes(images.length, currentIndex).map(imageIndex => {
                const isCurrent = imageIndex === currentIndex;

                return (
                  <button
                    key={imageIndex}
                    className={isCurrent ? `${styles.dot} ${styles.dotCurrent}` : styles.dot}
                    type="button"
                    aria-label={`Фото ${imageIndex + 1} из ${images.length}`}
                    aria-current={isCurrent ? 'true' : undefined}
                    onClick={() => showImage(imageIndex)}
                  />
                );
              })}
            </div>
          </>
        ) : null}
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{product.name}</h3>
        <p className={styles.article}>Арт. {product.article}</p>
      </div>
      <div className={styles.purchase}>
        <p className={styles.priceNote}>Цена узнается по запросу после оформления заявки</p>
        <Button onClick={handleOrder}>Заказать</Button>
      </div>
    </article>
  );
}
