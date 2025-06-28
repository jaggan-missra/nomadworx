#!/bin/bash

# Force GitHub Sync Script
# Manually triggers a sync and pushes any pending commits

set -e

echo "🚀 Force GitHub Sync"
echo "==================="
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

# Get project directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"

cd "$PROJECT_DIR"

# Load environment variables
if [ -f ".env.sync" ]; then
    export $(cat .env.sync | grep -v '^#' | xargs) 2>/dev/null || true
    print_status "Loaded environment from .env.sync"
else
    print_warning "No .env.sync file found"
fi

# Check if git repo exists
if [ ! -d ".git" ]; then
    print_error "Not a git repository. Run: git init"
    exit 1
fi

# Check if remote exists
if ! git remote get-url origin >/dev/null 2>&1; then
    print_error "No remote origin configured"
    if [ -n "$GITHUB_REPO_URL" ]; then
        print_status "Adding remote from environment: $GITHUB_REPO_URL"
        git remote add origin "$GITHUB_REPO_URL"
    else
        print_error "No GITHUB_REPO_URL in environment. Run: npm run sync:setup"
        exit 1
    fi
fi

# Get current status
print_status "Current repository status:"
echo "   Remote: $(git remote get-url origin)"
echo "   Branch: $(git branch --show-current 2>/dev/null || echo 'unknown')"

# Check for changes
if [ -n "$(git status --porcelain)" ]; then
    print_status "Found uncommitted changes:"
    git status --porcelain | head -10 | sed 's/^/   /'
    
    print_status "Staging all changes..."
    git add .
    
    # Create commit
    timestamp=$(date -u +"%Y-%m-%d %H:%M:%S UTC")
    commit_message="[FORCE-SYNC] Manual sync at $timestamp"
    
    print_status "Creating commit..."
    git commit -m "$commit_message"
    
    print_status "Commit created: $commit_message"
else
    print_status "No uncommitted changes found"
fi

# Check for unpushed commits
current_branch=$(git branch --show-current 2>/dev/null || echo "main")
unpushed_count=0

if git rev-parse --verify "origin/$current_branch" >/dev/null 2>&1; then
    unpushed_count=$(git log "origin/$current_branch..HEAD" --oneline 2>/dev/null | wc -l || echo "0")
else
    # Remote branch doesn't exist, count all local commits
    unpushed_count=$(git log --oneline 2>/dev/null | wc -l || echo "0")
fi

if [ "$unpushed_count" -gt 0 ]; then
    print_status "Found $unpushed_count unpushed commit(s)"
    
    # Show unpushed commits
    echo "Unpushed commits:"
    if git rev-parse --verify "origin/$current_branch" >/dev/null 2>&1; then
        git log "origin/$current_branch..HEAD" --oneline | sed 's/^/   /' || true
    else
        git log --oneline | head -5 | sed 's/^/   /' || true
    fi
    
    print_status "Pushing to origin/$current_branch..."
    
    # Push with upstream setting
    if git push -u origin "$current_branch"; then
        print_status "✅ Successfully pushed to GitHub!"
        
        # Show final status
        echo ""
        print_status "Final status:"
        echo "   Repository: $(git remote get-url origin)"
        echo "   Branch: $current_branch"
        echo "   Last commit: $(git log -1 --pretty=format:'%h - %s (%cr)' 2>/dev/null || echo 'None')"
        
    else
        print_error "❌ Failed to push to GitHub"
        echo ""
        echo "Common solutions:"
        echo "1. Check your GitHub authentication (SSH keys or personal access token)"
        echo "2. Verify the repository URL is correct"
        echo "3. Ensure you have push permissions to the repository"
        echo "4. Check if the repository exists on GitHub"
        exit 1
    fi
else
    print_status "No unpushed commits found"
    
    # Check if we can reach the remote
    print_status "Testing remote connection..."
    if git ls-remote origin >/dev/null 2>&1; then
        print_status "✅ Remote repository is accessible"
        print_status "Repository is up to date with GitHub"
    else
        print_error "❌ Cannot access remote repository"
        echo "This could indicate authentication or connectivity issues"
        exit 1
    fi
fi

echo ""
print_status "🎉 Force sync completed!"

# Update the log
log_file="logs/auto-sync.log"
if [ ! -d "logs" ]; then
    mkdir -p logs
fi

timestamp=$(date -u +"%Y-%m-%dT%H:%M:%S.000Z")
echo "[$timestamp] [SUCCESS] Force sync completed successfully" >> "$log_file"

echo ""
echo "💡 Tips:"
echo "   • Check GitHub repository to verify changes"
echo "   • Monitor auto-sync: npm run sync:monitor"
echo "   • View logs: npm run sync:logs"