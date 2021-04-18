'use strict';

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target) {
  for (let i = 0; i < nums.length; i++) {
    let targetTemp = target - nums[i];
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[j] == target - nums[i]) {
        return console.log(i + ' ' + j);
      }
    }
  }
};

twoSum([3, 2, 4], 6);
