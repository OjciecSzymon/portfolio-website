<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
  http_response_code(405);
  echo json_encode(['ok' => false, 'error' => 'Method not allowed']);
  exit;
}

// 1. Limit rozmiaru body (ochrona przed ogromnymi requestami)
const MAX_BODY_BYTES = 16384; // 16 KB
$raw = file_get_contents('php://input', false, null, 0, MAX_BODY_BYTES + 1);
if (strlen($raw) > MAX_BODY_BYTES) {
  http_response_code(413);
  echo json_encode(['ok' => false, 'error' => 'Zbyt duża wiadomość']);
  exit;
}

$data = json_decode($raw ?: '', true);
if (!is_array($data)) {
  http_response_code(400);
  echo json_encode(['ok' => false, 'error' => 'Nieprawidłowe dane']);
  exit;
}

// 2. Rate limiting (max 5 wysyłek na IP w ciągu 15 minut)
$rateLimitDir = __DIR__ . '/rate_limit';
if (!is_dir($rateLimitDir)) {
  @mkdir($rateLimitDir, 0755, true);
}
$ip = $_SERVER['HTTP_X_FORWARDED_FOR'] ?? $_SERVER['REMOTE_ADDR'] ?? '';
$ip = preg_replace('/[^a-fA-F0-9.:]/', '', explode(',', trim($ip))[0]) ?: 'unknown';
$rateFile = $rateLimitDir . '/' . md5($ip) . '.txt';
$windowSec = 900;   // 15 min
$maxRequests = 5;
$now = time();
if (is_file($rateFile)) {
  $content = file_get_contents($rateFile);
  [$start, $count] = array_map('intval', explode("\n", $content . "\n0"));
  if ($now - $start > $windowSec) {
    $count = 0;
    $start = $now;
  }
  $count++;
  if ($count > $maxRequests) {
    http_response_code(429);
    echo json_encode(['ok' => false, 'error' => 'Zbyt wiele prób. Spróbuj za kilka minut.']);
    exit;
  }
  file_put_contents($rateFile, $start . "\n" . $count, LOCK_EX);
} else {
  file_put_contents($rateFile, $now . "\n1", LOCK_EX);
}

// Honeypot
$website = trim((string)($data['website'] ?? ''));
if ($website !== '') {
  echo json_encode(['ok' => true]);
  exit;
}

// 3. Limity długości (zgodne z Angular + bezpieczeństwo)
const MAX_FIRSTNAME = 50;
const MAX_LASTNAME  = 50;
const MAX_EMAIL     = 254;
const MAX_PHONE     = 20;
const MAX_DESC      = 2000;

$firstName = trim((string)($data['firstName'] ?? ''));
$lastName  = trim((string)($data['lastName'] ?? ''));
$email     = trim((string)($data['email'] ?? ''));
$phone     = trim((string)($data['phone'] ?? ''));
$desc      = trim((string)($data['description'] ?? ''));

if ($firstName === '' || $lastName === '' || $email === '' || $desc === '') {
  http_response_code(400);
  echo json_encode(['ok' => false, 'error' => 'Uzupełnij wszystkie pola']);
  exit;
}

if (strlen($firstName) > MAX_FIRSTNAME || strlen($lastName) > MAX_LASTNAME
    || strlen($email) > MAX_EMAIL || strlen($phone) > MAX_PHONE || strlen($desc) > MAX_DESC) {
  http_response_code(400);
  echo json_encode(['ok' => false, 'error' => 'Przekroczono dozwoloną długość pól']);
  exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
  http_response_code(400);
  echo json_encode(['ok' => false, 'error' => 'Nieprawidłowy email']);
  exit;
}

// 4. Zabezpieczenie przed wstrzykiwaniem do nagłówków (CRLF / header injection)
$emailSafe = str_replace(["\r", "\n", "\0"], '', $email);
if ($emailSafe !== $email || strlen($emailSafe) > MAX_EMAIL) {
  http_response_code(400);
  echo json_encode(['ok' => false, 'error' => 'Nieprawidłowy email']);
  exit;
}

$to   = 'kontakt@ostrowski-dev.pl';
$from = 'kontakt@ostrowski-dev.pl';

$subjectRaw = 'Formularz kontaktowy: ' . $firstName . ' ' . $lastName;
$subjectSafe = str_replace(["\r", "\n", "\0"], ' ', $subjectRaw);
$subjectSafe = mb_substr($subjectSafe, 0, 200);

$templatePath = __DIR__ . '/templates/mail-template.html';
if (!is_file($templatePath)) {
  http_response_code(500);
  echo json_encode(['ok' => false, 'error' => 'Błąd konfiguracji']);
  exit;
}

$template = file_get_contents($templatePath);
$template = str_replace(
  ['{{firstName}}', '{{lastName}}', '{{phone}}', '{{email}}', '{{desc}}'],
  [
    htmlspecialchars($firstName, ENT_QUOTES, 'UTF-8'),
    htmlspecialchars($lastName, ENT_QUOTES, 'UTF-8'),
    htmlspecialchars($phone, ENT_QUOTES, 'UTF-8'),
    htmlspecialchars($email, ENT_QUOTES, 'UTF-8'),
    nl2br(htmlspecialchars($desc, ENT_QUOTES, 'UTF-8'))
  ],
  $template
);

$headers = [];
$headers[] = 'MIME-Version: 1.0';
$headers[] = 'Content-Type: text/html; charset=UTF-8';
$headers[] = 'From: ' . $from;
$headers[] = 'Reply-To: ' . $emailSafe;

$ok = @mail($to, '=?UTF-8?B?' . base64_encode($subjectSafe) . '?=', $template, implode("\r\n", $headers));

if (!$ok) {
  http_response_code(500);
  echo json_encode(['ok' => false, 'error' => 'Nie udało się wysłać wiadomości (mail())']);
  exit;
}

echo json_encode(['ok' => true]);
