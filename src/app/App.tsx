import { useTranslation } from 'react-i18next';
import { Header } from '../components/Header';
import { Hero } from '../components/Hero';
import { WorkGrid } from '../components/WorkGrid';
import { About } from '../components/About';
import { Contact } from '../components/Contact';

export function App() {
  const { t } = useTranslation();

  return (
    <>
      <a className="skip-link" href="#main-content">{t('a11y.skip')}</a>
      <Header />
      <main id="main-content">
        <Hero />
        <WorkGrid />
        <About />
        <Contact />
      </main>
    </>
  );
}
