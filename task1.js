function array_average(arr) {
    if (arr.length === 0) {
        return 'Empty array'
    }
    
    const sum = arr.reduce((acc, currentValue) => acc + currentValue, 0)
    return sum / arr.length
}

console.log(array_average([1, 4, 5, 6, 8, 10]))
console.log(array_average([]))
console.log(array_average([5, 5, 5, 5, 5]))