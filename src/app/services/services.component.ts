import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MySharedService } from '../MySharedService';
import { insertMod } from '../Models/DataModel';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {

  constructor(private router: Router, private MyService: MySharedService, private http: HttpClient) { }
  DataModel: insertMod = {} as any;

  //Database connection
  public connString: any = "https://localhost:5001/";//https://localhost:44337/

  //Search and Filter
  public FilterListView: boolean = false;
  public SearchListView: boolean = false;
  public WaterMark: boolean = true;
  public FilterColor: any = "white";
  public SearchColor: any = "white";
  public HideShowResult: boolean = false;

  //Spicfic search Buttons
  public SpicificSearch: boolean = false;
  public NameSearch: boolean = false;
  public ValuesColor: any = "white";
  public NameColor: any = "white";
  public SearchName: any;

  // Get Provinces from User
  public ProvinceSelectMenu: string[];
  public ProvinceSelect: boolean = true;
  public categoryName: any;
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

  //Weekday Selection table
  public WeekdaySelectMenu = '';
  public WeekdayList: any = [
    { "Weekday": "Monday" },
    { "Weekday": "Tuesday" },
    { "Weekday": "Wednesday" },
    { "Weekday": "Thursday" },
    { "Weekday": "Fryday" },
    { "Weekday": "Saterday" },
    { "Weekday": "Sunday" }
  ]

  // Get Categorys
  public ServiceListSelectMenu: string[];
  public theCategory: any;
  public filteredList: any = [];
  public CategorySelect: boolean = false;
  public categoriesOBJ: any = [];
  public categoriesinOBJ: any = {};
  public counter: any;
  public testBool: boolean = false;

  // Get Values to search for categorys
  public theType: any;
  public theProvince: any;

  // Show Province and category selected results
  public ShowPandCResults: boolean = false;

  // For User Profile View
  public ViewProfileDetails: boolean = false;
  public searchId: any;
  public ProfileIDValue: any;
  public MainTableID: any;
  public ServiceName: any;
  public GetServiceAString: any = '';
  public SplitServices: string[];
  public ServiceCallOutFee: any;
  public ServiceDiscription: any;
  public ServicePhone: any;
  public ServiceWebsite: any;
  public MondayColor: any = "green";  //Green or (#76FF03)
  public TuesdayColor: any = "green";  //Green
  public WednesdayColor: any = "green";  //Green
  public ThursdayColor: any = "green";  //Green
  public FrydayColor: any = "green";  //Green
  public SaterdayColor: any = "green";  //Green
  public SundayColor: any = "green";  //Green

  public ServiceMonday: boolean;
  public ServiceTuesday: boolean;
  public ServiceWednesday: boolean;
  public ServiceThursday: boolean;
  public ServiceFriday: boolean;
  public ServiceSaterday: boolean;
  public ServiceSunday: boolean;

  public ViewImages: boolean = false;
  public ViewProfilePic: boolean = false;
  public ProfilePic: any;
  public PictureIndexCounterDatabase: any; // used for images in the database
  public ServiceImages: any;
  public ImagesInDatabase: string[] = [];
  public LengthOfMultipleImagesinDatabase: number;
  public HideImageButtonsforDatabase: boolean = false;
  public FooterImageFullScreen: boolean = false;

  public SplitLocation: string[];
  public GetSuburbAString: any = '';
  public SplitSuburb: string[];

  public SplitDatabaseLocation: string[];
  public TempLocation: string;

  public rating: any;
  public ReviewID: number;
  public UserCurrentReview: any;
  public CalcNewReview: number;

  public EasternCapeSuburb: string[];
  public FreeStateSuburb: string[];
  public GautengSuburb: string[];
  public KZNSuburb: string[];
  public LimpopoSuburb: string[];
  public MpumulangaSuburb: string[];
  public NorthernCapeSuburb: string[];
  public NorthWestSuburb: string[];
  public WesternCapeSuburb: string[];

  public EasternCapeSuburbShow: boolean = false;
  public FreeStateSuburbShow: boolean = false;
  public GautengSuburbShow: boolean = false;
  public KZNSuburbShow: boolean = false;
  public LimpopoSuburbShow: boolean = false;
  public MpumulangaSuburbShow: boolean = false;
  public NorthernCapeSuburbShow: boolean = false;
  public NorthWestSuburbShow: boolean = false;
  public WesternCapeSuburbShow: boolean = false;


  //Send a Email
  public ToPerson: any;
  public UserNameSurname: any;
  public UserEmailPhone: any;
  public Subject: any;
  public UserBody: any;

  ngOnInit(): void {
    //this.http.get(this.connString + 'get/' + this.theType + "/" + this.theProvince).subscribe(data => {
    this.http.get(this.connString + 'getServiceList').subscribe(data => {

      this.testBool = false;
      this.counter = 0;

      while (this.testBool != true) {
        this.categoriesinOBJ = {};
        if (data[this.counter] == undefined) {
          this.testBool = true;
        }

        if (data[this.counter] != undefined) {

          this.categoriesinOBJ.category = data[this.counter];
          //console.log(this.categoriesinOBJ.category);
          this.categoriesOBJ.push(this.categoriesinOBJ);
        }
        this.counter++;
      }
    });

  }

  //Choose between Filter and search
  SearchOption(ValueS: any) {
    //console.log(ValueS);F
    if (ValueS == 'Filter') {
      this.WaterMark = false; // Hide Logo Image
      this.FilterColor = "blue"; // Change Background Color
      this.SearchColor = "white"; // Change Background Color
      this.FilterListView = true; // Show filter options
      this.SearchListView = false; // Hide Search Menu
      this.ViewProfileDetails = false; // Hide User Info 
      this.CategorySelect = false; // Hide links next to service Heading
      this.ShowPandCResults = false; // Hide Filter results
      
    } else if (ValueS == 'Search') {
      this.WaterMark = false; // Hide Logo Image
      this.FilterColor = "white"; // Change Background Color
      this.SearchColor = "blue"; // Change Background Color
      this.FilterListView = false; // Hide filter options
      this.SearchListView = true; // Show Search Menu
      this.ViewProfileDetails = false; // Hide User Info 
      this.CategorySelect = false; // Hide links next to service Heading
      this.ShowPandCResults = false; // Hide Filter results
    }
  }


  //Go to Gategory Select Menu
  goToCategory(event) {
    console.log(event.target.outerText);
    this.ProvinceSelect = false; // Hide Province Select Menu
    this.CategorySelect = true; // Show Category Select Menu

    this.theType = "Service";
    this.theProvince = event.target.outerText;
  }

  // Find Users Matching Selected Category and Province
  findItem(event) {
    this.ProvinceSelect = false; // Hide Province Select Menu
    this.CategorySelect = false; // Hide Category Select Menu
    this.ShowPandCResults = true; //Show final results

    this.theCategory = event.target.outerText;
    console.log(this.theType);
    console.log(this.theProvince);
    console.log(this.theCategory);

    this.http.get(this.connString + 'get/' + this.theType + "/" + this.theProvince + "/" + this.theCategory).subscribe(finalList => {
      this.filteredList = finalList;
      console.log(this.filteredList);
    });
  }

  // Open Selected User Profile
  findFullInfo(event) {
    this.ShowPandCResults = false; // Hide Filter results
    this.SearchListView = false; // Hide Advance search
    this.HideShowResult = false; //Name Card of results
    this.SpicificSearch = false; // Hide Top Part Of search BAr
    this.NameSearch = false; // Hide Top Part Of search BAr

    this.ViewProfileDetails = true; // Show User details
    //this.FullinfoBool = true;
    //this.AllFooterOptions = true; // Show Footer Options

    this.searchId = this.filteredList[event].id;
    this.ProfileIDValue = this.searchId;

    //Quintin Code    
    this.http.get('https://localhost:5001/getUserInfo/' + this.ProfileIDValue).subscribe(UserInfo => {
      this.MainTableID = UserInfo[0].id;  // Use to get the branch databases data
      this.ServiceName = UserInfo[0].name;
      this.GetServiceAString = UserInfo[0].category; // select Menu
      this.ServiceCallOutFee = UserInfo[0].callOutFee;
      this.ServiceDiscription = UserInfo[0].description;
      this.SplitServiceList();

      this.http.get('https://localhost:5001/getUserInfoContactDetails/' + this.MainTableID).subscribe(UserInfoCD => {
        this.ServicePhone = UserInfoCD[0].phone;
        this.ToPerson = UserInfoCD[0].email;
        this.ServiceWebsite = UserInfoCD[0].website;

        this.http.get('https://localhost:5001/getUserInfoBusinessHours/' + this.MainTableID).subscribe(UserInfoBH => {
          this.ServiceMonday = UserInfoBH[0].monday;
          this.ServiceTuesday = UserInfoBH[0].tuesday;
          this.ServiceWednesday = UserInfoBH[0].wednesday;
          this.ServiceThursday = UserInfoBH[0].thursday;
          this.ServiceFriday = UserInfoBH[0].friday;
          this.ServiceSaterday = UserInfoBH[0].saturday;
          this.ServiceSunday = UserInfoBH[0].sunday;

          if (this.ServiceMonday == true) { this.MondayColor = "green"; }
          else { this.MondayColor = "red"; }

          if (this.ServiceTuesday == true) { this.TuesdayColor = "green"; }
          else { this.TuesdayColor = "red"; }

          if (this.ServiceWednesday == true) { this.WednesdayColor = "green"; }
          else { this.WednesdayColor = "red"; }

          if (this.ServiceThursday == true) { this.ThursdayColor = "green"; }
          else { this.ThursdayColor = "red"; }

          if (this.ServiceFriday == true) { this.FrydayColor = "green"; }
          else { this.FrydayColor = "red"; }

          if (this.ServiceSaterday == true) { this.SaterdayColor = "green"; }
          else { this.SaterdayColor = "red"; }

          if (this.ServiceSunday == true) { this.SundayColor = "green"; }
          else { this.SundayColor = "red"; }

          this.http.get('https://localhost:5001/getUserInfoPhotos/' + this.MainTableID).subscribe(UserInfoP => {
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
              this.GetLocationAString = UserInfoWL[0].workInLocation; // select Menu
              this.GetSuburbAString = UserInfoWL[0].workInSuburb; // select Menu

              this.SplitLocationList();
              this.SplitSuburbList();
              this.SplitSuburbs();

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
  }

  // Split Array to be displayed on screen
  SplitServiceList() {
    this.SplitServices = this.GetServiceAString.split(",");
    this.SplitServices.length = this.SplitServices.length - 1; // remove blank space at the end of the array
    //console.log(this.SplitServices);
  }

  SplitLocationList() {
    this.SplitLocation = this.GetLocationAString.split(",");
    this.SplitLocation.length = this.SplitLocation.length - 1; // remove blank space at the end of the array
    //console.log(this.SplitLocation);

    this.SplitDatabaseLocation = this.GetLocationAString.split(",");
    //console.log(this.SplitDatabaseLocation);

    this.SplitDatabaseLocation.forEach(element => {

      this.TempLocation = element.replace(" ", "");
      this.TempLocation = this.TempLocation.replace(" ", "");
      //console.log(this.TempLocation);

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

  SplitSuburbList() {
    this.SplitSuburb = this.GetSuburbAString.split(",");
    this.SplitSuburb.length = this.SplitSuburb.length - 1; // remove blank space at the end of the array
    //console.log(this.SplitSuburb);
  }

  SplitSuburbs() {
    this.SplitSuburb = this.GetSuburbAString.split("#");
    //console.log(this.SplitSuburb);

    this.EasternCapeSuburb = this.SplitSuburb[0].split(",");
    this.FreeStateSuburb = this.SplitSuburb[1].split(",");
    this.GautengSuburb = this.SplitSuburb[2].split(",");
    this.KZNSuburb = this.SplitSuburb[3].split(",");
    this.LimpopoSuburb = this.SplitSuburb[4].split(",");
    this.MpumulangaSuburb = this.SplitSuburb[5].split(",");
    this.NorthernCapeSuburb = this.SplitSuburb[6].split(",");
    this.NorthWestSuburb = this.SplitSuburb[7].split(",");
    this.WesternCapeSuburb = this.SplitSuburb[8].split(",");
  }

  /*
  //Rating Functions
  //Rating Functions  
  @Input() rating: number;
  @Output() ratingChange: EventEmitter<number> = new EventEmitter();;

  //this function is used when user rate the Service
  rate(index: number) {
    // function used to change the value of our rating 
    // triggered when user, clicks a star to change the rating
    this.rating = index;
    this.ratingChange.emit(this.rating);

    this.AddReviewButton = true; // activate review submit button
    //Get Rating value from User page and assign it to database Rating :
    //console.log(index);  // get value
  }

  // This Function is used ONLY to get the review from the database so that the review Functionality works on the front end
  GetRatingFromDatabase() {
    this.rating = this.UserCurrentReview;
    this.ratingChange.emit(this.rating);
  }

  //Assign the colours to the rating 
  getColor(index: number) {
    
    //Get Rating value from database and assign it to Rating here:
    //this.rating = 4; //Here

    if (this.isAboveRating(index)) {
      return "#E0E0E0"  //Grey
    }
    switch (this.rating) {
      case 1: case 1.1: case 1.2: case 1.3: case 1.4: case 1.5: case 1.6: case 1.7: case 1.8: case 1.9:
      case 2: case 2.1: case 2.2: case 2.3: case 2.4: case 2.5: case 2.6: case 2.7: case 2.8: case 2.9:
        return "#DD2C00"  //RED
      case 3: case 3.1: case 3.2: case 3.3: case 3.4: case 3.5: case 3.6: case 3.7: case 3.8: case 3.9:
        return "#FFCA28"  //Yellow
      case 4: case 4.1: case 4.2: case 4.3: case 4.4: case 4.5: case 4.6: case 4.7: case 4.8: case 4.9:
        return "#76FF03"  //Green
      case 5:
        return "#0318FF"  //Blue
      default:
        return "#E0E0E0"  //Grey
    }
  }

  isAboveRating(index: number): boolean {
    // returns whether or not the selected index is above ,the current rating
    // function is called from the getColor function.

    return index > this.rating;
  }*/

  stringtonumber: any;
  AddReview() {

console.log(this.UserCurrentReview);
console.log(this.rating);

    if (this.rating <= 5 && this.rating >= 0) {
      this.CalcNewReview = this.UserCurrentReview + this.rating;
      console.log(this.CalcNewReview);
      this.CalcNewReview = this.CalcNewReview / 2;
      this.CalcNewReview = parseFloat(this.CalcNewReview.toFixed(1));
      console.log("New Review: ");
      console.log(this.CalcNewReview);

      this.DataModel.ReviewTable = {
        Id: this.ReviewID,
        CurrentReview: this.CalcNewReview,
        mainTableFKId: this.MainTableID
      }
      this.http.put('https://localhost:5001/Update/UserDetailsReview', this.DataModel.ReviewTable).subscribe(UpdateReviewU => {
        //this.AddReviewButton = false; // De-activate review submit button
        alert("Your Review has been Noted.");
      });
    } else {
      alert("Please enter a review between 0 - 5");
    }
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

  // Choose Search type
  SearchSpicific(ValueS: any) {
    //console.log(ValueS);

    if (ValueS == 'Values') {
      this.SpicificSearch = true;
      this.NameSearch = false;
      this.ValuesColor = "blue";
      this.NameColor = "white";
    } else if (ValueS == 'Name') {
      this.SpicificSearch = false;
      this.NameSearch = true;
      this.ValuesColor = "white";
      this.NameColor = "blue";
      this.WaterMark = false;
    }
  }

  // Spicific Search
  SearchFilterList() {
    console.log("Enter Filter Search");

    this.theType = "Service";
    this.theProvince = this.ProvinceSelectMenu;
    this.theCategory = this.ServiceListSelectMenu;

    console.log(this.theType);
    console.log(this.theProvince);
    console.log(this.theCategory);
    console.log(this.WeekdaySelectMenu);

    if (this.theProvince != null && this.theCategory == null) {
      this.http.get(this.connString + "getFilterP/" + this.theType + "/" + this.theProvince).subscribe(finalList => {
        this.filteredList = finalList;
        console.log("Province Only");
        console.log(this.filteredList);
        this.HideShowResult = true;
      });
    } else if (this.theProvince == null && this.theCategory != null) {
      this.http.get(this.connString + "getFilterC/" + this.theType + "/" + this.theCategory).subscribe(finalList => {
        this.filteredList = finalList;
        console.log("Category Only");
        console.log(this.filteredList);
        this.HideShowResult = true;
      });
    } else if (this.theProvince != null && this.theCategory != null) {
      this.http.get(this.connString + "getFilterA/" + this.theType + "/" + this.theProvince + "/" + this.theCategory).subscribe(finalList => {
        this.filteredList = finalList;
        console.log("All");
        console.log(this.filteredList);
        this.HideShowResult = true;
      });
    }
  }

  // Name Search
  SearchNameList() {
    console.log("Enter Name Search");

    this.http.get(this.connString + 'getName/' + this.SearchName).subscribe(finalList => {
      this.filteredList = finalList;
      console.log(this.filteredList);
      this.HideShowResult = true;
    });
  }

  // Send Email
  ShowEmaiBox() {
    document.getElementById('ViewEmail').style.display = 'block';
    //this.AllFooterOptions = false;
    //this.EmailFooter = true;
  }

  HideEmaiBox() {
    document.getElementById('ViewEmail').style.display = 'none';
    //this.AllFooterOptions = true;
    //this.EmailFooter = false;
  }

  SendEmail() {
    document.getElementById('ViewEmail').style.display = 'none';
    //this.AllFooterOptions = true;
    //this.EmailFooter = false;

    this.http.get(this.connString + "sendMailServicePage/" + this.UserNameSurname + "/" + this.UserEmailPhone + "/" + this.Subject + "/" + this.UserBody + "/" + this.ToPerson).subscribe(data => {
      alert("Your message was sent to " + this.ToPerson);
    });
  }

  //InfoLinks (Bottom of the page Routers)
  ServicesRouter() { this.router.navigate(['/services']); }
  HomeRouter() { this.router.navigate(['/home']); }
  AboutRouter() { this.router.navigate(['/about']); }
  ContactUsRouter() { this.router.navigate(['/contact-us']); }
  ProfileRouter() { this.router.navigate(['/login']); }
}
