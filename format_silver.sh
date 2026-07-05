#!/bin/bash
# Replaces <input type="number" ... > with <input type="text" class="silver-input" inputmode="numeric" ...> for silver inputs
# And updates parseInt(....value) to parseAmt(....value)

sed -i '' -e 's/type="number" id="actionAmt"/type="text" class="silver-input" inputmode="numeric" id="actionAmt"/g' council/index.html
sed -i '' -e 's/type="number" id="ovFundAmt-\([^"]*\)"/type="text" class="silver-input" inputmode="numeric" id="ovFundAmt-\1"/g' council/index.html
sed -i '' -e 's/type="number" id="fAmt-\([^"]*\)"/type="text" class="silver-input" inputmode="numeric" id="fAmt-\1"/g' council/index.html
sed -i '' -e 's/type="number" id="wishItemPrice"/type="text" class="silver-input" inputmode="numeric" id="wishItemPrice"/g' council/index.html
sed -i '' -e 's/type="number" id="taskAmount"/type="text" class="silver-input" inputmode="numeric" id="taskAmount"/g' council/index.html
sed -i '' -e 's/type="number" id="silverRateInput"/type="text" class="silver-input" inputmode="numeric" id="silverRateInput"/g' council/index.html
sed -i '' -e 's/type="number" id="paAmount"/type="text" class="silver-input" inputmode="numeric" id="paAmount"/g' council/index.html
sed -i '' -e 's/type="number" id="bp-value"/type="text" class="silver-input" inputmode="numeric" id="bp-value"/g' council/index.html
sed -i '' -e 's/type="number" id="pf-amt-${id}"/type="text" class="silver-input" inputmode="numeric" id="pf-amt-${id}"/g' council/index.html
sed -i '' -e 's/type="number" id="offEvRewardAmt"/type="text" class="silver-input" inputmode="numeric" id="offEvRewardAmt"/g' council/index.html

# events/index.html
sed -i '' -e 's/type="number" id="cpts-${ev.id}"/type="text" class="silver-input" inputmode="numeric" id="cpts-${ev.id}"/g' events/index.html

# quest-board/index.html
sed -i '' -e 's/class="num-input reward-silver-input" min="0" step="1000"/class="num-input reward-silver-input silver-input" inputmode="numeric" type="text"/g' quest-board/index.html
sed -i '' -e 's/class="num-input reward-prestige-input" min="0"/class="num-input reward-prestige-input silver-input" inputmode="numeric" type="text"/g' quest-board/index.html

# quest-board/admin.html
sed -i '' -e 's/class="num-input reward-silver-input" min="0" step="1000"/class="num-input reward-silver-input silver-input" inputmode="numeric" type="text"/g' quest-board/admin.html
sed -i '' -e 's/class="num-input reward-prestige-input" min="0"/class="num-input reward-prestige-input silver-input" inputmode="numeric" type="text"/g' quest-board/admin.html

