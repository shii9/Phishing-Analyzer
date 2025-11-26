export interface ExampleEmail {
  id: string;
  title: string;
  category: 'safe' | 'suspicious' | 'phishing';
  technique?: string;
  content: string;
  description: string;
}

export const exampleEmails: ExampleEmail[] = [
  {
    id: 'safe-1',
    title: 'Safe - Newsletter',
    category: 'safe',
    content: `Hi there,

Thank you for subscribing to our monthly newsletter. Here's what we have for you this month:

- New product launches
- Industry insights
- Upcoming events

You can view the full newsletter on our website at https://newsletter.example.com

Best regards,
The Example Team

Unsubscribe: https://example.com/unsubscribe`,
    description: 'Legitimate newsletter subscription email with clear unsubscribe options and standard business communication.'
  },
  {
    id: 'safe-2',
    title: 'Safe - Order Confirmation',
    category: 'safe',
    content: `Hi John Smith,

Thank you for your order #12345 from Example Store.

Order Details:
- Product: Wireless Headphones
- Price: $99.99
- Estimated Delivery: 3-5 business days

You can track your order at: https://example.com/orders/12345

If you have any questions, please reply to this email or contact us at support@example.com

Best regards,
Example Store Team`,
    description: 'Standard e-commerce order confirmation with order details, tracking information, and customer support contact.'
  },
  {
    id: 'safe-3',
    title: 'Safe - Amazon Bangladesh Order',
    category: 'safe',
    content: `Hello Mohammad Rahman,

Your Amazon.com.bd order #402-8934567-1234567 has been shipped!

Order Details:
- Book: "Thinking, Fast and Slow"
- Price: ৳399
- Delivery by: 15th March 2025

Track your shipment: https://amazon.com.bd/track/402-8934567-1234567

For any assistance, visit Amazon.com.bd Help Center or call 09610001000

Thanks,
Amazon Bangladesh Team`,
    description: 'Legitimate order shipment notification from Amazon Bangladesh with tracking details and customer support information.'
  },
  {
    id: 'suspicious-1',
    title: 'Suspicious - Urgent Action',
    category: 'suspicious',
    content: `Dear Valued Customer,

Your account requires immediate attention. Please verify your information within 24 hours to avoid suspension.

Click here to update your details: https://account-verify.example.tk

Thank you for your cooperation.

Customer Service Team`,
    description: 'Generic account verification request with urgency and suspicious domain (.tk). Creates pressure without specific account details.'
  },
  {
    id: 'suspicious-2',
    title: 'Suspicious - Generic Greeting',
    category: 'suspicious',
    content: `Dear Customer,

Kindly update your account information to continue using our services.

Please click the link below to verify your details:
https://account-update.club/verify

Thank you for your immediate attention to this matter.

Support Team`,
    description: 'Vague account update request with generic greeting and suspicious domain (.club). No specific service or account mentioned.'
  },
  {
    id: 'suspicious-3',
    title: 'Suspicious - Daraz Prize',
    category: 'suspicious',
    content: `Congratulations!

You have won ৳50,000 Daraz voucher in our lucky draw!

To claim your prize, click here: https://daraz-winner.club

Hurry! Offer valid for 24 hours only.

Daraz Customer Care`,
    description: 'Prize notification claiming to be from Daraz but using suspicious domain (.club). Creates urgency with time-limited offer.'
  },
  {
    id: 'suspicious-4',
    title: 'Suspicious - Grameenphone Recharge',
    category: 'suspicious',
    content: `Dear Grameenphone Customer,

Your mobile number is eligible for FREE lifetime data!

Claim now: https://grameenphone-free-data.tk

Limited offer! Click immediately to activate.

Customer Care Team`,
    description: 'Too-good-to-be-true offer claiming to be from Grameenphone but using suspicious domain (.tk). Promises unrealistic benefits.'
  },
  {
    id: 'phishing-1',
    title: 'Phishing - Bkash Scam',
    category: 'phishing',
    content: `Dear User,

We have detected unusual activity on your Bkash account. Your account has been temporarily suspended.

URGENT: Click here immediately to verify your identity: http://192.168.1.100/bkash-verify

You must confirm your password, credit card, and social security number within 24 hours or your account will be permanently locked.

Kindly update your information now to restore access.

Bkash Security Team
Click here now: http://bkash-security.tk/verify`,
    description: 'Classic phishing attempt impersonating Bkash with urgent account suspension threat and requests for sensitive information.'
  },
  {
    id: 'phishing-2',
    title: 'Phishing - Prize Winner',
    category: 'phishing',
    content: `Congratulations! You are a winner!

You have been selected to receive $1,000,000 in our annual lottery draw!

To claim your prize immediately, click here: https://lottery-claim.ml/winner

You must provide your bank account details and social security number to process the payment. This offer expires today!

Act now! Click here to claim your millions: https://prize-urgent.ga

Lottery Commission`,
    description: 'Lottery scam promising unrealistic prize money and requesting sensitive banking information. Uses multiple suspicious domains.'
  },
  {
    id: 'phishing-3',
    title: 'Phishing - Microsoft Alert',
    category: 'phishing',
    content: `Security Alert - Action Required

Dear Microsoft User,

We have detected suspicious login attempts to your account. Your account will be suspended unless you verify your identity immediately.

Click here now: http://192.168.0.50/microsoft-verify
Download this security update: https://microsoft-update.xyz/urgent

Please confirm your password and update payment information within 12 hours.

Urgent attention required!

Microsoft Security Team`,
    description: 'Fake Microsoft security alert with urgent account suspension threat and suspicious links requesting personal information.'
  },
  {
    id: 'phishing-4',
    title: 'Phishing - Bangladesh Railway Account',
    category: 'phishing',
    content: `Dear Bangladesh Railway Customer,

Your Bangladesh Railway account has been temporarily blocked due to suspicious activity.

URGENT: Verify your account immediately to avoid permanent suspension.

Click here: http://railway-verify.tk/login
Update your NID, TIN and payment details now!

This is your last warning! Act within 6 hours.

Bangladesh Railway Security Team`,
    description: 'Fake Bangladesh Railway account alert requesting sensitive government ID numbers and payment information.'
  },
  {
    id: 'phishing-5',
    title: 'Phishing - Sonali Bank KYC Update',
    category: 'phishing',
    content: `Dear Sonali Bank Customer,

Your KYC details are pending verification. Your account will be blocked if not updated immediately.

URGENT ACTION REQUIRED:
Click here: http://192.168.1.88/sonali-kyc
Update NID, TIN, and mobile number
Confirm ATM PIN and CVV number

Complete within 12 hours or face account suspension.

Sonali Bank
Customer Service`,
    description: 'Fake Sonali Bank KYC update request asking for sensitive banking and personal information with urgent deadline.'
  },
  {
    id: 'phishing-6',
    title: 'Phishing - Bkash Wallet',
    category: 'phishing',
    content: `Alert! Your Bkash Wallet

Dear User,

Your Bkash wallet has been temporarily locked due to KYC non-compliance.

IMMEDIATE ACTION: Click here to update KYC: http://bkash-kyc.ml/verify

Please provide:
- NID details
- TIN number
- Bank account and mobile PIN
- Complete within 24 hours!

Download attachment to complete verification.

Bkash Security`,
    description: 'Fake Bkash wallet alert requesting KYC information and banking details with attachment download.'
  },
  {
    id: 'phishing-7',
    title: 'Phishing - Investment Scam',
    category: 'phishing',
    technique: 'Investment Scam',
    content: `Dear Investor,

Congratulations! Your investment portfolio has generated exceptional returns this quarter.

Please wire the funds to:
Bank: HSBC Private Banking
Account Name: Global Investment Partners LLC
Account Number: 123456789012

Contact our financial advisor immediately to process your withdrawal.

Investment Management Team`,
    description: 'Investment scam promising exceptional returns and requesting wire transfer to suspicious account.'
  },
  {
    id: 'phishing-8',
    title: 'Phishing - Romance Scam',
    category: 'phishing',
    technique: 'Romance Scam',
    content: `My Dearest Love,

I hope this email finds you well. I have been thinking about you constantly since our last conversation.

I am an oil executive working in Nigeria and I have come across a substantial amount of money that needs to be transferred out of the country. This is completely legitimate and I need your help as a trusted partner.

Please provide your bank details so I can transfer $25 million to your account. You will receive 30% commission for your assistance.

I love you and trust you completely.

Yours sincerely,
Dr. Ahmed Hassan`,
    description: 'Romance scam using emotional manipulation to request banking information for fraudulent money transfer.'
  },
  {
    id: 'phishing-9',
    title: 'Phishing - Tech Support Scam',
    category: 'phishing',
    technique: 'Tech Support Scam',
    content: `Microsoft Windows Support Alert

WARNING: Your computer is infected with multiple viruses!

We have detected 47 critical security threats on your Windows system. Your personal data is at risk!

Call our certified technicians immediately: 1-800-123-4567
Or click here to download our security scanner: https://microsoft-support.xyz/scan

Do not turn off your computer! Our remote support team is ready to help.

Microsoft Certified Support`,
    description: 'Tech support scam impersonating Microsoft with fake virus alerts and phone numbers for fraudulent support.'
  },
  {
    id: 'phishing-10',
    title: 'Phishing - Lottery Scam',
    category: 'phishing',
    technique: 'Lottery Scam',
    content: `OFFICIAL LOTTERY NOTIFICATION

Congratulations! You have won €1,000,000 in the European Lottery!

Your email address was randomly selected from 50 million entries worldwide.

To claim your prize, send your full name, address, phone number, and bank details to: lottery.claim@europe-lottery.org

Processing fee: €500 (refundable upon prize collection)

Hurry! Claim within 7 days or forfeit your winnings.

European Lottery Commission`,
    description: 'Lottery scam promising large prize money and requesting personal and banking information with processing fee.'
  },
  {
    id: 'phishing-11',
    title: 'Phishing - Bank Account Alert',
    category: 'phishing',
    technique: 'Bank Scam',
    content: `Urgent Security Alert - Your Bank Account

Dear Customer,

We have detected unusual login attempts to your online banking account. For your security, we have temporarily limited access to your account.

To restore full access, please verify your identity immediately by clicking the link below:

https://secure-bank-login.com/verify

You will need to provide:
- Full account number
- Online banking password
- Security questions and answers
- Credit card details for verification

Failure to verify within 24 hours will result in permanent account suspension.

Bank Security Team`,
    description: 'Bank scam impersonating bank security team requesting sensitive banking credentials and personal information.'
  },
  {
    id: 'phishing-12',
    title: 'Phishing - Job Offer Scam',
    category: 'phishing',
    technique: 'Job Scam',
    content: `Congratulations! You have been selected for a position at Google.

Position: Senior Software Engineer
Salary: $250,000 per year + benefits
Location: Mountain View, CA (remote work available)

To complete your hiring process, please click here to submit your tax information and bank details for direct deposit setup:

https://google-hiring-portal.com/onboard

You must complete this within 48 hours to secure your position.

Google HR Department`,
    description: 'Job offer scam impersonating Google HR requesting sensitive tax and banking information for fake employment.'
  },
  {
    id: 'phishing-13',
    title: 'Phishing - Package Delivery Scam',
    category: 'phishing',
    technique: 'Package Delivery Scam',
    content: `FedEx Delivery Notification

Your package is waiting for delivery, but we need to confirm your address and payment information.

Tracking Number: FX123456789
Delivery Date: Today

Due to COVID-19 restrictions, we require additional verification. Please click here to update your delivery preferences and pay any outstanding fees:

https://fedex-delivery-update.com/confirm

Failure to confirm will result in package return to sender.

FedEx Delivery Services`,
    description: 'Package delivery scam impersonating FedEx requesting payment information and address confirmation.'
  }
];
