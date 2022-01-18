import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MySharedService } from '../MySharedService';
import { FilterSettingsModel } from '@syncfusion/ej2-angular-grids';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {

  constructor(private router: Router, private MyService: MySharedService, private http: HttpClient) { }

  GetAllDataVar: any;
  ProfileIDValue: any;

  ngOnInit(): void {

    this.http.get('https://localhost:5001/get/Service').subscribe(GetAllShopdata => {
      console.log(GetAllShopdata);
      this.GetAllDataVar = GetAllShopdata;
    });
  }

  //InfoLinks (Bottom of the page Routers)
  ServicesRouter(){this.router.navigate(['/services']);}
  HomeRouter(){this.router.navigate(['/home']);}
  AboutRouter(){this.router.navigate(['/about']);}
  ContactUsRouter(){this.router.navigate(['/contact-us']);}
  ProfileRouter(){this.router.navigate(['/login']);}
}
