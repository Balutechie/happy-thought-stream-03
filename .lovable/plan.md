# Responsive birthday experience

## Goal
Make the existing birthday surprise feel polished and easy to use on small phones, larger phones, tablets, laptops, and wide desktop screens without changing its content or interaction flow.

## Changes
- Replace fixed vertical sizing with flexible viewport-aware spacing and safe-area support.
- Keep the retro window comfortably sized and centered, while allowing the letter screen to scroll on shorter displays.
- Scale image frames, headings, buttons, and decorative details at practical phone, tablet, and desktop breakpoints.
- Stack actions when narrow, prevent labels from clipping, and keep all tap targets comfortably sized.
- Reduce decorative clutter on very small or short screens while preserving the pink retro style.
- Verify the complete flow at phone, tablet, and desktop sizes, including short landscape-like displays.

## Technical details
- Limit changes to presentation styles unless a small accessibility attribute is needed.
- Preserve keyboard access, reduced-motion behavior, current copy, GIF order, and all existing interactions.
- Confirm the route metadata remains complete and the preview builds without errors.
