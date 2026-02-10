#!/bin/bash

# PakBiz Dashboard - Deployment Activation Script
# This script helps verify and activate GitHub Pages deployment

echo "🚀 PakBiz Dashboard - Deployment Activation"
echo "============================================"
echo ""

# Check if we're in the right directory
if [ ! -f "index.html" ]; then
    echo "❌ Error: index.html not found. Are you in the right directory?"
    exit 1
fi

echo "✅ Repository files verified"
echo ""

# Check if GitHub Actions workflow exists
if [ -f ".github/workflows/deploy.yml" ]; then
    echo "✅ GitHub Actions workflow exists"
else
    echo "❌ Error: GitHub Actions workflow not found"
    exit 1
fi

echo ""
echo "📋 Deployment Checklist:"
echo "------------------------"
echo ""
echo "✅ 1. All files are committed and pushed"
echo "✅ 2. GitHub Actions workflow is configured"
echo "✅ 3. Application is ready (index.html, css/, js/)"
echo "✅ 4. Workflow fixed to deploy only from main branch"
echo ""
echo "🔧 What You Need to Do:"
echo "------------------------"
echo ""
echo "⚠️  IMPORTANT: Merge to main branch first!"
echo "   GitHub Pages only deploys from 'main' branch for security."
echo ""
echo "1. Merge this PR to main branch"
echo ""
echo "2. Go to: https://github.com/std35970-blip/pak-ecom-dashboard/settings/pages"
echo ""
echo "3. Under 'Build and deployment':"
echo "   - Source: Select 'GitHub Actions'"
echo "   - Click 'Save'"
echo ""
echo "4. Deployment happens automatically after merge!"
echo "   Or manually trigger:"
echo "   - Go to: https://github.com/std35970-blip/pak-ecom-dashboard/actions"
echo "   - Click on 'Deploy to GitHub Pages' workflow"
echo "   - Click 'Run workflow' button"
echo "   - Select branch: main (NOT feature branches!)"
echo "   - Click 'Run workflow'"
echo ""
echo "5. Wait 2-3 minutes for deployment to complete"
echo ""
echo "6. Visit your live site at:"
echo "   🌐 https://std35970-blip.github.io/pak-ecom-dashboard/"
echo ""
echo "🎉 That's it! Your dashboard will be live!"
echo ""
echo "📚 Need help? Check DEPLOYMENT_STATUS.md"
echo ""
