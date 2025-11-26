export interface ExampleFile {
  id: string;
  title: string;
  category: 'safe' | 'suspicious' | 'phishing';
  technique?: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  description: string;
  content?: string;
}

export const exampleFiles: ExampleFile[] = [
  {
    id: 'safe-file-1',
    title: 'Safe - PDF Document',
    category: 'safe',
    fileName: 'annual_report.pdf',
    fileType: 'application/pdf',
    fileSize: 2048000,
    description: 'Legitimate business document from a trusted source. Standard PDF format commonly used for reports and official communications.'
  },
  {
    id: 'safe-file-2',
    title: 'Safe - Word Document',
    category: 'safe',
    fileName: 'meeting_notes.docx',
    fileType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    fileSize: 512000,
    description: 'Standard office document for business communication. Microsoft Word format widely used in professional environments.'
  },
  {
    id: 'safe-file-3',
    title: 'Safe - Image File',
    category: 'safe',
    fileName: 'company_logo.png',
    fileType: 'image/png',
    fileSize: 256000,
    description: 'Standard image file for business use. PNG format commonly used for logos and graphics in professional communications.'
  },
  {
    id: 'suspicious-file-1',
    title: 'Suspicious - Large Executable',
    category: 'phishing',
    fileName: 'update.exe',
    fileType: 'application/x-msdownload',
    fileSize: 5242880,
    description: 'Large executable file that could contain malware. Generic names like "update" are commonly used to disguise malicious software.'
  },
  {
    id: 'suspicious-file-2',
    title: 'Suspicious - Double Extension',
    category: 'phishing',
    fileName: 'document.pdf.exe',
    fileType: 'application/x-msdownload',
    fileSize: 1024000,
    description: 'File with double extensions attempting to masquerade as PDF. The .exe extension is hidden to trick users into running malicious code.'
  },
  {
    id: 'suspicious-file-3',
    title: 'Suspicious - Compressed Archive',
    category: 'suspicious',
    fileName: 'documents.zip',
    fileType: 'application/zip',
    fileSize: 10485760,
    description: 'Large compressed file that might contain multiple malicious files. Generic names like "documents" are often used to hide malware collections.'
  },
  {
    id: 'phishing-file-1',
    title: 'Phishing - Fake Invoice',
    category: 'phishing',
    fileName: 'invoice_urgent.exe',
    fileType: 'application/x-msdownload',
    fileSize: 1536000,
    description: 'Executable disguised as an urgent invoice. Uses invoice terminology to create urgency and trick users into opening malware.'
  },
  {
    id: 'phishing-file-2',
    title: 'Phishing - Bank Statement',
    category: 'phishing',
    fileName: 'statement.scr',
    fileType: 'application/x-msdownload',
    fileSize: 204800,
    description: 'Screen saver file (.scr) that could be malware. Disguised as a bank statement to appear legitimate while containing malicious code.'
  },
  {
    id: 'phishing-file-3',
    title: 'Phishing - Update Package',
    category: 'phishing',
    fileName: 'security_update.jar',
    fileType: 'application/java-archive',
    fileSize: 3072000,
    description: 'Java archive that might contain malicious code. Disguised as a security update to exploit users\' trust in software updates.'
  },
  {
    id: 'phishing-file-4',
    title: 'Phishing - Prize Claim',
    category: 'phishing',
    fileName: 'lottery_winner.vbs',
    fileType: 'application/x-vbscript',
    fileSize: 51200,
    description: 'VBScript file that could execute malicious commands. Disguised as lottery prize notification to collect personal information.'
  },
  {
    id: 'safe-file-4',
    title: 'Safe - Spreadsheet',
    category: 'safe',
    fileName: 'quarterly_report.xlsx',
    fileType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    fileSize: 1024000,
    description: 'Standard Excel spreadsheet for business reporting. Microsoft Excel format commonly used for data analysis and financial reports.'
  },
  {
    id: 'safe-file-5',
    title: 'Safe - Presentation',
    category: 'safe',
    fileName: 'project_presentation.pptx',
    fileType: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    fileSize: 5120000,
    description: 'PowerPoint presentation file for business meetings. Microsoft PowerPoint format widely used in corporate environments.'
  },
  {
    id: 'suspicious-file-4',
    title: 'Suspicious - Archive File',
    category: 'suspicious',
    technique: 'Archive files',
    fileName: 'important_documents.rar',
    fileType: 'application/x-rar-compressed',
    fileSize: 2097152,
    description: 'Compressed RAR archive that might contain multiple files. Generic names like "important_documents" are often used to hide malware collections.'
  },
  {
    id: 'suspicious-file-5',
    title: 'Suspicious - Script File',
    category: 'suspicious',
    technique: 'Script files',
    fileName: 'system_update.bat',
    fileType: 'application/x-bat',
    fileSize: 1024,
    description: 'Batch script file that could execute system commands. Names like "system_update" are commonly used to disguise malicious automation scripts.'
  },
  {
    id: 'phishing-file-5',
    title: 'Phishing - Macro Document',
    category: 'phishing',
    technique: 'Macro-enabled docs',
    fileName: 'invoice_details.docm',
    fileType: 'application/vnd.ms-word.document.macroEnabled.12',
    fileSize: 204800,
    description: 'Word document with macros enabled (.docm). Could contain malicious VBA code that executes when the document is opened, disguised as an invoice.'
  }
];
