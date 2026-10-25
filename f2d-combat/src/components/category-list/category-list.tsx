import { useState, type MouseEvent } from 'react';
import allCategoriesIcon from '../../assets/all_categories.svg';
import bearingIcon from '../../assets/bearing.svg';
import chassisIcon from '../../assets/chassis.svg';
import electronicsIcon from '../../assets/electronics.svg';
import engineIcon from '../../assets/engine.svg';
import fuelIcon from '../../assets/fuel.svg';
import othersIcon from '../../assets/others.svg';
import toolsIcon from '../../assets/tools.svg';
import type { Category } from '../../data/categories';
import { IconSlot } from '../icon-slot/icon-slot';
import styles from './category-list.module.css';
import type { RootState } from '../../app/store';
import { EStatus } from '../../enumeration/statusEnum';
import { setCategorie } from '../../features/categorie/setActiveCategorie';
import { useDispatch, useSelector } from 'react-redux';

interface CategoryListProps {
  categories: Category[];
  activeId: string;
}

const categoryIcons: Record<string, string> = {
  all_categories: allCategoriesIcon,
  bearing: bearingIcon,
  chassis: chassisIcon,
  electronics: electronicsIcon,
  engine: engineIcon,
  fuel: fuelIcon,
  others: othersIcon,
  tools: toolsIcon,
};

export function CategoryList({ categories, activeId}: CategoryListProps) {
  const [selectedId, setSelectedId] = useState(activeId);
  const dispatch = useDispatch();
  const counts = useSelector((state: RootState) => state.categoryCounts.counts);
  const productsStatus = useSelector((state: RootState) => state.products.status);

  function onCategorieClick(event: MouseEvent<HTMLAnchorElement>, categoryId: string) {
    event.preventDefault();
    setSelectedId(categoryId);
    dispatch(setCategorie(categoryId));
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
