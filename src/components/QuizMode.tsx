import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, CheckCircle, XCircle, ArrowRight, ArrowLeft, BookOpen } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { exampleEmails } from '@/data/exampleEmails';
import { exampleUrls } from '@/data/exampleUrls';
import { exampleIPs } from '@/data/exampleIPs';
import { exampleDomains } from '@/data/exampleDomains';
import { exampleFiles } from '@/data/exampleFiles';
import confetti from 'canvas-confetti';
import { toast } from 'sonner';
import { AchievementToast } from './AchievementToast';

interface QuizModeProps {
  onClose: () => void;
  onAchievement?: (achievement: any) => void;
}

export const QuizMode = ({ onClose, onAchievement }: QuizModeProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [wrongAnswers, setWrongAnswers] = useState<any[]>([]);
  const [allAnswers, setAllAnswers] = useState<any[]>([]);
  const [showResults, setShowResults] = useState(false);

  // Detailed quiz questions mixing all types
  const quizQuestions = [
    // Email questions (5)
    {
      id: 'email-1',
      type: 'email',
      title: 'Bank Account Verification Email',
      content: `Dear Customer,

Your bank account requires immediate verification due to unusual activity detected.

URGENT: Click here to verify your account details: https://secure-bank-verify.com/login

Failure to verify within 24 hours will result in account suspension.

Please provide:
- Full name
- Account number
- Password
- Social Security Number

Bank Security Team`,
      category: 'phishing',
      explanation: 'This email creates urgency, requests sensitive information, and uses a suspicious URL. Legitimate banks never ask for passwords via email.'
    },
    {
      id: 'email-2',
      type: 'email',
      title: 'Newsletter Subscription',
      content: `Hello,

Thank you for subscribing to our weekly tech newsletter!

Here's what's new this week:
- Latest smartphone reviews
- Cybersecurity tips
- Software updates

Read the full newsletter: https://tech-newsletter.com/issue-45

Unsubscribe anytime: https://tech-newsletter.com/unsubscribe

Best regards,
Tech News Team`,
      category: 'safe',
      explanation: 'This is a legitimate newsletter with clear unsubscribe options and no requests for personal information.'
    },
    {
      id: 'email-3',
      type: 'email',
      title: 'Prize Winner Notification',
      content: `CONGRATULATIONS! You have won $500,000!

You have been selected as our lucky winner in the international lottery draw.

To claim your prize immediately:
1. Click here: https://lottery-claim-now.com/prize
2. Provide your bank details
3. Send $100 processing fee via Western Union

Hurry! Offer expires in 48 hours.

Lottery Commission`,
      category: 'phishing',
      explanation: 'Unsolicited prizes requiring upfront payments or personal information are classic phishing scams.'
    },
    {
      id: 'email-4',
      type: 'email',
      title: 'Order Confirmation',
      content: `Hi John,

Your Amazon order #123-4567890-1234567 has been shipped!

Items ordered:
- Wireless Bluetooth Headphones
- Price: $79.99

Estimated delivery: Tomorrow by 8 PM
Track your package: https://amazon.com/track/123-4567890-1234567

Questions? Contact Amazon Customer Service.

Thanks for shopping with us!
Amazon Team`,
      category: 'safe',
      explanation: 'Legitimate order confirmation with order details, tracking link, and proper branding.'
    },
    {
      id: 'email-5',
      type: 'email',
      title: 'Account Security Alert',
      content: `Security Alert: Unusual Login Detected

Dear User,

We noticed a login attempt from an unrecognized device in Tokyo, Japan.

If this was you, no action is needed.
If this wasn't you, secure your account now: https://account-security-update.net/verify

Your account may be suspended if not verified within 12 hours.

Microsoft Account Team`,
      category: 'suspicious',
      explanation: 'While security alerts are common, this uses a suspicious domain and creates unnecessary urgency.'
    },

    // URL questions (5)
    {
      id: 'url-1',
      type: 'url',
      title: 'Banking Login URL',
      content: `You receive an email from your bank asking you to verify your account:

"Dear Customer,

Due to recent security updates, we need you to verify your account information.

Click here to login and confirm your details:
https://www.chase.com/personal/credit-cards

If you don't verify within 24 hours, your account may be suspended.

Chase Bank Security Team"`,
      category: 'safe',
      explanation: 'Official Chase banking website with HTTPS and legitimate domain structure. The URL uses the official .com domain and proper HTTPS security.'
    },
    {
      id: 'url-2',
      type: 'url',
      title: 'Shortened Link in Social Media',
      content: `You see this post on social media:

"🚨 AMAZING DEAL! Get your free iPhone 15 Pro!

Limited time offer - click the link below to claim yours:
https://bit.ly/3xYzAbC

Don't miss out! Only 100 available. #FreeiPhone #Giveaway"

The post has 50 likes and seems legitimate.`,
      category: 'suspicious',
      explanation: 'Shortened URLs hide the destination and are commonly used in phishing campaigns. Never click shortened links from unknown sources, especially in giveaways.'
    },
    {
      id: 'url-3',
      type: 'url',
      title: 'IP-based Link in Email',
      content: `You receive this email from "Microsoft Support":

"Microsoft Account Alert

Your account has been compromised. Immediate action required.

Login to secure your account:
http://192.168.1.50/bank-login

If you ignore this warning, your account will be permanently locked.

Microsoft Security Team
support@microsoft.com"`,
      category: 'phishing',
      explanation: 'IP addresses instead of domain names are highly suspicious. Legitimate companies never use IP addresses in their official communications.'
    },
    {
      id: 'url-4',
      type: 'url',
      title: 'Free Domain Payment Link',
      content: `Bkash Security Alert

We detected unusual activity on your account. To prevent unauthorized access, please verify your payment method.

Update your payment information here:
https://bkash-secure-update.ga/login

This process will only take 2 minutes.

Bkash Security Department
security@bkash.com"`,
      category: 'phishing',
      explanation: 'Free domains like .ga are commonly used for temporary phishing sites. Bkash would never use such domains or ask for payment information via email.'
    },
    {
      id: 'url-5',
      type: 'url',
      title: 'Official Government Tax Site',
      content: `IRS Tax Refund Notification

Congratulations! You are eligible for a tax refund of $1,250.

To claim your refund, visit our official website and submit your tax information:
https://www.irs.gov/tax-professionals

Important: Do not share your information with third parties.

Internal Revenue Service
irs.gov"`,
      category: 'safe',
      explanation: 'Official IRS website with proper .gov domain and HTTPS security. Government websites always use .gov domains and never ask for sensitive information via email.'
    },

    // IP questions (5)
    {
      id: 'ip-1',
      type: 'ip',
      title: 'Router Configuration Access',
      content: `You need to access your home router settings to change your WiFi password.

Your router's default gateway IP address is:
192.168.1.1

This is the address you enter in your browser to access the router's admin panel.`,
      category: 'safe',
      explanation: 'This is a private IP address (192.168.x.x range) commonly used for home routers and local networks. These are safe for internal network access.'
    },
    {
      id: 'ip-2',
      type: 'ip',
      title: 'Remote Server Connection',
      content: `You receive an email from your IT department:

"Server Maintenance Required

Please connect to the remote server to update your system:

Server IP: 45.77.123.45
Username: admin
Password: temp123

This is urgent - connect immediately.

IT Support Team"`,
      category: 'suspicious',
      explanation: 'Public IP addresses can be legitimate but should always be verified. Never connect to unknown servers using provided credentials, especially from unsolicited emails.'
    },
    {
      id: 'ip-3',
      type: 'ip',
      title: 'Malicious Command Server',
      content: `While investigating a security incident, you find this IP address in your firewall logs:

185.220.101.1

This IP was attempting to connect to your network on port 4444 (commonly used for remote access).`,
      category: 'phishing',
      explanation: 'This IP is known to be associated with malicious activities and command-and-control servers. Always block and report suspicious IP addresses.'
    },
    {
      id: 'ip-4',
      type: 'ip',
      title: 'Corporate VPN Access',
      content: `Your company provides you with VPN access for remote work:

VPN Server: 10.0.0.1
Connection Type: OpenVPN
Authentication: Certificate-based

This is the secure way to access company resources from outside the office.`,
      category: 'safe',
      explanation: 'Private IP range (10.x.x.x) commonly used in corporate networks. This is safe when provided by your legitimate employer for official VPN access.'
    },
    {
      id: 'ip-5',
      type: 'ip',
      title: 'Cloud Database Server',
      content: `Your application needs to connect to a cloud database:

Database Host: 52.14.78.92
Port: 5432 (PostgreSQL)
SSL: Required

This is a managed database service from a reputable cloud provider.`,
      category: 'safe',
      explanation: 'IP address belonging to legitimate cloud service providers like AWS. These are safe when properly configured and authenticated.'
    },

    // Domain questions (5)
    {
      id: 'domain-1',
      type: 'domain',
      title: 'Official Tech Company Website',
      content: `You need to download software from Microsoft's official website.

The legitimate domain for Microsoft is:
microsoft.com

This is where you can safely download Windows updates, Office software, and other Microsoft products.`,
      category: 'safe',
      explanation: 'Official Microsoft domain, one of the most trusted technology companies worldwide. Always use official domains for software downloads.'
    },
    {
      id: 'domain-2',
      type: 'domain',
      title: 'Free Domain Account Verification',
      content: `You receive an email about account verification:

"Verify Your Account Now

Your account requires immediate verification to prevent suspension.

Click here to verify: https://account-verify.club/verify

Complete verification within 24 hours.

Account Services Team"`,
      category: 'suspicious',
      explanation: 'Free .club domain often used for temporary campaigns and suspicious activities. Legitimate companies use their own domains, not free hosting services.'
    },
    {
      id: 'domain-3',
      type: 'domain',
      title: 'Fake Banking Login Domain',
      content: `Your bank sends you a security alert:

"Security Alert: Unusual Activity Detected

We detected suspicious activity on your account. Please login immediately to secure your account:

https://secure-bank-login.ml/login

If you don't verify within 2 hours, your account will be locked.

Bank Security Team"`,
      category: 'phishing',
      explanation: 'Free .ml domain attempting to impersonate legitimate banking services. Banks never use free domains for security-critical operations.'
    },
    {
      id: 'domain-4',
      type: 'domain',
      title: 'University Email Domain',
      content: `You receive an email from Harvard University:

"Harvard University Admission Decision

Congratulations! You have been accepted to Harvard University for Fall 2024.

Please visit our admissions portal to complete your enrollment:
https://admissions.harvard.edu

Next steps:
1. Pay enrollment deposit
2. Submit health forms
3. Apply for housing

Harvard Admissions Office
admissions@harvard.edu"`,
      category: 'safe',
      explanation: 'Official Harvard University domain with .edu extension for educational institutions. Universities use .edu domains for official communications.'
    },
    {
      id: 'domain-5',
      type: 'domain',
      title: 'Suspiciously Long Domain',
      content: `You receive a business proposal email:

"Urgent Business Opportunity

We have reviewed your company profile and believe you qualify for a special business grant of $50,000.

Click here to claim your grant:
https://verylongdomainnamethatlookssuspiciousandmightbeusedforphishingattacks.com/claim

This offer expires in 48 hours.

Business Development Team"`,
      category: 'suspicious',
      explanation: 'Unusually long domain names are often used to bypass spam filters and security checks. Legitimate businesses use clear, memorable domain names.'
    },

    // File questions (5) - Note: Files don't have content like others, so we'll use filename and description
    {
      id: 'file-1',
      type: 'file',
      title: 'Company Annual Report',
      content: `You receive an email from your company's finance department with an attachment:

"Annual Financial Report Attached

Please find attached our company's annual financial report for 2024.

File: annual_report_2024.pdf (2.3 MB)

This document contains confidential financial information. Please review and let us know if you have any questions.

Finance Department
finance@company.com"`,
      category: 'safe',
      explanation: 'Standard PDF document format commonly used for legitimate business reports. The file comes from a trusted internal source and has a clear, professional purpose.'
    },
    {
      id: 'file-2',
      type: 'file',
      title: 'System Update Executable',
      content: `You receive an urgent email from "IT Support":

"Critical System Update Required

Your computer is missing important security updates. Download and run the attached file immediately to prevent data loss.

File: system_update.exe (1.8 MB)

This update must be installed within the next hour.

IT Support Team
support@it-helpdesk.com"`,
      category: 'suspicious',
      explanation: 'Executable files can contain malware. Generic names like "system_update" are suspicious, especially when sent from unknown email addresses with urgent language.'
    },
    {
      id: 'file-3',
      type: 'file',
      title: 'Invoice Payment Required',
      content: `You receive an invoice via email:

"Overdue Invoice - Payment Required

Your account shows an outstanding balance of $1,250. Please review the attached invoice and make payment immediately.

File: invoice_payment_required.scr (856 KB)

Payment is due within 24 hours to avoid service interruption.

Accounts Receivable
billing@services.com"`,
      category: 'phishing',
      explanation: 'Screen saver files (.scr) can execute code and are often disguised as legitimate documents. Never open unexpected attachments, especially those with unusual extensions.'
    },
    {
      id: 'file-4',
      type: 'file',
      title: 'Company Logo Image',
      content: `Your colleague sends you an email:

"Updated Company Logo

Hi team,

Please find attached the new company logo for use in presentations and documents.

File: company_logo.png (245 KB)

Let me know if you need it in different formats.

Best,
Sarah from Marketing
sarah@company.com"`,
      category: 'safe',
      explanation: 'Standard image format commonly used for legitimate business graphics. The file comes from a known colleague and serves a clear business purpose.'
    },
    {
      id: 'file-5',
      type: 'file',
      title: 'Important Document with Double Extension',
      content: `You receive an email from "HR Department":

"Updated Employee Handbook

Please review the attached updated employee handbook. This contains important policy changes.

File: document.pdf.exe (1.2 MB)

Open the file and confirm you have read the updates by replying to this email.

Human Resources
hr@company-hr.com"`,
      category: 'phishing',
      explanation: 'Files with double extensions attempt to hide malicious executables as safe documents. The .pdf.exe extension suggests this is an executable file disguised as a PDF.'
    }
  ];

  // Use questions in fixed order
  const quizItems = [...quizQuestions];

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    setAnswered(true);
    setShowExplanation(true);

    // Store all answers
    setAllAnswers(prev => [...prev, {
      question: quizItems[currentQuestion],
      selectedAnswer: answer,
      correctAnswer: quizItems[currentQuestion].category
    }]);

    if (answer === quizItems[currentQuestion].category) {
      setScore(score + 1);
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 }
      });
    } else {
      // Store wrong answers for review
      setWrongAnswers(prev => [...prev, {
        question: quizItems[currentQuestion],
        selectedAnswer: answer,
        correctAnswer: quizItems[currentQuestion].category
      }]);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < quizItems.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setAnswered(false);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      // Show results even if not all questions are answered
      setShowResults(true);
      // Quiz complete - check for achievements
      if (score === quizItems.length && onAchievement) {
        const achievement = {
          id: 'quiz-perfect',
          title: 'Quiz Master',
          description: 'Perfect score on phishing quiz!',
          icon: '🎓',
          unlocked: true
        };
        onAchievement(achievement);
        toast.custom(() => <AchievementToast achievement={achievement} />);
      }
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setAnswered(false);
      setSelectedAnswer(null);
      setShowExplanation(false);
    }
  };

  const currentItem = quizItems[currentQuestion];
  const isComplete = showResults;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-4xl mx-4"
      >
        <Card className="p-6 bg-gradient-card">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Brain className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-bold">Phishing Quiz</h2>
            </div>
            <div className="text-sm text-muted-foreground">
              Question {currentQuestion + 1}/{quizItems.length} • Score: {score}
            </div>
          </div>

          {!isComplete ? (
            <>
              <Card className="p-4 bg-secondary/30 mb-4 max-h-48 overflow-y-auto">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded capitalize">
                    {currentItem.type}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {currentItem.title}
                  </span>
                </div>
                <p className="text-sm whitespace-pre-wrap">
                  {currentItem.content}
                </p>
                {currentItem.explanation && (
                  <p className="text-xs text-muted-foreground mt-2 italic">
                    {currentItem.explanation}
                  </p>
                )}
              </Card>

              <p className="text-lg font-semibold mb-4">
                Is this {currentItem.type} safe, suspicious, or phishing?
              </p>

              <div className="grid grid-cols-3 gap-3 mb-4">
                {(['safe', 'suspicious', 'phishing'] as const).map((option) => (
                  <Button
                    key={option}
                    onClick={() => !answered && handleAnswer(option)}
                    disabled={answered}
                    variant={
                      answered && selectedAnswer === option
                        ? option === currentItem.category
                          ? 'default'
                          : 'destructive'
                        : 'outline'
                    }
                    className={`capitalize ${
                      answered && option === currentItem.category
                        ? 'bg-success hover:bg-success'
                        : ''
                    }`}
                  >
                    {answered && option === currentItem.category && (
                      <CheckCircle className="w-4 h-4 mr-2" />
                    )}
                    {answered && selectedAnswer === option && option !== currentItem.category && (
                      <XCircle className="w-4 h-4 mr-2" />
                    )}
                    {option}
                  </Button>
                ))}
              </div>

              {/* Navigation buttons always visible */}
              <div className="flex gap-2 mb-4">
                <Button
                  onClick={prevQuestion}
                  disabled={currentQuestion === 0}
                  variant="outline"
                  className="flex-1"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Previous
                </Button>
                <Button
                  onClick={nextQuestion}
                  className="flex-1"
                >
                  {currentQuestion < quizItems.length - 1 ? (
                    <>
                      Next Question
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  ) : (
                    'See Results'
                  )}
                </Button>
              </div>

              <AnimatePresence>
                {answered && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <Card className={`p-4 mb-4 ${
                      selectedAnswer === currentItem.category
                        ? 'bg-success/10 border-success'
                        : 'bg-danger/10 border-danger'
                    }`}>
                      <p className="font-semibold mb-1">
                        {selectedAnswer === currentItem.category ? '✅ Correct!' : '❌ Incorrect'}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        This is a <span className="font-semibold capitalize">{currentItem.category}</span> {currentItem.type}.
                      </p>
                    </Card>


                  </motion.div>
                )}
              </AnimatePresence>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-8"
            >
              <div className="text-center mb-6">
                <div className="text-6xl mb-4">
                  {score === quizItems.length ? '🏆' : score >= 15 ? '🌟' : score >= 10 ? '👍' : '📚'}
                </div>
                <h3 className="text-2xl font-bold mb-2">Quiz Complete!</h3>
                <p className="text-xl mb-4">
                  You scored {score} out of {quizItems.length}
                </p>
                <p className="text-muted-foreground mb-6">
                  {score === quizItems.length
                    ? 'Perfect! You are a phishing detection master! 🎓'
                    : score >= 15
                    ? 'Excellent! You have great phishing detection skills!'
                    : score >= 10
                    ? 'Good job! Keep practicing to improve.'
                    : 'Keep learning! Review the tips to get better.'}
                </p>
              </div>

              {/* Detailed Results */}
              <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
                <h4 className="text-lg font-semibold text-center mb-4">Question Details</h4>
                {quizItems.map((item, index) => {
                  const userAnswer = allAnswers.find(a => a.question.id === item.id)?.selectedAnswer;
                  const isCorrect = userAnswer === item.category;

                  return (
                    <Card key={item.id} className={`p-4 ${isCorrect ? 'bg-success/10 border-success' : 'bg-danger/10 border-danger'}`}>
                      <div className="flex items-start gap-3">
                        <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold ${
                          isCorrect ? 'bg-success text-success-foreground' : 'bg-danger text-danger-foreground'
                        }`}>
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded capitalize">
                              {item.type}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {item.title}
                            </span>
                          </div>

                          <div className="text-sm mb-2 p-2 bg-secondary/30 rounded whitespace-pre-wrap">
                            {item.content}
                          </div>

                          <div className="text-sm space-y-1">
                            <p className={`font-semibold ${isCorrect ? 'text-success' : 'text-danger'}`}>
                              <strong>Your answer:</strong> {userAnswer || 'Not answered'}
                            </p>
                            <p className={`font-semibold ${isCorrect ? 'text-success' : 'text-primary'}`}>
                              <strong>Correct answer:</strong> {item.category}
                            </p>
                            <p className="text-muted-foreground italic">
                              <strong>Explanation:</strong> {item.explanation}
                            </p>
                          </div>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={() => {
                    // Show wrong answers review
                    setCurrentQuestion(0);
                    setAnswered(false);
                    setSelectedAnswer(null);
                    setShowExplanation(false);
                    setScore(0);
                    setWrongAnswers([]);
                    setAllAnswers([]);
                    setShowResults(false);
                  }}
                  variant="outline"
                  className="flex-1"
                >
                  <BookOpen className="w-4 h-4 mr-2" />
                  Review Mistakes ({wrongAnswers.length})
                </Button>
                <Button onClick={onClose} className="flex-1">
                  Close Quiz
                </Button>
              </div>
            </motion.div>
          )}
        </Card>
      </motion.div>
    </motion.div>
  );
};
