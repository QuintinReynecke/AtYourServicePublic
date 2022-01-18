import { FUNCTION_TYPE } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MySharedService } from '../MySharedService';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private MyService: MySharedService) { }

  public RegisterExtraQuestions: boolean = false;
  public ServiceQuestion: boolean = false;
  public ShowLogin: boolean = true;
  public ShowRegister: boolean = false;
  Service_Shop: any = "Service";

  public LogedIn: boolean = false;
  public RegisterQuestionsTwo: boolean = false;
  public RegisterQuestionsThree: boolean = false;
  public RegisterQuestionsFour: boolean = false;

  ngOnInit(): void {
  }

  SwitchLoginRegister() {
    if (this.ShowLogin == true) {
      this.ShowLogin = false;
      this.ShowRegister = true;
    } else {
      this.ShowLogin = true;
      this.ShowRegister = false;
    }
  }

  RegisterSubmit(){
    this.ShowLogin = false;
    this.ShowRegister = false;
    this.RegisterExtraQuestions = true;
  }

  LogingIn(){
    this.ShowLogin = false;
    this.LogedIn = true;
  }



  SubmitNextOne(){
     this.RegisterQuestionsTwo = true;
     this.ShowRegister = false;

  }

  SubmitNextTwo(){
    this.RegisterQuestionsThree = true;
    this.RegisterQuestionsTwo = false;
  }

  SubmitNextThree(){
    this.RegisterQuestionsFour = true;
    this.RegisterQuestionsThree = false;
  }

  //InfoLinks (Bottom of the page Routers)
  ServicesRouter(){this.router.navigate(['/services']);}
  HomeRouter(){this.router.navigate(['/home']);}
  AboutRouter(){this.router.navigate(['/about']);}
  ContactUsRouter(){this.router.navigate(['/contact-us']);}
  ProfileRouter(){this.router.navigate(['/login']);}
}
