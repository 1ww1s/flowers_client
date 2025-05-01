// Функция для генерации code_verifier (RFC 7636)
export const generateCodeVerifier = (): string => {
    const array = new Uint8Array(32);
    window.crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
};
  
export const generateCodeChallenge = async (verifier: string): Promise<string> => {
  const encoder = new TextEncoder();
  const data = encoder.encode(verifier);
  const digest = await window.crypto.subtle.digest('SHA-256', data);
  return base64UrlEncode(digest);
};

const base64UrlEncode = (buffer: ArrayBuffer): string => {
  const bytes = new Uint8Array(buffer);
  return btoa(String.fromCharCode(...bytes))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
};