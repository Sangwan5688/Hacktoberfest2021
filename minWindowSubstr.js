function minWindow(s, t) {
    const charCount = new Map();
    for (const char of t) {
        charCount.set(char, (charCount.get(char) || 0) + 1);
    }

    let left = 0;
    let minLen = Infinity;
    let minLenStart = 0;
    let count = t.length;

    for (let right = 0; right < s.length; right++) {
        const rightChar = s[right];
        if (charCount.has(rightChar)) {
            charCount.set(rightChar, charCount.get(rightChar) - 1);
            if (charCount.get(rightChar) >= 0) {
                count--;
            }
        }

        while (count === 0) {
            if (right - left + 1 < minLen) {
                minLen = right - left + 1;
                minLenStart = left;
            }
            const leftChar = s[left];
            if (charCount.has(leftChar)) {
                charCount.set(leftChar, charCount.get(leftChar) + 1);
                if (charCount.get(leftChar) > 0) {
                    count++;
                }
            }
            left++;
        }
    }

    return minLen === Infinity ? "" : s.substring(minLenStart, minLenStart + minLen);
}

const s = "ADOBECODEBANC";
const t = "ABC";
console.log(minWindow(s, t)); // Output: "BANC"
