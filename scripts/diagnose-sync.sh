#!/bin/bash

# GitHub Sync Diagnostic Script
# Helps identify why commits aren't showing up in GitHub

set -e

echo "🔍 GitHub Sync Diagnostics"
echo "=========================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_section() {
    echo -e "${BLUE}[SECTION]${NC} $1"
    echo "----------------------------------------"
}

# Get project directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"

cd "$PROJECT_DIR"

print_section "1. Environment Check"

# Check if .env.sync exists
if [ -f ".env.sync" ]; then
    print_status "✅ Environment file found: .env.sync"
    echo "Configuration:"
    cat .env.sync | grep -v '^#' | sed 's/^/   /'
else
    print_error "❌ Environment file not found: .env.sync"
    echo "Run: npm run sync:setup"
fi

echo ""

print_section "2. Git Repository Status"

# Check if git repo exists
if [ -d ".git" ]; then
    print_status "✅ Git repository initialized"
    
    # Check current branch
    current_branch=$(git branch --show-current 2>/dev/null || echo "unknown")
    print_status "Current branch: $current_branch"
    
    # Check remote origin
    if git remote get-url origin >/dev/null 2>&1; then
        remote_url=$(git remote get-url origin)
        print_status "✅ Remote origin configured: $remote_url"
    else
        print_error "❌ No remote origin configured"
    fi
    
    # Check for uncommitted changes
    if [ -n "$(git status --porcelain)" ]; then
        print_warning "⚠️  Uncommitted changes detected:"
        git status --porcelain | head -10 | sed 's/^/   /'
        if [ $(git status --porcelain | wc -l) -gt 10 ]; then
            echo "   ... and $(( $(git status --porcelain | wc -l) - 10 )) more files"
        fi
    else
        print_status "✅ Working directory clean"
    fi
    
    # Check last commit
    if git log -1 --oneline >/dev/null 2>&1; then
        last_commit=$(git log -1 --pretty=format:"%h - %s (%cr)" 2>/dev/null)
        print_status "Last commit: $last_commit"
    else
        print_warning "⚠️  No commits found"
    fi
    
else
    print_error "❌ Not a git repository"
    echo "Run: git init"
fi

echo ""

print_section "3. Cron Job Status"

# Check if cron job exists
if crontab -l 2>/dev/null | grep -q "auto-sync-github.js\|sync-wrapper.sh"; then
    print_status "✅ Cron job found:"
    crontab -l 2>/dev/null | grep -E "auto-sync-github.js|sync-wrapper.sh" | sed 's/^/   /'
else
    print_error "❌ No cron job found"
    echo "Run: npm run sync:setup"
fi

echo ""

print_section "4. Script Files Check"

scripts_to_check=(
    "scripts/auto-sync-github.js"
    "scripts/sync-wrapper.sh"
    "scripts/manage-sync.sh"
    "scripts/setup-auto-sync.sh"
)

for script in "${scripts_to_check[@]}"; do
    if [ -f "$script" ]; then
        if [ -x "$script" ]; then
            print_status "✅ $script (executable)"
        else
            print_warning "⚠️  $script (not executable)"
            echo "   Fix: chmod +x $script"
        fi
    else
        print_error "❌ $script (missing)"
    fi
done

echo ""

print_section "5. Log Analysis"

log_file="logs/auto-sync.log"
if [ -f "$log_file" ]; then
    print_status "✅ Log file found: $log_file"
    
    # Check log size
    log_size=$(du -h "$log_file" | cut -f1)
    print_status "Log file size: $log_size"
    
    # Show recent entries
    echo ""
    echo "Recent log entries (last 10):"
    echo "------------------------------"
    tail -n 10 "$log_file" | sed 's/^/   /'
    
    # Check for errors
    echo ""
    if grep -q "ERROR\|Failed\|failed" "$log_file"; then
        print_warning "⚠️  Errors found in logs:"
        grep "ERROR\|Failed\|failed" "$log_file" | tail -5 | sed 's/^/   /'
    else
        print_status "✅ No errors found in recent logs"
    fi
    
    # Check last sync time
    last_sync=$(grep "Starting automated GitHub sync" "$log_file" | tail -1 | cut -d']' -f1 | tr -d '[' || echo "Never")
    print_status "Last sync attempt: $last_sync"
    
else
    print_warning "⚠️  No log file found: $log_file"
fi

echo ""

print_section "6. Network & Authentication Test"

# Test GitHub connectivity
if command -v curl >/dev/null 2>&1; then
    if curl -s --connect-timeout 10 https://github.com >/dev/null; then
        print_status "✅ GitHub connectivity OK"
    else
        print_error "❌ Cannot reach GitHub"
    fi
else
    print_warning "⚠️  curl not available for connectivity test"
fi

# Test git remote access
if git remote get-url origin >/dev/null 2>&1; then
    remote_url=$(git remote get-url origin)
    echo ""
    print_status "Testing remote access..."
    
    if git ls-remote origin >/dev/null 2>&1; then
        print_status "✅ Remote repository accessible"
    else
        print_error "❌ Cannot access remote repository"
        echo "   This could be due to:"
        echo "   • Authentication issues (SSH keys, tokens)"
        echo "   • Repository doesn't exist"
        echo "   • Network connectivity problems"
        echo "   • Incorrect repository URL"
    fi
fi

echo ""

print_section "7. Manual Sync Test"

print_status "Running manual sync test..."
echo ""

# Load environment if available
if [ -f ".env.sync" ]; then
    export $(cat .env.sync | grep -v '^#' | xargs) 2>/dev/null || true
fi

# Run the sync script manually
if [ -f "scripts/auto-sync-github.js" ]; then
    echo "Manual sync output:"
    echo "-------------------"
    if node scripts/auto-sync-github.js; then
        print_status "✅ Manual sync completed successfully"
    else
        print_error "❌ Manual sync failed"
    fi
else
    print_error "❌ Sync script not found"
fi

echo ""

print_section "8. Recommendations"

echo "Based on the diagnostic results:"
echo ""

# Check for common issues and provide recommendations
if [ ! -f ".env.sync" ]; then
    echo "🔧 Run setup: npm run sync:setup"
fi

if [ ! -d ".git" ]; then
    echo "🔧 Initialize git: git init"
fi

if ! git remote get-url origin >/dev/null 2>&1; then
    echo "🔧 Add remote: git remote add origin <your-repo-url>"
fi

if ! crontab -l 2>/dev/null | grep -q "auto-sync-github.js\|sync-wrapper.sh"; then
    echo "🔧 Setup cron job: npm run sync:setup"
fi

if [ -f "logs/auto-sync.log" ] && grep -q "ERROR\|Failed\|failed" "logs/auto-sync.log"; then
    echo "🔧 Check errors: npm run sync:logs"
fi

# Check if commits exist but aren't pushed
if git log --oneline 2>/dev/null | head -1 >/dev/null; then
    unpushed=$(git log origin/$(git branch --show-current)..HEAD --oneline 2>/dev/null | wc -l || echo "0")
    if [ "$unpushed" -gt 0 ]; then
        echo "🔧 Push pending commits: git push origin $(git branch --show-current)"
    fi
fi

echo ""
echo "🔍 For more help:"
echo "   • View logs: npm run sync:logs"
echo "   • Monitor status: npm run sync:monitor"
echo "   • Test manually: npm run sync:test"
echo "   • Check cron: crontab -l"

echo ""
print_status "Diagnostic complete!"