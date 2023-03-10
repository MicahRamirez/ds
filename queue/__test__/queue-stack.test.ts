import LinkedQueue from "../linked-queue";
import QueueStack from "../queue-stack";

const implementations = [LinkedQueue, QueueStack];
implementations.forEach((implementation) => {
  describe(`${implementation.name}`, () => {
    describe("enqueue", () => {
      it("should enqueue values", () => {
        const lq = new implementation();

        lq.enqueue(1);
        expect(lq.size()).toEqual(1);
      });
    });
    describe("dequeue", () => {
      it("should dequeue values", () => {
        const lq = new implementation();
        const val = 1;
        lq.enqueue(val);
        const dequeuedValue = lq.dequeue();

        expect(lq.size()).toEqual(0);
        expect(dequeuedValue).toEqual(val);
      });
    });

    describe("size", () => {
      it("should return the length of the container", () => {
        const lq = new implementation();
        const val = 1;
        lq.enqueue(val);

        expect(lq.size()).toBe(val);
      });
    });

    describe("peek", () => {
      it("should return the value at the beginning of the queue without removing it", () => {
        const lq = new implementation();
        const val = 1;
        lq.enqueue(val);
        const peek = lq.peek();

        expect(peek).toBe(val);
      });
    });
  });
});
