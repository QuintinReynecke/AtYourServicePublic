import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor(private router: Router, private http: HttpClient) { }

  // Service List variables
  public counter: any;
  public testBool: boolean = false;
  public ServiceListOBJ: any = [];
  public ServiceListInOBJ: any = {};

  ngOnInit(): void {
    /* Populate the Ion Cards with the data from the database */
    this.http.get('https://localhost:5001/getServiceList').subscribe(GetAllServiceList => {
      console.log(GetAllServiceList);
      this.testBool = false;
      this.counter = 0;

      while (this.testBool != true) {
        this.ServiceListInOBJ = {};
        if (GetAllServiceList[this.counter] == undefined) {
          this.testBool = true;
        }
        if (GetAllServiceList[this.counter] != undefined) {

          this.ServiceListInOBJ.ServiceList = GetAllServiceList[this.counter];
          //console.log(this.ServiceListInOBJ.ServiceList);
          this.ServiceListOBJ.push(this.ServiceListInOBJ);
        }
        this.counter++;
      }
    });
  }

  AboutPageSelected() {
    this.router.navigate(['/about']);
  }

  //InfoLinks (Bottom of the page Routers)
  ServicesRouter() { this.router.navigate(['/services']); }
  HomeRouter() { this.router.navigate(['/home']); }
  AboutRouter() { this.router.navigate(['/about']); }
  ContactUsRouter() { this.router.navigate(['/contact-us']); }
  ProfileRouter() { this.router.navigate(['/login']); }

}
