import { Observer } from "./observer";

export interface Subject {
  registerObserver: (o: Observer) => void;
  removeObserver: (o: Observer) => void;
  notifyObservers: () => void;
}

export class WeatherData implements Subject {
  private observers: Observer[];
  private temperature: number;
  private humidity: number;
  private pressure: number;

  constructor() {
    // 不赋上初值，都为 undefined
    this.observers = [];
    this.temperature = 0;
    this.humidity = 0;
    this.pressure = 0;
  }

  registerObserver(o: Observer) {
    this.observers.push(o);
  }

  removeObserver(o: Observer) {
    const index = this.observers.findIndex((item) => item === o);
    if (index >= 0) {
      this.observers.splice(index, 1); // 修改原数组
    }
  }

  notifyObservers() {
    this.observers.forEach((o) => {
      // o.update(this.temperature, this.humidity, this.pressure); // 有一些布告板, 只需要其中的几个参数, 这样的事先不优雅
      o.update(this); // 将 "subject 推参数" 变为 "observer 拉参数"
    });
  }

  setMeasurements(temperature: number, humidity: number, pressure: number) {
    this.temperature = temperature;
    this.humidity = humidity;
    this.pressure = pressure;
    this.notifyObservers();
  }

  // 为了和"observer 拉参数"配合
  getTemperature() {
    return this.temperature;
  }

  getHumidity() {
    return this.humidity;
  }

  getPressure() {
    return this.pressure;
  }

  // 书中背景，需要向外界提供这个函数
  // measurementsChanged() {
  //   this.notifyObservers();
  // }
}
