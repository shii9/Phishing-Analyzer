export interface ExampleDomain {
  id: string;
  title: string;
  category: 'safe' | 'suspicious' | 'phishing';
  technique?: string;
  content: string;
  description: string;
}

export const exampleDomains: ExampleDomain[] = [
  {
    id: 'safe-domain-1',
    title: 'Safe - Google',
    category: 'safe',
    content: 'google.com',
    description: 'Legitimate search engine and technology company. One of the most trusted domains worldwide with proper SSL certificates and extensive security measures.'
  },
  {
    id: 'safe-domain-2',
    title: 'Safe - GitHub',
    category: 'safe',
    content: 'github.com',
    description: 'Trusted platform for software development and version control. Used by millions of developers and backed by Microsoft with enterprise-grade security.'
  },
  {
    id: 'safe-domain-3',
    title: 'Safe - Amazon',
    category: 'safe',
    content: 'amazon.com',
    description: 'Legitimate e-commerce platform. Official Amazon domain with extensive security measures, SSL certificates, and trusted by billions of users worldwide.'
  },
  {
    id: 'suspicious-domain-1',
    title: 'Suspicious - Free Domain',
    category: 'phishing',
    content: 'account-update.club',
    description: 'Free domain extension (.club) often used for temporary malicious campaigns. Free domains are commonly associated with spam, phishing, and short-lived attacks.'
  },
  {
    id: 'suspicious-domain-2',
    title: 'Suspicious - Numbers Heavy',
    category: 'suspicious',
    content: 'site1234567890.com',
    description: 'Domain with excessive numbers, potentially indicating Domain Generation Algorithm (DGA) usage or automated domain registration for malicious purposes.'
  },
  {
    id: 'suspicious-domain-3',
    title: 'Suspicious - Long Domain',
    category: 'suspicious',
    content: 'verylongdomainnamethatlookssuspiciousandmightbeusedforphishing.com',
    description: 'Unusually long domain name that could indicate attempts to impersonate legitimate sites or bypass spam filters through character stuffing.'
  },
  {
    id: 'phishing-domain-1',
    title: 'Phishing - Bkash Fake',
    category: 'phishing',
    content: 'secure-bkash-login.ml',
    description: 'Fake Bkash domain using .ml TLD for credential theft. Attempts to impersonate legitimate Bkash login pages to steal financial information.'
  },
  {
    id: 'phishing-domain-2',
    title: 'Phishing - Bank Scam',
    category: 'phishing',
    content: 'online-banking-verify.ga',
    description: 'Fake banking domain using .ga TLD. Designed to look like legitimate banking verification pages while collecting sensitive financial data.'
  },
  {
    id: 'phishing-domain-3',
    title: 'Phishing - Microsoft Fake',
    category: 'phishing',
    content: 'microsoft-security-alert.xyz',
    description: 'Fake Microsoft domain using .xyz TLD. Attempts to impersonate legitimate Microsoft security notifications to trick users into providing credentials.'
  },
  {
    id: 'phishing-domain-4',
    title: 'Phishing - Lottery Scam',
    category: 'phishing',
    content: 'lottery-winner-claim.top',
    description: 'Fake lottery domain using .top TLD for prize scams. Promises large prizes to collect personal information and payment details.'
  },
  {
    id: 'safe-domain-4',
    title: 'Safe - International Domain',
    category: 'safe',
    technique: 'International domains',
    content: 'verizon.co.jp',
    description: 'Legitimate international domain for Verizon Japan. Uses country-code TLD (.jp) for regional business operations.'
  },
  {
    id: 'safe-domain-5',
    title: 'Safe - Academic Domain',
    category: 'safe',
    technique: 'International domains',
    content: 'harvard.edu',
    description: 'Trusted academic institution domain. Uses .edu TLD reserved for educational institutions in the United States.'
  },
  {
    id: 'suspicious-domain-4',
    title: 'Suspicious - Free TLD',
    category: 'phishing',
    technique: 'Free TLDs',
    content: 'quick-money.ga',
    description: 'Domain using .ga TLD, a free domain extension commonly abused for spam and phishing campaigns.'
  },
  {
    id: 'suspicious-domain-5',
    title: 'Suspicious - Punycode Domain',
    category: 'phishing',
    technique: 'Punycode domains',
    content: 'xn--g00gle-9bb.com',
    description: 'Punycode domain that visually resembles "g00gle.com" using homoglyph characters. Used in phishing attacks to impersonate legitimate sites.'
  },
  {
    id: 'phishing-domain-5',
    title: 'Phishing - Brand Impersonation',
    category: 'phishing',
    technique: 'Brand impersonation',
    content: 'support-apple-help.com',
    description: 'Fake Apple support domain attempting to impersonate official Apple customer service. Uses brand name to build trust and steal credentials.'
  }
];
