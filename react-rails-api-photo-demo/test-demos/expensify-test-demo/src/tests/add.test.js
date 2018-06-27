const addTwoNumbers = (a, b) => {
  return a + b;
};

test('should add two numbers together', () => {
  const result = addTwoNumbers(2,3);
  // if(result !== 5)
  //   throw new Error(`The expected result was 5, actual result was ${result}`);
  expect(result).toBe(5);
});

const generateGreeting = (name = 'Unknown Person') => {
  return `Hello ${name}!`;
};

test('should return greeting with name', () => {
  const greeting = generateGreeting('Mike');
  expect(greeting).toBe('Hello Mike!');
});

test('should generate greeting when no name is used', () => {
  const greeting = generateGreeting();
  expect(greeting).toBe('Hello Unknown Person!');
});
