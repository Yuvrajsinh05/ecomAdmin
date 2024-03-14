// Function to validate and extract counts and brands for each category
export function getCountsAndBrands(data) {
    const result = [];
  
    data.forEach(item => {
        const categoryInfo = {
            category: item.Categories,
            count: item.count,
            brands: []
        };
  
        // Check if 'SubCategories' is defined and not empty
        if (item.SubCategories && item.SubCategories.length > 0) {
            item.SubCategories.forEach(subCategory => {
                if (subCategory.SubType && subCategory.SubType.length > 0) {
                    subCategory.SubType.forEach(subType => {
                        subType.Brands.forEach(brand => {
                            categoryInfo.brands.push(brand);
                        });
                    });
                } else {
                    console.log(`Subtype missing for subcategory: ${subCategory.type}`);
                }
            });
        } else {
            console.log(`Subcategories missing for category: ${item.Categories}`);
        }
  
        // Collect brands even when subcategories are missing or incomplete
        item.SubCategories.forEach(subCategory => {
            if (!subCategory.SubType || subCategory.SubType.length === 0) {
                subCategory.Brands.forEach(brand => {
                    categoryInfo.brands.push(brand);
                });
            }
        });
  
        result.push(categoryInfo);
    });
  
    return result;
}


export function getTotalPayment(orders) {
    let totalAmount = 0;
  
    orders.forEach(order => {
        if (order.paymentStatus === "completed") {
            totalAmount += parseFloat(order.total_price);
        }
    });
  
    return totalAmount;
}
