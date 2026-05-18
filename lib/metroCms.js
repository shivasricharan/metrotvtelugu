export async function getMetroCmsData(type) {
  try {
    const cmsUrl = process.env.GOOGLE_SCRIPT_METRO_CMS_URL;

    if (!cmsUrl) {
      return null;
    }

    const response = await fetch(`${cmsUrl}?type=${type}`, {
      cache: "no-store",
    });

    if (!response.ok) {
      return null;
    }

    const result = await response.json();

    if (!result.success) {
      return null;
    }

    return result.data;
  } catch (error) {
    console.error("CMS fetch error:", error);
    return null;
  }
}
