#!/bin/bash

# Setup script for automated GitHub sync
# This script configures the cron job and environment

set -e

echo "🚀 Setting up Automated GitHub Sync for Bolt.new"
echo "================================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    printf "${GREEN}[INFO]${NC} %s\n" "$1"
}

print_warning() {
    printf "${YELLOW}[WARNING]${NC} %s\n" "$1"
}

print_error() {
    printf "${RED}[ERROR]${NC} %s\n" "$1"
}

print_question() {
    printf "${BLUE}[INPUT]${NC} %s\n" "$1"
}

# Check if Node.js is available
if ! type node >/dev/null 2>&1; then
    print_error "Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if git is available
if ! type git >/dev/null 2>&1; then
    print_error "Git is not installed. Please install Git first."
    exit 1
fi

# Get current directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"

print_status "Project directory: $PROJECT_DIR"

# Create logs directory
mkdir -p "$PROJECT_DIR/logs"
print_status "Created logs directory"

# Get GitHub repository URL
if [ -z "$GITHUB_REPO_URL" ]; then
    print_question "Enter your GitHub repository URL (e.g., https://github.com/username/repo.git):"
    read -r GITHUB_REPO_URL
fi

if [ -z "$GITHUB_REPO_URL" ]; then
    print_error "GitHub repository URL is required"
    exit 1
fi

# Validate GitHub URL format
if ! echo "$GITHUB_REPO_URL" | grep -q "^https://github\.com/.*/.*\.git$"; then
    print_warning "URL format should be: https://github.com/username/repository.git"
    print_question "Continue anyway? (y/N):"
    read -r continue_anyway
    if ! echo "$continue_anyway" | grep -q "^[Yy]$"; then
        exit 1
    fi
fi

# Get branch name (default: main)
print_question "Enter branch name (default: main):"
read -r GITHUB_BRANCH
GITHUB_BRANCH=${GITHUB_BRANCH:-main}

# Create environment file
ENV_FILE="$PROJECT_DIR/.env.sync"
cat > "$ENV_FILE" << EOF
# Automated GitHub Sync Configuration
GITHUB_REPO_URL=$GITHUB_REPO_URL
GITHUB_BRANCH=$GITHUB_BRANCH
COMMIT_PREFIX=[AUTO-SYNC]
NODE_PATH=$(which node)
PROJECT_PATH=$PROJECT_DIR
EOF

print_status "Created environment configuration: $ENV_FILE"

# Make the sync script executable
chmod +x "$SCRIPT_DIR/auto-sync-github.js"
print_status "Made sync script executable"

# Make the diagnose script executable
chmod +x "$SCRIPT_DIR/diagnose-sync.sh"
print_status "Made diagnose script executable"

# Create wrapper script for cron
WRAPPER_SCRIPT="$SCRIPT_DIR/sync-wrapper.sh"
cat > "$WRAPPER_SCRIPT" << EOF
#!/bin/bash

# Wrapper script for cron job execution
# This ensures proper environment and logging

# Load environment variables
if [ -f "$ENV_FILE" ]; then
    export \$(cat "$ENV_FILE" | grep -v '^#' | xargs)
fi

# Change to project directory
cd "$PROJECT_DIR"

# Add Node.js to PATH if needed
export PATH="\$NODE_PATH:\$PATH"

# Run the sync script
"\$NODE_PATH" "$SCRIPT_DIR/auto-sync-github.js" 2>&1
EOF

chmod +x "$WRAPPER_SCRIPT"
print_status "Created cron wrapper script"

# Create cron job entry
CRON_ENTRY="*/30 * * * * $WRAPPER_SCRIPT"

# Check if cron job already exists
if crontab -l 2>/dev/null | grep -q "$WRAPPER_SCRIPT"; then
    print_warning "Cron job already exists. Updating..."
    # Remove existing entry and add new one
    (crontab -l 2>/dev/null | grep -v "$WRAPPER_SCRIPT"; echo "$CRON_ENTRY") | crontab -
else
    # Add new cron job
    (crontab -l 2>/dev/null; echo "$CRON_ENTRY") | crontab -
fi

print_status "Cron job configured to run every 30 minutes"

# Test the setup
print_status "Testing the sync setup..."

# Initialize git if needed
if [ ! -d "$PROJECT_DIR/.git" ]; then
    print_status "Initializing Git repository..."
    cd "$PROJECT_DIR"
    git init
    git config user.name "Bolt Auto-Sync"
    git config user.email "auto-sync@bolt.new"
fi

# Add remote if needed
cd "$PROJECT_DIR"
if ! git remote get-url origin > /dev/null 2>&1; then
    print_status "Adding remote origin..."
    git remote add origin "$GITHUB_REPO_URL"
else
    print_status "Updating remote origin..."
    git remote set-url origin "$GITHUB_REPO_URL"
fi

# Test sync script
print_status "Running initial sync test..."
if "$WRAPPER_SCRIPT"; then
    print_status "✅ Initial sync test completed successfully!"
else
    print_error "❌ Initial sync test failed. Check the logs for details."
    exit 1
fi

# Create management scripts
MANAGE_SCRIPT="$SCRIPT_DIR/manage-sync.sh"
cat > "$MANAGE_SCRIPT" << EOF
#!/bin/bash

# Management script for auto-sync

case "\$1" in
    start)
        echo "Starting auto-sync (cron job already configured)"
        crontab -l | grep "$WRAPPER_SCRIPT" || echo "Cron job not found!"
        ;;
    stop)
        echo "Stopping auto-sync..."
        crontab -l | grep -v "$WRAPPER_SCRIPT" | crontab -
        echo "Auto-sync stopped"
        ;;
    status)
        echo "Auto-sync status:"
        if crontab -l 2>/dev/null | grep -q "$WRAPPER_SCRIPT"; then
            echo "✅ Auto-sync is ACTIVE (runs every 30 minutes)"
        else
            echo "❌ Auto-sync is INACTIVE"
        fi
        ;;
    logs)
        echo "Recent sync logs:"
        tail -n 50 "$PROJECT_DIR/logs/auto-sync.log" 2>/dev/null || echo "No logs found"
        ;;
    test)
        echo "Running manual sync test..."
        "$WRAPPER_SCRIPT"
        ;;
    *)
        echo "Usage: \$0 {start|stop|status|logs|test}"
        echo ""
        echo "Commands:"
        echo "  start  - Enable auto-sync (cron job)"
        echo "  stop   - Disable auto-sync"
        echo "  status - Check if auto-sync is running"
        echo "  logs   - Show recent sync logs"
        echo "  test   - Run manual sync test"
        exit 1
        ;;
esac
EOF

chmod +x "$MANAGE_SCRIPT"

# Create monitoring script
MONITOR_SCRIPT="$SCRIPT_DIR/monitor-sync.sh"
cat > "$MONITOR_SCRIPT" << EOF
#!/bin/bash

# Real-time monitoring script for auto-sync

echo "🔍 Auto-Sync Monitor"
echo "==================="
echo ""

# Show current status
echo "📊 Current Status:"
if crontab -l 2>/dev/null | grep -q "$WRAPPER_SCRIPT"; then
    echo "✅ Auto-sync is ACTIVE"
    echo "⏰ Runs every 30 minutes"
else
    echo "❌ Auto-sync is INACTIVE"
fi

echo ""
echo "📁 Repository Info:"
cd "$PROJECT_DIR"
echo "🌐 Remote: \$(git remote get-url origin 2>/dev/null || echo 'Not configured')"
echo "🌿 Branch: \$(git branch --show-current 2>/dev/null || echo 'Not in git repo')"
echo "📝 Last commit: \$(git log -1 --pretty=format:'%h - %s (%cr)' 2>/dev/null || echo 'No commits')"

echo ""
echo "📋 Recent Activity:"
if [ -f "$PROJECT_DIR/logs/auto-sync.log" ]; then
    echo "📄 Last 10 log entries:"
    tail -n 10 "$PROJECT_DIR/logs/auto-sync.log"
else
    echo "📄 No log file found"
fi

echo ""
echo "💾 File Changes:"
if git status --porcelain 2>/dev/null | head -10; then
    echo ""
    echo "📊 Total changed files: \$(git status --porcelain 2>/dev/null | wc -l)"
else
    echo "No git repository or no changes"
fi
EOF

chmod +x "$MONITOR_SCRIPT"

# Final instructions
echo ""
echo "🎉 Setup Complete!"
echo "=================="
echo ""
print_status "✅ Automated GitHub sync is now configured!"
echo ""
echo "📋 What's been set up:"
echo "   • Cron job running every 30 minutes"
echo "   • Git repository initialized/configured"
echo "   • Remote origin set to: $GITHUB_REPO_URL"
echo "   • Logging enabled in: $PROJECT_DIR/logs/"
echo ""
echo "🛠️  Management Commands:"
echo "   • Check status: $MANAGE_SCRIPT status"
echo "   • View logs: $MANAGE_SCRIPT logs"
echo "   • Test sync: $MANAGE_SCRIPT test"
echo "   • Stop sync: $MANAGE_SCRIPT stop"
echo "   • Monitor: $MONITOR_SCRIPT"
echo ""
echo "📁 Important Files:"
echo "   • Config: $ENV_FILE"
echo "   • Logs: $PROJECT_DIR/logs/auto-sync.log"
echo "   • Cron job: $WRAPPER_SCRIPT"
echo ""
print_status "🚀 Your code will now automatically sync to GitHub every 30 minutes!"
echo ""
print_warning "💡 Tip: Run '$MANAGE_SCRIPT status' to verify everything is working"