package com.example.email.service;

import com.example.email.model.EmailMessage;
import com.example.email.repository.EmailMessageRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class EmailProcessingService {

    private final EmailMessageRepository emailMessageRepository;
    private final EmailSender emailSender;

    public EmailProcessingService(EmailMessageRepository emailMessageRepository, EmailSender emailSender) {
        this.emailMessageRepository = emailMessageRepository;
        this.emailSender = emailSender;
    }

    public void processEmails() {
        List<EmailMessage> emailMessages = emailMessageRepository.fetchMessagesToProcess();

        for (EmailMessage message : emailMessages) {
            try {
                emailSender.send(message.getEmail(), "Your Campaign", "Your personalized email content here");

                message.setStatus("SENT");
                message.setLockedAt(null); // Clear locked_at after success
            } catch (Exception e) {
                message.setStatus("FAILED");
                System.err.println("Error sending email to " + message.getEmail() + ": " + e.getMessage());
            } finally {
                emailMessageRepository.save(message);
            }
        }
    }
}
