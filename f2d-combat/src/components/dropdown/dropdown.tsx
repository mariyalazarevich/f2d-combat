import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from 'react';
import styles from './dropdown.module.css';

export interface DropdownOption {
  id: string;
  value: string;
  label: string;
  description?: string;
}

interface DropdownProps {
  id: string;
  name: string;
  options: DropdownOption[];
  placeholder?: string;
  required?: boolean;
  emptyText?: string;
}

function highlightMatch(text: string, query: string): ReactNode {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    return text;
  }

  const matchIndex = text.toLowerCase().indexOf(normalizedQuery);

  if (matchIndex < 0) {
    return text;
  }

  const matchEnd = matchIndex + normalizedQuery.length;

  return (
    <>
      {text.slice(0, matchIndex)}
      <mark className={styles.match}>{text.slice(matchIndex, matchEnd)}</mark>
      {text.slice(matchEnd)}
    </>
  );
}

function optionMatches(option: DropdownOption, query: string) {
  return option.value.toLowerCase().includes(query) || option.label.toLowerCase().includes(query);
}

export function Dropdown({
  id,
  name,
  options,
  placeholder,
  required = false,
  emptyText = 'Ничего не найдено',
}: DropdownProps) {
  const listId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState('');
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const visibleOptions = useMemo(() => {
    const query = value.trim().toLowerCase();

    if (!query) {
      return options;
    }

    return options.filter(option => optionMatches(option, query));
  }, [options, value]);

  const highlightedIndex =
    visibleOptions.length === 0 ? -1 : Math.min(activeIndex, visibleOptions.length - 1);
  const activeOptionId =
    highlightedIndex >= 0 ? `${listId}-option-${visibleOptions[highlightedIndex].id}` : undefined;

  useEffect(() => {
    if (!open || highlightedIndex < 0) {
      return;
    }

    const list = rootRef.current?.querySelector('[role="listbox"]');
    const option = rootRef.current?.querySelector('[data-active="true"]');

    if (!(list instanceof HTMLElement) || !(option instanceof HTMLElement)) {
      return;
    }

    const optionTop = option.offsetTop;
    const optionBottom = optionTop + option.offsetHeight;

    if (optionTop < list.scrollTop) {
      list.scrollTop = optionTop;
    } else if (optionBottom > list.scrollTop + list.clientHeight) {
      list.scrollTop = optionBottom - list.clientHeight;
    }
  }, [open, highlightedIndex]);

  function selectOption(option: DropdownOption) {
    setValue(option.value);
    setOpen(false);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setOpen(true);
      setActiveIndex(index => {
        if (!open || visibleOptions.length === 0) {
          return 0;
        }

        return Math.min(index + 1, visibleOptions.length - 1);
      });
      return;
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      setOpen(true);
      setActiveIndex(index => {
        if (!open || visibleOptions.length === 0) {
          return 0;
        }

        return Math.max(index - 1, 0);
      });
      return;
    }

    if (event.key === 'Escape') {
      setOpen(false);
      return;
    }

    if (event.key === 'Enter' && open && highlightedIndex >= 0) {
      event.preventDefault();
      selectOption(visibleOptions[highlightedIndex]);
    }
  }

  return (
    <div ref={rootRef} className={open ? `${styles.root} ${styles.rootOpen}` : styles.root}>
      <input
        className={styles.input}
        id={id}
        name={name}
        type="text"
        role="combobox"
        placeholder={placeholder}
        autoComplete="off"
        required={required}
        value={value}
        aria-expanded={open}
        aria-controls={listId}
        aria-autocomplete="list"
        aria-activedescendant={open ? activeOptionId : undefined}
        onChange={event => {
          setValue(event.target.value);
          setOpen(true);
          setActiveIndex(0);
        }}
        onFocus={() => {
          setOpen(true);
          setActiveIndex(0);
        }}
        onBlur={() => setOpen(false)}
        onKeyDown={handleKeyDown}
      />
      {open ? (
        <ul className={styles.list} id={listId} role="listbox">
          {visibleOptions.length === 0 ? (
            <li className={styles.empty}>{emptyText}</li>
          ) : (
            visibleOptions.map((option, index) => (
              <li key={option.id} role="presentation">
                <button
                  type="button"
                  id={`${listId}-option-${option.id}`}
                  className={
                    index === highlightedIndex
                      ? `${styles.option} ${styles.optionActive}`
                      : styles.option
                  }
                  role="option"
                  aria-selected={index === highlightedIndex}
                  data-active={index === highlightedIndex ? 'true' : undefined}
                  onMouseDown={event => event.preventDefault()}
                  onMouseEnter={() => setActiveIndex(index)}
                  onClick={() => selectOption(option)}
                >
                  <span className={styles.optionLabel}>{highlightMatch(option.label, value)}</span>
                  {option.description ? (
                    <span className={styles.optionDescription}>{option.description}</span>
                  ) : null}
                </button>
              </li>
            ))
          )}
        </ul>
      ) : null}
    </div>
  );
}
