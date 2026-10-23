import { About } from '../../components/about/about';
import { Advantages } from '../../components/advantages/advantages';
import { Catalog } from '../../components/catalog/catalog';
import { Hero } from '../../components/hero/hero';
import { OrderForm } from '../../components/order-form/order-form';

export function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Advantages />
      <Catalog />
      <OrderForm />
    </>
  );
}
