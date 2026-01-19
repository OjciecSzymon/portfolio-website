<?php
declare(strict_types=1);

// Prosty endpoint pod Angulara (hostingi typu lh.pl, bez SSH).
// Wysyła maila na wskazany adres. W przeglądarce NIE trzymamy hasła SMTP.

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

// Honeypot (jeśli bot wypełnił - udajemy sukces i nic nie robimy)
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

if ($firstName === '' || $lastName === '' || $email === '' || $phone === '' || $desc === '') {
  http_response_code(400);
  echo json_encode(['ok' => false, 'error' => 'Uzupełnij wszystkie pola']);
  exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
  http_response_code(400);
  echo json_encode(['ok' => false, 'error' => 'Nieprawidłowy email']);
  exit;
}

// Ustaw na swój docelowy adres (np. kontakt@ostrowski-dev.pl lub prywatny)
$to = 'kontakt@ostrowski-dev.pl';

// Nadawcę ustawiamy w domenie (żeby było bardziej wiarygodnie dla SPF/DMARC).
// Reply-To ustawiamy na adres osoby z formularza.
$from = 'kontakt@ostrowski-dev.pl';

$subject = 'Formularz kontaktowy: ' . $firstName . ' ' . $lastName;
$message = "Nowa wiadomość z formularza:\n\n"
  . "Imię: {$firstName}\n"
  . "Nazwisko: {$lastName}\n"
  . "Email: {$email}\n"
  . "Telefon: {$phone}\n\n"
  . "Wiadomość:\n{$desc}\n";

$headers = [];
$headers[] = 'MIME-Version: 1.0';
$headers[] = 'Content-Type: text/plain; charset=utf-8';
$headers[] = 'From: ' . $from;
$headers[] = 'Reply-To: ' . $email;

$ok = @mail($to, '=?UTF-8?B?' . base64_encode($subject) . '?=', $message, implode("\r\n", $headers));

if (!$ok) {
  http_response_code(500);
  echo json_encode(['ok' => false, 'error' => 'Nie udało się wysłać wiadomości (mail())']);
  exit;
}

echo json_encode(['ok' => true]);


