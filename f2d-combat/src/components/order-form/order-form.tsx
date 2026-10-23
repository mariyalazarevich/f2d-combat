import { Controller, useForm, type UseFormRegisterReturn } from 'react-hook-form';
import { popularProducts } from '../../data/products';
import { Button } from '../button/button';
import { Dropdown } from '../dropdown/dropdown';
import styles from './order-form.module.css';

interface OrderFormValues {
  name: string;
  phone: string;
  product: string;
  quantity: number;
  comment: string;
}

interface FieldProps {
  id: string;
  label: string;
  registration: UseFormRegisterReturn;
  error?: string;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  required?: boolean;
  min?: number;
}

const namePattern = /^[\p{Script=Latin}\p{Script=Cyrillic}\- ]+$/u;

const articleOptions = popularProducts
  .filter(product => product.inStock)
  .map(product => ({
    id: product.id,
    value: product.article,
    label: product.article,
    description: product.name,
  }));

function validateName(value: string) {
  const trimmed = value.trim();
  if (!trimmed) {
    return 'Введите имя';
  }
  if (trimmed.length < 2) {
    return 'Имя должно быть не короче 2 символов';
  }
  if (!namePattern.test(trimmed)) {
    return 'Имя может содержать только буквы, пробел и дефис';
  }
  return true;
}

function validatePhone(value: string) {
  const digits = value.replace(/\D/g, '');
  if (!value.trim()) {
    return 'Введите телефон';
  }
  if (digits.length < 10 || digits.length > 11) {
    return 'Введите от 10 до 11 цифр';
  }
  return true;
}

function validateProduct(value: string) {
  if (!value.trim()) {
    return 'Выберите товар';
  }
  return true;
}
function validateQuantity(value: number) {
  if (value < 1) {
    return 'Количество должно быть больше 0';
  }
  if (!value) {
    return 'Введите количество';
  }
  return true;
}

function submitOrder() {}

function Field({
  id,
  label,
  registration,
  error,
  type = 'text',
  placeholder,
  autoComplete,
  required = false,
  min,
}: FieldProps) {
  const errorId = `${id}-error`;

  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor={id}>
        {label}
        {required ? (
          <span className={styles.star} aria-hidden="true">
            *
          </span>
        ) : null}
      </label>
      <input
        {...registration}
        className={error ? `${styles.input} ${styles.inputInvalid}` : styles.input}
        id={id}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        min={min}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
      />
      {error ? (
        <span id={errorId} className={styles.error} role="alert">
          {error}
        </span>
      ) : null}
    </div>
  );
}

export function OrderForm() {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<OrderFormValues>({
    mode: 'onSubmit',
    defaultValues: {
      name: '',
      phone: '',
      product: '',
      quantity: 1,
      comment: '',
    },
  });

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
        <form className={styles.form} noValidate onSubmit={handleSubmit(submitOrder)}>
          <div className={styles.grid}>
            <Field
              id="order-name"
              label="Имя"
              registration={register('name', { validate: validateName })}
              error={errors.name?.message}
              autoComplete="name"
              placeholder="Ваше имя"
              required
            />
            <Field
              id="order-phone"
              label="Телефон"
              registration={register('phone', { validate: validatePhone })}
              error={errors.phone?.message}
              type="tel"
              autoComplete="tel"
              placeholder="+7 (900) 000-00-00"
              required
            />
            <div className={styles.field}>
              <label className={styles.label} htmlFor="order-product">
                Артикул
                <span className={styles.star} aria-hidden="true">
                  *
                </span>
              </label>
              <Controller
                name="product"
                control={control}
                rules={{ validate: validateProduct }}
                render={({ field }) => (
                  <Dropdown
                    id="order-product"
                    name={field.name}
                    inputRef={field.ref}
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    options={articleOptions}
                    invalid={Boolean(errors.product)}
                    placeholder="Например, OS15CVR"
                    emptyText="Нет подходящих артикулов. Можно оставить введённый."
                  />
                )}
              />
              {errors.product?.message ? (
                <span id="order-product-error" className={styles.error} role="alert">
                  {errors.product.message}
                </span>
              ) : null}
            </div>
            <Field
              id="order-quantity"
              label="Количество"
              registration={register('quantity', { valueAsNumber: true, validate: validateQuantity })}
              type="number"
              error={errors.quantity?.message}
              min={1}
              required
            />
            <label className={styles.comment} htmlFor="order-comment">
              <span className={styles.label}>Комментарий</span>
              <textarea
                {...register('comment')}
                className={styles.textarea}
                id="order-comment"
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
