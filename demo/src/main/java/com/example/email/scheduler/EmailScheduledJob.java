package com.example.email.scheduler;

import com.example.email.service.EmailProcessingService;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class EmailScheduledJob {

    private final EmailProcessingService emailProcessingService;

    public EmailScheduledJob(EmailProcessingService emailProcessingService) {
        this.emailProcessingService = emailProcessingService;
    }

    @Scheduled(fixedRate = 5000) // Run every 5 seconds
    public void runEmailJob() {
        emailProcessingService.processEmails();
    }
}
