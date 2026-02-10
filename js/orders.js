// Orders.js - Order Management CRUD

let currentEditOrderId = null;

// Load orders
function loadOrders() {
    displayOrders();
    setupOrderFilters();
    setupOrderModal();
}

// Display orders in table
function displayOrders(filterStatus = '', filterPayment = '', filterCourier = '') {
    const orders = getOrders();
    const tbody = document.getElementById('ordersTableBody');
    tbody.innerHTML = '';
    
    // Filter orders
    let filteredOrders = orders;
    
    if (filterStatus) {
        filteredOrders = filteredOrders.filter(o => o.status === filterStatus);
    }
    if (filterPayment) {
        filteredOrders = filteredOrders.filter(o => o.payment === filterPayment);
    }
    if (filterCourier) {
        filteredOrders = filteredOrders.filter(o => o.courier === filterCourier);
    }
    
    // Display orders
    filteredOrders.forEach(order => {
        const row = document.createElement('tr');
        const totalAmount = (order.price * order.quantity) + order.shipping;
        
        row.innerHTML = `
            <td><strong>${order.id}</strong></td>
            <td>${order.customerName}</td>
            <td>${order.phone}</td>
            <td>${order.city}</td>
            <td>${order.product}</td>
            <td>${order.quantity}</td>
            <td>${formatCurrency(totalAmount)}</td>
            <td>${order.payment}</td>
            <td>${order.courier}</td>
            <td><span class="status-badge status-${order.status.toLowerCase()}">${order.status}</span></td>
            <td>${formatDate(order.date)}</td>
            <td>
                <button class="btn btn-edit" onclick="editOrder('${order.id}')">Edit</button>
                <button class="btn btn-danger" onclick="deleteOrder('${order.id}')">Delete</button>
            </td>
        `;
        
        tbody.appendChild(row);
    });
}

// Format date
function formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-GB');
}

// Setup order filters
function setupOrderFilters() {
    const filterStatus = document.getElementById('filterStatus');
    const filterPayment = document.getElementById('filterPayment');
    const filterCourier = document.getElementById('filterCourier');
    
    filterStatus.addEventListener('change', applyFilters);
    filterPayment.addEventListener('change', applyFilters);
    filterCourier.addEventListener('change', applyFilters);
}

// Apply filters
function applyFilters() {
    const filterStatus = document.getElementById('filterStatus').value;
    const filterPayment = document.getElementById('filterPayment').value;
    const filterCourier = document.getElementById('filterCourier').value;
    
    displayOrders(filterStatus, filterPayment, filterCourier);
}

// Setup order modal
function setupOrderModal() {
    const addBtn = document.getElementById('addOrderBtn');
    const modal = document.getElementById('addOrderModal');
    const closeBtn = document.getElementById('closeModal');
    const cancelBtn = document.getElementById('cancelOrderBtn');
    const saveBtn = document.getElementById('saveOrderBtn');
    
    addBtn.addEventListener('click', () => {
        currentEditOrderId = null;
        clearOrderForm();
        document.getElementById('modalTitle').textContent = 'Add New Order';
        modal.classList.add('active');
    });
    
    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
    });
    
    cancelBtn.addEventListener('click', () => {
        modal.classList.remove('active');
    });
    
    saveBtn.addEventListener('click', saveOrder);
    
    // Close modal on outside click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
}

// Clear order form
function clearOrderForm() {
    document.getElementById('orderCustomerName').value = '';
    document.getElementById('orderCustomerPhone').value = '';
    document.getElementById('orderCity').value = 'Karachi';
    document.getElementById('orderProductName').value = '';
    document.getElementById('orderQuantity').value = '1';
    document.getElementById('orderPrice').value = '';
    document.getElementById('orderShipping').value = '150';
    document.getElementById('orderPayment').value = 'COD';
    document.getElementById('orderCourier').value = 'TCS';
    document.getElementById('orderStatus').value = 'Pending';
}

// Save order (add or edit)
function saveOrder() {
    // Get form values
    const customerName = document.getElementById('orderCustomerName').value;
    const phone = document.getElementById('orderCustomerPhone').value;
    const city = document.getElementById('orderCity').value;
    const product = document.getElementById('orderProductName').value;
    const quantity = parseInt(document.getElementById('orderQuantity').value);
    const price = parseFloat(document.getElementById('orderPrice').value);
    const shipping = parseFloat(document.getElementById('orderShipping').value);
    const payment = document.getElementById('orderPayment').value;
    const courier = document.getElementById('orderCourier').value;
    const status = document.getElementById('orderStatus').value;
    
    // Validate
    if (!customerName || !phone || !product || !price) {
        alert('Please fill in all required fields');
        return;
    }
    
    const orders = getOrders();
    
    if (currentEditOrderId) {
        // Edit existing order
        const index = orders.findIndex(o => o.id === currentEditOrderId);
        if (index !== -1) {
            orders[index] = {
                ...orders[index],
                customerName,
                phone,
                city,
                product,
                quantity,
                price,
                shipping,
                payment,
                courier,
                status
            };
        }
    } else {
        // Add new order
        const newOrder = {
            id: generateOrderId(orders),
            customerName,
            phone,
            city,
            product,
            quantity,
            price,
            shipping,
            payment,
            courier,
            status,
            date: new Date().toISOString().split('T')[0]
        };
        orders.push(newOrder);
    }
    
    saveOrders(orders);
    displayOrders();
    document.getElementById('addOrderModal').classList.remove('active');
    
    // Refresh all data
    loadDashboard();
    loadPayments();
    loadProducts();
    loadCourier();
}

// Generate order ID
function generateOrderId(orders) {
    const maxId = orders.reduce((max, order) => {
        const num = parseInt(order.id.split('-')[1]);
        return num > max ? num : max;
    }, 0);
    
    return `ORD-${String(maxId + 1).padStart(3, '0')}`;
}

// Edit order
function editOrder(orderId) {
    const orders = getOrders();
    const order = orders.find(o => o.id === orderId);
    
    if (order) {
        currentEditOrderId = orderId;
        
        // Fill form with order data
        document.getElementById('orderCustomerName').value = order.customerName;
        document.getElementById('orderCustomerPhone').value = order.phone;
        document.getElementById('orderCity').value = order.city;
        document.getElementById('orderProductName').value = order.product;
        document.getElementById('orderQuantity').value = order.quantity;
        document.getElementById('orderPrice').value = order.price;
        document.getElementById('orderShipping').value = order.shipping;
        document.getElementById('orderPayment').value = order.payment;
        document.getElementById('orderCourier').value = order.courier;
        document.getElementById('orderStatus').value = order.status;
        
        document.getElementById('modalTitle').textContent = 'Edit Order';
        document.getElementById('addOrderModal').classList.add('active');
    }
}

// Delete order
function deleteOrder(orderId) {
    if (confirm('Are you sure you want to delete this order?')) {
        let orders = getOrders();
        orders = orders.filter(o => o.id !== orderId);
        saveOrders(orders);
        displayOrders();
        
        // Refresh all data
        loadDashboard();
        loadPayments();
        loadProducts();
        loadCourier();
    }
}
