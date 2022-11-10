import { JsonpClientBackend } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { tick } from '@angular/core/testing';
import { Router } from '@angular/router';
import { ArcElement, BarController, BarElement, CategoryScale, Chart, Decimation, DoughnutController, Filler, Legend, LinearScale, LineController, LineElement, PointElement, Title, Tooltip } from 'chart.js';
import { Profit } from '../model/profit.model';
import { RealEstate } from '../model/realEstate.model';
import { User } from '../model/user.model';
import { RealEstateService } from '../services/real-estate.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-agent-home',
  templateUrl: './agent-home.component.html',
  styleUrls: ['./agent-home.component.css']
})
export class AgentHomeComponent implements OnInit {

  constructor(private reService: RealEstateService, private userService:UserService,private router:Router) {
    Chart.register(LinearScale, BarElement, BarController, CategoryScale, DoughnutController, ArcElement,LineController,LineElement,PointElement ,Decimation, Filler, Legend, Title, Tooltip);
  }

  ngOnInit(): void {
    this.user=JSON.parse(localStorage.getItem("user"));
    if(!this.user || this.user.type=='regular'){
      this.router.navigate(['']);
    }
    this.userService.getProfit().subscribe((p:Profit)=>{
      this.profit=p;
    })
    this.reService.getAllRealEstates().subscribe((re: RealEstate[]) => {
      this.realEstates = re;
      //variables for numberOfRealEstates  chart
      var numberOfHouses = 0;
      var numberOfApartments = 0;
      var numberOfRentingHouses = 0;
      var numberOfSellingHouses = 0;
      var numberOfRentingApartments = 0;
      var numberOfSellingApartments = 0;
      //variables for realEstatesForSalePriceChart
      var under75s = 0;
      var under30s = 0;
      var under125s = 0;
      var under250s = 0;
      var over250s = 0;
      //variables for realEstatesForRentPriceChart
      var under150r = 0;
      var under250r = 0;
      var under500r = 0;
      var under1000r = 0;
      var over1000r = 0;
      var cities:Array<String>= new Array<String>();
      var rePerCity:Array<number>=new Array<number>();
      if (this.realEstates) {
      
        for (let i = 0; i < this.realEstates.length; i++) {
          console.log(this.realEstates[i].adress.city);
          var index = cities.indexOf(this.realEstates[i].adress.city);
          if(index>=0)
            rePerCity[index]++;
          else{
            cities.push(this.realEstates[i].adress.city);
            rePerCity.push(1);
          }
          if (this.realEstates[i].type == 'house') {
            if (this.realEstates[i].reason == 'sell') {
              numberOfSellingHouses++;
              if (this.realEstates[i].price <= 30000)
                under30s++;
              else if (this.realEstates[i].price <= 75000)
                under75s++;
              else if (this.realEstates[i].price <= 125000)
                under125s++;
              else if (this.realEstates[i].price <= 250000)
                under250s++;
              else
                over250s++;

            }
            else {
              numberOfRentingHouses++;
              if (this.realEstates[i].price <= 150)
                under150r++;
              else if (this.realEstates[i].price <= 250)
                under250r++;
              else if (this.realEstates[i].price <= 500)
                under500r++;
              else if (this.realEstates[i].price <= 1000)
                under1000r++;
              else
                over1000r++;
            }
          }
          else {
            if (this.realEstates[i].reason == 'sell') {
              numberOfSellingApartments++;
              if (this.realEstates[i].price <= 30000)
                under30s++;
              else if (this.realEstates[i].price <= 75000)
                under75s++;
              else if (this.realEstates[i].price <= 125000)
                under125s++;
              else if (this.realEstates[i].price <= 250000)
                under250s++;
              else
                over250s++;
            }
            else {
              numberOfRentingApartments++;
              if (this.realEstates[i].price <= 150)
                under150r++;
              else if (this.realEstates[i].price <= 250)
                under250r++;
              else if (this.realEstates[i].price <= 500)
                under500r++;
              else if (this.realEstates[i].price <= 1000)
                under1000r++;
              else
                over1000r++;
            }
          }
        }
        console.log(cities);
        console.log(rePerCity);
        console.log(numberOfSellingApartments);
        var numberOfRealEstatesChart = new Chart("numberOfRealEstatesChart", {
          type: 'doughnut',
          data: {
            labels: [" apartments for rent", "houses for rent", "apartments for sale", "houses for sale"],
            datasets: [{
              label: 'sale/rent realEstates',
              data: [numberOfRentingApartments, numberOfRentingHouses, numberOfSellingApartments, numberOfSellingHouses],
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)'

              ],

              hoverOffset: 4
            }]
          },

          options: {

          }
        });

        var realEstatesForSalePriceChart = new Chart("realEstatesForSalePriceChart", {
          type: 'bar',
          data: {
            labels: ["0-30k", "30-75k", "70-125k", "125-250k", "250+k"],
            datasets: [{
              label: 'sale price range chart',
              data: [under30s, under75s, under125s, under250s, over250s],
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(255, 25, 150, 0.2)',

              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(255, 25, 150, 0.2)',

              ],
              borderWidth: 1
            }]
          },
          options: {
            scales: {
              y: {
                beginAtZero: true,
                ticks: {
                  stepSize: 1
              }
              }
            }
          }
        });

        var realEstatesForRentPriceChart = new Chart("realEstatesForRentPriceChart", {
          type: 'bar',
          data: {
            labels: ["0-150", "150-250", "250-500", "500-1000", "1000+"],
            datasets: [{
              label: 'rent price range chart',
              data: [under150r, under250r, under500r, under1000r, over1000r],
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(255, 25, 150, 0.2)',

              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(255, 25, 150, 0.2)',

              ],
              borderWidth: 1
            }]
          },
          options: {
            scales: {
              y: {
                beginAtZero: true,
                ticks: {
                  stepSize: 1
              }
              }
            }
          }
        });
        var realEstatesPerCity = new Chart("realEstatesPerCity", {
          type: 'line',
          data: {
            labels: cities,
            datasets: [{
              label: 'real estates per city',
              data: rePerCity,
              borderColor: 'rgb(75, 192, 192)',
              tension:0.1
            }]
          },
          options:{
            scales:{
              y:{
                beginAtZero:true,
                ticks:{
                  stepSize:1
                }
              }
            }
          }
        });
      }
    });
    



  }

  profit:Profit;
  realEstates: RealEstate[];
  user:User;
  fee:number;
  msg:string;

  updateFee(){
    if(this.fee==undefined)
      this.msg="please enter new fee";
    else if(this.fee<0 || this.fee>100)
      this.msg="fee must be value between 0 and 100";
    else{
      this.userService.updateFee(this.fee).subscribe(msg=>{
        this.userService.getProfit().subscribe((p:Profit)=>{
          this.profit=p;
        })
      })
    }
  }

}
