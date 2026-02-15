/**
 * Schema Script Component
 * Rendert ein JSON-LD Script-Tag für Schema.org strukturierte Daten
 */

interface SchemaScriptProps {
  schema: Record<string, any>;
}

export function SchemaScript({ schema }: SchemaScriptProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
