// Premium UI Interactions and Features
// ========================================

// Initialize Premium UI on DOM Load
document.addEventListener('DOMContentLoaded', function() {
    initializePremiumUI();
    loadIcons();
    setupSidebarToggle();
    setupDropdowns();
    setupNotifications();
    setupThemeToggle();
    setupGlobalSearch();
    setupMobileMenu();
    updateDateTime();
    setInterval(updateDateTime, 60000); // Update every minute
});

// Initialize Premium UI
function initializePremiumUI() {
    console.log('🎨 Premium UI Loading...');
    
    // Add smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Initialize tooltips
    initializeTooltips();
    
    // Setup page visibility tracking
    setupPageVisibility();
    
    console.log('✅ Premium UI Loaded');
}

// Load SVG Icons
function loadIcons() {
    const iconMappings = {
        // Sidebar icons
        'icon-dashboard': Icons.dashboard,
        'icon-analytics': Icons.analytics,
        'icon-orders': Icons.orders,
        'icon-products': Icons.products,
        'icon-courier': Icons.courier,
        'icon-payments': Icons.payments,
        'icon-calculator': Icons.calculator,
        'icon-settings': Icons.settings,
        
        // Topbar icons
        'icon-search': Icons.search,
        'icon-bell': Icons.bell,
        'icon-theme': Icons.sun,
        'icon-menu': Icons.menu,
        'icon-chevron-down': Icons.chevronDown,
        
        // Profile dropdown
        'icon-user-menu': Icons.user,
        'icon-settings-menu': Icons.settings,
        'icon-logout': Icons.logOut,
        
        // Dashboard icons
        'icon-calendar-btn': Icons.calendar,
        'icon-download-btn': Icons.download,
        'icon-chevron-down-btn': Icons.chevronDown,
        'icon-dollar-1': Icons.dollarSign,
        'icon-dollar-2': Icons.dollarSign,
        'icon-shopping-1': Icons.shoppingCart,
        'icon-package-1': Icons.package,
        'icon-trending-up-1': Icons.trendingUp,
        'icon-trending-up-2': Icons.trendingUp,
        'icon-trending-up-3': Icons.trendingUp,
        'icon-trending-down-1': Icons.trendingDown,
        'icon-filter-btn': Icons.filter,
        
        // Orders page icons
        'icon-download-orders': Icons.download,
        'icon-plus-order': Icons.plus,
        'icon-search-orders': Icons.search,
        'icon-edit': Icons.edit,
        'icon-trash': Icons.trash,
        'icon-eye': Icons.eye,
        
        // Other icons
        'sidebarToggleIcon': Icons.chevronLeft,
    };
    
    Object.keys(iconMappings).forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.innerHTML = iconMappings[id];
        }
    });
}

// Sidebar Toggle
function setupSidebarToggle() {
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('mainContent');
    const topbar = document.getElementById('topbar');
    const toggleBtn = document.getElementById('sidebarToggle');
    const toggleIcon = document.getElementById('sidebarToggleIcon');
    
    if (!sidebar || !toggleBtn) return;
    
    let isCollapsed = localStorage.getItem('sidebarCollapsed') === 'true';
    
    if (isCollapsed) {
        sidebar.classList.add('collapsed');
        mainContent?.classList.add('sidebar-collapsed');
        topbar?.classList.add('sidebar-collapsed');
        if (toggleIcon) toggleIcon.innerHTML = Icons.chevronRight;
    }
    
    toggleBtn.addEventListener('click', function() {
        isCollapsed = !isCollapsed;
        
        sidebar.classList.toggle('collapsed');
        mainContent?.classList.toggle('sidebar-collapsed');
        topbar?.classList.toggle('sidebar-collapsed');
        
        if (toggleIcon) {
            toggleIcon.innerHTML = isCollapsed ? Icons.chevronRight : Icons.chevronLeft;
        }
        
        localStorage.setItem('sidebarCollapsed', isCollapsed);
    });
}

// Mobile Menu Toggle
function setupMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const sidebar = document.getElementById('sidebar');
    
    if (!mobileMenuToggle || !sidebar) return;
    
    mobileMenuToggle.addEventListener('click', function() {
        sidebar.classList.toggle('mobile-active');
    });
    
    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 768) {
            if (!sidebar.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
                sidebar.classList.remove('mobile-active');
            }
        }
    });
}

// Dropdown Menus
function setupDropdowns() {
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        const trigger = dropdown.querySelector('.topbar-profile, .btn');
        
        if (!trigger) return;
        
        trigger.addEventListener('click', function(e) {
            e.stopPropagation();
            
            // Close other dropdowns
            dropdowns.forEach(d => {
                if (d !== dropdown) d.classList.remove('active');
            });
            
            dropdown.classList.toggle('active');
        });
    });
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', function() {
        dropdowns.forEach(dropdown => {
            dropdown.classList.remove('active');
        });
    });
}

// Notifications Panel
function setupNotifications() {
    const notificationsBtn = document.getElementById('notificationsBtn');
    
    if (!notificationsBtn) return;
    
    notificationsBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        showNotificationPanel();
    });
}

function showNotificationPanel() {
    // Create notification panel if it doesn't exist
    let panel = document.getElementById('notificationPanel');
    
    if (!panel) {
        panel = document.createElement('div');
        panel.id = 'notificationPanel';
        panel.className = 'notification-panel';
        panel.innerHTML = `
            <div class="notification-header">
                <h3 class="card-title">Notifications</h3>
                <button class="btn btn-sm btn-outline" onclick="closeNotificationPanel()">
                    ${Icons.x}
                </button>
            </div>
            <div class="notification-item unread">
                <div class="d-flex justify-between align-center mb-sm">
                    <div class="font-semibold">New Order Received</div>
                    <div class="text-xs text-muted">2m ago</div>
                </div>
                <div class="text-sm text-muted">Order #ORD-021 from Ahmed Khan for ₨3,500</div>
            </div>
            <div class="notification-item unread">
                <div class="d-flex justify-between align-center mb-sm">
                    <div class="font-semibold">Low Stock Alert</div>
                    <div class="text-xs text-muted">1h ago</div>
                </div>
                <div class="text-sm text-muted">Mobile Phone Cover - Only 5 units remaining</div>
            </div>
            <div class="notification-item">
                <div class="d-flex justify-between align-center mb-sm">
                    <div class="font-semibold">Order Delivered</div>
                    <div class="text-xs text-muted">3h ago</div>
                </div>
                <div class="text-sm text-muted">Order #ORD-015 has been delivered successfully</div>
            </div>
            <div class="notification-item">
                <div class="d-flex justify-between align-center mb-sm">
                    <div class="font-semibold">Revenue Milestone</div>
                    <div class="text-xs text-muted">1d ago</div>
                </div>
                <div class="text-sm text-muted">Congratulations! You've reached ₨30,000 in monthly sales</div>
            </div>
            <div class="card-footer" style="text-align: center;">
                <a href="#" class="btn btn-sm btn-outline">View All Notifications</a>
            </div>
        `;
        document.body.appendChild(panel);
    }
    
    panel.classList.add('active');
}

function closeNotificationPanel() {
    const panel = document.getElementById('notificationPanel');
    if (panel) {
        panel.classList.remove('active');
    }
}

// Theme Toggle (Dark Mode)
function setupThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('icon-theme');
    
    if (!themeToggle) return;
    
    // Check saved theme preference
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    if (themeIcon) {
        themeIcon.innerHTML = currentTheme === 'dark' ? Icons.sun : Icons.moon;
    }
    
    themeToggle.addEventListener('click', function() {
        const theme = document.documentElement.getAttribute('data-theme');
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        if (themeIcon) {
            themeIcon.innerHTML = newTheme === 'dark' ? Icons.sun : Icons.moon;
        }
        
        // Animate theme transition
        document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
        setTimeout(() => {
            document.body.style.transition = '';
        }, 300);
    });
}

// Global Search
function setupGlobalSearch() {
    const searchInput = document.getElementById('globalSearch');
    
    if (!searchInput) return;
    
    searchInput.addEventListener('input', debounce(function(e) {
        const query = e.target.value.toLowerCase();
        if (query.length < 2) return;
        
        performGlobalSearch(query);
    }, 300));
}

function performGlobalSearch(query) {
    console.log('Searching for:', query);
    // TODO: Implement actual search functionality
    // This would search across orders, products, customers, etc.
}

// Update Date and Time
function updateDateTime() {
    const now = new Date();
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    
    // Update any date display elements
    const dateElements = document.querySelectorAll('[data-datetime]');
    dateElements.forEach(el => {
        el.textContent = now.toLocaleDateString('en-US', options);
    });
}

// Tooltips
function initializeTooltips() {
    const elements = document.querySelectorAll('[data-tooltip]');
    
    elements.forEach(element => {
        element.addEventListener('mouseenter', showTooltip);
        element.addEventListener('mouseleave', hideTooltip);
    });
}

function showTooltip(e) {
    const text = e.target.getAttribute('data-tooltip');
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = text;
    tooltip.id = 'active-tooltip';
    
    document.body.appendChild(tooltip);
    
    const rect = e.target.getBoundingClientRect();
    tooltip.style.top = `${rect.top - tooltip.offsetHeight - 5}px`;
    tooltip.style.left = `${rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2)}px`;
}

function hideTooltip() {
    const tooltip = document.getElementById('active-tooltip');
    if (tooltip) {
        tooltip.remove();
    }
}

// Page Visibility
function setupPageVisibility() {
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            console.log('Page hidden');
        } else {
            console.log('Page visible');
            // Refresh data when page becomes visible again
            if (typeof loadPageData === 'function') {
                const activePage = document.querySelector('.page.active');
                if (activePage) {
                    const pageId = activePage.id.replace('-page', '');
                    loadPageData(pageId);
                }
            }
        }
    });
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Export Functions
function exportToCSV(data, filename) {
    const csv = convertToCSV(data);
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
}

function convertToCSV(data) {
    if (!data || data.length === 0) return '';
    
    const headers = Object.keys(data[0]);
    const rows = data.map(row => 
        headers.map(header => {
            const value = row[header];
            return typeof value === 'string' && value.includes(',') 
                ? `"${value}"` 
                : value;
        }).join(',')
    );
    
    return [headers.join(','), ...rows].join('\n');
}

// Show Loading State
function showLoading(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    container.innerHTML = `
        <div class="d-flex align-center justify-center" style="padding: var(--spacing-xl);">
            <div class="spinner"></div>
        </div>
    `;
}

// Show Empty State
function showEmptyState(containerId, message, iconHtml) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    container.innerHTML = `
        <div class="text-center" style="padding: var(--spacing-2xl);">
            <div style="font-size: 3rem; margin-bottom: var(--spacing-md); opacity: 0.5;">
                ${iconHtml || Icons.package}
            </div>
            <div class="text-lg font-semibold mb-sm">${message || 'No data available'}</div>
            <div class="text-muted">Try adjusting your filters or adding new items</div>
        </div>
    `;
}

// Show Toast Notification
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `alert alert-${type}`;
    toast.innerHTML = `
        <span>${getAlertIcon(type)}</span>
        <span>${message}</span>
    `;
    toast.style.position = 'fixed';
    toast.style.top = '80px';
    toast.style.right = '20px';
    toast.style.zIndex = '9999';
    toast.style.minWidth = '300px';
    toast.style.animation = 'slideUp 0.3s ease';
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

function getAlertIcon(type) {
    switch(type) {
        case 'success': return Icons.check;
        case 'danger': return Icons.alertCircle;
        case 'warning': return Icons.alertCircle;
        case 'info': return Icons.info;
        default: return Icons.info;
    }
}

// Confirm Dialog
function showConfirmDialog(title, message, onConfirm) {
    const backdrop = document.createElement('div');
    backdrop.className = 'modal-backdrop active';
    
    const modal = document.createElement('div');
    modal.className = 'modal active';
    modal.innerHTML = `
        <div class="modal-dialog">
            <div class="modal-header">
                <h3 class="modal-title">${title}</h3>
                <button class="modal-close" onclick="this.closest('.modal').remove(); document.querySelector('.modal-backdrop').remove();">
                    ${Icons.x}
                </button>
            </div>
            <div class="modal-body">
                <p>${message}</p>
            </div>
            <div class="modal-footer">
                <button class="btn btn-secondary" onclick="this.closest('.modal').remove(); document.querySelector('.modal-backdrop').remove();">
                    Cancel
                </button>
                <button class="btn btn-danger" id="confirmBtn">
                    Confirm
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(backdrop);
    document.body.appendChild(modal);
    
    document.getElementById('confirmBtn').addEventListener('click', function() {
        onConfirm();
        modal.remove();
        backdrop.remove();
    });
}

// Format Currency
function formatCurrency(amount) {
    return '₨' + Number(amount).toLocaleString('en-PK');
}

// Format Date
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

// Get Status Badge HTML
function getStatusBadge(status) {
    const statusMap = {
        'Pending': 'warning',
        'Confirmed': 'info',
        'Shipped': 'info',
        'Delivered': 'success',
        'Returned': 'danger',
        'Cancelled': 'secondary'
    };
    
    const badgeType = statusMap[status] || 'secondary';
    return `<span class="badge badge-${badgeType}">${status}</span>`;
}

// Initialize Navigation (update existing function compatibility)
window.addEventListener('load', function() {
    // Setup navigation items
    const navItems = document.querySelectorAll('.sidebar-nav-item');
    
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all items
            navItems.forEach(nav => nav.classList.remove('active'));
            
            // Add active class to clicked item
            this.classList.add('active');
            
            // Show corresponding page
            const page = this.getAttribute('data-page');
            if (page && typeof showPage === 'function') {
                showPage(page);
            }
            
            // Close mobile menu
            if (window.innerWidth <= 768) {
                document.getElementById('sidebar')?.classList.remove('mobile-active');
            }
        });
    });
});
