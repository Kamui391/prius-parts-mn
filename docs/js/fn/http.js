// JSON файлыг татаж авна. Алдаа гарвал (404 гэх мэт) exception шиднэ.
export async function fetchJson(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`${url}: ${response.status}`);
  }
  return response.json();
}

// Async функцийн үр дүнг нэг л удаа тооцоолж хадгална (cache).
// Алдаа гарвал хадгалахгүй тул дараа нь дахин оролдох боломжтой.
export function once(loader) {
  let promise = null;

  return () => {
    if (!promise) {
      promise = loader().catch((error) => {
        promise = null;
        throw error;
      });
    }
    return promise;
  };
}