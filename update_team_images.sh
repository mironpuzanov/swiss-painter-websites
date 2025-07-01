#!/bin/bash

# Function to update team image CSS
update_team_css() {
    local dir="$1"
    local css_file="$dir/styles.css"
    
    echo "Updating $css_file..."
    
    # Find the team-image section and replace it
    # We'll use sed to replace the entire section from .team-image { to the first empty line after }
    
    # Create temporary file with updated CSS
    temp_file=$(mktemp)
    
    # Read the file and replace the team-image section
    awk '
    BEGIN { in_team_image = 0; in_team_image_i = 0; in_placeholder = 0 }
    
    /^\.team-image \{/ {
        print ".team-image {"
        print "    width: 120px;"
        print "    height: 150px;"
        print "    border-radius: 12px;"
        print "    margin: 0 auto 24px;"
        print "    overflow: hidden;"
        print "    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);"
        print "}"
        print ""
        print ".team-image img {"
        print "    width: 100%;"
        print "    height: 100%;"
        print "    object-fit: cover;"
        print "    transition: transform 0.3s ease;"
        print "}"
        print ""
        print ".team-image:hover img {"
        print "    transform: scale(1.05);"
        print "}"
        in_team_image = 1
        next
    }
    
    /^\.team-image i \{/ && in_team_image {
        in_team_image_i = 1
        next
    }
    
    /^\.team-image \.placeholder-text \{/ && in_team_image {
        in_placeholder = 1
        next
    }
    
    /^\.placeholder-text \{/ && in_team_image {
        in_placeholder = 1
        next
    }
    
    /^\}/ && (in_team_image_i || in_placeholder) {
        if (in_team_image_i) in_team_image_i = 0
        if (in_placeholder) in_placeholder = 0
        next
    }
    
    /^\}/ && in_team_image && !in_team_image_i && !in_placeholder {
        in_team_image = 0
        next
    }
    
    !in_team_image && !in_team_image_i && !in_placeholder {
        print
    }
    ' "$css_file" > "$temp_file"
    
    # Move the temporary file back
    mv "$temp_file" "$css_file"
    echo "Updated $css_file"
}

# Update all directories
directories=(
    "Crncalo Maler Gipsergeschäft"
    "Decor Design GmbH"
    "Die Baudekoration GmbH"
    "Lorenz Bau GmbH"
    "Maler Beez AG"
    "Maler Deubelbeiss GmbH"
    "Maler Indergand"
    "Maler Noser"
    "Malerbetrieb Steiner"
    "Malergeschäft Bernhard AG"
    "MB Maler"
    "Nathalie Wyss"
    "Roberto Bonolo Baudienstleistungen"
    "ROMANG Struktur & Farbe GmbH"
)

for dir in "${directories[@]}"; do
    if [ -f "$dir/styles.css" ]; then
        update_team_css "$dir"
    else
        echo "Warning: $dir/styles.css not found"
    fi
done

echo "All team image sections have been updated!" 