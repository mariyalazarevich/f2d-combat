import type { ChangeEvent, FormEvent } from 'react';
import searchIcon from '../../assets/search.svg';
import { categories } from '../../data/categories';
import { CategoryList } from '../category-list/category-list';
import { ProductGrid } from '../product-grid/product-grid';
import styles from './catalog.module.css';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../app/store';
import {setSearchQuery} from '../../features/searchQuery/setSearchQuery';

function handleSearchSubmit(event: FormEvent<HTMLFormElement>) {
  event.preventDefault();
}

export function Catalog() {
  const dispatch = useDispatch();
  const searchQuery = useSelector((state: RootState) => state.searchQuery.searchQuery);
  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(event.target.value as string));
  };
  return (
    <section className={styles.section} id="catalog" aria-labelledby="catalog-title">
      <div className={styles.sidebar}>
        <CategoryList categories={categories} activeId="all_categories" />
      </div>
      <div className={styles.content}>
        <h2 id="catalog-title" className={styles.title}>
          Каталог
        </h2>
        <form className={styles.search} role="search" onSubmit={handleSearchSubmit}>
          <label className="visually-hidden" htmlFor="catalog-search">
            Поиск по названию или артикулу
          </label>
          <img className={styles.searchIcon} src={searchIcon} alt="" />
          <input
            id="catalog-search"
            name="query"
            type="search"
            placeholder="Поиск по названию или артикулу..."
            enterKeyHint="search"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </form>
        <ProductGrid />
      </div>
    </section>
  );
}
