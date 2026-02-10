// App.js - Main Application Logic and Navigation

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupNavigation();
    setupMobileMenu();
    loadAllData();
});

// Initialize the application
function initializeApp() {
    // Initialize sample data if not exists
    if (!localStorage.getItem('ordersInitialized')) {
        initializeSampleData();
        localStorage.setItem('ordersInitialized', 'true');
    }
    
    // Set current date
    updateCurrentDate();
    
    // Load initial page
    showPage('dashboard');
}

// Setup navigation
function setupNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all items
            navItems.forEach(nav => nav.classList.remove('active'));
            
            // Add active class to clicked item
            this.classList.add('active');
            
            // Show corresponding page
            const page = this.getAttribute('data-page');
            showPage(page);
            
            // Close mobile menu if open
            document.getElementById('sidebar').classList.remove('active');
        });
    });
}

// Setup mobile menu
function setupMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const sidebar = document.getElementById('sidebar');
    const closeSidebar = document.getElementById('closeSidebar');
    
    hamburger.addEventListener('click', () => {
        sidebar.classList.add('active');
    });
    
    closeSidebar.addEventListener('click', () => {
        sidebar.classList.remove('active');
    });
}

// Show specific page
function showPage(pageName) {
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));
    
    // Show selected page
    const selectedPage = document.getElementById(`${pageName}-page`);
    if (selectedPage) {
        selectedPage.classList.add('active');
        
        // Load data for the page
        loadPageData(pageName);
    }
}

// Load data for specific page
function loadPageData(pageName) {
    switch(pageName) {
        case 'dashboard':
            loadDashboard();
            break;
        case 'orders':
            loadOrders();
            break;
        case 'payments':
            loadPayments();
            break;
        case 'products':
            loadProducts();
            break;
        case 'courier':
            loadCourier();
            break;
        case 'settings':
            loadSettings();
            break;
    }
}

// Load all data on startup
function loadAllData() {
    loadDashboard();
    loadOrders();
    loadPayments();
    loadProducts();
    loadCourier();
    loadSettings();
}

// Update current date in header
function updateCurrentDate() {
    const dateElement = document.getElementById('currentDate');
    const now = new Date();
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    dateElement.textContent = now.toLocaleDateString('en-US', options);
}

// Format currency
function formatCurrency(amount) {
    return '₨' + Number(amount).toLocaleString('en-PK');
}

// Get orders from localStorage
function getOrders() {
    const orders = localStorage.getItem('orders');
    return orders ? JSON.parse(orders) : [];
}

// Save orders to localStorage
function saveOrders(orders) {
    localStorage.setItem('orders', JSON.stringify(orders));
}

// Get settings from localStorage
function getSettings() {
    const settings = localStorage.getItem('settings');
    return settings ? JSON.parse(settings) : {
        businessName: 'My E-Commerce Business',
        ownerName: 'Business Owner',
        phone: '+92 XXX XXXXXXX',
        city: 'Karachi',
        defaultCourier: 'TCS',
        defaultPayment: 'COD'
    };
}

// Save settings to localStorage
function saveSettings(settings) {
    localStorage.setItem('settings', JSON.stringify(settings));
}

// Initialize sample data
function initializeSampleData() {
    const sampleOrders = [
        {
            id: 'ORD-001',
            customerName: 'Ali Hassan',
            phone: '0300-1234567',
            city: 'Karachi',
            product: 'Mobile Phone Cover',
            quantity: 2,
            price: 599,
            shipping: 150,
            payment: 'COD',
            courier: 'TCS',
            status: 'Delivered',
            date: '2026-02-03'
        },
        {
            id: 'ORD-002',
            customerName: 'Fatima Ahmed',
            phone: '0321-9876543',
            city: 'Lahore',
            product: 'Lawn Suit 3 Piece',
            quantity: 1,
            price: 4500,
            shipping: 200,
            payment: 'JazzCash',
            courier: 'Leopards',
            status: 'Delivered',
            date: '2026-02-04'
        },
        {
            id: 'ORD-003',
            customerName: 'Ahmed Khan',
            phone: '0333-4567890',
            city: 'Islamabad',
            product: 'Sports Shoes',
            quantity: 1,
            price: 3200,
            shipping: 180,
            payment: 'Easypaisa',
            courier: 'PostEx',
            status: 'Shipped',
            date: '2026-02-05'
        },
        {
            id: 'ORD-004',
            customerName: 'Ayesha Malik',
            phone: '0345-2345678',
            city: 'Rawalpindi',
            product: 'Handbag',
            quantity: 1,
            price: 1800,
            shipping: 150,
            payment: 'COD',
            courier: 'TCS',
            status: 'Confirmed',
            date: '2026-02-06'
        },
        {
            id: 'ORD-005',
            customerName: 'Hassan Ali',
            phone: '0301-8765432',
            city: 'Faisalabad',
            product: 'Smart Watch',
            quantity: 1,
            price: 6500,
            shipping: 200,
            payment: 'Bank Transfer',
            courier: 'M&P',
            status: 'Delivered',
            date: '2026-02-04'
        },
        {
            id: 'ORD-006',
            customerName: 'Zara Hussain',
            phone: '0315-3456789',
            city: 'Multan',
            product: 'Skincare Set',
            quantity: 1,
            price: 2500,
            shipping: 150,
            payment: 'COD',
            courier: 'Leopards',
            status: 'Delivered',
            date: '2026-02-05'
        },
        {
            id: 'ORD-007',
            customerName: 'Usman Tariq',
            phone: '0322-6543210',
            city: 'Peshawar',
            product: 'Gaming Mouse',
            quantity: 1,
            price: 1500,
            shipping: 180,
            payment: 'Prepaid',
            courier: 'PostEx',
            status: 'Delivered',
            date: '2026-02-06'
        },
        {
            id: 'ORD-008',
            customerName: 'Sara Khan',
            phone: '0334-7890123',
            city: 'Quetta',
            product: 'Winter Jacket',
            quantity: 1,
            price: 4800,
            shipping: 250,
            payment: 'COD',
            courier: 'Trax',
            status: 'Pending',
            date: '2026-02-08'
        },
        {
            id: 'ORD-009',
            customerName: 'Bilal Ahmed',
            phone: '0346-0123456',
            city: 'Hyderabad',
            product: 'Bluetooth Speaker',
            quantity: 1,
            price: 2200,
            shipping: 150,
            payment: 'JazzCash',
            courier: 'TCS',
            status: 'Shipped',
            date: '2026-02-07'
        },
        {
            id: 'ORD-010',
            customerName: 'Nida Fatima',
            phone: '0302-2345678',
            city: 'Sialkot',
            product: 'Sports Jersey',
            quantity: 2,
            price: 1200,
            shipping: 150,
            payment: 'COD',
            courier: 'CallCourier',
            status: 'Delivered',
            date: '2026-02-05'
        },
        {
            id: 'ORD-011',
            customerName: 'Kamran Raza',
            phone: '0323-3456789',
            city: 'Karachi',
            product: 'Wireless Earbuds',
            quantity: 1,
            price: 3500,
            shipping: 150,
            payment: 'Easypaisa',
            courier: 'Leopards',
            status: 'Delivered',
            date: '2026-02-07'
        },
        {
            id: 'ORD-012',
            customerName: 'Hina Nasir',
            phone: '0335-4567890',
            city: 'Lahore',
            product: 'Perfume Set',
            quantity: 1,
            price: 2800,
            shipping: 150,
            payment: 'COD',
            courier: 'TCS',
            status: 'Returned',
            date: '2026-02-04'
        },
        {
            id: 'ORD-013',
            customerName: 'Imran Malik',
            phone: '0347-5678901',
            city: 'Islamabad',
            product: 'Laptop Bag',
            quantity: 1,
            price: 1900,
            shipping: 150,
            payment: 'Bank Transfer',
            courier: 'PostEx',
            status: 'Delivered',
            date: '2026-02-06'
        },
        {
            id: 'ORD-014',
            customerName: 'Maria Aslam',
            phone: '0303-6789012',
            city: 'Rawalpindi',
            product: 'Makeup Kit',
            quantity: 1,
            price: 3200,
            shipping: 150,
            payment: 'JazzCash',
            courier: 'Leopards',
            status: 'Confirmed',
            date: '2026-02-09'
        },
        {
            id: 'ORD-015',
            customerName: 'Asad Khan',
            phone: '0324-7890123',
            city: 'Faisalabad',
            product: 'Fitness Band',
            quantity: 1,
            price: 2500,
            shipping: 150,
            payment: 'COD',
            courier: 'TCS',
            status: 'Shipped',
            date: '2026-02-08'
        },
        {
            id: 'ORD-016',
            customerName: 'Sana Riaz',
            phone: '0336-8901234',
            city: 'Multan',
            product: 'Hair Dryer',
            quantity: 1,
            price: 2200,
            shipping: 150,
            payment: 'Prepaid',
            courier: 'M&P',
            status: 'Delivered',
            date: '2026-02-07'
        },
        {
            id: 'ORD-017',
            customerName: 'Fahad Iqbal',
            phone: '0348-9012345',
            city: 'Peshawar',
            product: 'Power Bank',
            quantity: 2,
            price: 1500,
            shipping: 150,
            payment: 'COD',
            courier: 'Trax',
            status: 'Delivered',
            date: '2026-02-09'
        },
        {
            id: 'ORD-018',
            customerName: 'Rabia Shah',
            phone: '0304-0123456',
            city: 'Quetta',
            product: 'Wall Clock',
            quantity: 1,
            price: 1200,
            shipping: 180,
            payment: 'Easypaisa',
            courier: 'PostEx',
            status: 'Cancelled',
            date: '2026-02-05'
        },
        {
            id: 'ORD-019',
            customerName: 'Waqas Ali',
            phone: '0325-1234567',
            city: 'Hyderabad',
            product: 'Table Lamp',
            quantity: 1,
            price: 1800,
            shipping: 150,
            payment: 'COD',
            courier: 'CallCourier',
            status: 'Delivered',
            date: '2026-02-08'
        },
        {
            id: 'ORD-020',
            customerName: 'Amna Shahid',
            phone: '0337-2345678',
            city: 'Sialkot',
            product: 'Kitchen Scale',
            quantity: 1,
            price: 1100,
            shipping: 150,
            payment: 'JazzCash',
            courier: 'TCS',
            status: 'Pending',
            date: '2026-02-10'
        }
    ];
    
    saveOrders(sampleOrders);
}

// Calculate date ranges
function getDateRange(range) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    switch(range) {
        case 'today':
            return { start: today, end: new Date() };
        case 'week':
            const weekStart = new Date(today);
            weekStart.setDate(today.getDate() - 7);
            return { start: weekStart, end: new Date() };
        case 'month':
            const monthStart = new Date(today);
            monthStart.setDate(today.getDate() - 30);
            return { start: monthStart, end: new Date() };
        default:
            return { start: new Date(0), end: new Date() };
    }
}

// Filter orders by date range
function filterOrdersByDate(orders, range) {
    const { start, end } = getDateRange(range);
    return orders.filter(order => {
        const orderDate = new Date(order.date);
        return orderDate >= start && orderDate <= end;
    });
}
