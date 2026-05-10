package com.luminex.controller;

import com.luminex.service.AIExtractionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/documents")
@RequiredArgsConstructor
public class DocumentController {

    private final AIExtractionService extractionService;

    @PostMapping("/upload")
    public ResponseEntity<?> uploadDocument(
            @RequestParam("file") MultipartFile file,
            @RequestParam(value = "provider", defaultValue = "gemini") String provider) throws IOException {
        
        String text = extractionService.extractTextFromFile(file);
        String documentId = UUID.randomUUID().toString();

        String summary = extractionService.generateSummary(text, provider);
        String tasks = extractionService.generateTasks(text, provider);
        String flashcards = extractionService.generateFlashcards(text, provider);

        return ResponseEntity.ok(Map.of(
            "documentId", documentId,
            "fileName", file.getOriginalFilename(),
            "summary", summary,
            "tasks", tasks,
            "flashcards", flashcards,
            "providerUsed", provider
        ));
    }
}
