// Input: target = 12, position = [10,8,0,5,3], speed = [2,4,1,1,3]
// Output: 3
// Explanation:
// The cars starting at 10 (speed 2) and 8 (speed 4) become a fleet, meeting each other at 12. The fleet forms at target. The car starting at 0 (speed 1) does not catch up to any other car, so it is a fleet by itself. The cars starting at 5 (speed 1) and 3 (speed 3) become a fleet, meeting each other at 6. The fleet moves at speed 1 until it reaches target.

// Input: target = 10, position = [3], speed = [3]
// Output: 1
// Explanation:
//
// There is only one car, hence there is only one fleet.

// Input: target = 100, position = [0,2,4], speed = [4,2,1]
// Output: 1
// Explanation:
// The cars starting at 0 (speed 4) and 2 (speed 2) become a fleet, meeting each other at 4. The car starting at 4 (speed 1) travels to 5. Then, the fleet at 4 (speed 2) and the car at position 5 (speed 1) become one fleet, meeting each other at 6. The fleet moves at speed 1 until it reaches target.

// how to check if a car will catch up
// car 1: position 0, speed 10
// car 2: position 20, speed 5

// this means that the car 2 needs:
// timeToCatchUp = (position2-position1) / (speed1-speed2)
// timeToCatchUp = (20-0) / (10-5)
// timeToCatchUp = 20 / 5
// timeToCatchUp = 4

// and to check if car can catch up before target:
// if timeToCatchUp < 0 or timeToCatchUp <= timeToTarget (of car 2)
// then car 1 will catch up

// to do with we can sort the positions in descending order, calculate the times,
// and if the car will catch up, it will not be added to the stack.
// if the car will not catch up, it will be added to the stack
// since it is slower and wont ever be a part of the fleet.
// next cars should be compared to this car that is on top of the stack,
// since they will not be able to pass the car that is on top of the stack.

function carFleet(target: number, position: number[], speed: number[]): number {
  const order = position
    .map((_, i) => i)
    .sort((a, b) => position[b]! - position[a]!);

  console.log(
    "sorted pos",
    order.map((i) => position[i]),
  );
  console.log(
    "sorted speed",
    order.map((i) => speed[i]),
  );

  let stack: number[] = [];

  for (const curr of order) {
    if (stack.length === 0) {
      stack.push(curr);
      continue;
    }
    const top = stack[stack.length - 1]!;
    const timeToTarget = (target - position[top]!) / speed[top]!;
    const timeToCatchUp =
      (position[top]! - position[curr]!) / (speed[curr]! - speed[top]!);
    // console.log("curr", curr, ": pos=", position[curr], "speed=", speed[curr]);
    // console.log("top", top, ": pos=", position[top], "speed=", speed[top]);
    // console.log(top, timeToCatchUp, timeToTarget);
    if (timeToCatchUp < 0 || timeToCatchUp > timeToTarget) {
      stack.push(curr);
    }
  }
  return stack.length;
}

console.log("Example 1");
console.log("Input:", {
  target: 12,
  position: [10, 8, 0, 5, 3],
  speed: [2, 4, 1, 1, 3],
});
console.log("Output:", carFleet(12, [10, 8, 0, 5, 3], [2, 4, 1, 1, 3]));
console.log("Correct:", 3);

console.log("Example 2");
console.log("Input:", { target: 10, position: [3], speed: [3] });
console.log("Output:", carFleet(10, [3], [3]));
console.log("Correct:", 1);

console.log("Example 3");
console.log("Input:", { target: 100, position: [0, 2, 4], speed: [4, 2, 1] });
console.log("Output:", carFleet(100, [0, 2, 4], [4, 2, 1]));
console.log("Correct:", 1);
