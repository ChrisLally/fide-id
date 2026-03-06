/**
 * @chris-test/fide-id
 *
 * Core functions for calculating, parsing, and validating Fide IDs in
 * JavaScript/TypeScript.
 */

export {
  calculateFideId,
  calculateStatementFideId,
  buildStatementReferenceIdentifier,
  compactPredicateReferenceIdentifier,
  expandPredicateReferenceIdentifier,
  normalizeReferenceIdentifier,
  normalizePredicateReferenceIdentifier,
  assertFideId,
  buildFideIdFromParts,
  parseFideId,
  FIDE_NAMESPACE_URL,
  FIDE_SPEC_VERSION,
  FIDE_SPEC_DATE,
  STANDARD_CURIE_PREFIX_IRIS,
  FIDE_ENTITY_TYPE_MAP,
  FIDE_CHAR_TO_ENTITY_TYPE,
  FIDE_ID_PREFIX,
  FIDE_ID_HEX_LENGTH,
  FIDE_ID_LENGTH,
  FIDE_ID_FINGERPRINT_LENGTH,
} from "./fide-id/index.js";

export type {
  CompactPredicateReferenceIdentifierOptions,
  ExpandPredicateReferenceIdentifierOptions,
  FideEntityType,
  FideStatementPredicateEntityType,
  FideStatementPredicateReferenceType,
  FideIdCalculationOptions,
  NormalizeReferenceIdentifierOptions,
  NormalizePredicateReferenceIdentifierOptions,
  FideEntityTypeChar,
  FideId,
  FideFingerprint,
  ParsedFideId,
  StatementReferenceIdentifier,
} from "./fide-id/index.js";
