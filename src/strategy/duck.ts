import { FlyBehavior, FlyWithWings, FlyNoWay } from "./behavior/fly-behavior";
import {
  QuackBehavior,
  Quack,
  Squeak,
  MuteQuack,
} from "./behavior/quack-behavior";

/**
 * 超类
 */
export abstract class Duck {
  constructor(private flyBehavior: FlyBehavior, private quackBehavior: Quack) {}

  swim() {}

  abstract display(): void;

  performQuack(): void {
    // 不亲自处理 quack 行为, 而是委托给 quackBehavior 接口对象
    this.quackBehavior.quack();
  }

  performFly(): void {
    this.flyBehavior.fly();
  }

  setFlyBehavior(fb: FlyBehavior): void {
    this.flyBehavior = fb;
  }

  setQuackBehavior(qb: QuackBehavior): void {
    this.quackBehavior = qb;
  }
}

/**
 * 绿头鸭
 */
export class MallardDuck extends Duck {
  constructor() {
    // 初始化实例变量的作法不够弹性
    super(new FlyWithWings(), new Quack());
  }
  display() {
    console.log("I'm a real Mallard duck");
  }
}

/**
 * 红头鸭
 */
export class RedheadDuck extends Duck {
  constructor() {
    super(new FlyWithWings(), new Quack());
  }
  display() {
    console.log("looks like a redhead");
  }
}

/**
 * 橡皮鸭
 */
export class RubberDuck extends Duck {
  constructor() {
    // 橡皮鸭, 不会飞, 吱吱叫
    super(new FlyNoWay(), new Squeak());
  }

  display() {
    console.log("looks like a rubberduck");
  }
}

/**
 * 诱饵鸭
 */
export class DecoyDuck extends Duck {
  constructor() {
    // 诱饵鸭, 不会飞, 不会叫
    super(new FlyNoWay(), new MuteQuack());
  }
  display() {
    console.log("decoy duck");
  }
}

/**
 * 模型鸭
 */
export class ModelDuck extends Duck {
  // 模型鸭, 一开始不会飞
  constructor() {
    super(new FlyNoWay(), new Quack());
  }

  display() {
    console.log("I'm a model duck");
  }
}
