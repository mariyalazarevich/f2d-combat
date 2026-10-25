import type { MouseEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../app/store';
import { categoryIcons } from '../../data/categoryIcons';
import type { Category } from '../../data/categories';
import { EStatus } from '../../enumeration/statusEnum';
import { setCategorie } from '../../features/categorie/setActiveCategorie';
import { IconSlot } from '../icon-slot/icon-slot';
import styles from './category-list.module.css';

interface CategoryListProps {
  categories: Category[];
  onSelect?: (categoryId: string) => void;
}

export function CategoryList({ categories, onSelect }: CategoryListProps) {
  const dispatch = useDispatch();
  const selectedId = useSelector((state: RootState) => state.categorie.categorie);
  const counts = useSelector((state: RootState) => state.categoryCounts.counts);
  const productsStatus = useSelector((state: RootState) => state.products.status);

  function onCategorieClick(event: MouseEvent<HTMLAnchorElement>, categoryId: string) {
    event.preventDefault();
    dispatch(setCategorie(categoryId));
    onSelect?.(categoryId);
  }

  return (
    <ul className={styles.list}>
      {categories.map(category => {
        const isActive = category.id === selectedId;
        const className = isActive ? `${styles.link} ${styles.active}` : styles.link;
        const iconSrc = categoryIcons[category.id];

        return (
          <li key={category.id}>
            <a
              className={className}
              href="#"
              aria-current={isActive ? 'page' : undefined}
              onClick={event => onCategorieClick(event, category.id)}
            >
              {iconSrc ? (
                <img className={styles.icon} src={iconSrc} alt={category.icon} />
              ) : (
                <IconSlot name={category.icon} size={18} />
              )}
              <span className={styles.name}>{category.name}</span>
              <span className={styles.count}>
                {productsStatus === EStatus.successfull ? (counts[category.id] ?? 0) : '—'}
              </span>
            </a>
          </li>
        );
      })}
    </ul>
  );
}
