import { useMemo, useState, useSyncExternalStore } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../app/store';
import type { Product } from '../../data/products';
import { Pagination } from '../pagination/pagination';
import { ProductCard } from '../product-card/product-card';
import styles from './product-grid.module.css';

interface ProductGridProps {
  products: Product[];
}

const DESKTOP_MEDIA_QUERY = '(min-width: 1024px)';
const MOBILE_PAGE_SIZE = 10;
const DESKTOP_PAGE_SIZE = 20;

function subscribeToDesktop(onStoreChange: () => void) {
  const media = window.matchMedia(DESKTOP_MEDIA_QUERY);
  media.addEventListener('change', onStoreChange);
  window.addEventListener('resize', onStoreChange);
  return () => {
    media.removeEventListener('change', onStoreChange);
    window.removeEventListener('resize', onStoreChange);
  };
}

function getIsDesktop() {
  return window.matchMedia(DESKTOP_MEDIA_QUERY).matches;
}

function useCatalogPageSize() {
  const isDesktop = useSyncExternalStore(subscribeToDesktop, getIsDesktop, () => false);
  return isDesktop ? DESKTOP_PAGE_SIZE : MOBILE_PAGE_SIZE;
}

function scrollToCatalogTitle() {
  document.getElementById('catalog-title')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export function ProductGrid({ products }: ProductGridProps) {
  const categorie = useSelector((state: RootState) => state.categorie.categorie);
  const searchQuery = useSelector((state: RootState) => state.searchQuery.searchQuery);
  const pageSize = useCatalogPageSize();
  const filterKey = `${categorie}\0${searchQuery}`;
  const [page, setPage] = useState(1);
  const [seenFilter, setSeenFilter] = useState(filterKey);
  const filteredProducts = useMemo(() => {
    return [...products]
      .filter(product => {
        if (categorie === 'all_categories') {
          return true;
        }
        return product.category.includes(categorie);
      })
      .filter(product => {
        if (searchQuery.length === 0) {
          return true;
        }
        return (
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.article.toLowerCase().includes(searchQuery.toLowerCase())
        );
      });
  }, [products, categorie, searchQuery]);
  const pageCount = Math.max(1, Math.ceil(filteredProducts.length / pageSize));
  let visiblePage = page;

  if (seenFilter !== filterKey) {
    visiblePage = 1;
    setSeenFilter(filterKey);
  }

  if (visiblePage > pageCount) {
    visiblePage = pageCount;
  }

  if (visiblePage !== page) {
    setPage(visiblePage);
  }

  function handlePageChange(nextPage: number) {
    setPage(nextPage);
    scrollToCatalogTitle();
  }

  if (filteredProducts.length === 0) {
    return <p className={styles.empty}>Товаров по вашему запросу не найдено</p>;
  }

  const start = (visiblePage - 1) * pageSize;
  const visibleProducts = filteredProducts.slice(start, start + pageSize);

  return (
    <>
      <ul className={styles.grid}>
        {visibleProducts.map(product => (
          <li key={product.id} className={styles.item}>
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
      <Pagination page={visiblePage} pageCount={pageCount} onPageChange={handlePageChange} />
    </>
  );
}
