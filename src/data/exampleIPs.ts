export interface ExampleIP {
  id: string;
  title: string;
  category: 'safe' | 'suspicious' | 'phishing';
  technique?: string;
  content: string;
  description: string;
}

export const exampleIPs: ExampleIP[] = [
  {
    id: 'safe-ip-1',
    title: 'Safe - Google DNS',
    category: 'safe',
    content: '8.8.8.8',
    description: 'Google Public DNS server - legitimate infrastructure used by millions worldwide for DNS resolution. This is a well-known and trusted public service.'
  },
  {
    id: 'safe-ip-2',
    title: 'Safe - Cloudflare DNS',
    category: 'safe',
    content: '1.1.1.1',
    description: 'Cloudflare DNS resolver - trusted public DNS service known for privacy and speed. Used by many organizations and individuals globally.'
  },
  {
    id: 'safe-ip-3',
    title: 'Safe - GitHub',
    category: 'safe',
    content: '140.82.121.4',
    description: 'GitHub\'s IP address - legitimate development platform. This IP belongs to GitHub\'s infrastructure and is safe for development activities.'
  },
  {
    id: 'suspicious-ip-1',
    title: 'Suspicious - Private Range',
    category: 'suspicious',
    content: '192.168.1.100',
    description: 'Private IP address in the 192.168.x.x range. Could be used in local network attacks or misconfigured services exposed to the internet.'
  },
  {
    id: 'suspicious-ip-2',
    title: 'Suspicious - Unusual Range',
    category: 'suspicious',
    content: '0.0.0.1',
    description: 'Reserved IP address (0.0.0.0/8 network) that might indicate configuration issues or attempts to bypass security filters.'
  },
  {
    id: 'suspicious-ip-3',
    title: 'Suspicious - Loopback',
    category: 'suspicious',
    content: '127.0.0.1',
    description: 'Localhost IP address that might be used in testing or could indicate misconfigured services. Sometimes used in malware command and control.'
  },
  {
    id: 'phishing-ip-1',
    title: 'Phishing - Fake Bkash',
    category: 'phishing',
    content: '203.0.113.10',
    description: 'Public test IP hosting a fake Bkash verification page (moved from private range to a distinct example). Attackers use public or private IPs to avoid domain-based detection and blacklisting.'
  },
  {
    id: 'phishing-ip-2',
    title: 'Phishing - Bank Scam',
    category: 'phishing',
    content: '10.0.0.50',
    description: 'Private IP address in the 10.x.x.x range hosting fake banking login pages. Commonly used in corporate network attacks or phishing campaigns.'
  },
  {
    id: 'phishing-ip-3',
    title: 'Phishing - Microsoft Fake',
    category: 'phishing',
    content: '192.168.0.50',
    description: 'Private IP address pretending to be Microsoft security alert page. Uses familiar branding to trick users into providing credentials.'
  },
  {
    id: 'phishing-ip-4',
    title: 'Phishing - Lottery Scam',
    category: 'phishing',
    content: '172.16.0.100',
    description: 'Private IP address in the 172.16.x.x range hosting fake lottery prize claim sites. Promises large prizes to collect personal information.'
  },
  {
    id: 'suspicious-ip-4',
    title: 'Suspicious - Private Network',
    category: 'suspicious',
    technique: 'Private IPs',
    content: '10.0.0.1',
    description: 'Private IP address in the 10.x.x.x range. Commonly used in corporate networks but can be suspicious when exposed publicly or used in phishing attempts.'
  },
  {
    id: 'suspicious-ip-5',
    title: 'Suspicious - Reserved Range',
    category: 'suspicious',
    technique: 'Reserved ranges',
    content: '192.0.2.1',
    description: 'IP address in the TEST-NET-1 reserved range (192.0.2.0/24). Used for documentation and testing, but suspicious when encountered in live traffic.'
  },
  {
    id: 'phishing-ip-5',
    title: 'Phishing - Fake C2 Server',
    category: 'phishing',
    technique: 'Malicious C2 IPs',
    content: '203.0.113.45',
    description: 'IP address in the TEST-NET-3 range being used as a fake command and control server. Malware often uses reserved ranges to avoid detection.'
  },
  {
    id: 'phishing-ip-6',
    title: 'Phishing - VPN Impersonation',
    category: 'phishing',
    technique: 'VPN/proxy IPs',
    content: '198.18.0.50',
    description: 'IP address in the benchmark testing range (198.18.0.0/15) disguised as a VPN service. Used to intercept traffic or steal credentials.'
  },
  {
    id: 'phishing-ip-7',
    title: 'Phishing - Proxy Scam',
    category: 'phishing',
    technique: 'VPN/proxy IPs',
    content: '100.64.0.10',
    description: 'IP address in the carrier-grade NAT range (100.64.0.0/10) hosting fake proxy services. Promises anonymity while logging all user activity.'
  }
];
