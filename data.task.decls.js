/* @flow */

declare module 'data.task' {
  declare class ITask<A, B> {
    concat(task: ITask<B>): ITask<A, B>;
    map<Y>(f: (v: B) => Y): ITask<A, Y>;
    chain<Y>(f: (v: B) => ITask<A, Y>): ITask<A, Y>;
    // https://stackoverflow.com/questions/39520975/how-to-handle-polymorphic-type-for-both-value-and-function
    // ap<Y>@Task(α, β → γ) => Task(α, β) → Task(α, γ)
    orElse<Y>(f: (v: A) => ITask<Y, B>): ITask<Y, B>;
    fold<Y, D>(f: (v: A) => Y, g: (v: B) => Y): ITask<Y, B>;
    cata<Y, D>(patterns: {| Rejected: (v: A) => Y, Resolved: (v: B) => Y |}): Task<D, Y>;
    swap(): Task<B, A>;
    bimap<Y, D>(f: (v: A) => Y, g: (v: B) => D): ITask<Y, D>;
    rejectedMap<Y>(f: (v: A) => Y): ITask<Y, B>;
    fork(f: (v: A) => any, g: (v: B) => any): void;
    static of(value: B): ITask<A, B>;
    static rejected(value: A): ITask<A, B>;
    static empty(): ITask<A, B>;
  }

  declare var exports: typeof ITask;
}
