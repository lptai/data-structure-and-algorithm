/**
 * The idea is using a map to store the counting.
 * Then just need to find the item with have count equal 1
 *
 * Time complexity: O(n)
 * Space complexity: O(n)
 *
 * @param {number[]} nums
 * @return {number}
 */
const singleNumber = function (nums) {
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

/**
 * Test cases
 */
const log = (result, expect) =>
  console.log(
    'Result:',
    result,
    '-',
    'Expect:',
    expect,
    '-',
    result === expect ? 'PASSED' : 'FALED',
  );

log(singleNumber([2, 2, 2, 2, 2, 3]), 3);
log(singleNumber([3, 1, 3, 1, 1, 3, 3, 5, 1, 3, 1]), 5);
log(singleNumber([3]), 3);
