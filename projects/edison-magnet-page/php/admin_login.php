<?php

$url = 'https://verifier.login.persona.org/verify';
$assert = $_POST['assertion'];

$params = 'assertion=' . urlencode($assert) . '&audience=' . urlencode('http://jeremyisawesomeyo.no-ip.org/:80');

$ch = curl_init();
$options = array(
    CURLOPT_URL => $url,
    CURLOPT_RETURNTRANSFER => TRUE,
    CURLOPT_POST => 2,
    CURLOPT_SSL_VERIFYPEER => 0,
    CURLOPT_SSL_VERIFYHOST => 2,
    CURLOPT_POSTFIELDS => $params
);

curl_setopt_array($ch, $options);

$result = curl_exec($ch);
curl_close($ch);

$status = json_decode($result);

if ($status->{'status'} == 'okay') {
    $db = new SQlite3('databases/allowed_users.db');

    $results = $db->query("SELECT * FROM users");

    $found = false;

    while ($row = $results->fetchArray(SQLITE3_ASSOC)) {
        if ($status->{'email'} == $row['user_email']) {
            $found = true;
            break;
        }
    }

    if (!$found) {
        echo 'failure';
    } else {
        echo $row['user_name'];
    }

} else if ($status->{'status'} == 'failure') {
    echo 'failure';
}