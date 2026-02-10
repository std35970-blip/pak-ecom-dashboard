// Calculator.js - Profit Calculator Logic

// Setup calculator
document.addEventListener('DOMContentLoaded', function() {
    const calculateBtn = document.getElementById('calculateBtn');
    
    if (calculateBtn) {
        calculateBtn.addEventListener('click', calculateProfit);
    }
    
    // Add real-time calculation on input
    const inputs = [
        'calcProductCost',
        'calcSellingPrice',
        'calcShippingCost',
        'calcCodCharges',
        'calcPackagingCost',
        'calcPlatformFee'
    ];
    
    inputs.forEach(inputId => {
        const input = document.getElementById(inputId);
        if (input) {
            input.addEventListener('input', calculateProfit);
        }
    });
});

// Calculate profit
function calculateProfit() {
    // Get input values
    const productCost = parseFloat(document.getElementById('calcProductCost').value) || 0;
    const sellingPrice = parseFloat(document.getElementById('calcSellingPrice').value) || 0;
    const shippingCost = parseFloat(document.getElementById('calcShippingCost').value) || 0;
    const codCharges = parseFloat(document.getElementById('calcCodCharges').value) || 0;
    const packagingCost = parseFloat(document.getElementById('calcPackagingCost').value) || 0;
    const platformFee = parseFloat(document.getElementById('calcPlatformFee').value) || 0;
    
    // Calculate platform fee amount
    const platformFeeAmount = (sellingPrice * platformFee) / 100;
    
    // Calculate total cost
    const totalCost = productCost + shippingCost + codCharges + packagingCost + platformFeeAmount;
    
    // Calculate revenue (selling price)
    const revenue = sellingPrice;
    
    // Calculate net profit
    const netProfit = revenue - totalCost;
    
    // Calculate profit margin
    const profitMargin = revenue > 0 ? ((netProfit / revenue) * 100) : 0;
    
    // Display results
    document.getElementById('resultTotalCost').textContent = formatCurrency(totalCost);
    document.getElementById('resultRevenue').textContent = formatCurrency(revenue);
    document.getElementById('resultNetProfit').textContent = formatCurrency(netProfit);
    document.getElementById('resultProfitMargin').textContent = profitMargin.toFixed(2) + '%';
    
    // Color code profit value
    const profitElement = document.getElementById('resultNetProfit');
    if (netProfit > 0) {
        profitElement.classList.remove('negative');
        profitElement.classList.add('positive');
    } else if (netProfit < 0) {
        profitElement.classList.remove('positive');
        profitElement.classList.add('negative');
    } else {
        profitElement.classList.remove('positive', 'negative');
    }
}
