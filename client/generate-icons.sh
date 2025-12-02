#!/bin/bash

# Create icons directory
mkdir -p public/icons

# Generate simple placeholder icons (you can replace these with actual logo images)
# For now, we'll create simple colored squares as placeholders

sizes=(72 96 128 144 152 192 384 512)

for size in "${sizes[@]}"
do
  # Using ImageMagick if available, otherwise instructions for manual creation
  if command -v convert &> /dev/null; then
    convert -size ${size}x${size} xc:none \
      -draw "fill #EC4899 circle $(($size/2)),$(($size/2)) $(($size/2)),10" \
      -font Arial -pointsize $(($size/4)) -fill white \
      -gravity center -annotate +0+0 "👶" \
      public/icons/icon-${size}.png
  else
    echo "Please create icon-${size}.png in public/icons/"
  fi
done

echo "Icon generation complete (or needs manual creation)"
echo "For production, replace these with actual BabyBliss logo images"
