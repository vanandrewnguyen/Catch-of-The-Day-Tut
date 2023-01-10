// Unit tests for helper.js
import { slugify } from "../helpers";

// Formatting Function
test('Format basic string', () => {
    expect(slugify('this is a string')).toBe('this-is-a-string');
});




