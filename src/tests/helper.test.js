// Unit tests for helper.js
import { slugify } from "../helpers";
import { formatPrice } from "../helpers";
import { getFunName } from "../helpers";

// Formatting slugify Function
test('Format basic string', () => {
    expect(slugify('this is a string')).toBe('this-is-a-string');
});

test('Format empty string', () => {
    expect(slugify('')).toBe('');
});

test('Format capitals', () => {
    expect(slugify('This Is A String')).toBe('this-is-a-string');
});

test('Format single word', () => {
    expect(slugify('this')).toBe('this');
});

test('Format basic space', () => {
    expect(slugify(' ')).toBe('');
});

test('Format mixed spaces', () => {
    expect(slugify(' this ')).toBe('this');
});

test('Format trailing space', () => {
    expect(slugify('this is ')).toBe('this-is');
});

test('Format leading space', () => {
    expect(slugify(' this is')).toBe('this-is');
});

// Formatting money
test('Format basic currency', () => {
    expect(formatPrice('1000')).toBe('$10.00');
});

test('Format null amount', () => {
    expect(formatPrice('0')).toBe('$0.00');
});

test('Format empty string', () => {
    expect(formatPrice('')).toBe('$0.00');
});

test('Format trailing decimals', () => {
    expect(formatPrice('9')).toBe('$0.09');
});

test('Format trailing decimals', () => {
    expect(formatPrice('99')).toBe('$0.99');
});

// Formatting random string name
const adjectives = [
"adorable",
"beautiful",
"clean",
"drab",
"elegant",
"fancy",
"glamorous",
"handsome",
"long",
"magnificent",
"old-fashioned",
"plain",
"quaint",
"sparkling",
"ugliest",
"unsightly",
"angry",
"bewildered",
"clumsy",
"defeated",
"embarrassed",
"fierce",
"grumpy",
"helpless",
"itchy",
"jealous",
"lazy",
"mysterious",
"nervous",
"obnoxious",
"panicky",
"repulsive",
"scary",
"thoughtless",
"uptight",
"worried"
];

const nouns = [
"women",
"men",
"children",
"teeth",
"feet",
"people",
"leaves",
"mice",
"geese",
"halves",
"knives",
"wives",
"lives",
"elves",
"loaves",
"potatoes",
"tomatoes",
"cacti",
"foci",
"fungi",
"nuclei",
"syllabuses",
"analyses",
"diagnoses",
"oases",
"theses",
"crises",
"phenomena",
"criteria",
"data"
];

// Use regex to seperate words
const generatedName = getFunName();
const adjective1 = generatedName.match('(.*)-.*-.*')[1];
const adjective2 = generatedName.match('.*-(.*)-.*')[1];
const noun = generatedName.match('.*-.*-(.*)')[1];

const matches = adjectives.includes(adjective1) && 
                adjectives.includes(adjective2) && 
                nouns.includes(noun);

test('Generate random name', () => {
    expect(matches).toBe(true);
});


