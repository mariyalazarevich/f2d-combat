import { useEffect, useId, useRef, useState, type ChangeEvent, type FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../app/store';
import searchIcon from '../../assets/search.svg';
import { getCategoryIcon } from '../../data/categoryIcons';
import { categories } from '../../data/categories';
import {setSearchQuery} from '../../features/searchQuery/setSearchQuery';
import { CategoryList } from '../category-list/category-list';
import { ProductGrid } from '../product-grid/product-grid';
import styles from './catalog.module.css';

function handleSearchSubmit(event: FormEvent<HTMLFormElement>) {
  event.preventDefault();
}

export function Catalog() {
  const dispatch = useDispatch();
  const searchQuery = useSelector((state: RootState) => state.searchQuery.searchQuery);
  const categorie = useSelector((state: RootState) => state.categorie.categorie);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const categoriesRef = useRef<HTMLDivElement>(null);
  const categoriesListId = useId();
  const selectedCategory = categories.find(category => category.id === categorie);
  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(event.target.value as string));
  };

  useEffect(() => {
    if (!categoriesOpen) {
      return;
    }

    function handlePointerDown(event: PointerEvent) {
      if (!categoriesRef.current?.contains(event.target as Node)) {
        setCategoriesOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setCategoriesOpen(false);
      }
    }

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [categoriesOpen]);

  return (
    <section className={styles.section} id="catalog" aria-labelledby="catalog-title">
      <div className={styles.sidebar}>
        <CategoryList categories={categories} />
      </div>
      <div className={styles.content}>
        <h2 id="catalog-title" className={styles.title}>
          Каталог
        </h2>
        <div className={styles.toolbar}>
          <div
            ref={categoriesRef}
            className={
              categoriesOpen
                ? `${styles.categoriesMenu} ${styles.categoriesMenuOpen}`
                : styles.categoriesMenu
            }
          >
            <button
              type="button"
              className={styles.categoriesButton}
              aria-label={
                selectedCategory ? `Категории, выбрано: ${selectedCategory.name}` : 'Категории'
              }
              aria-expanded={categoriesOpen}
              aria-controls={categoriesListId}
              onClick={() => setCategoriesOpen(open => !open)}
            >
              <img src={getCategoryIcon(categorie)} alt="" />
            </button>
            {categoriesOpen ? (
              <div className={styles.categoriesPanel} id={categoriesListId}>
                <CategoryList categories={categories} onSelect={() => setCategoriesOpen(false)} />
              </div>
            ) : null}
          </div>
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
        </div>
        <ProductGrid />
      </div>
    </section>
  );
}
