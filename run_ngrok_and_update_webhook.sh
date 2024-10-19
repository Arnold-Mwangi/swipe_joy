#!/bin/bash

# Start Ngrok in the background
ngrok http 8080 &

# Allow some time for Ngrok to start
sleep 5

# Fetch the current Ngrok public URL
NGROK_URL=$(curl -s http://localhost:4040/api/tunnels | jq -r '.tunnels[0].public_url')

# Telegram Bot Token
BOT_TOKEN="8085580857:AAHNXWCFknjCZMVCjvGt65zpY3wUG4KK4DE"

# Update Telegram Webhook
curl -X POST "https://api.telegram.org/bot${BOT_TOKEN}/setWebhook?url=${NGROK_URL}/auth/telegram/webhook"

# Keep the script running
tail -f /dev/null
