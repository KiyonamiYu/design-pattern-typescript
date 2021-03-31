export interface FlyBehavior {
  fly: () => void;
}

export class FlyWithWings implements FlyBehavior {
  fly(): void {
    console.log("I'm flying!!");
  }
}

export class FlyNoWay implements FlyBehavior {
  fly(): void {
    console.log("I can't fly!");
  }
}

/**
 * 火箭动力飞行
 */
export class FlyRocketPowered implements FlyBehavior {
  fly(): void {
    console.log("I'm flying with a rocket!");
  }
}
