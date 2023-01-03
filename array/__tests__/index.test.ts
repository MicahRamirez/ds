import ArrayList from "../index";

describe("ArrayList", () => {
  describe("initialization", () => {
    it("should take an initialization parameter", () => {
      const al = new ArrayList(3);
      Array.from({ length: 3 }, () => {
        return undefined;
      }).forEach((val, index) => {
        expect(al[index]).toBe(val);
      });
    });

    it("should not allow arbitrary access", () => {
      const al = new ArrayList<string>();

      expect(() => al.get(1000)).toThrow();
    });

    it("should not allow negative index access", () => {
      const al = new ArrayList<string>();

      expect(() => al.get(-1)).toThrow();
    });

    it("should take a capacity argument", () => {
      const al = new ArrayList(100);

      expect(al._capacity()).toBe(100);
    });
  });

  describe("push", () => {
    it("should push new entries into the container", () => {
      const al = new ArrayList<string>(0);
      al.push("ay");

      expect(al.length).toBe(1);
      expect(al._capacity()).toBe(1);
    });

    it("should resize the array if required", () => {
      const al = new ArrayList<string>(0);

      [1, 2, 4, 8].forEach((expectedCapacity) => {
        const currentSize = al.length;
        let pushesRequired = expectedCapacity - currentSize;
        while (pushesRequired > 0) {
          al.push("ay");
          pushesRequired -= 1;
        }
        expect(al._capacity()).toBe(expectedCapacity);
      });
    });
  });

  describe("set", () => {
    it("should not allow arbitrary access", () => {
      const al = new ArrayList();

      expect(() => al.set(0, 1000)).toThrow();
      expect(() => al.set(100, 1000)).toThrow();
    });

    it("should not allow negative index access", () => {
      const al = new ArrayList();
      al.push(100);

      expect(() => al.set(-1, 10)).toThrow();
    });
  });

  describe("get", () => {
    it("should allow array access.", () => {
      const al = new ArrayList(3);
      al.push(1);
      expect(al.get(0)).toBe(1);
      al.push(4);
      expect(al.get(1)).toBe(4);
    });

    it("should not allow arbitrary access", () => {
      const al = new ArrayList<string>();

      expect(() => al.get(1000)).toThrow();
    });

    it("should not allow negative index access", () => {
      const al = new ArrayList<string>();

      expect(() => al.get(-1)).toThrow();
    });
  });
  describe("iterator protocol", () => {
    it("should be usable in for...of loops", () => {
      const al = new ArrayList<number>(10);
      const values = [1, 2];
      values.forEach((val) => {
        al.push(val);
      });

      let index = 0;
      for (let value of al) {
        expect(value).toBe(values[index]);
        index += 1;
      }
    });
  });
});
