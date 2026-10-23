import type { Product } from '../../data/products';
import { formatPrice } from '../../utils/format-price';
import { ImageSlot } from '../image-slot/image-slot';
import styles from './product-card.module.css';

interface ProductCardProps {
  product: Product;
}

function stockLabel(inStock: boolean): string {
  if (inStock) {
    return 'В наличии';
  }

  return 'Нет в наличии';
}

export function ProductCard({ product }: ProductCardProps) {
  const stockClassName = product.inStock ? styles.inStock : styles.outOfStock;

  return (
    <article className={styles.card}>
      <div className={styles.image}>
        <ImageSlot name={product.article} src={product.image} />
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{product.name}</h3>
        <p className={styles.article}>Арт. {product.article}</p>
        <p className={stockClassName}>{stockLabel(product.inStock)}</p>
      </div>
      <p className={styles.price}>{formatPrice(product.price)}</p>
    </article>
  );
}
