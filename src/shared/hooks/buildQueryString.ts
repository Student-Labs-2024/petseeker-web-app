// src/utils/buildQueryString.ts

export const buildQueryString = (
  basePath: string,
  params?: Record<string, any>
): string => {
  if (!params) return basePath;

  const queryParts = Object.entries(params)
    .filter(
      ([_, value]) => value !== undefined && value !== null && value !== ""
    )
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`);

  return queryParts.length ? `${basePath}?${queryParts.join("&")}` : basePath;
};
