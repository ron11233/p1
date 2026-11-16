Convert a non-negative integer num to its English words representation.



input- int num
output-num in english words rep


constraints
num length
num chars? 

0 <= num <= 2^31 - 1
max is billion



example 
  small example 1,234
  big example 1,230,034,231


tricky: 300

edge: 0 - zero 



approaches: 
brute force: 
for each 3 nums translate to ones,tens,hundreds. complexity: O(n)time O(n) space


  


const ONES_AND_TEENS = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten',
    'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
const TENS = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
const SCALES = ['', 'Thousand', 'Million', 'Billion'];

const numberToWords = (num) => { // returns string
    if (num === 0) return 'Zero';

    const phrases = [];
    let remaining = num;
    for (const scale of SCALES) {
        const chunk = remaining % 1000;
        if (chunk > 0) phrases.unshift(joinWords(chunkToWords(chunk), scale));
        remaining = Math.floor(remaining / 1000);
    }
    return phrases.join(' ');
};

const chunkToWords = (chunk) => { // returns string chunk 
    if (chunk === 0) return '';
    if (chunk < 20) return ONES_AND_TEENS[chunk];
    if (chunk < 100) return joinWords(TENS[Math.floor(chunk / 10)], chunkToWords(chunk % 10)); 
    return joinWords(ONES_AND_TEENS[Math.floor(chunk / 100)], 'Hundred', chunkToWords(chunk % 100));
};

const joinWords = (...words) => words.filter(Boolean).join(' ');
