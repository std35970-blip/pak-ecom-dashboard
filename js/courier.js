// Courier.js - Courier Analytics Logic

let courierChart = null;

// Load courier data
function loadCourier() {
    updateCourierStats();
    updateCourierChart();
    updateCourierPerformance();
}

// Update courier statistics
function updateCourierStats() {
    const orders = getOrders();
    const statsContainer = document.getElementById('courierStats');
    statsContainer.innerHTML = '';
    
    // Count orders by courier
    const courierCounts = {};
    
    orders.forEach(order => {
        if (!courierCounts[order.courier]) {
            courierCounts[order.courier] = 0;
        }
        courierCounts[order.courier]++;
    });
    
    // Create stat cards
    Object.entries(courierCounts).forEach(([courier, count]) => {
        const card = document.createElement('div');
        card.className = 'stat-card';
        card.innerHTML = `
            <div class="stat-icon">🚚</div>
            <div class="stat-info">
                <h3>${courier}</h3>
                <p class="stat-value">${count} orders</p>
            </div>
        `;
        statsContainer.appendChild(card);
    });
}

// Update courier chart
function updateCourierChart() {
    // Check if Chart.js is available
    if (typeof Chart === 'undefined') {
        console.warn('Chart.js not loaded, skipping chart rendering');
        return;
    }
    
    const canvas = document.getElementById('courierChart');
    const ctx = canvas.getContext('2d');
    
    const orders = getOrders();
    
    // Count orders by courier
    const courierCounts = {};
    
    orders.forEach(order => {
        if (!courierCounts[order.courier]) {
            courierCounts[order.courier] = 0;
        }
        courierCounts[order.courier]++;
    });
    
    // Destroy existing chart if it exists
    if (courierChart) {
        courierChart.destroy();
    }
    
    // Create new chart
    courierChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: Object.keys(courierCounts),
            datasets: [{
                data: Object.values(courierCounts),
                backgroundColor: [
                    '#006400',
                    '#28a745',
                    '#90EE90',
                    '#01411C',
                    '#17a2b8',
                    '#ffc107',
                    '#dc3545'
                ],
                borderWidth: 2,
                borderColor: '#ffffff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}

// Update courier performance
function updateCourierPerformance() {
    const orders = getOrders();
    const performanceContainer = document.getElementById('courierPerformance');
    performanceContainer.innerHTML = '';
    
    // Calculate performance metrics by courier
    const courierMetrics = {};
    
    orders.forEach(order => {
        if (!courierMetrics[order.courier]) {
            courierMetrics[order.courier] = {
                total: 0,
                delivered: 0,
                returned: 0
            };
        }
        
        courierMetrics[order.courier].total++;
        
        if (order.status === 'Delivered') {
            courierMetrics[order.courier].delivered++;
        } else if (order.status === 'Returned') {
            courierMetrics[order.courier].returned++;
        }
    });
    
    // Display performance
    Object.entries(courierMetrics).forEach(([courier, metrics]) => {
        const returnRate = metrics.total > 0 ? 
            ((metrics.returned / metrics.total) * 100).toFixed(1) : 0;
        const deliveryRate = metrics.total > 0 ? 
            ((metrics.delivered / metrics.total) * 100).toFixed(1) : 0;
        
        const item = document.createElement('div');
        item.className = 'summary-item';
        item.innerHTML = `
            <div>
                <strong>${courier}</strong><br>
                <small>Return: ${returnRate}% | Delivery: ${deliveryRate}%</small>
            </div>
            <span class="summary-value">${metrics.total}</span>
        `;
        
        performanceContainer.appendChild(item);
    });
}
