import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  //InfoLinks (Bottom of the page Routers)
  ServicesRouter() { this.router.navigate(['/services']); }
  HomeRouter() { this.router.navigate(['/home']); }
  AboutRouter() { this.router.navigate(['/about']); }
  ContactUsRouter() { this.router.navigate(['/contact-us']); }
  ProfileRouter() { this.router.navigate(['/login']); }

}
