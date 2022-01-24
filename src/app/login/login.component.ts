import { FUNCTION_TYPE } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MySharedService } from '../MySharedService';
import { HttpClient } from '@angular/common/http';
import { insertMod } from '../Models/DataModel';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private MyService: MySharedService, private http: HttpClient) { }

  DataModel: insertMod = {} as any;

  //Database connection
  public connString: any = "https://localhost:5001/";//https://localhost:44337/

//Location Selection table
public SplitSuburb: string[];
public ProvinceSelectMenu: string[];
public MakeLocationAString: any = " ";
public GetLocationAString: any = '';
public provinceList: any = [
  { "Province": "Eastern-Cape" },
  { "Province": "Free-State" },
  { "Province": "Gauteng" },
  { "Province": "KZN" },
  { "Province": "Limpopo" },
  { "Province": "Mpumulanga" },
  { "Province": "Northern-Cape" },
  { "Province": "North-West" },
  { "Province": "Western-Cape" }
]

// Get Categorys
//public ServiceListSelectMenu: string[];
public theCategory: any;
public filteredList: any = [];
public CategorySelect: boolean = false;
public categoriesOBJ: any = [];
public categoriesinOBJ: any = {};
public counter: any;
public testBool: boolean = false;

 //ServiceList Selection table
 public ServiceListSelectMenu: string[];
 public MakeServiceAString: any = " ";
 public GetServiceAString: any = '';

 public EasternCapeSuburb: any;
  public FreeStateSuburb: any;
  public GautengSuburb: any;
  public KZNSuburb: any;
  public LimpopoSuburb: any;
  public MpumulangaSuburb: any;
  public NorthernCapeSuburb: any;
  public NorthWestSuburb: any;
  public WesternCapeSuburb: any;

  public EasternCapeSuburbD: string[];
  public FreeStateSuburbD: string[];
  public GautengSuburbD: string[];
  public KZNSuburbD: string[];
  public LimpopoSuburbD: string[];
  public MpumulangaSuburbD: string[];
  public NorthernCapeSuburbD: string[];
  public NorthWestSuburbD: string[];
  public WesternCapeSuburbD: string[];

  public EasternCapeSuburbShow: boolean = false;
  public FreeStateSuburbShow: boolean = false;
  public GautengSuburbShow: boolean = false;
  public KZNSuburbShow: boolean = false;
  public LimpopoSuburbShow: boolean = false;
  public MpumulangaSuburbShow: boolean = false;
  public NorthernCapeSuburbShow: boolean = false;
  public NorthWestSuburbShow: boolean = false;
  public WesternCapeSuburbShow: boolean = false;

  public SplitDatabaseLocation: string[];
  public TempLocation: string;

  public MakeSuburbAString: any = " ";
  public GetSuburbAString: any = '';

// Get User data from ID
public ProfileIDValue: any = 1;

// Table ID - will be used to update data
public MainTableAddingID: any;
public MainTableID: any;
public ContactDetailsID: any;
public BusinessHoursID: any;
public PhotosID: any;
public WorkLocationsID: any;
public UsersID: any;
public ReviewID: any;

//Profile Pic Var
public ProfilePic: any;

//Pictures Var
public ReplaceImagesFlag = false; //if images replace button is clicked, trigger the flag
public ViewImages: boolean = false;
public ViewProfilePic: boolean = false;
public FooterImageFullScreen: boolean = false;
public NewImageContainer: boolean = false;
public MakeImagesAString: string;
public LengthOfMultipleImages: number;
public LengthOfMultipleImagesinDatabase: number;
public HideImageButtons: boolean = false;
public HideImageButtonsforDatabase: boolean = false;
public PictureIndexCounter: any;  // used when new images are updated
public PictureIndexCounterDatabase: any; // used for images in the database
public UpdateMultipleImage: any;
public ImagesInArray: string[] = [];
public ImagesInDatabase: string[] = [];
public ShowCurrentImage: any;
public onloadCounter: any = 0; // inside for loop (very essential)
public i: number; // for loop (very essential)


//Register Variables 
public Service_Shop: any = "Service";
public ServiceID: any;
public ServiceName: any;
public ServiceUserName: any;
public ServicePhone: any;
public ServicePassword: any;
public ServiceConfirmPassword: any;
public ServiceWebsite: any;
public ServiceEmail: any;

public ServiceMonday: boolean;
  public ServiceTuesday: boolean;
  public ServiceWednesday: boolean;
  public ServiceThursday: boolean;
  public ServiceFriday: boolean;
  public ServiceSaterday: boolean;
  public ServiceSunday: boolean;

  public ServiceAccountActivity: boolean;
  public ServiceTotalPhotos: any;
  public ServiceType: any;
  public ServiceCategory: any;
  public ServiceWorkLocation: any;
  public ServiceCallOutFee: any;
  public ServiceDiscription: any;
  public ServiceImages: any;

  public UserCurrentReview: any;

  //Service Type list Var
  public ServiceListOBJ: any = [];
  public ServiceListInOBJ: any = {};


  public RegisterExtraQuestions: boolean = false;
  public ServiceQuestion: boolean = false;
  public ShowLogin: boolean = false;
  public ShowRegister: boolean = false;
 // Service_Shop: any = "Service";

  public DisplayUserInfo = true; // Show loged in User details
  public LogedIn: boolean = false;
  public RegisterQuestionsTwo: boolean = false;
  public RegisterQuestionsThree: boolean = false;
  public RegisterQuestionsFour: boolean = false;

  ngOnInit(): void {
    this.GetUserData();
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


  GetUserData() {
    // this.http.get('https://localhost:5001/getUserInfo/' + this.ProfileIDValue).subscribe(UserInfo => {

    this.http.get('https://localhost:5001/getUserInfo/' + this.ProfileIDValue).subscribe(UserInfo => {
      this.MainTableID = UserInfo[0].id;  // Use to get the branch databases data

      //console.log(UserInfo);  
      this.ServiceName = UserInfo[0].name;
      this.ServiceUserName = UserInfo[0].userName;
      this.ServiceAccountActivity = UserInfo[0].active;
      this.ServiceTotalPhotos = UserInfo[0].totalPhotos;
      this.ServiceType = UserInfo[0].type;
      this.GetServiceAString = UserInfo[0].category; // select Menu
      this.ServiceCallOutFee = UserInfo[0].callOutFee;
      this.ServiceDiscription = UserInfo[0].description;

      this.http.get('https://localhost:5001/getUserInfoContactDetails/' + this.MainTableID).subscribe(UserInfoCD => {
        this.ContactDetailsID = UserInfoCD[0].id;
        this.ServicePhone = UserInfoCD[0].phone;
        this.ServiceEmail = UserInfoCD[0].email;
        this.ServiceWebsite = UserInfoCD[0].website;

        this.http.get('https://localhost:5001/getUserInfoBusinessHours/' + this.MainTableID).subscribe(UserInfoBH => {
          this.BusinessHoursID = UserInfoBH[0].id;
          this.ServiceMonday = UserInfoBH[0].monday;
          this.ServiceTuesday = UserInfoBH[0].tuesday;
          this.ServiceWednesday = UserInfoBH[0].wednesday;
          this.ServiceThursday = UserInfoBH[0].thursday;
          this.ServiceFriday = UserInfoBH[0].friday;
          this.ServiceSaterday = UserInfoBH[0].saturday;
          this.ServiceSunday = UserInfoBH[0].sunday;
          //console.log(UserInfoBH);

          this.http.get('https://localhost:5001/getUserInfoPhotos/' + this.MainTableID).subscribe(UserInfoP => {
            this.PhotosID = UserInfoP[0].id;
            //this.MakeImagesAString = UserInfoP[0].image1; //serviceImages
            // Can be replaced by ImageInArray later on....
            this.ImagesInDatabase[0] = UserInfoP[0].image1; //serviceImages
            this.ImagesInDatabase[1] = UserInfoP[0].image2; //serviceImages
            this.ImagesInDatabase[2] = UserInfoP[0].image3; //serviceImages
            this.ImagesInDatabase[3] = UserInfoP[0].image4; //serviceImages
            this.ImagesInDatabase[4] = UserInfoP[0].image5; //serviceImages
            this.ProfilePic = UserInfoP[0].profilePicture;
            //console.log(this.ProfilePic);

            //Set Image counter to 0 and show first image in array
            this.PictureIndexCounterDatabase = 0;
            this.ServiceImages = this.ImagesInDatabase[0];

            this.LengthOfMultipleImagesinDatabase = this.ImagesInDatabase.length;
            if (this.LengthOfMultipleImagesinDatabase > 1)
              this.HideImageButtonsforDatabase = true;
            else
              this.HideImageButtonsforDatabase = false;

            this.http.get('https://localhost:5001/getUserInfoWorkLocations/' + this.MainTableID).subscribe(UserInfoWL => {
              this.WorkLocationsID = UserInfoWL[0].id;
              this.GetLocationAString = UserInfoWL[0].workInLocation; // select Menu
              this.GetSuburbAString = UserInfoWL[0].workInSuburb;

              this.SplitProvinceList();
              this.SplitSuburbs();

              this.http.get('https://localhost:5001/getUserInfoUsers/' + this.MainTableID).subscribe(UserInfoU => {
                this.UsersID = UserInfoU[0].id;
                this.ServiceUserName = UserInfoU[0].userName;
                this.ServicePassword = UserInfoU[0].password;
                this.ServiceConfirmPassword = UserInfoU[0].confirmPassword;

                this.http.get('https://localhost:5001/getUserReviews/' + this.MainTableID).subscribe(UserInfoR => {
                  this.ReviewID = UserInfoR[0].id;
                  this.UserCurrentReview = UserInfoR[0].currentReview;
                  //this.GetRatingFromDatabase(); // Send the review we get from the database to the rating Function 
                  //console.log(UserInfoR);
                });
              });
            });
          });
        });
      });
    });
  }

  SplitProvinceList() {
    this.SplitDatabaseLocation = this.GetLocationAString.split(",");

    this.SplitDatabaseLocation.forEach(element => {
      this.TempLocation = element.replace(" ", "");
      this.TempLocation = this.TempLocation.replace(" ", "");

      if (this.TempLocation == "Eastern-Cape") {
        this.EasternCapeSuburbShow = true;
      } else if (this.TempLocation == "Free-State") {
        this.FreeStateSuburbShow = true;
      } else if (this.TempLocation == "Gauteng") {
        this.GautengSuburbShow = true;
      } else if (this.TempLocation == "KZN") {
        this.KZNSuburbShow = true;
      } else if (this.TempLocation == "Limpopo") {
        this.LimpopoSuburbShow = true;
      } else if (this.TempLocation == "Mpumulanga") {
        this.MpumulangaSuburbShow = true;
      } else if (this.TempLocation == "Northern-Cape") {
        this.NorthernCapeSuburbShow = true;
      } else if (this.TempLocation == "North-West") {
        this.NorthWestSuburbShow = true;
      } else if (this.TempLocation == "Western-Cape") {
        this.WesternCapeSuburbShow = true;
      }
    });
  }

  SplitSuburbs() {
    this.SplitSuburb = this.GetSuburbAString.split("#");
    //console.log(this.SplitSuburb);

    this.EasternCapeSuburb = this.SplitSuburb[0];
    this.FreeStateSuburb = this.SplitSuburb[1];
    this.GautengSuburb = this.SplitSuburb[2];
    this.KZNSuburb = this.SplitSuburb[3];
    this.LimpopoSuburb = this.SplitSuburb[4];
    this.MpumulangaSuburb = this.SplitSuburb[5];
    this.NorthernCapeSuburb = this.SplitSuburb[6];
    this.NorthWestSuburb = this.SplitSuburb[7];
    this.WesternCapeSuburb = this.SplitSuburb[8];

  }

  UpdateUserInformation() {
    /*console.log("Service Selected:");
    console.log(this.ServiceListSelectMenu);
    console.log("Province Selected:");
    console.log(this.ProvinceSelectMenu);
    console.log("Weekday Selected:");
    console.log(this.WeekdaySelectMenu);*/

    //this.MakeWeekdayAString

    this.DataModel.Id = this.ProfileIDValue;

    this.DataModel.UserName = this.ServiceUserName;
    this.DataModel.Name = this.ServiceName;
    this.DataModel.Type = this.ServiceType;

    if (this.ServiceListSelectMenu != null) {
      this.ServiceListSelectMenu.forEach(element => {
        this.MakeServiceAString += element + ",";
      });
      this.DataModel.Category = this.MakeServiceAString;
    } else {
      this.DataModel.Category = this.GetServiceAString;
    }

    this.DataModel.Description = this.ServiceDiscription;

    if (this.ProvinceSelectMenu != null) {
      this.ProvinceSelectMenu.forEach(element => {
        this.MakeLocationAString += element + ",";
      });
      this.DataModel.Province = this.MakeLocationAString;
    } else {
      this.DataModel.Province = this.MakeLocationAString;
    }

    //this.DataModel.Province = "N/A";
    this.DataModel.CallOutFee = this.ServiceCallOutFee;
    this.DataModel.Active = this.ServiceAccountActivity;
    this.DataModel.TotalPhotos = this.ServiceTotalPhotos;
    //console.log("Type of work Updated:");
    //console.log(this.DataModel.Category);

    this.http.put('https://localhost:5001/Update/UserDetailsMain', this.DataModel).subscribe(UpdateReviewM => {
      this.DataModel.ContactDetailsTable = {
        Id: this.ContactDetailsID,
        Phone: this.ServicePhone,
        Website: this.ServiceWebsite,
        Email: this.ServiceEmail,
        Address: "N/A",
        Location: "N/A",
        mainTableFKId: this.MainTableID
      };

      this.DataModel.BusinessHoursTable = {
        Id: this.BusinessHoursID,
        Monday: this.ServiceMonday,
        Tuesday: this.ServiceTuesday,
        Wednesday: this.ServiceWednesday,
        Thursday: this.ServiceThursday,
        Friday: this.ServiceFriday,
        Saturday: this.ServiceSaterday,
        Sunday: this.ServiceSunday,
        mainTableFKId: this.MainTableID
      };

      if (this.ReplaceImagesFlag == true) {
        this.DataModel.PhotosTable = {
          Id: this.PhotosID,
          Image1: this.ImagesInArray[0], // ServiceImages
          Image2: this.ImagesInArray[1],
          Image3: this.ImagesInArray[2],
          Image4: this.ImagesInArray[3],
          Image5: this.ImagesInArray[4],
          mainTableFKId: this.MainTableID,
          ProfilePicture: this.ProfilePic
        };
      } else {
        //Set Images to array to prevent emty storage when user updates his/her profile
        this.ImagesInArray[0] = this.ImagesInDatabase[0];
        this.ImagesInArray[1] = this.ImagesInDatabase[1];
        this.ImagesInArray[2] = this.ImagesInDatabase[2];
        this.ImagesInArray[3] = this.ImagesInDatabase[3];
        this.ImagesInArray[4] = this.ImagesInDatabase[4];

        this.DataModel.PhotosTable = {
          Id: this.PhotosID,
          Image1: this.ImagesInArray[0], // ServiceImages
          Image2: this.ImagesInArray[1],
          Image3: this.ImagesInArray[2],
          Image4: this.ImagesInArray[3],
          Image5: this.ImagesInArray[4],
          mainTableFKId: this.MainTableID,
          ProfilePicture: this.ProfilePic
        };
      }

      //Make Suburb a string by seperating the provinces by a # and in order with respect to the province list
      this.MakeSuburbAString = this.EasternCapeSuburb + "#" + this.FreeStateSuburb + "#" + this.GautengSuburb + "#" + this.KZNSuburb + "#" + this.LimpopoSuburb + "#" + this.MpumulangaSuburb + "#" + this.NorthernCapeSuburb + "#" + this.NorthWestSuburb + "#" + this.WesternCapeSuburb;
      //console.log(this.MakeSuburbAString);

      if (this.ProvinceSelectMenu != null) {
        this.ProvinceSelectMenu.forEach(element => {
          this.MakeLocationAString += element + ",";
        });
        this.DataModel.Province = this.MakeLocationAString;

        this.DataModel.WorkLocationTable = {
          Id: this.WorkLocationsID,
          workInLocation: this.MakeLocationAString,
          workInSuburb: this.MakeSuburbAString,
          mainTableFKId: this.MainTableID
        };
      } else {
        this.DataModel.Province = this.MakeLocationAString;

        this.DataModel.WorkLocationTable = {
          Id: this.WorkLocationsID,
          workInLocation: this.GetLocationAString,
          workInSuburb: this.MakeSuburbAString,
          mainTableFKId: this.MainTableID
        };
      }

      //console.log("Province Updated:");
      //console.log(this.DataModel.WorkLocationTable.workInLocation);

      this.DataModel.UserTable = {
        Id: this.UsersID,
        UserName: this.ServiceUserName,
        Password: this.ServicePassword,
        ConfirmPassword: this.ServiceConfirmPassword,
        mainTableFKId: this.MainTableID
      };

      this.http.put('https://localhost:5001/Update/UserDetailsContactDetails', this.DataModel.ContactDetailsTable).subscribe(UpdateReviewCD => {
        this.http.put('https://localhost:5001/Update/UserDetailsBussinesH', this.DataModel.BusinessHoursTable).subscribe(UpdateReviewBH => {
          this.http.put('https://localhost:5001/Update/UserDetailsPhotos', this.DataModel.PhotosTable).subscribe(UpdateReviewP => {
            this.http.put('https://localhost:5001/Update/UserDetailsWorkLocations', this.DataModel.WorkLocationTable).subscribe(UpdateReviewWL => {
              this.http.put('https://localhost:5001/Update/UserDetailsUsers', this.DataModel.UserTable).subscribe(UpdateReviewU => {

                this.GetUserData();
                alert("Your profile have been updated. Please refresh your page for the changes to take affect!");
                //window.location.reload; // try refreshing the page                
                this.NewImageContainer = false;

              });
            });
          });
        });
      });
    });
  }

  // Upload pictures from device
  //Test Photo Upload
  public files: string[];

  ProfilePicUpdate: any;
  loadProfilePicFromDevice(event) {

    //Read a single Photo
    const fileProfilePic = event.target.files[0];
    const readerProfilePic = new FileReader();
    readerProfilePic.readAsDataURL(fileProfilePic);

    readerProfilePic.onload = () => {
      this.ProfilePicUpdate = readerProfilePic.result;
      this.ProfilePic = this.ProfilePicUpdate;
    };

    readerProfilePic.onerror = (error) => {
      //handle errors
    };
  };

  loadMultipleImageFromDevice(event) {
    this.ReplaceImagesFlag = true;

    this.NewImageContainer = true;
    this.LengthOfMultipleImages = event.target.files.length;
    //console.log(this.LengthOfMultipleImages);
    if (this.LengthOfMultipleImages > 1) {
      this.HideImageButtons = true;
    } else {
      this.HideImageButtons = false;
    }

    for (this.i = 0; this.i < this.LengthOfMultipleImages; this.i++) {
      const fileMultiplePhoto = event.target.files[this.i];

      const readerMultiplePhoto = new FileReader();
      readerMultiplePhoto.readAsDataURL(fileMultiplePhoto);

      readerMultiplePhoto.onload = () => {
        this.UpdateMultipleImage = readerMultiplePhoto.result;
        this.ImagesInArray[this.onloadCounter] = this.UpdateMultipleImage;
        //this.ImagesInDatabase[this.onloadCounter] = this.UpdateMultipleImage;
        this.ServiceImages = this.UpdateMultipleImage;
        this.ShowCurrentImage = this.UpdateMultipleImage;
        this.onloadCounter++;
      };
      readerMultiplePhoto.onerror = (error) => {
        //handle errors
      };
    }
    //Picture Defaults
    this.PictureIndexCounter = 0;

    //console.log("this.ServiceImages");
    //this.ServiceImages = this.ImagesInArray;
    //console.log(this.ServiceImages);
  }

  // Functions to move between Pictures
  //Move between Pictures
  PreviousImageInDatabase() {
    this.PictureIndexCounterDatabase = this.PictureIndexCounterDatabase - 1;
    //console.log("Image Counter:")
    //console.log(this.PictureIndexCounterDatabase);

    if (this.PictureIndexCounterDatabase < 0) {
      this.PictureIndexCounterDatabase = this.ImagesInDatabase.length - 1;
      this.ServiceImages = this.ImagesInDatabase[this.PictureIndexCounterDatabase];
    } else
      this.ServiceImages = this.ImagesInDatabase[this.PictureIndexCounterDatabase];
  }


  NextImageInDatabase() {
    this.PictureIndexCounterDatabase = this.PictureIndexCounterDatabase + 1;
    //console.log("Image Counter:");
    //console.log(this.PictureIndexCounterDatabase);

    if (this.PictureIndexCounterDatabase >= this.ImagesInDatabase.length) {
      this.PictureIndexCounterDatabase = 0;
      this.ServiceImages = this.ImagesInDatabase[this.PictureIndexCounterDatabase];
    } else
      this.ServiceImages = this.ImagesInDatabase[this.PictureIndexCounterDatabase];
  }

  ViewImageDetailBox(TypeOfView: any) {
    //console.log(TypeOfView);    
    //this.AllFooterOptions = false;
    document.getElementById('ViewImage').style.display = 'block';

    if (TypeOfView == 'ServiceImagesView') {
      //console.log("true");

      this.FooterImageFullScreen = true;
      this.ViewImages = true;
      this.ViewProfilePic = false;
      this.HideImageButtonsforDatabase = true;
    } else if (TypeOfView == 'ProfileImagesView') {
      //console.log("true");
      this.ViewImages = false;
      this.ViewProfilePic = true;
      this.FooterImageFullScreen = true;
      this.HideImageButtonsforDatabase = false; // hide next an back buttons 
    }
  }

  ViewImageDetailBoxHide() {
    document.getElementById('ViewImage').style.display = 'none';
    this.FooterImageFullScreen = false;
    this.HideImageButtonsforDatabase = true;
    //this.AllFooterOptions = true;
  }

  //InfoLinks (Bottom of the page Routers)
  ServicesRouter(){this.router.navigate(['/services']);}
  HomeRouter(){this.router.navigate(['/home']);}
  AboutRouter(){this.router.navigate(['/about']);}
  ContactUsRouter(){this.router.navigate(['/contact-us']);}
  ProfileRouter(){this.router.navigate(['/login']);}
}
