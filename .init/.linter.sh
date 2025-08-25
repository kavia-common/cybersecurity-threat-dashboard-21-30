#!/bin/bash
cd /home/kavia/workspace/code-generation/cybersecurity-threat-dashboard-21-30/cybersecurity_dashboard_frontend
npx eslint
ESLINT_EXIT_CODE=$?
npm run build
BUILD_EXIT_CODE=$?
 if [ $ESLINT_EXIT_CODE -ne 0 ] || [ $BUILD_EXIT_CODE -ne 0 ]; then
   exit 1
fi

