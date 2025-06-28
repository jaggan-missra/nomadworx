# NoMadWorx - Handcrafted Wood Art E-commerce Platform

A beautiful, full-featured e-commerce platform for handcrafted wood art and sculptures, built with React, TypeScript, and Tailwind CSS.

## 🚀 Features

### 🛍️ E-commerce Frontend
- **Product Catalog** with categories and search
- **Shopping Cart** with persistent storage
- **Product Details** with image galleries
- **Responsive Design** for all devices
- **Blog System** for content marketing
- **Contact Forms** with validation
- **Payment Integration** with multiple gateways

### ⚙️ Admin Panel
- **User Authentication** with role-based access
- **Product Management** with image upload
- **Category Management** with descriptions
- **Blog Post Management** with rich content
- **Order Tracking** and management
- **Customer Management** with analytics
- **Analytics Dashboard** with insights
- **Settings Management** with real-time updates
- **Payment Gateway Configuration**

### 🔧 Technical Features
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **React Router** for navigation
- **Context API** for state management
- **Local Storage** for data persistence
- **Image Upload** with preview
- **Real-time Settings** updates
- **Automated GitHub Sync** (NEW!)

## 🔄 Automated GitHub Sync

This project includes an automated system that syncs your code changes to GitHub every 30 minutes.

### Quick Setup

```bash
# Run the automated setup
npm run sync:setup
```

The setup will ask for:
- Your GitHub repository URL
- Branch name (default: main)

### Management Commands

```bash
# Check sync status
npm run sync:status

# View sync logs
npm run sync:logs

# Test sync manually
npm run sync:test

# Stop auto-sync
npm run sync:stop

# Monitor in real-time
npm run sync:monitor
```

### How It Works

1. **Cron Job**: Runs every 30 minutes automatically
2. **Change Detection**: Checks for modified/new files
3. **Auto Commit**: Creates commits with timestamps
4. **Auto Push**: Pushes changes to your GitHub repo
5. **Logging**: Tracks all sync activities
6. **Error Handling**: Retries failed syncs automatically

### Configuration

The sync system creates these files:
- `.env.sync` - Configuration settings
- `logs/auto-sync.log` - Sync activity logs
- `scripts/` - Management and monitoring scripts

## 🛠️ Development

### Prerequisites
- Node.js 18+ 
- Git
- GitHub repository

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd nomadworx-ecommerce

# Install dependencies
npm install

# Start development server
npm run dev

# Setup automated GitHub sync
npm run sync:setup
```

### Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── admin/          # Admin-specific components
│   ├── Header.tsx      # Main navigation
│   ├── Footer.tsx      # Site footer
│   └── PaymentModal.tsx # Payment processing
├── pages/              # Page components
│   ├── admin/          # Admin panel pages
│   ├── Home.tsx        # Homepage
│   ├── Products.tsx    # Product catalog
│   └── Contact.tsx     # Contact page
├── context/            # React Context providers
│   ├── AdminContext.tsx    # Admin authentication
│   ├── CartContext.tsx     # Shopping cart state
│   └── SettingsContext.tsx # App settings
├── data/               # Static data and types
└── scripts/            # Automation scripts
```

## 🔐 Admin Access

### Default Credentials
- **Username**: `admin`
- **Password**: `admin123`

### Role-Based Access
- **Super Admin**: Full system access
- **Admin**: Administrative features
- **Manager**: Limited daily operations

### Creating New Admin Users
1. Go to `/admin/signup`
2. Fill in user details
3. Select appropriate role
4. Use invite codes for elevated roles:
   - Super Admin: `NOMADWORX-SUPER-2024`
   - Admin: `NOMADWORX-ADMIN-2024`

## 💳 Payment Integration

Supports multiple payment gateways:
- **Razorpay** (Cards, UPI, Net Banking)
- **PayU** (All major methods)
- **CCAvenue** (Secure gateway)
- **PhonePe** (UPI & Wallet)
- **PayPal** (International)
- **Stripe** (Global payments)

## 📱 Responsive Design

- **Mobile-first** approach
- **Tablet** optimized layouts
- **Desktop** enhanced experience
- **Touch-friendly** interactions

## 🔧 Configuration

### Environment Variables
```bash
# GitHub Sync (auto-generated)
GITHUB_REPO_URL=https://github.com/username/repo.git
GITHUB_BRANCH=main
COMMIT_PREFIX=[AUTO-SYNC]
```

### Admin Settings
Configure via Admin Panel → Settings:
- Site information
- Contact details
- Payment gateways
- Shipping rates
- SEO settings

## 📊 Analytics & Monitoring

### Built-in Analytics
- Sales performance
- Customer behavior
- Product popularity
- Traffic sources

### Sync Monitoring
- Real-time sync status
- Change detection
- Error tracking
- Performance metrics

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Platforms
- **Vercel**: Connect GitHub repo
- **Netlify**: Drag & drop build folder
- **AWS S3**: Upload static files
- **GitHub Pages**: Enable in repo settings

## 🔄 Automated Workflow

With the GitHub sync system:

1. **Code in Bolt.new** → Changes detected
2. **Every 30 minutes** → Auto-commit & push
3. **GitHub receives** → Triggers deployments
4. **Production updates** → Automatically

## 📝 Logging & Debugging

### Sync Logs
```bash
# View recent logs
npm run sync:logs

# Monitor real-time
npm run sync:monitor

# Check specific log file
tail -f logs/auto-sync.log
```

### Debug Mode
Set environment variable for verbose logging:
```bash
DEBUG=true npm run sync:test
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Make changes in Bolt.new
4. Auto-sync handles the rest!

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

### Common Issues

**Sync not working?**
```bash
npm run sync:status  # Check if active
npm run sync:test    # Manual test
```

**Permission errors?**
```bash
chmod +x scripts/*.sh  # Fix permissions
```

**Git issues?**
```bash
git remote -v  # Check remote URL
git status     # Check repo state
```

### Getting Help
- Check logs: `npm run sync:logs`
- Test manually: `npm run sync:test`
- Monitor status: `npm run sync:monitor`

---

**🎉 Happy Coding! Your changes will automatically sync to GitHub every 30 minutes!**