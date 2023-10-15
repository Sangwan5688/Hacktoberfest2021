function lengthOfLongestSubstring(s) {
    const n = s.length;
    let maxLength = 0;
    const charIndex = new Array(128).fill(0);

    let start = 0;
    for (let end = 0; end < n; end++) {
        start = Math.max(start, charIndex[s.charCodeAt(end)]);
        maxLength = Math.max(maxLength, end - start + 1);
        charIndex[s.charCodeAt(end)] = end + 1;
    }

    return maxLength;
}