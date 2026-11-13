export type DomainInfo = { value: string; icon: string; text: string };

export const domains: DomainInfo[] = [
  {
    value: "js",
    icon: "👩‍💻",
    text: "JS Quiz"
  },
  {
    value: "js-homework",
    icon: "📗",
    text: "HTML / CSS / JS Homework"
  },
  {
    value: "math",
    icon: "🧮",
    text: "Basic Math Quiz"
  },
  {
    value: "bible",
    icon: "📖",
    text: "Olimpiada Biblică"
  }
];

export function getDomainInfo(domain: string): DomainInfo | undefined {
  return domains.find(d => d.value === domain);
}
