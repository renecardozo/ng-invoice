import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {

  listener: Subscription;
  weatherList: any[] = [];
  city: any = {};

  constructor( private weatherService: WeatherService) { }

  ngOnInit() {
    this.getWeather();
  }

  getWeather() {
    this.getGeolocation().then(
      response => {
        this.listener = this.weatherService.getWeather(response).subscribe(
          response => {
            this.forecastThreeDays(response.data.list);
            this.city = response.data.city
          },
          error => {
            console.log(error);
          }
        );
      },
      error => {
        console.log(error);
      }
    );
  }

  forecastThreeDays(list) {
    let currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 1);
    let countDays = 0;
    for(let index = 0; index < list.length; index++) {
      if (countDays === 3 ) {
        break;
      }
      let dayOfWeather = new Date(list[index].dt_txt);
      if (dayOfWeather.getDate() == currentDate.getDate()) {
        this.weatherList.push(list[index]);
        currentDate.setDate(currentDate.getDate() + 1);
        countDays++;
      }
    }
  }

  private getGeolocation(): Promise<any> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resp => {
          resolve({lon: resp.coords.longitude, lat: resp.coords.latitude, cnt: 15});
        },
        err => {
          reject(err);
        });
    });
  }

}
