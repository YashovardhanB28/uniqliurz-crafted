import { organizationSchema, localBusinessSchema, websiteSchema } from '@/lib/structured-data';

function SchemaMarkup() {
  const schemas = [organizationSchema(), localBusinessSchema(), websiteSchema()];
  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}

export { SchemaMarkup };
