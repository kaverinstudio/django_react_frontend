export const orderTableInit = (filesInitial, initialProps) => {
    const tableInit = []

    filesInitial?.forEach(file => {
        const papierSizeId = initialProps?.papierSize.filter((el) => file.format === `${el.papier_width}x${el.papier_height}`)
        const papierTypeId = initialProps?.papierType.filter((el) => file.papier === el.papier_type)
        const servicesId = initialProps?.services.filter((el) => el.papier_size === papierSizeId[0].id && el.papier_type === papierTypeId[0].id)
        servicesId[0] = {...servicesId[0], count : file.count}
        tableInit.push(servicesId[0])

    })

    const uniqueId = []
    const uniqueArr = []

    for (let i = 0; i < tableInit.length; i++){
        if (!uniqueId.includes(tableInit[i].id)){
            uniqueId.push(tableInit[i].id)
            uniqueArr.push(tableInit[i])
        }else {
            const current = uniqueArr.filter(el => el.id === tableInit[i].id)
            current[0].count += tableInit[i].count
        }
    }
    return uniqueArr
}

export function ccyFormat(num) {
    return `${num?.toFixed(2)}`;
}

export function priceRow(qty, unit) {
    return qty * unit;
}

export function subtotal(items) {
    return items?.map(({ price, count }) => priceRow(price, count)).reduce((sum, i) => sum + i, 0);
}