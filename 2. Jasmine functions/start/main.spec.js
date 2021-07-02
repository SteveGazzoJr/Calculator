describe("main.js", function () {
  describe("calculate()", function () {
    it("validates the first number", function () {
      spyOn(window, "updateResult").and.stub();
      calculate("a+3");
      expect(window.updateResult).toHaveBeenCalledWith("badInput");
      expect(window.updateResult).toHaveBeenCalledTimes(1);
    });
    it("validates the second number", function () {
      spyOn(window, "updateResult").and.stub();
      calculate("3+a");
      expect(window.updateResult).toHaveBeenCalledWith("badInput");
      expect(window.updateResult).toHaveBeenCalledTimes(1);
    });
    it("validates the operator", function () {
      spyOn(window, "updateResult").and.stub();
      calculate("3t3");
      expect(window.updateResult).toHaveBeenCalledWith("badOperator");
      expect(window.updateResult).toHaveBeenCalledTimes(1);
    });
    it("calls add", function () {
      spyOn(Calculator.prototype, "add");
      calculate("3+4");
      expect(Calculator.prototype.add).toHaveBeenCalledTimes(2);
      expect(Calculator.prototype.add).toHaveBeenCalledWith(3);
      expect(Calculator.prototype.add).toHaveBeenCalledWith(4);
    });
    it("calls subtract", function () {
      spyOn(Calculator.prototype, "subtract");
      calculate("3-4");
      expect(Calculator.prototype.subtract).toHaveBeenCalledTimes(1);
      expect(Calculator.prototype.subtract).toHaveBeenCalledWith(4);
    });
    it("calls multiply", function () {
      spyOn(Calculator.prototype, "multiply");
      calculate("3*4");
      expect(Calculator.prototype.multiply).toHaveBeenCalledTimes(1);
      expect(Calculator.prototype.multiply).toHaveBeenCalledWith(4);
    });
    it("calls divide", function () {
      spyOn(Calculator.prototype, "divide");
      calculate("3/4");
      expect(Calculator.prototype.divide).toHaveBeenCalledTimes(1);
      expect(Calculator.prototype.divide).toHaveBeenCalledWith(4);
    });
    it("calls updateResult() (with callthrough)", function () {
      spyOn(window, "updateResult");
      spyOn(Calculator.prototype, "multiply").and.callThrough();
      calculate("5*5");
      expect(window.updateResult).toHaveBeenCalledTimes(1);
      expect(window.updateResult).toHaveBeenCalledWith(25);
    });
    it("calls updateResult() (with callFake)", function () {
      spyOn(window, "updateResult");
      spyOn(Calculator.prototype, "multiply").and.callFake(function (number) {
        return 25;
      });
      calculate("5*5");
      expect(window.updateResult).toHaveBeenCalledTimes(1);
      expect(window.updateResult).toHaveBeenCalledWith(25);
    });
    it("calls updateResult() (with returnValue)", function () {
      spyOn(window, "updateResult");
      spyOn(Calculator.prototype, "multiply").and.returnValue(25);
      calculate("5*5");
      expect(window.updateResult).toHaveBeenCalledTimes(1);
      expect(window.updateResult).toHaveBeenCalledWith(25);
    });
    it("calls updateResult() (with returnValues)", function () {
      spyOn(window, "updateResult");
      spyOn(Calculator.prototype, "add").and.returnValues(5, 11);
      calculate("5+6");
      expect(window.updateResult).toHaveBeenCalledTimes(1);
      expect(window.updateResult).toHaveBeenCalledWith(11);
    });
    it("does not handle errors", function () {
      spyOn(window, "updateResult");
      spyOn(Calculator.prototype, "multiply").and.throwError(
        "Something went wrong :shrug:"
      );
      expect(function () {
        calculate("5*5");
      }).toThrowError();
      expect(window.updateResult).toHaveBeenCalledTimes(0);
    });
  });
  describe("updateResult()", function () {
    let element;
    beforeAll(function () {
      element = document.createElement("div");
      element.setAttribute("id", "result");
      document.body.appendChild(element);
    });
    afterAll(function () {
      document.body.removeChild(element);
    });
    it("adds the result to the DOM element", function () {
      updateResult(5);
      expect(element.innerText).toBe("5");
    });
  });
});
