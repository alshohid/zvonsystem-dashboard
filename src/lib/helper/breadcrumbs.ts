export const toTitle = (segment: string) => {
    const cleaned = segment.replace(/-/g, " ").replace(/_/g, " ").trim();
    if (!cleaned) return "";
    return cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
  };
  
export const buildCrumbs = (pathname: string) => {
    const parts = pathname.split("?")[0].split("/").filter(Boolean);
  
    const filtered = parts.filter(
      (p) =>
        p !== "admin" &&
        p !== "dispatcher" &&
        p !== "super-admin" &&
        p !== "dashboard",
    );
  
    if (filtered.length === 0) return ["Home"];
    return filtered.map(toTitle);
  };
