#!/bin/bash
mkdir -p /root/bot/logs
echo "0 18 * * 0 cd /root/bot && node cron-week-in-review.js >> /root/bot/logs/week-in-review.log 2>&1" | crontab -
echo "Installed. Current crontab:"
crontab -l
