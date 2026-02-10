// Payments.js - Payment Tracking Logic

let paymentChart = null;

// Load payments data
function loadPayments() {
    updatePaymentStats();
    updatePaymentChart();
}

// Update payment statistics
function updatePaymentStats() {
    const orders = getOrders().filter(o => o.status === 'Delivered');
    
    // Calculate totals by payment method
    const paymentTotals = {
        'COD': 0,
        'JazzCash': 0,
        'Easypaisa': 0,
        'Bank Transfer': 0,
        'Prepaid': 0
    };
    
    orders.forEach(order => {
        const amount = (order.price * order.quantity) + order.shipping;
        if (paymentTotals.hasOwnProperty(order.payment)) {
            paymentTotals[order.payment] += amount;
        }
    });
    
    // Update DOM
    document.getElementById('codTotal').textContent = formatCurrency(paymentTotals['COD']);
    document.getElementById('jazzcashTotal').textContent = formatCurrency(paymentTotals['JazzCash']);
    document.getElementById('easypaisaTotal').textContent = formatCurrency(paymentTotals['Easypaisa']);
    document.getElementById('bankTotal').textContent = formatCurrency(paymentTotals['Bank Transfer']);
    document.getElementById('prepaidTotal').textContent = formatCurrency(paymentTotals['Prepaid']);
    
    // Calculate total received (all delivered orders)
    const totalReceived = Object.values(paymentTotals).reduce((sum, val) => sum + val, 0);
    document.getElementById('totalReceived').textContent = formatCurrency(totalReceived);
    
    // Calculate pending payments (pending and confirmed orders)
    const pendingOrders = getOrders().filter(o => 
        o.status === 'Pending' || o.status === 'Confirmed' || o.status === 'Shipped'
    );
    const pendingAmount = pendingOrders.reduce((sum, order) => {
        return sum + (order.price * order.quantity) + order.shipping;
    }, 0);
    document.getElementById('pendingPayments').textContent = formatCurrency(pendingAmount);
}

// Update payment chart
function updatePaymentChart() {
    // Check if Chart.js is available
    if (typeof Chart === 'undefined') {
        console.warn('Chart.js not loaded, skipping chart rendering');
        return;
    }
    
    const canvas = document.getElementById('paymentChart');
    const ctx = canvas.getContext('2d');
    
    const orders = getOrders().filter(o => o.status === 'Delivered');
    
    // Calculate totals by payment method
    const paymentTotals = {
        'COD': 0,
        'JazzCash': 0,
        'Easypaisa': 0,
        'Bank Transfer': 0,
        'Prepaid': 0
    };
    
    orders.forEach(order => {
        const amount = (order.price * order.quantity) + order.shipping;
        if (paymentTotals.hasOwnProperty(order.payment)) {
            paymentTotals[order.payment] += amount;
        }
    });
    
    // Destroy existing chart if it exists
    if (paymentChart) {
        paymentChart.destroy();
    }
    
    // Create new chart
    paymentChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: Object.keys(paymentTotals),
            datasets: [{
                data: Object.values(paymentTotals),
                backgroundColor: [
                    '#006400',
                    '#28a745',
                    '#90EE90',
                    '#01411C',
                    '#17a2b8'
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
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.parsed || 0;
                            return label + ': ₨' + value.toLocaleString('en-PK');
                        }
                    }
                }
            }
        }
    });
}
