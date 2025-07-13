<?php
// Only handle POST requests
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // Sanitize inputs to prevent malicious code
    $name    = htmlspecialchars(trim($_POST['name']));
    $email   = htmlspecialchars(trim($_POST['email']));
    $message = htmlspecialchars(trim($_POST['message']));

    // Your email where messages will be sent
    $to = "jiban.niraula.59@email.com";  // <-- Replace with your real email

    // Email subject
    $subject = "New message from your website contact form";

    // Email headers
    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    // Email body content
    $body = "You received a new message from your website contact form:\n\n";
    $body .= "Name: $name\n";
    $body .= "Email: $email\n\n";
    $body .= "Message:\n$message\n";

    // Send email
    if (mail($to, $subject, $body, $headers)) {
        echo "success";
    } else {
        echo "error";
    }
}
?>
