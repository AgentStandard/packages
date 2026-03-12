#!/bin/bash
curl -s -X POST http://64.227.34.11:3002/v1/chat \
  -H "Content-Type: application/json" \
  -H "x-api-key: david-001" \
  -d '{"user_id":"test","message":"I make abstract paintings but nobody buys them"}'
