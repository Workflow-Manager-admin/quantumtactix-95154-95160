#!/bin/bash
cd /home/kavia/workspace/code-generation/quantumtactix-95154-95160/main_container_for_quantumtactix
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

