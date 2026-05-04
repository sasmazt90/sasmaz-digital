import type { BlogCollection, BlogGenerationInput, BlogPost } from "@shared/blog";

const jsonHeaders = (password?: string) => ({
  "Content-Type": "application/json",
  ...(password ? { "x-admin-password": password } : {}),
});

async function parseResponse<T>(response: Response): Promise<T> {
  const body = (await response.json().catch(() => null)) as { error?: string } | T | null;
  if (!response.ok) {
    throw new Error((body as { error?: string } | null)?.error || `Request failed (${response.status})`);
  }
  return body as T;
}

export async function fetchAdminBlogPosts(password: string) {
  const response = await fetch("/api/admin/blog-posts", { headers: jsonHeaders(password) });
  return parseResponse<BlogCollection>(response);
}

export async function fetchAiStatus(password: string) {
  const response = await fetch("/api/admin/ai-status", { headers: jsonHeaders(password) });
  return parseResponse<{
    textGeneration: { configured: boolean; model: string; requiredEnv: string[] };
    imageGeneration: { configured: boolean; model: string; requiredEnv: string[] };
    messages: string[];
    sourceContext?: { configured: boolean; characterCount: number; sources: string[] };
  }>(response);
}

export async function fetchPublicBlogPosts() {
  const response = await fetch("/api/blog-posts/public");
  return parseResponse<BlogCollection>(response);
}

export async function fetchPublicBlogPost(slug: string) {
  const response = await fetch(`/api/blog-posts/public/${encodeURIComponent(slug)}`);
  return parseResponse<BlogPost>(response);
}

export async function createManualBlogPost(input: BlogGenerationInput, password: string) {
  const response = await fetch("/api/admin/blog-posts/manual", {
    method: "POST",
    headers: jsonHeaders(password),
    body: JSON.stringify(input),
  });
  return parseResponse<BlogPost>(response);
}

export async function generateBlogPost(input: BlogGenerationInput, password: string) {
  const response = await fetch("/api/admin/blog-posts/generate", {
    method: "POST",
    headers: jsonHeaders(password),
    body: JSON.stringify(input),
  });
  return parseResponse<BlogPost>(response);
}

export async function saveBlogPost(post: BlogPost, password: string) {
  const response = await fetch(`/api/admin/blog-posts/${post.id}`, {
    method: "PUT",
    headers: jsonHeaders(password),
    body: JSON.stringify(post),
  });
  return parseResponse<BlogPost>(response);
}

export async function publishBlogPost(postId: string, password: string) {
  const response = await fetch(`/api/admin/blog-posts/${postId}/publish`, {
    method: "POST",
    headers: jsonHeaders(password),
  });
  return parseResponse<BlogPost>(response);
}

export async function deleteBlogPost(postId: string, password: string) {
  const response = await fetch(`/api/admin/blog-posts/${postId}`, {
    method: "DELETE",
    headers: jsonHeaders(password),
  });
  return parseResponse<{ ok: true }>(response);
}

export async function uploadBlogVisual(postId: string, visualId: string, file: File, password: string) {
  const dataUrl = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error("Failed to read image file."));
    reader.readAsDataURL(file);
  });
  const response = await fetch(`/api/admin/blog-posts/${postId}/visuals/${visualId}/upload`, {
    method: "POST",
    headers: jsonHeaders(password),
    body: JSON.stringify({ fileName: file.name, dataUrl }),
  });
  return parseResponse<BlogPost>(response);
}

export async function generateBlogVisual(postId: string, visualId: string, prompt: string, password: string) {
  const response = await fetch(`/api/admin/blog-posts/${postId}/visuals/${visualId}/generate`, {
    method: "POST",
    headers: jsonHeaders(password),
    body: JSON.stringify({ prompt }),
  });
  return parseResponse<BlogPost>(response);
}
