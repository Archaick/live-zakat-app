import React from 'react';
import { IconBook, IconGavel, IconSchool, IconFileReport, IconExternalLink } from '@tabler/icons-react';
import './References.css'

const referencesData = [
  {
    title: 'Quran',
    description: `'In twenty-nine occurrences in the Qur'an, the mention of zakat was preceded with that of prayer' - Islamweb`,
    links: [
      {
        label: 'Associating the mention of zakat and prayers',
        url: 'https://www.islamweb.net/en/fatwa/32528/significance-of-associating-the-mention-of-prayer-with-zakat-in-the-quran',
      },
      {
        label: 'Summary of zakah rulings',
        url: 'https://www.islamweb.net/en/article/185563/summary-of-zakah-rulings',
      },
    ],
    icon: IconBook,
  },
  {
    title: 'Fatwas',
    description: 'Fatwas issued by Islamic scholars and authorities clarify the application of Nisab in modern contexts.',
    links: [
      {
        label: 'Example of nisab in modern times',
        url: 'https://www.islamweb.net/en/fatwa/470932/nisab-of-gold-and-silver-differ-in-value-which-one-to-opt-for',
      },
      {
        label: 'Ruling of calculating Zakat',
        url: 'https://islamqa.info/en/answers/93414/how-to-calculate-zakah-on-money-earned-during-the-year#:~:text=If%20it%20reaches%20the%20Nisab,of%20one%20tenth%20(2.5%25).',
      },
    ],
    icon: IconGavel,
  },
  {
    title: 'Scholars',
    description: 'Renowned Islamic scholars have written extensively on the principles and calculations of Zakat.',
    icon: IconSchool,
  },
  {
    title: 'Hadith',
    description: 'Various Hadiths from Prophet Muhammad (peace be upon him) provide guidance on Zakat and Nisab.',
    links: [
      {
        label: 'Zakah wealth vs. Zakat Al-Fitr',
        url: 'https://islamqa.info/en/answers/49632/the-difference-between-zakah-on-wealth-and-zakat-al-fitr',
      },
    ],
    icon: IconFileReport,
  },
];

function References() {
  return (
    <div className="references-section">
      <div className="references-grid">
        {referencesData.map((reference, index) => (
          <div key={index} className="reference-card">
            <div className="reference-icon">{React.createElement(reference.icon)}</div>
            <h3>{reference.title}</h3>
            <p>{reference.description}</p>
            {reference.links && (
              <ul>
                {reference.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a href={link.url} target="_blank" rel="noopener noreferrer">
                      {link.label}
                      <IconExternalLink className="external-link-icon-src" />
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default References;
