#!/usr/bin/env node

/**
 * Automated GitHub Sync Script for Bolt.new Projects
 * Runs every 30 minutes via cron job to sync code changes
 */

const { execSync, spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

// Configuration
const CONFIG = {
  REPO_URL: process.env.GITHUB_REPO_URL || '', // Set this in environment or update manually
  BRANCH: process.env.GITHUB_BRANCH || 'main',
  COMMIT_MESSAGE_PREFIX: process.env.COMMIT_PREFIX || '[AUTO-SYNC]',
  LOG_FILE: path.join(__dirname, '../logs/auto-sync.log'),
  MAX_LOG_SIZE: 10 * 1024 * 1024, // 10MB
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 5000, // 5 seconds
};

// Ensure logs directory exists
const logsDir = path.dirname(CONFIG.LOG_FILE);
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

/**
 * Logger utility
 */
class Logger {
  static log(level, message) {
    const timestamp = new Date().toISOString();
    const logEntry = `[${timestamp}] [${level.toUpperCase()}] ${message}\n`;
    
    // Console output
    console.log(logEntry.trim());
    
    // File output
    try {
      // Rotate log if too large
      if (fs.existsSync(CONFIG.LOG_FILE)) {
        const stats = fs.statSync(CONFIG.LOG_FILE);
        if (stats.size > CONFIG.MAX_LOG_SIZE) {
          const backupFile = CONFIG.LOG_FILE.replace('.log', '.backup.log');
          fs.renameSync(CONFIG.LOG_FILE, backupFile);
        }
      }
      
      fs.appendFileSync(CONFIG.LOG_FILE, logEntry);
    } catch (error) {
      console.error('Failed to write to log file:', error.message);
    }
  }

  static info(message) { this.log('info', message); }
  static warn(message) { this.log('warn', message); }
  static error(message) { this.log('error', message); }
  static success(message) { this.log('success', message); }
}

/**
 * Execute shell command with error handling
 */
function executeCommand(command, options = {}) {
  try {
    const result = execSync(command, {
      encoding: 'utf8',
      stdio: 'pipe',
      cwd: process.cwd(),
      ...options
    });
    return { success: true, output: result.trim() };
  } catch (error) {
    return { 
      success: false, 
      error: error.message, 
      output: error.stdout || error.stderr || ''
    };
  }
}

/**
 * Check if git repository is initialized
 */
function isGitRepo() {
  const result = executeCommand('git rev-parse --git-dir');
  return result.success;
}

/**
 * Initialize git repository
 */
function initializeGit() {
  Logger.info('Initializing Git repository...');
  
  const commands = [
    'git init',
    'git config user.name "Bolt Auto-Sync"',
    'git config user.email "auto-sync@bolt.new"'
  ];

  for (const command of commands) {
    const result = executeCommand(command);
    if (!result.success) {
      throw new Error(`Failed to execute: ${command} - ${result.error}`);
    }
  }
  
  Logger.success('Git repository initialized successfully');
}

/**
 * Check if remote origin exists
 */
function hasRemoteOrigin() {
  const result = executeCommand('git remote get-url origin');
  return result.success;
}

/**
 * Add remote origin
 */
function addRemoteOrigin(repoUrl) {
  Logger.info(`Adding remote origin: ${repoUrl}`);
  
  const result = executeCommand(`git remote add origin ${repoUrl}`);
  if (!result.success) {
    // Try to set URL if remote already exists
    const setResult = executeCommand(`git remote set-url origin ${repoUrl}`);
    if (!setResult.success) {
      throw new Error(`Failed to add/set remote origin: ${result.error}`);
    }
  }
  
  Logger.success('Remote origin configured successfully');
}

/**
 * Check for changes in the repository
 */
function hasChanges() {
  // Check for untracked files
  const untrackedResult = executeCommand('git ls-files --others --exclude-standard');
  const hasUntracked = untrackedResult.success && untrackedResult.output.trim() !== '';
  
  // Check for modified files
  const modifiedResult = executeCommand('git diff --name-only');
  const hasModified = modifiedResult.success && modifiedResult.output.trim() !== '';
  
  // Check for staged files
  const stagedResult = executeCommand('git diff --cached --name-only');
  const hasStaged = stagedResult.success && stagedResult.output.trim() !== '';
  
  return hasUntracked || hasModified || hasStaged;
}

/**
 * Get list of changed files
 */
function getChangedFiles() {
  const changes = [];
  
  // Untracked files
  const untrackedResult = executeCommand('git ls-files --others --exclude-standard');
  if (untrackedResult.success && untrackedResult.output.trim()) {
    const untracked = untrackedResult.output.split('\n').filter(f => f.trim());
    changes.push(...untracked.map(f => `+ ${f}`));
  }
  
  // Modified files
  const modifiedResult = executeCommand('git diff --name-only');
  if (modifiedResult.success && modifiedResult.output.trim()) {
    const modified = modifiedResult.output.split('\n').filter(f => f.trim());
    changes.push(...modified.map(f => `M ${f}`));
  }
  
  return changes;
}

/**
 * Stage all changes
 */
function stageChanges() {
  Logger.info('Staging all changes...');
  
  const result = executeCommand('git add .');
  if (!result.success) {
    throw new Error(`Failed to stage changes: ${result.error}`);
  }
  
  Logger.success('Changes staged successfully');
}

/**
 * Create commit with auto-generated message
 */
function createCommit() {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const changedFiles = getChangedFiles();
  
  let commitMessage = `${CONFIG.COMMIT_MESSAGE_PREFIX} Auto-sync at ${timestamp}`;
  
  if (changedFiles.length > 0) {
    commitMessage += `\n\nChanged files (${changedFiles.length}):\n${changedFiles.slice(0, 20).join('\n')}`;
    if (changedFiles.length > 20) {
      commitMessage += `\n... and ${changedFiles.length - 20} more files`;
    }
  }
  
  Logger.info('Creating commit...');
  
  const result = executeCommand(`git commit -m "${commitMessage}"`);
  if (!result.success) {
    throw new Error(`Failed to create commit: ${result.error}`);
  }
  
  Logger.success(`Commit created: ${commitMessage.split('\n')[0]}`);
  return commitMessage;
}

/**
 * Push changes to remote repository
 */
function pushChanges() {
  Logger.info(`Pushing changes to ${CONFIG.BRANCH}...`);
  
  const result = executeCommand(`git push -u origin ${CONFIG.BRANCH}`);
  if (!result.success) {
    throw new Error(`Failed to push changes: ${result.error}`);
  }
  
  Logger.success('Changes pushed successfully');
}

/**
 * Get repository status
 */
function getRepoStatus() {
  const statusResult = executeCommand('git status --porcelain');
  const branchResult = executeCommand('git branch --show-current');
  const remoteResult = executeCommand('git remote get-url origin');
  
  return {
    hasChanges: statusResult.success && statusResult.output.trim() !== '',
    currentBranch: branchResult.success ? branchResult.output.trim() : 'unknown',
    remoteUrl: remoteResult.success ? remoteResult.output.trim() : 'none',
    fileCount: statusResult.success ? statusResult.output.split('\n').filter(l => l.trim()).length : 0
  };
}

/**
 * Main sync function with retry logic
 */
async function syncWithRetry() {
  for (let attempt = 1; attempt <= CONFIG.RETRY_ATTEMPTS; attempt++) {
    try {
      Logger.info(`Sync attempt ${attempt}/${CONFIG.RETRY_ATTEMPTS}`);
      await performSync();
      return true;
    } catch (error) {
      Logger.error(`Sync attempt ${attempt} failed: ${error.message}`);
      
      if (attempt < CONFIG.RETRY_ATTEMPTS) {
        Logger.info(`Retrying in ${CONFIG.RETRY_DELAY / 1000} seconds...`);
        await new Promise(resolve => setTimeout(resolve, CONFIG.RETRY_DELAY));
      }
    }
  }
  
  Logger.error(`All ${CONFIG.RETRY_ATTEMPTS} sync attempts failed`);
  return false;
}

/**
 * Perform the actual sync operation
 */
async function performSync() {
  Logger.info('='.repeat(60));
  Logger.info('Starting automated GitHub sync...');
  
  // Validate configuration
  if (!CONFIG.REPO_URL) {
    throw new Error('GITHUB_REPO_URL not configured. Please set the repository URL.');
  }
  
  // Initialize git if needed
  if (!isGitRepo()) {
    initializeGit();
  }
  
  // Add remote origin if needed
  if (!hasRemoteOrigin()) {
    addRemoteOrigin(CONFIG.REPO_URL);
  }
  
  // Check repository status
  const status = getRepoStatus();
  Logger.info(`Repository status: ${status.fileCount} changed files on branch '${status.currentBranch}'`);
  
  // Check for changes
  if (!hasChanges()) {
    Logger.info('No changes detected. Skipping sync.');
    return;
  }
  
  Logger.info(`Found changes in ${status.fileCount} files`);
  
  // Stage changes
  stageChanges();
  
  // Create commit
  const commitMessage = createCommit();
  
  // Push changes
  pushChanges();
  
  Logger.success('Sync completed successfully!');
  Logger.info('='.repeat(60));
}

/**
 * Main execution
 */
async function main() {
  try {
    const success = await syncWithRetry();
    process.exit(success ? 0 : 1);
  } catch (error) {
    Logger.error(`Fatal error: ${error.message}`);
    process.exit(1);
  }
}

// Handle process signals
process.on('SIGINT', () => {
  Logger.info('Received SIGINT. Exiting gracefully...');
  process.exit(0);
});

process.on('SIGTERM', () => {
  Logger.info('Received SIGTERM. Exiting gracefully...');
  process.exit(0);
});

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = { performSync, syncWithRetry, Logger };