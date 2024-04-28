export enum UserType {
    Freelancer = "Freelancer",
    Recruiter = "Recruiter",
}
export interface RegistrationData {
  userType: UserType;
  username: string;
  email: string;
  password: string;
  jobTitle?: string;
  academicLevel?: string; // Corrected spelling here
  location?: string;
}

export enum AcademicLevel {
  HighSchool = "high-school",
  BaccalaureateDegree = "Baccalaureate Degree",
  LicenseDegree = "Licence Degree",
  MasterDegree = "Master Degree",
  EngineeringDegree = "Engineering Degree ",
}

export interface JobDetails {
  title: string;
  description: string;
  requirements: string;
  location: string;
  salary: string;
  // Add additional fields as needed
}