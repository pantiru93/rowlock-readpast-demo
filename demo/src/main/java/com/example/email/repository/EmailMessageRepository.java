package com.example.email.repository;

import com.example.email.model.EmailMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface EmailMessageRepository extends JpaRepository<EmailMessage, Long> {

    @Query(value = """
        WITH cte AS (
            SELECT TOP 1000 id
            FROM email_messages WITH (ROWLOCK, READPAST)
            WHERE status = 'PENDING' AND date_to_be_sent <= GETUTCDATE()
            ORDER BY date_to_be_sent ASC
        )
        UPDATE email_messages
        SET locked_at = GETUTCDATE(), status = 'PROCESSING'
        OUTPUT INSERTED.*
        FROM cte
        WHERE email_messages.id = cte.id;
    """, nativeQuery = true)
    List<EmailMessage> fetchMessagesToProcess();
}
