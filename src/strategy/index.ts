import { FlyRocketPowered } from "./behavior/fly-behavior";
import {
  DecoyDuck,
  Duck,
  MallardDuck,
  ModelDuck,
  RedheadDuck,
  RubberDuck,
} from "./duck";

console.log("------------------------");
const mallard: Duck = new MallardDuck();
mallard.display();
mallard.performQuack();
mallard.performFly();

console.log("------------------------");
const redhead: Duck = new RedheadDuck();
redhead.display();
redhead.performQuack();
redhead.performFly();

console.log("------------------------");
const rubber: Duck = new RubberDuck();
rubber.display();
rubber.performQuack();
rubber.performFly();

console.log("------------------------");
const decoy: Duck = new DecoyDuck();
decoy.display();
decoy.performQuack();
decoy.performFly();

console.log("------------------------");
const model: Duck = new ModelDuck();
model.display();
model.performQuack();
model.performFly();
model.setFlyBehavior(new FlyRocketPowered()); // 运行时改变行为
model.performFly();
