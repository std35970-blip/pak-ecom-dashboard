// Dashboard.js - Revenue Dashboard Logic

let revenueChart = null;

// Load dashboard data
function loadDashboard() {
    updateGreeting();
    updateDashboardStats();
    updateRevenueChart();
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
    document.getElementById('totalProfit').textContent = formatCurrency(totalProfit);
    
    // Update summary
    document.getElementById('totalOrders').textContent = orders.length;
    document.getElementById('totalRevenue').textContent = formatCurrency(calculateTotalRevenue(orders.filter(o => o.status === 'Delivered')));
    
    // Calculate return rate
    const returnedOrders = orders.filter(o => o.status === 'Returned').length;
    const returnRate = orders.length > 0 ? ((returnedOrders / orders.length) * 100).toFixed(1) : 0;
    document.getElementById('returnRate').textContent = returnRate + '%';
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
                backgroundColor: '#006400',
                borderColor: '#01411C',
                borderWidth: 1,
                borderRadius: 5
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
                    ticks: {
                        callback: function(value) {
                            return '₨' + value.toLocaleString('en-PK');
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
