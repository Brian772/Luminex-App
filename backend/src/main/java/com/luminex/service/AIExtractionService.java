package com.luminex.service;

import lombok.extern.slf4j.Slf4j;
import org.apache.tika.Tika;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
@Slf4j
public class AIExtractionService {

    private final ChatClient geminiChatClient;
    private final ChatClient openAIChatClient;
    private final Tika tika = new Tika();

    public AIExtractionService(
            ChatClient.Builder geminiBuilder,
            ChatClient.Builder openAIBuilder) {
        // By default, Spring Boot might only provide one builder if not configured.
        // For simplicity, we use the primary one.
        this.geminiChatClient = geminiBuilder.build();
        this.openAIChatClient = openAIBuilder.build();
    }

    public String extractTextFromFile(MultipartFile file) throws IOException {
        log.info("Extracting text from file: " + file.getOriginalFilename());
        try {
            return tika.parseToString(file.getInputStream());
        } catch (Exception e) {
            log.error("Failed to extract text", e);
            throw new IOException("Failed to extract text from file", e);
        }
    }

    public String generateSummary(String text, String provider) {
        ChatClient client = "openai".equalsIgnoreCase(provider) ? openAIChatClient : geminiChatClient;
        return client.prompt()
                .user("Please provide a concise, to-the-point summary of the following text in 3 bullet points:\n\n" + text)
                .call()
                .content();
    }

    public String generateTasks(String text, String provider) {
        ChatClient client = "openai".equalsIgnoreCase(provider) ? openAIChatClient : geminiChatClient;
        return client.prompt()
                .user("Identify the main action items or tasks from the following text and list them as a checklist:\n\n" + text)
                .call()
                .content();
    }

    public String generateFlashcards(String text, String provider) {
        ChatClient client = "openai".equalsIgnoreCase(provider) ? openAIChatClient : geminiChatClient;
        return client.prompt()
                .user("Create 5 flashcards (Question and Answer) based on the following text:\n\n" + text)
                .call()
                .content();
    }
}
