#!/bin/bash
source /root/bot/.env
curl -s https://api.anthropic.com/v1/models \
  -H "x-api-key: $ANTHROPIC_API_KEY" \
  -H "anthropic-version: 2023-06-01" | python3 -c "
import json, sys
d = json.load(sys.stdin)
for m in d.get('data', []):
    print(m['id'])
"
