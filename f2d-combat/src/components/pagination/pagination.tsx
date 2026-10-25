import styles from './pagination.module.css';

interface PaginationProps {
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ page, pageCount, onPageChange }: PaginationProps) {
  const pages = Array.from({ length: pageCount }, (_, index) => index + 1);

  return (
    <nav className={styles.nav} aria-label="Страницы каталога">
      <p className="visually-hidden" aria-live="polite">
        Страница {page} из {pageCount}
      </p>
      <button
        className={styles.button}
        type="button"
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
      >
        Назад
      </button>
      <ol className={styles.pages}>
        {pages.map(pageNumber => {
          const isCurrent = pageNumber === page;

          return (
            <li key={pageNumber}>
              <button
                className={isCurrent ? `${styles.button} ${styles.current}` : styles.button}
                type="button"
                aria-current={isCurrent ? 'page' : undefined}
                aria-label={`Страница ${pageNumber}`}
                disabled={isCurrent}
                onClick={() => onPageChange(pageNumber)}
              >
                {pageNumber}
              </button>
            </li>
          );
        })}
      </ol>
      <button
        className={styles.button}
        type="button"
        disabled={page >= pageCount}
        onClick={() => onPageChange(page + 1)}
      >
        Далее
      </button>
    </nav>
  );
}
