import { DisplayElement } from "./display-element";
import { Subject, WeatherData } from "./subject";

export interface Observer {
  // update: (temperature: number, humidity: number, pressure: number) => void; // 这样太死板, 有一些布告板只要其中的两个或者一个参数, 这样传递不合适
  update: (subject: Subject) => void;
}

/**
 * "目前状况"布告板
 * 作用：只关心温度、湿度
 */
export class CurrentConditionDisplay implements Observer, DisplayElement {
  private temperature: number;
  private humidity: number;

  update(subject: Subject) {
    // 为了更加自由地获得只需要地参数
    if (subject instanceof WeatherData) {
      // 这个布告板只对 WeatherData 感兴趣
      this.temperature = subject.getTemperature();
      this.humidity = subject.getHumidity();
      this.display();
    }
  }

  display() {
    console.log("------------------------");
    console.log(
      `Current conditions: ${this.temperature}F degrees and ${this.humidity}% humidity`
    );
  }
}

/**
 * "气象统计"布告板
 * 作用：计算不断录入的温度的最大值、最小值、平均值
 */
export class StatisticsDisplay implements Observer, DisplayElement {
  private temperatureMax: number = Number.MIN_SAFE_INTEGER;
  private temperatureMin: number = Number.MAX_SAFE_INTEGER;

  private temperatureSum: number = 0;
  private numReadings: number = 0;
  private temperatureAvg: number = 0;

  update(subject: Subject) {
    if (subject instanceof WeatherData) {
      const temperature = subject.getTemperature();
      this.temperatureMax = Math.max(temperature, this.temperatureMax);
      this.temperatureMin = Math.min(temperature, this.temperatureMin);
      this.temperatureSum += temperature;
      this.numReadings++;
      this.temperatureAvg = this.temperatureSum / this.numReadings;
      this.display();
    }
  }
  display() {
    console.log("------------------------");
    if (this.numReadings === 0) {
      console.log("There is no statistical weather data at the moment!");
      return;
    }
    console.log(
      `Avg/Max/Min temperature = ${this.temperatureAvg}/${this.temperatureMax}/${this.temperatureMin}`
    );
  }
}

export class HeatIndexDisplay implements Observer, DisplayElement {
  private heatIndex: number = 0.0;

  computeHeatIndex(t: number, rh: number) {
    return (
      16.923 +
      0.185212 * t +
      5.37941 * rh -
      0.100254 * t * rh +
      0.00941695 * (t * t) +
      0.00728898 * (rh * rh) +
      0.000345372 * (t * t * rh) -
      0.000814971 * (t * rh * rh) +
      0.0000102102 * (t * t * rh * rh) -
      0.000038646 * (t * t * t) +
      0.0000291583 * (rh * rh * rh) +
      0.00000142721 * (t * t * t * rh) +
      0.000000197483 * (t * rh * rh * rh) -
      0.0000000218429 * (t * t * t * rh * rh) +
      0.000000000843296 * (t * t * rh * rh * rh) -
      0.0000000000481975 * (t * t * t * rh * rh * rh)
    );
  }

  update(subject: Subject) {
    if (subject instanceof WeatherData) {
      const temperature = subject.getTemperature();
      const humidity = subject.getHumidity();
      this.heatIndex = this.computeHeatIndex(temperature, humidity);
      this.display();
    }
  }

  display() {
    console.log("------------------------");
    console.log(`Heat index is ${this.heatIndex}`);
  }
}
