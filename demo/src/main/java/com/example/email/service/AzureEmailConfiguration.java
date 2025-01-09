package com.example.email.service;

import com.azure.communication.email.EmailClientBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AzureEmailConfiguration {

    @Bean
    public EmailSender emailSender() {
        return new EmailSender(); // Replace with Azure SDK configuration if required
    }
}
