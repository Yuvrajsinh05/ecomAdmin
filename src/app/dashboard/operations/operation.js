export function productCount(data) {
    let count = 0;
    if (data && data.cateBrandCount && data.cateBrandCount.length > 0) {
        count = data.cateBrandCount.reduce((acc, cur) => acc + cur.count, 0);
    }
    return count;
}
export function BrandsCount(data) {
    let count = 0;
    if (data && data.cateBrandCount && data.cateBrandCount.length > 0) {
        count = data.cateBrandCount.reduce((acc, cur) => acc + cur.brands.length, 0);
    }
    return count;
}

export function ProdCountWrtCate(data,category){
    const item = data?.cateBrandCount?.find(item => item.category === category);
    return item ? item.count : 0;
}