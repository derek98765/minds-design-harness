// Stand-in for the frontend's Profile mock data, which picks a Mind's artwork.
// Pass your own image: mindAvatar(id, name, "/path/to/figurine.webp").
// Images live in design-harness/assets/minds-mascot/.

const CROP = { size: "225%", position: "27% 45%" };
const CROP_WIDE = { size: "210%", position: "25% 47%" };

export function mindAvatar(mindId = "", name = "", figurine = "") {
  const initials =
    name
      .replace(/[^A-Za-z0-9. ]/g, "")
      .split(/[. ]+/)
      .filter(Boolean)
      .slice(0, 2)
      .map(w => w[0])
      .join("")
      .toUpperCase() || "M";
  return { bg: "var(--blue-soft)", figurine, crop: CROP, cropWide: CROP_WIDE, initials };
}

export function fullBodyFor(mind) {
  return mind?._fullBody ?? null;
}
