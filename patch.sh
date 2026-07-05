#!/bin/bash
for file in council/index.html events/index.html quest-board/index.html quest-board/admin.html prestige/index.html; do
  if [ -f "$file" ]; then
    # Insert the format_script logic right after <script type="module">
    sed -i '' -e '/<script type="module">/r format_script.js' "$file"
    
    # Replace parseInt(document.getElementById('XYZ').value) with parseAmt(document.getElementById('XYZ').value)
    sed -i '' -e 's/parseInt(document.getElementById(\([^)]*\)).value)/parseAmt(document.getElementById(\1).value)/g' "$file"
    sed -i '' -e 's/parseInt(document.getElementById(\([^)]*\))?.value)/parseAmt(document.getElementById(\1)?.value)/g' "$file"
  fi
done
