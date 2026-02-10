// Products.js - Product Performance Logic

// Load products data
function loadProducts() {
    displayProducts();
    setupAddProduct();
}

// Display products
function displayProducts() {
    const orders = getOrders();
    const tbody = document.getElementById('productsTableBody');
    tbody.innerHTML = '';
    
    // Aggregate products data
    const productStats = {};
    
    orders.forEach(order => {
        if (!productStats[order.product]) {
            productStats[order.product] = {
                name: order.product,
                unitsSold: 0,
                revenue: 0,
                returned: 0,
                total: 0
            };
        }
        
        productStats[order.product].total++;
        
        if (order.status === 'Delivered') {
            productStats[order.product].unitsSold += order.quantity;
            productStats[order.product].revenue += (order.price * order.quantity) + order.shipping;
        } else if (order.status === 'Returned') {
            productStats[order.product].returned++;
        }
    });
    
    // Convert to array and sort by revenue
    const products = Object.values(productStats);
    products.sort((a, b) => b.revenue - a.revenue);
    
    // Display products
    products.forEach(product => {
        const returnRate = product.total > 0 ? 
            ((product.returned / product.total) * 100).toFixed(1) : 0;
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><strong>${product.name}</strong></td>
            <td>${product.unitsSold}</td>
            <td>${formatCurrency(product.revenue)}</td>
            <td>${returnRate}%</td>
        `;
        
        tbody.appendChild(row);
    });
}

// Setup add product button
function setupAddProduct() {
    const addBtn = document.getElementById('addProductBtn');
    
    if (addBtn && !addBtn.dataset.listenerAdded) {
        addBtn.addEventListener('click', () => {
            const productName = prompt('Enter product name:');
            if (productName && productName.trim()) {
                // Just show the order modal with product name pre-filled
                currentEditOrderId = null;
                clearOrderForm();
                document.getElementById('orderProductName').value = productName.trim();
                document.getElementById('modalTitle').textContent = 'Add New Order';
                document.getElementById('addOrderModal').classList.add('active');
            }
        });
        addBtn.dataset.listenerAdded = 'true';
    }
}
