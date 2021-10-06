const bubbleShort = (arr) => {
	for (let i = 0; i < arr.length; i++) {
		for (let j = 0; j < arr.length - i - 1; j++) {
			if (arr[j] > arr[j + 1]) {
				let leftNumber = arr[j];
				arr[j] = arr[j + 1];
				arr[j + 1] = leftNumber;
			}
		}
	}

	return arr;
};

let arr = [2, 45, 67, 23, 44, 5434, 65];

console.log(bubbleShort(arr));
