/**
 * https://leetcode.com/problems/single-number-iii/
 * @param {number[]} nums
 * @return {number}
 */
var singleNumber = function (nums) {
  const result = [];
  const map = new Map();
  for (let item of nums) {
    map.set(item, (map.get(item) || 0) + 1);
  }
  for (let [key, value] of map) {
    if (value === 1) {
      result.push(key);
    }
  }
  return result;
};

console.log(singleNumber([1,2,1,3,2,5]), [3, 5]);
