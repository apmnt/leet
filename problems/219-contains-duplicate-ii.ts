// Input: nums = [1,2,3,1], k = 3
// Output: true

// Input: nums = [1,0,1,1], k = 1
// Output: true

// Input: nums = [1,2,3,1,2,3], k = 2
// Output: false

function containsNearbyDuplicate(nums: number[], k: number): boolean {
  if (k === 0) {
    return false;
  }

  let left = 0;
  let set = new Set<number>([nums[left]!]);

  for (let right = 1; right < nums.length; right++) {
    if (Math.abs(left - right) > k) {
      set.delete(nums[left]!);
      left++;
      set.add(nums[left]!);
    }
    if (set.has(nums[right]!)) {
      return true;
    }
    set.add(nums[right]!);
  }
  return false;
}

function containsNearbyDuplicate2(nums: number[], k: number): boolean {
  if (k === 0) {
    return false;
  }

  let set = new Set<number>();

  for (let i = 0; i < nums.length; i++) {
    if (i > k) {
      set.delete(nums[i - k - 1]!);
    }
    if (set.has(nums[i]!)) {
      return true;
    }
    set.add(nums[i]!);
  }
  return false;
}

console.log(containsNearbyDuplicate([1, 2, 3, 1], 3));
