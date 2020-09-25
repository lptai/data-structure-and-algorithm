/**
 * https://leetcode.com/problems/single-number-ii/
 * @param {number[]} nums
 * @return {number}
 */
var singleNumber = function (nums) {
  const map = new Map();
  for (let item of nums) {
    map.set(item, (map.get(item) || 0) + 1);
  }
  for (let [key, value] of map) {
    if (value === 1) {
      return key;
    }
  }
};

console.log(singleNumber([2, 3, 2]), 3);
