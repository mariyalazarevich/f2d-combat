import { useSelector } from 'react-redux';
import type { Product } from '../../data/products';
import { ProductCard } from '../product-card/product-card';
import styles from './product-grid.module.css';
import type { RootState } from '../../app/store';
import { useMemo } from 'react';

interface ProductGridProps {
  products: Product[];
}

export function ProductGrid({ products }: ProductGridProps) {
  const categorie = useSelector((state: RootState) => state.categorie.categorie);
  const searchQuery = useSelector((state: RootState) => state.searchQuery.searchQuery);
  const filteredProducts = useMemo(() => {
    return [...products]
    .filter((product) => {
      if (categorie === 'all_categories') {
        return true;
      }
      return product.category.includes(categorie);
    })
    .filter((product) => {
      if (searchQuery.length === 0) {
        return true;
      }
      return product.name.toLowerCase().includes(searchQuery.toLowerCase()) || product.article.toLowerCase().includes(searchQuery.toLowerCase());
    });
  }, [products, categorie, searchQuery]);
      
  return filteredProducts.length === 0 ? (
    <p className={styles.empty}>Товаров по вашему запросу не найдено</p>
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
