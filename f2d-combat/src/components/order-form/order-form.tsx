import type { FormEvent } from 'react';
import { Button } from '../button/button';
import styles from './order-form.module.css';

interface FieldProps {
  id: string;
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  required?: boolean;
  min?: number;
  defaultValue?: string | number;
}

function handleSubmit(event: FormEvent<HTMLFormElement>) {
  event.preventDefault();
}

function Field({
  id,
  label,
  name,
  type = 'text',
  placeholder,
  autoComplete,
  required = false,
  min,
  defaultValue,
}: FieldProps) {
  return (
    <label className={styles.field} htmlFor={id}>
      <span className={styles.label}>
        {label}
        {required ? (
          <span className={styles.star} aria-hidden="true">
            *
          </span>
        ) : null}
      </span>
      <input
        className={styles.input}
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required={required}
        min={min}
        defaultValue={defaultValue}
      />
    </label>
  );
}

export function OrderForm() {
  return (
    <section className={styles.section} aria-labelledby="order-title">
      <div className={styles.panel}>
        <div className={styles.intro}>
          <p className={styles.kicker}>Заявка</p>
          <h2 id="order-title" className={styles.title}>
            Оформить заказ
          </h2>
          <p className={styles.text}>
            Укажите товар или артикул — мы свяжемся с вами и подтвердим наличие.
          </p>
        </div>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.grid}>
            <Field
              id="order-name"
              label="Имя"
              name="name"
              autoComplete="name"
              placeholder="Ваше имя"
              required
            />
            <Field
              id="order-phone"
              label="Телефон"
              name="phone"
              type="tel"
              autoComplete="tel"
              placeholder="+7 (900) 000-00-00"
              required
            />
            <Field
              id="order-product"
              label="Товар или артикул"
              name="product"
              placeholder="Например, OS15CVR"
              required
            />
            <Field
              id="order-quantity"
              label="Количество"
              name="quantity"
              type="number"
              min={1}
              defaultValue={1}
              required
            />
            <label className={styles.comment} htmlFor="order-comment">
              <span className={styles.label}>Комментарий</span>
              <textarea
                className={styles.textarea}
                id="order-comment"
                name="comment"
                rows={4}
                placeholder="Пожелания к заказу"
              />
            </label>
          </div>
          <div className={styles.submit}>
            <Button type="submit">Отправить заявку</Button>
          </div>
        </form>
      </div>
    </section>
  );
}
