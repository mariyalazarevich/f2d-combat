import { categories } from '../../data/categories';
import { popularProducts } from '../../data/products';
import { CategoryList } from '../category-list/category-list';
import { ProductGrid } from '../product-grid/product-grid';
import styles from './catalog.module.css';

export function Catalog() {
  return (
    <section className={styles.section} id="catalog" aria-labelledby="catalog-title">
      <div className={styles.sidebar}>
        <CategoryList categories={categories} activeId="all_categories" />
      </div>
      <div className={styles.content}>
        <h2 id="catalog-title" className={styles.title}>
          Каталог
        </h2>
        <ProductGrid products={popularProducts} />
      </div>
    </section>
  );
}
