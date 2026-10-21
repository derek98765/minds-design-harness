import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { cn } from "@/lib/utils";

/**
 * Minds avatar — matches the Profile pages (.avatar-ring-v2 and
 * .avatar-initial-v2 in tokens.css). Always round.
 *
 * A portrait sits inside a 1px blue-grey gradient ring on white. The fallback
 * — and the account avatar in the header — is the initial on the lit blue
 * disc. Use the square portraits in assets/artwork/avatars/.
 *
 * Sizes: sm 32 · md 40 · lg 52 · xl 80 (pixels).
 */
const Avatar = React.forwardRef(({ className, size = "md", ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn("avatar-ring-v2 relative select-none", `avatar-${size}-v2`, className)}
    {...props}
  />
));
Avatar.displayName = "Avatar";

const AvatarImage = React.forwardRef(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image ref={ref} className={cn("aspect-square object-cover", className)} {...props} />
));
AvatarImage.displayName = "AvatarImage";

const AvatarFallback = React.forwardRef(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback ref={ref} className={cn("avatar-initial-v2 size-full", className)} {...props} />
));
AvatarFallback.displayName = "AvatarFallback";

export { Avatar, AvatarImage, AvatarFallback };
