import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { Controller, useForm, type UseFormRegisterReturn } from 'react-hook-form';
import type { RootState } from '../../app/store';
import { EStatus } from '../../enumeration/statusEnum';
import { Button } from '../button/button';
import { Dropdown, type DropdownOption } from '../dropdown/dropdown';
import { formatProductChoice } from '../../utils/format-product-choice';
import styles from './order-form.module.css';

interface ProductOption extends DropdownOption {
  productName: string;
  article: string;
}

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
  if (digits.length < 11 || digits.length > 12) {
    return 'Введите корректный номер телефона';
  }
  return true;
}

function validateProduct(value: string, options: ProductOption[]) {
  const trimmed = value.trim();
  if (!trimmed) {
    return 'Выберите товар';
  }
  if (!options.some(option => option.value === trimmed)) {
    return 'Выберите товар из списка';
  }
  return true;
}
function validateQuantity(value: number) {
  if (!Number.isFinite(value)) {
    return 'Введите количество';
  }
  if (!Number.isInteger(value) || value < 1) {
    return 'Количество должно быть целым числом больше 0';
  }
  return true;
}

async function submitOrder(values: OrderFormValues, product: ProductOption) {
  const response = await fetch('http://localhost:8000/api/orders/order', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({
      name: values.name.trim(),
      phone: values.phone.trim(),
      productName: product.productName,
      article: product.article,
      quantity: values.quantity,
      comment: values.comment.trim(),
    }),
  });
  const data = (await response.json().catch(() => null)) as { errorMessage?: string } | null;

  if (!response.ok) {
    throw new Error(data?.errorMessage || 'Не удалось отправить заявку');
  }
}

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
  const { productName, article, requestId } = useSelector((state: RootState) => state.orderArticle);
  const { products, status: productsStatus } = useSelector((state: RootState) => state.products);
  const articleOptions = useMemo(
    () =>
      products
        .filter(product => typeof product.article === 'string' && product.article.trim().length > 0)
        .map(product => {
          const productArticle = product.article.trim();
          const name = typeof product.name === 'string' ? product.name.trim() : '';

          return {
            id: product._id,
            value: formatProductChoice(name, productArticle),
            label: name || productArticle,
            description: productArticle,
            productName: name || productArticle,
            article: productArticle,
          };
        }),
    [products]
  );
  const productEmptyText =
    productsStatus === EStatus.idle || productsStatus === EStatus.loading
      ? 'Каталог загружается...'
      : productsStatus === EStatus.error
        ? 'Не удалось загрузить товары'
        : 'Нет подходящих товаров';
  const [submitError, setSubmitError] = useState('');
  const [isSent, setIsSent] = useState(false);
  const {
    register,
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
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

  useEffect(() => {
    if (requestId === 0) {
      return;
    }

    setValue('product', formatProductChoice(productName, article), {
      shouldDirty: true,
      shouldValidate: true,
    });
  }, [article, productName, requestId, setValue]);

  return (
    <section className={styles.section} id="order" aria-labelledby="order-title">
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
        <form
          className={styles.form}
          noValidate
          onSubmit={handleSubmit(async values => {
            setSubmitError('');
            setIsSent(false);

            const selected = articleOptions.find(option => option.value === values.product.trim());
            if (!selected) {
              setSubmitError('Выберите товар из списка');
              return;
            }

            try {
              await submitOrder(values, selected);
              setIsSent(true);
              reset();
            } catch (error) {
              setSubmitError(error instanceof Error ? error.message : 'Не удалось отправить заявку');
            }
          })}
        >
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
              placeholder="+375 (XX) XXX-XX-XX"
              required
            />
            <div className={styles.field}>
              <label className={styles.label} htmlFor="order-product">
                Товар
                <span className={styles.star} aria-hidden="true">
                  *
                </span>
              </label>
              <Controller
                name="product"
                control={control}
                rules={{ validate: value => validateProduct(value, articleOptions) }}
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
                    placeholder="Название или артикул"
                    emptyText={productEmptyText}
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
          {submitError ? (
            <p className={styles.error} role="alert">
              {submitError}
            </p>
          ) : null}
          {isSent ? (
            <p className={styles.success} role="status">
              Заявка отправлена. Мы свяжемся с вами.
            </p>
          ) : null}
          <div className={styles.submit}>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Отправляем...' : 'Отправить заявку'}
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}
