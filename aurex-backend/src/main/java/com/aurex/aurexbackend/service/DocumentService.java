package com.aurex.aurexbackend.service;

import com.aurex.aurexbackend.dto.DocumentResponse;
import com.aurex.aurexbackend.entity.Document;
import com.aurex.aurexbackend.entity.User;
import com.aurex.aurexbackend.repository.DocumentRepository;
import lombok.RequiredArgsConstructor;
import org.apache.pdfbox.Loader;
import org.apache.pdfbox.text.PDFTextStripper;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.apache.poi.xwpf.usermodel.XWPFDocument;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import java.io.*;
import java.nio.file.*;
import java.util.*;

@Service
@RequiredArgsConstructor
public class DocumentService {
    private static final Set<String> EXTENSIONS = Set.of("pdf", "docx", "txt", "csv", "xlsx");
    private final DocumentRepository documents;
    private final ChangeAnalysisService analyses;
    @Value("${app.storage.directory:uploads}") private String storageDirectory;

    @Transactional
    public DocumentResponse upload(User user, MultipartFile file, boolean analyse) {
        if (file == null || file.isEmpty()) throw new IllegalArgumentException("Select a non-empty document to upload");
        String name = Paths.get(Optional.ofNullable(file.getOriginalFilename()).orElse("document")).getFileName().toString();
        String extension = extension(name);
        if (!EXTENSIONS.contains(extension)) throw new IllegalArgumentException("Supported formats: PDF, DOCX, TXT, CSV and XLSX");
        if (file.getSize() > 20 * 1024 * 1024) throw new IllegalArgumentException("Document size must not exceed 20 MB");
        try {
            String text = extract(file, extension).trim();
            if (text.isBlank()) throw new IllegalArgumentException("No readable text was found in the document");
            Path directory = Paths.get(storageDirectory).toAbsolutePath().normalize();
            Files.createDirectories(directory);
            String stored = UUID.randomUUID() + "." + extension;
            try (InputStream input = file.getInputStream()) { Files.copy(input, directory.resolve(stored), StandardCopyOption.REPLACE_EXISTING); }
            try {
                Document saved = documents.save(Document.builder().user(user).originalFilename(name).storedFilename(stored)
                        .contentType(Optional.ofNullable(file.getContentType()).orElse("application/octet-stream")).fileSize(file.getSize()).extractedText(text).build());
                return response(saved, analyse ? analyses.analyse(user, "Document: " + name + "\n\n" + text) : null);
            } catch (RuntimeException exception) {
                Files.deleteIfExists(directory.resolve(stored));
                throw exception;
            }
        } catch (IOException exception) { throw new IllegalStateException("Unable to process the uploaded document", exception); }
    }
    public List<DocumentResponse> history(User user) { return documents.findByUserIdOrderByCreatedAtDesc(user.getId()).stream().map(d -> response(d, null)).toList(); }
    private DocumentResponse response(Document d, com.aurex.aurexbackend.dto.AnalysisResponse a) { return DocumentResponse.builder().id(d.getId()).filename(d.getOriginalFilename()).contentType(d.getContentType()).fileSize(d.getFileSize()).extractedCharacters(d.getExtractedText().length()).createdAt(d.getCreatedAt()).analysis(a).build(); }
    private String extract(MultipartFile file, String extension) throws IOException {
        try (InputStream input = file.getInputStream()) {
            return switch (extension) {
                case "pdf" -> { try (var pdf = Loader.loadPDF(input.readAllBytes())) { yield new PDFTextStripper().getText(pdf); } }
                case "docx" -> { try (var doc = new XWPFDocument(input)) { yield String.join("\n", doc.getParagraphs().stream().map(p -> p.getText()).toList()); } }
                case "xlsx" -> { try (var book = new XSSFWorkbook(input)) { StringBuilder out = new StringBuilder(); for (var sheet : book) for (var row : sheet) for (var cell : row) out.append(cell).append(' '); yield out.toString(); } }
                default -> new String(input.readAllBytes(), java.nio.charset.StandardCharsets.UTF_8);
            };
        }
    }
    private String extension(String name) { int i = name.lastIndexOf('.'); return i < 1 ? "" : name.substring(i + 1).toLowerCase(Locale.ROOT); }
}
