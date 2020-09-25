function binarySearch(array, target) {
    let left = 0,
        right = array.length - 1;

    while (left <= right) {
        let mid = Number.parseInt((left + right) / 2);
        console.log('left', left, 'right', right, 'mid', mid);
        if (array[mid] > target) {
            right = mid - 1;
        } else if (array[mid] < target) {
            left = mid + 1;
        } else {
            return mid;
        }
    }

    return -1;
}

console.log(binarySearch([0, 1, 21, 33, 45, 45, 61, 71, 72, 73], 33));
