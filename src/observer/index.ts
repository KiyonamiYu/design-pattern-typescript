import { Subject, WeatherData } from "./subject";
import {
  Observer,
  CurrentConditionDisplay,
  StatisticsDisplay,
  HeatIndexDisplay,
} from "./observer";

const weatherData = new WeatherData();

const currentConditionDisplay = new CurrentConditionDisplay();
const statisticsDisplay = new StatisticsDisplay();
const heatIndexDisplay = new HeatIndexDisplay();

weatherData.registerObserver(currentConditionDisplay);
weatherData.registerObserver(statisticsDisplay);
weatherData.registerObserver(heatIndexDisplay);

// 移除观察者测试
// weatherData.removeObserver(statisticsDisplay);

// 内部触发：subject.notifyObservers() -> observer.update() -> displayElement.display()
weatherData.setMeasurements(1, 2, 3);
// weatherData.setMeasurements(4, 5, 6);
// weatherData.setMeasurements(7, 8, 9);
