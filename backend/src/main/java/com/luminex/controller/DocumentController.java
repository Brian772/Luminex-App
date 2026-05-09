package com.luminex.controller;

import com.luminex.service.AIExtractionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/documents")
@RequiredArgsConstructor
public class DocumentController {

    private final AIExtractionService extractionService;

    @PostMapping("/upload")
    public ResponseEntity<?> uploadDocument(@RequestParam("file") MultipartFile file) {
        // Mock implementation for uploading a file
        String documentId = UUID.randomUUID().toString();
        
        return ResponseEntity.ok(Map.of(
            "message", "Document uploaded successfully",
            "documentId", documentId,
            "fileName", file.getOriginalFilename()
        ));
    }

    @PostMapping("/{id}/extract")
    public ResponseEntity<?> extractContext(@PathVariable String id) {
        // Mock implementation for triggering AI processing
        extractionService.processDocument(id);
        
        return ResponseEntity.ok(Map.of(
            "message", "Extraction started for document: " + id,
            "status", "PROCESSING"
        ));
    }
}
