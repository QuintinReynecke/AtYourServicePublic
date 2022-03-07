import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
  }

  //InfoLinks (Bottom of the page Routers)
  ServicesRouter() { this.router.navigate(['/services']); }
  HomeRouter() { this.router.navigate(['/home']); }
  AboutRouter() { this.router.navigate(['/about']); }
  ContactUsRouter() { this.router.navigate(['/contact-us']); }
  ProfileRouter() { this.router.navigate(['/login']); }

}
