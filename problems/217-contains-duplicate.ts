function containsDuplicate(nums: number[]): boolean {
  let set = new Set<number>();

  for (let i = 0; i <= nums.length; i++) {
    const curr = nums[i]!;
    if (set.has(curr)) {
      return true;
    }
    set.add(curr);
  }

  return false;
}
