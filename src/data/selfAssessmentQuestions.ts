export interface AssessmentQuestion {
  id: number;
  text: string;
  options: AssessmentOption[];
}

export interface AssessmentOption {
  key: string;
  text: string;
  weight: number;
  feedback?: string;
}

export const selfAssessmentQuestions: AssessmentQuestion[] = [
  {
    id: 1,
    text: "Do you reuse passwords across sites?",
    options: [
      { key: "never", text: "Never", weight: 0, feedback: "Excellent! Unique passwords for each site significantly reduce your risk." },
      { key: "sometimes", text: "Sometimes", weight: 5, feedback: "Consider using a password manager to maintain unique passwords everywhere." },
      { key: "often", text: "Often", weight: 15, feedback: "Reusing passwords is a major security risk. Use a password manager and enable unique passwords." }
    ]
  },
  {
    id: 2,
    text: "Do you use a password manager?",
    options: [
      { key: "yes", text: "Yes", weight: 0, feedback: "Great! Password managers help create and store strong, unique passwords." },
      { key: "no", text: "No", weight: 10, feedback: "Consider using a password manager like LastPass, Bitwarden, or 1Password to improve security." }
    ]
  },
  {
    id: 3,
    text: "Is two-factor authentication (2FA) enabled on your important accounts (email, bank)?",
    options: [
      { key: "all", text: "All accounts", weight: 0, feedback: "Perfect! 2FA provides an extra layer of security beyond passwords." },
      { key: "some", text: "Some accounts", weight: 5, feedback: "Enable 2FA on all critical accounts - it's easy and highly effective." },
      { key: "none", text: "None", weight: 15, feedback: "2FA is crucial for account security. Enable it on email and banking accounts immediately." }
    ]
  },
  {
    id: 4,
    text: "How often do you check your bank/credit statements?",
    options: [
      { key: "weekly", text: "Weekly", weight: 0, feedback: "Excellent! Regular monitoring helps detect unauthorized transactions early." },
      { key: "monthly", text: "Monthly", weight: 5, feedback: "Consider checking more frequently to catch suspicious activity sooner." },
      { key: "rarely", text: "Rarely", weight: 15, feedback: "Regular statement reviews are essential for detecting fraud. Set up alerts for unusual activity." }
    ]
  },
  {
    id: 5,
    text: "Do you share personal info (DOB, SSN/national ID, phone) publicly on social media?",
    options: [
      { key: "never", text: "Never", weight: 0, feedback: "Smart choice! Keep personal information private to prevent identity theft." },
      { key: "sometimes", text: "Sometimes", weight: 10, feedback: "Be cautious about sharing personal information online. Review and remove sensitive posts." },
      { key: "often", text: "Often", weight: 20, feedback: "Sharing personal information publicly increases identity theft risk. Remove sensitive information from social media." }
    ]
  },
  {
    id: 6,
    text: "Do you click links from unknown email senders?",
    options: [
      { key: "never", text: "Never", weight: 0, feedback: "Excellent! Never clicking unknown links prevents most phishing attacks." },
      { key: "sometimes", text: "Sometimes", weight: 7, feedback: "Hover over links to check destinations before clicking. Be very cautious with unsolicited emails." },
      { key: "often", text: "Often", weight: 15, feedback: "Clicking unknown links is extremely risky. Verify sender legitimacy and link destinations first." }
    ]
  },
  {
    id: 7,
    text: "Do you use public Wi-Fi for sensitive transactions?",
    options: [
      { key: "never", text: "Never", weight: 0, feedback: "Wise choice! Public Wi-Fi can be insecure for sensitive activities." },
      { key: "with-vpn", text: "With VPN", weight: 3, feedback: "Good! VPNs encrypt your traffic on public networks." },
      { key: "often", text: "Often without VPN", weight: 15, feedback: "Public Wi-Fi without VPN protection exposes your data. Use a VPN for sensitive transactions." }
    ]
  },
  {
    id: 8,
    text: "Do you shred or securely delete documents with personal info?",
    options: [
      { key: "yes", text: "Yes", weight: 0, feedback: "Excellent! Proper document disposal prevents dumpster diving attacks." },
      { key: "sometimes", text: "Sometimes", weight: 7, feedback: "Make secure disposal a habit for all documents containing personal information." },
      { key: "no", text: "No", weight: 12, feedback: "Secure document disposal is important. Use shredding or secure deletion methods." }
    ]
  },
  {
    id: 9,
    text: "Have you ever had an account compromised / notified about a data breach?",
    options: [
      { key: "no", text: "No", weight: 0, feedback: "Great! Maintaining good security habits helps prevent compromises." },
      { key: "one", text: "Yes, one time", weight: 8, feedback: "Learn from the experience. Change passwords and enable 2FA on affected accounts." },
      { key: "multiple", text: "Yes, multiple times", weight: 18, feedback: "Multiple compromises indicate security gaps. Consider professional security assessment." }
    ]
  },
  {
    id: 10,
    text: "Do you store sensitive data (copies of ID, passports) on cloud without encryption?",
    options: [
      { key: "no", text: "No sensitive data stored", weight: 0, feedback: "Best practice! Avoid storing sensitive documents in the cloud when possible." },
      { key: "encrypted", text: "Encrypted storage", weight: 2, feedback: "Good! Encryption protects your data even if accessed by unauthorized parties." },
      { key: "unencrypted", text: "Unencrypted storage", weight: 18, feedback: "Unencrypted sensitive data in the cloud is highly vulnerable. Use encrypted storage or avoid cloud storage." }
    ]
  },
  {
    id: 11,
    text: "How often do you regularly update OS/apps?",
    options: [
      { key: "always", text: "Always keep updated", weight: 0, feedback: "Perfect! Regular updates patch security vulnerabilities." },
      { key: "sometimes", text: "Sometimes", weight: 6, feedback: "Enable automatic updates to ensure you get security patches promptly." },
      { key: "rarely", text: "Rarely", weight: 12, feedback: "Outdated software contains known vulnerabilities. Enable automatic updates immediately." }
    ]
  },
  {
    id: 12,
    text: "Do you use biometric or device PIN on your phone?",
    options: [
      { key: "yes", text: "Yes", weight: 0, feedback: "Excellent! Strong device security protects all your data." },
      { key: "no", text: "No", weight: 10, feedback: "Enable biometric authentication or a strong PIN to secure your mobile device." }
    ]
  },
  {
    id: 13,
    text: "Do you monitor your credit score / credit lock?",
    options: [
      { key: "yes", text: "Yes", weight: 0, feedback: "Great! Credit monitoring helps detect identity theft early." },
      { key: "no", text: "No", weight: 10, feedback: "Consider monitoring your credit score and using credit freeze features." }
    ]
  },
  {
    id: 14,
    text: "Do you have separate email for critical accounts (bank, recovery)?",
    options: [
      { key: "yes", text: "Yes", weight: 0, feedback: "Smart! Separate emails reduce the impact of a single account compromise." },
      { key: "no", text: "No", weight: 8, feedback: "Consider creating dedicated email addresses for banking and account recovery." }
    ]
  },
  {
    id: 15,
    text: "Do you respond to unsolicited calls asking for personal info?",
    options: [
      { key: "never", text: "Never", weight: 0, feedback: "Excellent! Legitimate organizations don't ask for sensitive information over unsolicited calls." },
      { key: "sometimes", text: "Sometimes", weight: 6, feedback: "Be very cautious with unsolicited calls. Verify caller identity through official channels." },
      { key: "always", text: "Always", weight: 15, feedback: "Responding to unsolicited calls requesting personal information is extremely risky. Never share sensitive data this way." }
    ]
  }
];

// Maximum raw score calculation
export const MAX_RAW_SCORE = selfAssessmentQuestions.reduce((total, question) => {
  const maxWeight = Math.max(...question.options.map(option => option.weight));
  return total + maxWeight;
}, 0);

// Risk category definitions
export interface RiskCategory {
  name: string;
  range: [number, number];
  color: string;
  description: string;
  recommendations: string[];
}

export const riskCategories: RiskCategory[] = [
  {
    name: "Low Risk",
    range: [0, 19],
    color: "#10B981", // green
    description: "Your security practices are excellent! Keep up the good work.",
    recommendations: [
      "Continue your current security practices",
      "Stay informed about emerging threats",
      "Consider helping others improve their security"
    ]
  },
  {
    name: "Low-Medium Risk",
    range: [20, 39],
    color: "#84CC16", // light green
    description: "Your security is generally good, but there are areas for improvement.",
    recommendations: [
      "Enable 2FA on remaining accounts",
      "Review and strengthen weak passwords",
      "Set up credit monitoring if not already done"
    ]
  },
  {
    name: "Medium Risk",
    range: [40, 59],
    color: "#F59E0B", // yellow
    description: "Your security needs attention. Several improvements are recommended.",
    recommendations: [
      "Implement a password manager",
      "Enable 2FA on all critical accounts",
      "Regularly update all software and devices",
      "Review cloud storage security"
    ]
  },
  {
    name: "High Risk",
    range: [60, 79],
    color: "#F97316", // orange
    description: "Your current practices put you at significant risk. Immediate action needed.",
    recommendations: [
      "URGENT: Change all reused passwords",
      "Enable 2FA everywhere possible",
      "Stop using public Wi-Fi for sensitive activities",
      "Securely delete or encrypt sensitive documents",
      "Update all software immediately"
    ]
  },
  {
    name: "Critical Risk",
    range: [80, 100],
    color: "#EF4444", // red
    description: "Your security practices are inadequate. You're highly vulnerable to attacks.",
    recommendations: [
      "CRITICAL: Complete security overhaul needed",
      "Change ALL passwords immediately",
      "Enable 2FA on every account",
      "Remove personal information from social media",
      "Use encrypted storage only",
      "Consider professional security consultation"
    ]
  }
];
