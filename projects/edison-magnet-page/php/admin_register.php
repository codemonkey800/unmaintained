<?php
ini_set('display_errors', 'On');
error_reporting(E_ALL);

require_once 'libs\\PHPMailer\\PHPMailerAutoload.php';

$first = $_POST['first_name'];
$last = $_POST['last_name'];
$email_addr = $_POST['email_addr'];
$phone_number = $_POST['phone_number'];
$magnet_role = $_POST['magnet_role'];
$password = $_POST['password'];

$email_msg = 'First Name: ' . $first . '\r\n';
$email_msg .= 'Last Name: ' . $last . '\r\n';
$email_msg .= 'Email Address: ' . $email_addr . '\r\n';
$email_msg .= 'Phone Number: ' . $phone_number . '\r\n';
$email_msg .= 'Magnet Role: ' . $magnet_role . '\r\n';
$email_msg .= 'Password: ' . $password . '\r\n';

$mail = new PHPMailer;

$mail->isSMTP();
$mail->SMTPDebug = 1;
$mail->Host = 'ssl://smtp.gmail.com';
$mail->SMTPAuth = true;
$mail->Username = '';
$mail->Password = '';
$mail->SMTPSecure = 'ssl';
$mail->Port = 465;

$mail->From = '';
$mail->FromName = 'Jeremy Asuncion';
$mail->addAddress('');

$mail->WordWrap = 50;

$mail->Subject = 'Test';
$mail->Body = $email_msg;

if(!$mail->send()){
    echo 'Could not send message: ' . $mail->ErrorInfo;
    exit;
}

echo 'Message Sent!';