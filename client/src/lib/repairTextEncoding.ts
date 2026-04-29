const MOJIBAKE_HINTS = [
  "\u00C3",
  "\u00C2",
  "\u00E2",
  "\u00C4",
  "\u00C5",
  "\uFFFD",
];

function looksMojibaked(text: string) {
  return MOJIBAKE_HINTS.some(hint => text.includes(hint));
}

function decodeLatin1AsUtf8(text: string) {
  const bytes = Uint8Array.from(
    Array.from(text, char => char.charCodeAt(0) & 0xff)
  );
  return new TextDecoder("utf-8", { fatal: false }).decode(bytes);
}

export function repairTextEncoding(value: string) {
  let current = value;

  for (let pass = 0; pass < 3; pass += 1) {
    if (!looksMojibaked(current)) break;

    const decoded = decodeLatin1AsUtf8(current);
    if (!decoded || decoded === current) break;
    current = decoded;
  }

  return current.replace(/\uFFFD/g, "");
}

export function repairTextEncodingDeep<T>(value: T): T {
  if (typeof value === "string") {
    return repairTextEncoding(value) as T;
  }

  if (Array.isArray(value)) {
    return value.map(item => repairTextEncodingDeep(item)) as T;
  }

  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, nestedValue]) => [
        key,
        repairTextEncodingDeep(nestedValue),
      ])
    ) as T;
  }

  return value;
}
