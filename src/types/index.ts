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

//afegir la forma de pagament, la periodicitat i l'últim pagament fet
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
  FeeID: string;
  LastPayment: Date;
  NextPayment: Date;
  Active: boolean;
  ActiveSince: Date;
}

export interface Fee {
  ID: string;
  CreatedOn: Date;
  Name: string;
  PaymentIntervalMonths: number;
  BaseAmount: number;
  Vat: number;
  VatPercentage: number;
  IncomeTax: number;
  IncomeTaxPercentage: number;
  TotalAmount: number;
  Active: boolean;
}

export interface Payment {
  ID: string;
  CreatedOn: Date;
  PaymentTypeId: string;
  TraineeID: string;
  BaseAmount: number;
  Vat: number;
  VatPercentage: number;
  IncomeTax: number;
  IncomeTaxPercentage: number;
  TotalAmount: number;
}

export interface MenuItems {
  label: string;
  icon: string;
  to?: string;
  items?: MenuItems[];
  command?: () => void;
}

export interface Menus {
  [key: string]: MenuItems[];
}
