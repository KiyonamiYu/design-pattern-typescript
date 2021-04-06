import { Subject, WeatherData } from "./subject";
import {
  Observer,
  CurrentConditionDisplay,
  StatisticsDisplay,
  HeatIndexDisplay,
} from "./observer";

const weatherData = new WeatherData();
const currentConditionDisplay = new CurrentConditionDisplay(weatherData); // subject.registerObserver(o);
const statisticsDisplay = new StatisticsDisplay(weatherData);
const heatIndexDisplay = new HeatIndexDisplay(weatherData);

// 内部触发：subject.notifyObservers() -> observer.update() -> displayElement.display()
weatherData.setMeasurements(1, 2, 3);
weatherData.setMeasurements(4, 5, 6);
weatherData.setMeasurements(7, 8, 9);
