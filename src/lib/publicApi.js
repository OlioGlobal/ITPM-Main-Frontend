const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export async function getPageBySlug(slug) {
  const response = await fetch(`${API_URL}/public/pages/${slug}`, {
    cache: "no-store", // Always fetch fresh data
  });

  if (!response.ok) {
    throw new Error("Failed to fetch page");
  }

  return response.json();
}

export async function getAllPublishedPages() {
  const response = await fetch(`${API_URL}/public/pages`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch pages");
  }

  return response.json();
}
