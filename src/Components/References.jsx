import React from "react";
import { Tabs, Center } from "@mantine/core";
import {
  IconBook,
  IconGavel,
  IconSchool,
  IconFileReport,
} from "@tabler/icons-react";
import "./References.css";

const referencesData = [
  {
    title: "Quran",
    description: `'In twenty-nine occurrences in the Qur'an, the mention of zakat was preceded with that of prayer' - Islamweb`,
    links: [
      {
        label: "Associating the mention of zakat and prayers",
        url: "https://www.islamweb.net/en/fatwa/32528/significance-of-associating-the-mention-of-prayer-with-zakat-in-the-quran",
      },
      {
        label: "Summary of zakah rulings",
        url: "https://www.islamweb.net/en/article/185563/summary-of-zakah-rulings",
      },
    ],
    icon: <IconBook size={28} color="#ec2d24" />,
  },
  {
    title: "Fatwas",
    description:
      "Fatwas issued by Islamic scholars and authorities clarify the application of Nisab in modern contexts.",
    links: [
      {
        label: "Example of nisab in modern times",
        url: "https://www.islamweb.net/en/fatwa/470932/nisab-of-gold-and-silver-differ-in-value-which-one-to-opt-for",
      },
      {
        label: "Ruling of calculating Zakat",
        url: "https://islamqa.info/en/answers/93414/how-to-calculate-zakah-on-money-earned-during-the-year#:~:text=If%20it%20reaches%20the%20Nisab,of%20one%20tenth%20(2.5%25).",
      },
    ],
    icon: <IconGavel size={28} color="#ec2d24" />,
  },
  {
    title: "Scholars",
    description:
      "Renowned Islamic scholars have written extensively on the principles and calculations of Zakat.",
    icon: <IconSchool size={28} color="#ec2d24" />,
  },
  {
    title: "Hadith",
    description:
      "Various Hadiths from Prophet Muhammad (peace be upon him) provide guidance on Zakat and Nisab.",
    links: [
      {
        label: "Zakah wealth vs. Zakat Al-Fitr",
        url: "https://islamqa.info/en/answers/49632/the-difference-between-zakah-on-wealth-and-zakat-al-fitr",
      },
    ],
    icon: <IconFileReport size={28} color="#ec2d24" />,
  },
];

function References() {
  return (
    <div className="references-section" id="references">
      <Center mt={70}>
        <h3>References</h3>
      </Center>
      <Tabs
        defaultValue="0"
        orientation="vertical"
        classNames={{ tab: "custom-tab", panel: "custom-panel" }}
        mt={30}
        mb={100}
      >
        <Tabs.List>
          {referencesData.map((reference, index) => (
            <Tabs.Tab key={index} value={`${index}`} icon={reference.icon}>
              {reference.title}
            </Tabs.Tab>
          ))}
        </Tabs.List>

        {referencesData.map((reference, index) => (
          <Tabs.Panel key={index} value={`${index}`} className="custom-panel">
            <div className="reference-content">
              <p className="ref-icon">{reference.icon}</p>
              <p>{reference.description}</p>
              {reference.links && (
                <ul>
                  {reference.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a href={link.url} target="_blank" rel="noopener noreferrer">
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </Tabs.Panel>
        ))}
      </Tabs>
    </div>
  );
}

export default References;
