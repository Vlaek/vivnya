import { useTranslation } from 'react-i18next';

export function About() {
  const { t } = useTranslation();

  const facts = [
    ['about.specialtyLabel', 'about.specialty'],
    ['about.toolsLabel', 'about.tools'],
    ['about.interestLabel', 'about.interest'],
  ] as const;

  return (
    <section className="about section-shell" id="about" aria-labelledby="about-title">
      <div className="section-heading about__heading">
        <p className="section-eyebrow">{t('about.eyebrow')}</p>
        <h2 id="about-title">{t('about.title')}</h2>
      </div>
      <div className="about__content">
        <p className="about__lead">{t('about.lead')}</p>
        <p className="about__body">{t('about.body')}</p>
      </div>
      <dl className="about__facts">
        {facts.map(([label, value]) => (
          <div key={label}>
            <dt>{t(label)}</dt>
            <dd className="flex flex-col gap-1">
              {(t(value, { returnObjects: true }) as string[]).map((item) => (
                <span key={item}>{item}</span>
              ))}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
