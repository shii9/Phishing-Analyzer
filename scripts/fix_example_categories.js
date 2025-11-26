const fs = require('fs');
const path = require('path');

function read(file) { return fs.readFileSync(file, 'utf8'); }
function write(file, data) { fs.writeFileSync(file, data, 'utf8'); }

function decideForEmail(text, description) {
  const t = (text || '').toLowerCase();
  const d = (description || '').toLowerCase();
  const urgent = /urgent|immediate|immediately|within \d+ hours|expires|last warning|act now|must confirm|must provide|verify your|verify your identity|verify account|confirm your password|confirm your identity|account has been temporarily suspended|suspended/i;
  const sensitive = /password|credit card|ssn|nid|tin|atm pin|cvv|bank account|bank details|confirm otp|kYC|kyc|provide your|social security|security code|account number/i;
  const prize = /congratulations|you have won|prize|voucher|lottery|winner|claim your prize|claim your millions/i;
  const httpIp = /https?:\/\/\d{1,3}(?:\.\d{1,3}){3}/i;
  const http = /http:\/\//i;
  const shortener = /bit\.ly|tinyurl|t\.co|goo\.gl|ow\.ly|is\.gd|cutt\.ly|shrtco\.de/i;
  const suspiciousTLD = /\.tk|\.ml|\.ga|\.cf|\.gq|\.xyz|\.top|\.club|\.online|\.site|\.win|\.loan|\.pw/i;

  if (sensitive.test(t) && (urgent.test(t) || httpIp.test(t) || http.test(t) || /click here/i.test(t))) return 'phishing';
  if (httpIp.test(t) || shortener.test(t) || suspiciousTLD.test(t)) return 'phishing';
  if (prize.test(t) && (http.test(t) || shortener.test(t) || suspiciousTLD.test(t))) return 'phishing';
  if (urgent.test(t) && /click here|verify|update|confirm/.test(t)) return 'phishing';
  if (d.includes('phishing') || d.includes('fake') || d.includes('fraud') || d.includes('scam')) return 'phishing';

  // Suspicious heuristics
  if (prize.test(t) || /free|limited offer|claim now|hurry!/i.test(t)) return 'suspicious';
  if (/dear customer|generic greeting|hello dear|kindly update|please update your account/i.test(t)) return 'suspicious';
  if (shortener.test(t) || suspiciousTLD.test(t) || /account-verify|account-update|verify-/.test(t)) return 'suspicious';

  return 'safe';
}

function decideForUrl(url, description) {
  const u = (url || '').toLowerCase();
  const d = (description || '').toLowerCase();
  const httpIp = /https?:\/\/\d{1,3}(?:\.\d{1,3}){3}/i;
  const atTrick = /@/;
  const shortener = /bit\.ly|tinyurl|t\.co|goo\.gl|ow\.ly|is\.gd|cutt\.ly|shrtco\.de/i;
  const suspiciousTLD = /\.tk|\.ml|\.ga|\.cf|\.gq|\.xyz|\.top|\.club|\.online|\.site|\.win|\.loan|\.pw/i;
  const doubleExt = /\.pdf\.|\.exe$|\.pdf\.exe|\.txt\.exe|\.doc\.exe|\.jpg\.zip|\.zip$|\.exe$/i;
  if (httpIp.test(u) || atTrick.test(u) || shortener.test(u) || suspiciousTLD.test(u) || doubleExt.test(u)) return 'phishing';
  if (/verify|signin|login|secure-|secure\.|account|update|confirm/.test(u) && suspiciousTLD.test(u)) return 'phishing';
  if (/verify|signin|login|secure-|secure\.|account|update|confirm/.test(u)) return 'suspicious';
  if (d.includes('phishing') || d.includes('fake') || d.includes('fraud') || d.includes('scam')) return 'phishing';
  return 'safe';
}

function decideForDomain(domain, description) {
  const d = (domain || '').toLowerCase();
  const desc = (description || '').toLowerCase();
  const suspiciousTLD = /\.tk|\.ml|\.ga|\.cf|\.gq|\.xyz|\.top|\.club|\.online|\.site|\.win|\.loan|\.pw/i;
  const homoglyph = /xn--/i;
  if (suspiciousTLD.test(d) || homoglyph.test(d) || /support-|secure-|verify-/.test(d)) return 'phishing';
  if (/\d{3,}/.test(d) || d.length > 50) return 'suspicious';
  if (desc.includes('phishing') || desc.includes('fake') || desc.includes('fraud') || desc.includes('scam')) return 'phishing';
  return 'safe';
}

function decideForIP(ip, description) {
  const i = (ip || '').trim();
  const desc = (description || '').toLowerCase();
  // private ranges
  if (/^10\.|^192\.168\.|^172\.(1[6-9]|2[0-9]|3[0-1])\./.test(i)) {
    if (desc.includes('phishing') || desc.includes('fake')) return 'phishing';
    return 'suspicious';
  }
  if (i === '8.8.8.8' || i === '1.1.1.1' || i === '140.82.121.4') return 'safe';
  if (desc.includes('phishing') || desc.includes('fake') || desc.includes('scam')) return 'phishing';
  return 'suspicious';
}

function decideForFile(obj, description) {
  const name = (obj.fileName || '').toLowerCase();
  const type = (obj.fileType || '').toLowerCase();
  const desc = (description || '').toLowerCase();
  if (/\.(exe|scr|vbs|js|jar|bat|com)$/.test(name) || /application\/x-msdownload|application\/x-vbscript|application\/java-archive/.test(type) || desc.includes('executable')) return 'phishing';
  if (/\.zip$|\.rar$|\.7z$|archive|compressed/.test(name) || type.includes('zip') || desc.includes('archive')) return 'suspicious';
  if (desc.includes('phishing') || desc.includes('fake') || desc.includes('scam')) return 'phishing';
  return 'safe';
}

function processFile(filePath, kind) {
  console.log('Processing', filePath);
  let text = read(filePath);
  const objRegex = /\{([\s\S]*?)\},\s*\n\s*\{/g; // used to split, we will parse by matching each top-level object inside array
  // Find start of array
  const arrStart = text.indexOf('= [');
  if (arrStart === -1) {
    console.error('Cannot find array in', filePath);
    return;
  }
  const arrOpen = text.indexOf('[', arrStart);
  const arrClose = text.lastIndexOf(']');
  const arrayBody = text.substring(arrOpen + 1, arrClose);

  // Split objects by pattern of '\n  },\n  {' however tolerantly
  const parts = arrayBody.split(/\n\s*\},\s*\n\s*\{/g).map(p => p.trim()).filter(Boolean);

  let changed = false;
  const newParts = parts.map(part => {
    const idMatch = part.match(/id:\s*['"]([^'"]+)['"]/);
    const id = idMatch ? idMatch[1] : '<unknown>';
    // Extract content depending on kind
    let content = '';
    let description = '';
    if (kind === 'emails') {
      const contMatch = part.match(/content:\s*`([\s\S]*?)`\s*,\n\s*description:/);
      if (contMatch) content = contMatch[1];
      const descMatch = part.match(/description:\s*'([\s\S]*?)'\s*\n\s*\}/);
      if (descMatch) description = descMatch[1];
    } else if (kind === 'urls' || kind === 'domains' || kind === 'ips') {
      const contMatch = part.match(/content:\s*'([\s\S]*?)'\s*,\n\s*description:/);
      if (contMatch) content = contMatch[1];
      const descMatch = part.match(/description:\s*'([\s\S]*?)'\s*(,|\n\s*\})/);
      if (descMatch) description = descMatch[1];
    } else if (kind === 'files') {
      const nameMatch = part.match(/fileName:\s*'([^']+)'/);
      const typeMatch = part.match(/fileType:\s*'([^']+)'/);
      const descMatch = part.match(/description:\s*'([\s\S]*?)'\s*(,|\n\s*\})/);
      content = nameMatch ? nameMatch[1] : '';
      description = descMatch ? descMatch[1] : '';
      // build object-like for file decisions
    }

    let verdict = 'safe';
    if (kind === 'emails') verdict = decideForEmail(content, description);
    if (kind === 'urls') verdict = decideForUrl(content, description);
    if (kind === 'domains') verdict = decideForDomain(content, description);
    if (kind === 'ips') verdict = decideForIP(content, description);
    if (kind === 'files') verdict = decideForFile({ fileName: content }, description);

    // replace category: '...' in part
    const catMatch = part.match(/category:\s*['"](safe|suspicious|phishing)['"]/);
    if (catMatch) {
      const oldCat = catMatch[1];
      if (oldCat !== verdict) {
        console.log(` - ${filePath} ${id}: ${oldCat} -> ${verdict}`);
        changed = true;
        part = part.replace(/category:\s*['"](safe|suspicious|phishing)['"]/,'category: \''+verdict+'\'');
      }
    } else {
      // no category found, insert one after title
      part = part.replace(/(title:\s*['"][^'"]+['"],)/, `$1\n    category: '${verdict}',`);
      changed = true;
      console.log(` - ${filePath} ${id}: added category ${verdict}`);
    }

    return part;
  });

  if (changed) {
    const newArrayBody = newParts.join(',\n\n  ');
    const newText = text.substring(0, arrOpen+1) + '\n  ' + newArrayBody + '\n' + text.substring(arrClose);
    write(filePath, newText);
    console.log('Updated', filePath);
  } else {
    console.log('No changes for', filePath);
  }
}

const base = path.join(__dirname, '..', 'src', 'data');
processFile(path.join(base, 'exampleEmails.ts'), 'emails');
processFile(path.join(base, 'exampleUrls.ts'), 'urls');
processFile(path.join(base, 'exampleDomains.ts'), 'domains');
processFile(path.join(base, 'exampleIPs.ts'), 'ips');
processFile(path.join(base, 'exampleFiles.ts'), 'files');

console.log('Done');
