interface JsonLdProps {
  data: Record<string, unknown>;
}

export function JsonLd({ data }: JsonLdProps) {
  const jsonLd = {
    ...data,
    creator: {
      "@type": "SoftwareApplication",
      name: "Perplexity Computer",
      url: "https://www.perplexity.ai/computer",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
