<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
  http_response_code(405);
  echo json_encode(['ok' => false, 'error' => 'Method not allowed']);
  exit;
}

$raw = file_get_contents('php://input');
$data = json_decode($raw ?: '', true);
if (!is_array($data)) {
  http_response_code(400);
  echo json_encode(['ok' => false, 'error' => 'Nieprawidłowe dane']);
  exit;
}

$website = trim((string)($data['website'] ?? ''));
if ($website !== '') {
  echo json_encode(['ok' => true]);
  exit;
}

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

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
  http_response_code(400);
  echo json_encode(['ok' => false, 'error' => 'Nieprawidłowy email']);
  exit;
}

$to = 'kontakt@ostrowski-dev.pl';

$from = 'kontakt@ostrowski-dev.pl';

$subject = 'Formularz kontaktowy: ' . $firstName . ' ' . $lastName;

$template = file_get_contents('./templates/mail-template.html');

$template = str_replace(
  ['{{firstName}}', '{{lastName}}', '{{phone}}', '{{email}}', '{{message}}'],
  [$firstName, $lastName, $phone, $email, nl2br(htmlspecialchars($text))],
  $template
);

$message = $template;

$headers = [];
$headers[] = 'MIME-Version: 1.0';
$headers[] = 'Content-Type: text/html; charset=UTF-8';
$headers[] = 'From: ' . $from;
$headers[] = 'Reply-To: ' . $email;

$ok = @mail($to, '=?UTF-8?B?' . base64_encode($subject) . '?=', $message, implode("\r\n", $headers));

if (!$ok) {
  http_response_code(500);
  echo json_encode(['ok' => false, 'error' => 'Nie udało się wysłać wiadomości (mail())']);
  exit;
}

echo json_encode(['ok' => true]);


