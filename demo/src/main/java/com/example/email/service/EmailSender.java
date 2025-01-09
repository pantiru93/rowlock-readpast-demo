package com.example.email.service;

import org.springframework.stereotype.Component;

@Component
public class EmailSender {

    public void send(String to, String subject, String body) {
        // Example using Azure Email SDK, replace with other providers if necessary
        System.out.printf("Sending email to %s with subject '%s'%n", to, subject);
        // Integration with an email sending service
    }
}
