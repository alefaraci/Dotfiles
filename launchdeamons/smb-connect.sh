#!/bin/bash

# =============================================================================
# smb-connect.sh
# Automatically mount SMB share when connected to home Wi-Fi.
# LaunchAgent com.alessiofaraci.smb-connect at login.
# =============================================================================

# --- Configuration ---
# Source user configuration if it exists.
# By default, use .env in the same directory as this script.
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CONFIG_FILE="$SCRIPT_DIR/.env"

if [ -f "$CONFIG_FILE" ]; then
    source "$CONFIG_FILE"
fi

# Set defaults if not provided in config
: "${EXPECTED_GATEWAY:="192.168.1.1"}"
: "${SERVER_IP:="192.168.1.110"}"
: "${SERVER_HOST:="AleNia-Cloud.local"}"
: "${SMB_PORT:=445}"
: "${SMB_USER:="$USER"}"
: "${KEYCHAIN_SERVER:="$SERVER_HOST"}"
: "${SMB_SHARE:="Ale Cloud"}"
: "${LOG_FILE:="$HOME/Library/Logs/smb-connect.log"}"
: "${MAX_ATTEMPTS:=1000}"
: "${RETRY_INTERVAL:=0.25}"

net_attempt=0

# --- Logging ---
log() {
    echo "$(date '+%Y-%m-%d %H:%M:%S') [$1] $2" >> "$LOG_FILE"
}

log "INFO" "=== SMB auto-connect script started ==="

# --- Step 1: Wait for network connection (default gateway) ---
log "INFO" "Waiting for network connection..."

while [ $net_attempt -lt $MAX_ATTEMPTS ]; do
    CURRENT_GATEWAY=$(/sbin/route -n get default 2>/dev/null | awk '/gateway:/{print $2}')
    if [ -n "$CURRENT_GATEWAY" ]; then
        log "INFO" "Network connection detected (gateway: $CURRENT_GATEWAY)."
        break
    fi
    net_attempt=$((net_attempt + 1))
    sleep $RETRY_INTERVAL
done

if [ -z "$CURRENT_GATEWAY" ]; then
    log "INFO" "No network connection detected after $((MAX_ATTEMPTS * RETRY_INTERVAL))s. Exiting."
    exit 0
fi

# --- Step 2: Check if on home network ---
if [ "$CURRENT_GATEWAY" != "$EXPECTED_GATEWAY" ]; then
    log "INFO" "Gateway is '$CURRENT_GATEWAY', not home network '$EXPECTED_GATEWAY'. Exiting."
    exit 0
fi

log "INFO" "Connected to home network (gateway: $CURRENT_GATEWAY)"

# --- Step 3: Wait for server to be reachable (SMB port check, server blocks ICMP) ---
log "INFO" "Waiting for server $SERVER_IP:$SMB_PORT to become reachable..."

attempt=0
while [ $attempt -lt $MAX_ATTEMPTS ]; do
    if /usr/bin/nc -z -w 2 "$SERVER_IP" "$SMB_PORT" > /dev/null 2>&1; then
        log "INFO" "Server $SERVER_IP:$SMB_PORT is reachable (attempt $((attempt + 1))/$MAX_ATTEMPTS)."
        break
    fi
    attempt=$((attempt + 1))
    log "INFO" "Attempt $attempt/$MAX_ATTEMPTS failed, retrying in ${RETRY_INTERVAL}s..."
    if [ $attempt -eq $MAX_ATTEMPTS ]; then
        log "ERROR" "Server $SERVER_IP:$SMB_PORT not reachable after $MAX_ATTEMPTS attempts. Exiting."
        exit 1
    fi
    sleep "$RETRY_INTERVAL"
done

if mount | grep -q "$SMB_SHARE"; then
    log "INFO" "Share '$SMB_SHARE' is already mounted. Exiting."
    exit 0
fi

# --- Step 4: Verify Keychain credentials exist ---
/usr/bin/security find-internet-password -a "$SMB_USER" -s "$KEYCHAIN_SERVER" -r "smb " > /dev/null 2>&1

if [ $? -ne 0 ]; then
    log "ERROR" "No Internet Password in Keychain for $SMB_USER@$KEYCHAIN_SERVER (protocol: smb). Exiting."
    exit 1
fi

log "INFO" "Keychain credentials verified for $SMB_USER@$KEYCHAIN_SERVER."

# --- Step 5: Mount SMB share ---
log "INFO" "Mounting smb://$SERVER_HOST/$SMB_SHARE ..."

osascript -e "mount volume \"smb://$SERVER_HOST/$SMB_SHARE\"" > /dev/null 2>&1
MOUNT_STATUS=$?

if [ $MOUNT_STATUS -eq 0 ]; then
    log "INFO" "Successfully mounted '$SMB_SHARE'."
else
    log "ERROR" "Failed to mount '$SMB_SHARE' (exit code: $MOUNT_STATUS)."
    exit 1
fi

log "INFO" "=== SMB auto-connect script finished ==="
exit 0
