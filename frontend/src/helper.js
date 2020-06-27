export const randomNums = (min, max) => {
	const nums = [];
	for (let i = 0; i < 14; i++) {
		nums[nums.length] = Math.floor(Math.random() * (max - min + 1) + min);
	}
	return nums;
};
