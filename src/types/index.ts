export interface AppUser {
  ID: string;
  CreatedOn: Date;
  Username: string;
  Password: string;
  ProfileID: string;
  Active: boolean;
}

export interface Profile {
  ID: string;
  CreatedOn: Date;
  Name: string;
  Description: string;
  Active: boolean;
}

export interface Login {
  Username: string;
  Password: string;
}

export interface Trainee {
  ID: string;
  CreatedOn: Date;
  Name: string;
  Surname: string;
  VatNumber: string;
  Birthdate: Date;
  EMail: string;
  Phone: string;
  Address: string;
  AddressExtra: string;
  City: string;
  PostCode: string;
  Country: string;
  PhotoPath: string;
  UserID: string;
  Active: boolean;
  ActiveSince: Date;
}

export interface MenuItems {
  label: string;
  icon: string;
  to: string;
}

export interface Menus {
  [key: string]: MenuItems[];
}
