package com.aurex.aurexbackend;

import org.junit.jupiter.api.Test;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

import static org.junit.jupiter.api.Assertions.assertTrue;

class AurexBackendApplicationTests {

    @Test
    void initialMigrationDefinesTheRequiredOwnedDataModel() throws IOException {
        String migration = Files.readString(Path.of("src/main/resources/db/migration/V1__create_aurex_schema.sql"));

        assertTrue(migration.contains("CREATE TABLE users"));
        assertTrue(migration.contains("CREATE TABLE change_requests"));
        assertTrue(migration.contains("REFERENCES users(id) ON DELETE CASCADE"));
        assertTrue(migration.contains("idx_change_requests_user_created_at"));
    }

    @Test
    void reconciliationMigrationIsSafeForFreshAndLegacySchemas() throws IOException {
        String migration = Files.readString(Path.of("src/main/resources/db/migration/V2__reconcile_existing_schema.sql"));

        assertTrue(migration.contains("DO $$"));
        assertTrue(migration.contains("IF NOT EXISTS"));
        assertTrue(migration.contains("CREATE INDEX IF NOT EXISTS"));
    }
}
