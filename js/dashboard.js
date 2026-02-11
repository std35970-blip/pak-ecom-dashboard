// Dashboard.js - Revenue Dashboard Logic (Premium Edition)

let revenueChart = null;

// Load dashboard data
function loadDashboard() {
    updateDashboardStats();
    updateRevenueChart();
    loadRecentOrders();
    loadTopProducts();
}

// Update greeting based on time of day
function updateGreeting() {
    const greetingElement = document.getElementById('greeting');
    const hour = new Date().getHours();
    let greeting = 'Good Morning';
    
    if (hour >= 12 && hour < 17) {
        greeting = 'Good Afternoon';
    } else if (hour >= 17) {
        greeting = 'Good Evening';
    }
    
    greetingElement.textContent = greeting + '! 👋';
}

// Update dashboard statistics
function updateDashboardStats() {
    const orders = getOrders();
    
    // Calculate today's sales
    const todayOrders = filterOrdersByDate(orders, 'today').filter(o => 
        o.status === 'Delivered'
    );
    const todaySales = calculateTotalRevenue(todayOrders);
    document.getElementById('todaySales').textContent = formatCurrency(todaySales);
    
    // Calculate week's sales
    const weekOrders = filterOrdersByDate(orders, 'week').filter(o => 
        o.status === 'Delivered'
    );
    const weekSales = calculateTotalRevenue(weekOrders);
    document.getElementById('weekSales').textContent = formatCurrency(weekSales);
    
    // Calculate month's sales
    const monthOrders = filterOrdersByDate(orders, 'month').filter(o => 
        o.status === 'Delivered'
    );
    const monthSales = calculateTotalRevenue(monthOrders);
    document.getElementById('monthSales').textContent = formatCurrency(monthSales);
    
    // Calculate total profit (simplified: 30% margin)
    const totalProfit = monthSales * 0.30;
    const statTotalProfit = document.getElementById('statTotalProfit');
    if (statTotalProfit) {
        statTotalProfit.textContent = formatCurrency(totalProfit);
    }
    document.getElementById('totalProfit')?.textContent = formatCurrency(totalProfit);
    
    // Update premium stat cards
    const statTotalRevenue = document.getElementById('statTotalRevenue');
    if (statTotalRevenue) {
        statTotalRevenue.textContent = formatCurrency(monthSales);
    }
    
    const statTotalOrders = document.getElementById('statTotalOrders');
    if (statTotalOrders) {
        statTotalOrders.textContent = orders.length;
    }
    
    const statReturnRate = document.getElementById('statReturnRate');
    const returnedOrders = orders.filter(o => o.status === 'Returned').length;
    const returnRate = orders.length > 0 ? ((returnedOrders / orders.length) * 100).toFixed(1) : 0;
    if (statReturnRate) {
        statReturnRate.textContent = returnRate + '%';
    }
    
    // Update summary (legacy compatibility)
    if (document.getElementById('totalOrders')) {
        document.getElementById('totalOrders').textContent = orders.length;
    }
    if (document.getElementById('totalRevenue')) {
        document.getElementById('totalRevenue').textContent = formatCurrency(
            calculateTotalRevenue(orders.filter(o => o.status === 'Delivered'))
        );
    }
    if (document.getElementById('returnRate')) {
        document.getElementById('returnRate').textContent = returnRate + '%';
    }
    
    // Update Quick Summary section
    const pendingOrders = orders.filter(o => o.status === 'Pending').length;
    const completedOrders = orders.filter(o => o.status === 'Delivered').length;
    const avgOrderValue = orders.length > 0 ? monthSales / orders.length : 0;
    
    if (document.getElementById('pendingOrders')) {
        document.getElementById('pendingOrders').textContent = pendingOrders;
    }
    if (document.getElementById('completedOrders')) {
        document.getElementById('completedOrders').textContent = completedOrders;
    }
    if (document.getElementById('avgOrderValue')) {
        document.getElementById('avgOrderValue').textContent = formatCurrency(avgOrderValue);
    }
}

// Calculate total revenue from orders
function calculateTotalRevenue(orders) {
    return orders.reduce((total, order) => {
        return total + (order.price * order.quantity) + order.shipping;
    }, 0);
}

// Update revenue chart
function updateRevenueChart() {
    // Check if Chart.js is available
    if (typeof Chart === 'undefined') {
        console.warn('Chart.js not loaded, skipping chart rendering');
        return;
    }
    
    const canvas = document.getElementById('revenueChart');
    const ctx = canvas.getContext('2d');
    
    // Get last 7 days data
    const last7Days = getLast7DaysData();
    
    // Destroy existing chart if it exists
    if (revenueChart) {
        revenueChart.destroy();
    }
    
    // Create new chart
    revenueChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: last7Days.labels,
            datasets: [{
                label: 'Revenue (PKR)',
                data: last7Days.data,
                backgroundColor: 'rgba(0, 102, 255, 0.1)',
                borderColor: '#0066FF',
                borderWidth: 2,
                borderRadius: 8,
                hoverBackgroundColor: 'rgba(0, 102, 255, 0.2)',
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    padding: 12,
                    titleColor: '#fff',
                    bodyColor: '#fff',
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                    borderWidth: 1,
                    callbacks: {
                        label: function(context) {
                            return 'Revenue: ₨' + context.parsed.y.toLocaleString('en-PK');
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)',
                        drawBorder: false,
                    },
                    ticks: {
                        color: '#6B7280',
                        font: {
                            size: 12
                        },
                        callback: function(value) {
                            return '₨' + (value / 1000).toFixed(0) + 'k';
                        }
                    }
                },
                x: {
                    grid: {
                        display: false,
                        drawBorder: false,
                    },
                    ticks: {
                        color: '#6B7280',
                        font: {
                            size: 12
                        }
                    }
                }
            }
        }
    });
}

// Get last 7 days revenue data
function getLast7DaysData() {
    const orders = getOrders().filter(o => o.status === 'Delivered');
    const labels = [];
    const data = [];
    
    for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        date.setHours(0, 0, 0, 0);
        
        const dateStr = date.toISOString().split('T')[0];
        const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
        
        labels.push(dayName);
        
        // Calculate revenue for this day
        const dayOrders = orders.filter(order => order.date === dateStr);
        const dayRevenue = calculateTotalRevenue(dayOrders);
        data.push(dayRevenue);
    }
    
    return { labels, data };
}

// Load recent orders for dashboard
function loadRecentOrders() {
    const orders = getOrders();
    const recentOrders = orders.slice(0, 5); // Get first 5 orders
    const tbody = document.getElementById('recentOrdersBody');
    
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    recentOrders.forEach(order => {
        const tr = document.createElement('tr');
        tr.style.cursor = 'pointer';
        tr.onclick = () => showPage('orders');
        
        tr.innerHTML = `
            <td><strong>${order.id}</strong></td>
            <td>${order.customerName}</td>
            <td>${formatCurrency((order.price * order.quantity) + order.shipping)}</td>
            <td>${getStatusBadge(order.status)}</td>
        `;
        
        tbody.appendChild(tr);
    });
}

// Load top products for dashboard
function loadTopProducts() {
    const orders = getOrders();
    const container = document.getElementById('topProductsList');
    
    if (!container) return;
    
    // Group orders by product
    const productStats = {};
    orders.forEach(order => {
        if (!productStats[order.product]) {
            productStats[order.product] = {
                name: order.product,
                quantity: 0,
                revenue: 0
            };
        }
        productStats[order.product].quantity += order.quantity;
        productStats[order.product].revenue += (order.price * order.quantity);
    });
    
    // Convert to array and sort by revenue
    const products = Object.values(productStats)
        .sort((a, b) => b.revenue - a.revenue)
        .slice(0, 5);
    
    container.innerHTML = '';
    
    products.forEach((product, index) => {
        const productDiv = document.createElement('div');
        productDiv.className = 'summary-item';
        productDiv.style.padding = 'var(--spacing-md) 0';
        productDiv.style.borderBottom = index < products.length - 1 ? '1px solid var(--border-color)' : 'none';
        
        productDiv.innerHTML = `
            <div>
                <div class="font-semibold">${product.name}</div>
                <div class="text-sm text-muted">${product.quantity} units sold</div>
            </div>
            <div class="font-semibold text-primary">${formatCurrency(product.revenue)}</div>
        `;
        
        container.appendChild(productDiv);
    });
}
