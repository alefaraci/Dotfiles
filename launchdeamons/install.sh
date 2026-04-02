#!/bin/bash

# Load configuration
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CONFIG_FILE="$SCRIPT_DIR/.env"

if [ -f "$CONFIG_FILE" ]; then
    source "$CONFIG_FILE"
else
    echo "ERROR: .env not found. Please create it from .env.example first."
    exit 1
fi

# ADD PASSWORD TO KEYCHAIN (Prompt user)
echo "Setting up Keychain credentials for $SMB_USER @ $KEYCHAIN_SERVER..."
printf "Enter SMB password for $SMB_USER: "
read -rs SMB_PASS
echo ""

# Remove old password if it exists to avoid "item already exists" error
security delete-internet-password -a "$SMB_USER" -s "$KEYCHAIN_SERVER" -r "smb " 2>/dev/null
security add-internet-password -a "$SMB_USER" -s "$KEYCHAIN_SERVER" -r "smb " -w "$SMB_PASS"

# SET EXECUTABLE PERMISSIONS
chmod +x "$SCRIPT_DIR/smb-connect.sh";
ln -sf "$SCRIPT_DIR/com.alessiofaraci.smb-connect.plist" ~/Library/LaunchAgents/;
launchctl bootout gui/$(id -u) ~/Library/LaunchAgents/com.alessiofaraci.smb-connect.plist 2>/dev/null
launchctl bootstrap gui/$(id -u) ~/Library/LaunchAgents/com.alessiofaraci.smb-connect.plist

# VERIFY
launchctl list | grep smb-connect;
