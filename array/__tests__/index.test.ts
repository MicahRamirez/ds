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
  describe("at", () => {
    it("should allow array access.", () => {
      const al = new ArrayList(3);

      al.push(1);
      expect(al.at(0)).toBe(1);
      al.push(4);
      expect(al.at(1)).toBe(4);
    });

    it("should allow negative index access", () => {
      const al = new ArrayList(3);

      al.push(1);
      al.push(4);
      expect(al.at(-1)).toBe(4);
    });

    it("should handle decimals", () => {
      const al = new ArrayList(3);

      al.push(1);
      al.push(4);

      expect(al.at(2.0)).toBe(undefined);
      expect(al.at(0.5)).toBe(1);
      expect(al.at(1.5)).toBe(4);
    });
  });

  describe("concat", () => {
    it("should concat two arrays", () => {
      const al = new ArrayList<number>(3);
      al.push(1);
      al.push(4);

      const al2 = new ArrayList<number>(3);
      al2.push(2);
      al2.push(5);

      const al3 = al.concat(al2);
      expect(al3.length).toBe(4);
      expect(al3.at(0)).toBe(1);
      expect(al3.at(1)).toBe(4);
      expect(al3.at(2)).toBe(2);
      expect(al3.at(3)).toBe(5);
    });

    it("should not change the existing arrays", () => {
      const al = new ArrayList<number>(3);
      al.push(1);
      al.push(4);

      const al2 = new ArrayList<number>(3);
      al2.push(2);
      al2.push(5);

      const al3 = al.concat(al2);
      expect(al3).not.toBe(al);
      expect(al.length).toBe(2);
      expect(al.at(0)).toBe(1);
      expect(al.at(1)).toBe(4);
      expect(al2.length).toBe(2);
      expect(al2.at(0)).toBe(2);
      expect(al2.at(1)).toBe(5);
      expect(al3.length).toBe(4);
    });

    it("should take one or more arrays as arguments", () => {
      const al = new ArrayList<number>(3);
      al.push(1);
      al.push(4);

      const al2 = new ArrayList<number>(3);
      al2.push(2);
      al2.push(5);

      const al3 = new ArrayList<number>(3);
      al3.push(4);

      const al4 = al.concat(al2, al3);

      expect(al4.length).toBe(5);
      expect(al4.at(0)).toBe(1);
      expect(al4.at(1)).toBe(4);
      expect(al4.at(2)).toBe(2);
      expect(al4.at(3)).toBe(5);
      expect(al4.at(4)).toBe(4);
    });
  });

  describe("clear #java AL", () => {});

  describe("sort", () => {});

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
