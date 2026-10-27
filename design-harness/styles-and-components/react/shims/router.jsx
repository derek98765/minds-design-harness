// Stand-in for react-router-dom's Link: a plain anchor. Swap for your router's
// Link if your project has one.
import { forwardRef } from "react";

export const Link = forwardRef(function Link({ to, ...rest }, ref) {
  return <a ref={ref} href={typeof to === "string" ? to : "#"} {...rest} />;
});
