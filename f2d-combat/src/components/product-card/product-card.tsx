import { useDispatch } from 'react-redux';
import { setOrderArticle } from '../../features/orderArticle/setOrderArticle';
import { formatPrice } from '../../utils/format-price';
import { Button } from '../button/button';
import { ImageSlot } from '../image-slot/image-slot';
import styles from './product-card.module.css';
import type { IProduct } from '../../interfaces/productInterface';

interface ProductCardProps {
  product: IProduct;
}

function stockLabel(inStock: boolean): string {
  if (inStock) {
    return 'В наличии';
  }

  return 'Нет в наличии';
}

export function ProductCard({ product }: ProductCardProps) {
  const dispatch = useDispatch();
  const stockClassName = product.inStock ? styles.inStock : styles.outOfStock;

  function handleOrder() {
    dispatch(setOrderArticle(product.article));
    document.getElementById('order')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

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
      <div className={styles.purchase}>
        <p className={styles.price}>{formatPrice(product.price)}</p>
        <Button
          compact
          disabled={!product.inStock}
          title={product.inStock ? undefined : 'Нет в наличии'}
          onClick={handleOrder}
        >
          Заказать
        </Button>
      </div>
    </article>
  );
}
