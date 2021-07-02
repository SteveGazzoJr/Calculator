describe("calculator.js", function () {
  beforeAll(function () {
    //alert("Tests kicking off!");
  });
  afterAll(function () {
    //alert("Tests finished!");
  });
  describe("you can nest your test suites", function () {
    it("should return total + x when add is called with x", function () {
      const calculator = new Calculator();
      let x = calculator.add(5);
      expect(calculator.total).toBe(5);
    });
  });
  //testCode
  it("should return total - x when subtract is called with x", function () {
    let calculator = new Calculator();
    calculator.add(5);
    expect(calculator.subtract(4)).toBe(1);
  });
  it("should return total * x when multiply is called with x", function () {
    let calculator = new Calculator();
    calculator.add(5);
    expect(calculator.multiply(4)).toBe(20);
  });
  it("should return total / x when divide is called with x", function () {
    let calculator = new Calculator();
    calculator.add(5);
    expect(calculator.divide(5)).toBe(1);
  });
  it("should initialize with total === 0", function () {
    const calculator = new Calculator();
    expect(calculator.total).toBe(0);
    expect(calculator.total).toBeFalsy();
    expect(calculator).toBeTruthy();
  });

  //this is a dumb test and its only point is to illustrate that
  //toEqual does a deep compare and if all keys exist in both objects
  //it returns true whereas toBe does a shallow compare by reference
  //and only returns true if the two objects point to the same
  //memory location
  it("should intialize the same when 2 objects are initialized", function () {
    jasmine.addMatchers(customMatchers);
    const calculator = new Calculator();
    let calc2 = new Calculator();
    expect(calculator).not.toBe(calc2);
    expect(calculator).toEqual(calc2);
    expect(calculator).toBeCalculator();
    calc2 = calculator;
    expect(calc2).toBe(calculator);
    let calc;
    expect(calc).toBeUndefined();
    calc = null;
    expect(calc).toBeNull();
    calc = calc2;
    expect(calc).toBeDefined();
    let myArray = [1, 2, 3, 4, 5];
    expect(myArray).toContain(4);
    let myString = "Steve Is A Coder I Guess";
    expect(myString).toContain("Is A");
    let something;
    expect(something).not.toBeCalculator();
  });
  it("should not let you divide by zero", function () {
    const calcByZero = new Calculator();
    calcByZero.add(5);
    //when you're trying to catch an error you have to wrap the
    //code that throws the error in an anonymous function
    //so that expect() can catch it
    expect(function () {
      calcByZero.divide(0);
    }).toThrowError(Error, "Cannot divide by zero");
  });
  it("should return the total", function () {
    const calculator = new Calculator();
    calculator.add(50);
    expect(calculator.add(20)).toBe(70);
    expect(calculator.total).toMatch(/-?\d+/);
  });
});
