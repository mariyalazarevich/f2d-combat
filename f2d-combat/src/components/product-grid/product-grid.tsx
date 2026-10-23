import { useSelector } from 'react-redux';
import type { Product } from '../../data/products';
import { ProductCard } from '../product-card/product-card';
import styles from './product-grid.module.css';
import type { RootState } from '../../app/store';

interface ProductGridProps {
  products: Product[];
}

export function ProductGrid({ products }: ProductGridProps) {
  const categorie = useSelector((state: RootState) => state.categorie.categorie);
  const filteredProducts =
    categorie === 'all_categories'
      ? products
      : products.filter(product => product.category.includes(categorie));
  return filteredProducts.length === 0 ? (
    <p className={styles.empty}>В этой категории пока нет товаров</p>
  ) : (
    <ul className={styles.grid}>
      {filteredProducts.map(product => (
        <li key={product.id} className={styles.item}>
          <ProductCard product={product} />
        </li>
      ))}
    </ul>
  );
}
