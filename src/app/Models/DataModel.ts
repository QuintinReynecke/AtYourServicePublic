export interface insertMod {
    Id: number,
    UserName: string,
    Name: string,
    Type: string,
    Category: string,
    Description: string,
    Province: string,
    CallOutFee: string,
    Active: boolean,
    TotalPhotos: number,
    ContactDetailsTable: {
        Id?: number,
        Phone: string,
        Website: string,
        Email: string,
        Address: string,
        Location: string,
        mainTableFKId: number
    };

    BusinessHoursTable: {
        Id?: number,
        Monday: boolean,
        Tuesday: boolean,
        Wednesday: boolean,
        Thursday: boolean,
        Friday: boolean,
        Saturday: boolean,
        Sunday: boolean,
        mainTableFKId: number
    };

    PhotosTable: {
        Id?: number,
        Image1: string,
        Image2: string,
        Image3: string,
        Image4: string,
        Image5: string,
        mainTableFKId: number,
        ProfilePicture: string        
    };

    WorkLocationTable: {
        Id?: number,
        workInLocation: string,
        workInSuburb: string,
        mainTableFKId: number
    };

    UserTable: {
        Id?: number,
        UserName: string,
        Password: string,
        ConfirmPassword: string,
        mainTableFKId: number
    };

    ReviewTable: {
        Id?: number,
        CurrentReview: number,
        mainTableFKId: number
    };
}