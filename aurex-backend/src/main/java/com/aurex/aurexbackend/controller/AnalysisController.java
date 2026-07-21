package com.aurex.aurexbackend.controller;
import com.aurex.aurexbackend.dto.*; import com.aurex.aurexbackend.entity.User; import com.aurex.aurexbackend.service.ChangeAnalysisService; import com.aurex.aurexbackend.service.ReportService; import jakarta.validation.Valid; import lombok.RequiredArgsConstructor; import org.springframework.http.ContentDisposition; import org.springframework.http.HttpHeaders; import org.springframework.http.MediaType; import org.springframework.http.ResponseEntity; import org.springframework.security.core.annotation.AuthenticationPrincipal; import org.springframework.web.bind.annotation.*; import java.util.*;
@RestController @RequestMapping("/api/analyses") @RequiredArgsConstructor
public class AnalysisController { private final ChangeAnalysisService service; private final ReportService reportService;
 @PostMapping public AnalysisResponse analyse(@AuthenticationPrincipal User user,@Valid @RequestBody AnalysisRequest request){return service.analyse(user,request.getRequestText());}
 @GetMapping public List<AnalysisResponse> history(@AuthenticationPrincipal User user,@RequestParam(required=false) String q){return service.history(user,q);}
 @GetMapping("/{id}") public AnalysisResponse get(@AuthenticationPrincipal User user,@PathVariable Long id){return service.get(user,id);}

 @GetMapping(value = "/{id}/report", produces = MediaType.APPLICATION_PDF_VALUE)
 public ResponseEntity<byte[]> report(@AuthenticationPrincipal User user, @PathVariable Long id) {
     AnalysisResponse analysis = service.get(user, id);
     byte[] pdf = reportService.generate(analysis);
     String filename = "aurex-analysis-" + id + ".pdf";
     return ResponseEntity.ok()
             .contentType(MediaType.APPLICATION_PDF)
             .header(HttpHeaders.CONTENT_DISPOSITION,
                     ContentDisposition.attachment().filename(filename).build().toString())
             .body(pdf);
 }
}
