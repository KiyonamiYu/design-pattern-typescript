import { Observer } from "./observer";

export interface Subject {
  registerObserver: (o: Observer) => void;
  removeObserver: (o: Observer) => void;
  notifyObservers: () => void;
}

export class WeatherData implements Subject {
  private observers: Observer[];
  private temperature: number; // debugger 初始化不传入, 默认值是多少.
  private humidity: number;
  private pressure: number;

  constructor() {
    this.observers = [];
  }
  registerObserver(o: Observer) {
    this.observers.push(o);
  }

  removeObserver(o: Observer) {
    const index = this.observers.findIndex((item) => item === o);
    if (index >= 0) {
      this.observers = this.observers.splice(index, 1);
    }
  }

  notifyObservers() {
    this.observers.forEach((o) => {
      o.update(this.temperature, this.humidity, this.pressure);
    });
  }

  // 书中背景，需要向外界提供这个函数
  measurementsChanged() {
    this.notifyObservers();
  }

  setMeasurements(temperature: number, humidity: number, pressure: number) {
    this.temperature = temperature;
    this.humidity = humidity;
    this.pressure = pressure;
    this.notifyObservers();
  }
}
