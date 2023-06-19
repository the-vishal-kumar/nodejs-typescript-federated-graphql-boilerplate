import { Document, Model } from 'mongoose';

export interface ISocketDocument extends ISocket, Document {}

export interface ISocketModel extends Model<ISocketDocument> {
  build(attr: Partial<ISocket>): ISocketDocument;
}

export interface Point {
  type: string;
  coordinates: [number, number];
}

export interface ISocket {
  serial: number;
  uuid: string;
  operatorInfo: OperatorInfo | null;
  statusType: StatusType;
  addressInfo: AddressInfo;
  location: Point;
  dataProvider: DataProvider;
  connections: Connection[];
  dateCreated: Date;
  dateLastVerified: Date;
  dateLastStatusUpdate: Date;
}

export interface OperatorInfo {
  websiteURL: null | string;
  comments: null | string;
  phonePrimaryContact: null | string;
  phoneSecondaryContact: null | string;
  isPrivateIndividual: boolean | null;
  addressInfo: null;
  bookingURL: null;
  contactEmail: null | string;
  faultReportEmail: null | string;
  isRestrictedEdit: boolean | null;
  id: number;
  title: string;
}

export interface AddressInfo {
  id: number;
  title: string;
  addressLine1: string;
  addressLine2: null | string;
  town: null | string;
  stateOrProvince: null | string;
  postcode: null | string;
  countryID: number;
  country: Country;
  latitude: number;
  longitude: number;
  contactTelephone1: null | string;
  contactTelephone2: null | string;
  contactEmail: null | string;
  accessComments: null | string;
  relatedURL: null | string;
  distance: null;
  distanceUnit: number;
}

export interface Country {
  isoCode: ISOCode;
  continentCode: ContinentCode;
  id: number;
  title: CountryTitle;
}

export enum ISOCode {
  DE = 'DE',
  IN = 'IN',
}

export enum ContinentCode {
  AS = 'AS',
  EU = 'EU',
}

export enum CountryTitle {
  GERMANY = 'Germany',
  INDIA = 'India',
}

export interface DataProvider {
  websiteURL: string;
  comments: null;
  dataProviderStatusType: DataProviderStatusType;
  isRestrictedEdit: boolean;
  isOpenDataLicensed: boolean;
  isApprovedImport: boolean;
  license: string;
  dateLastImported: Date | null;
  id: number;
  title: DataProviderTitle;
}

export interface DataProviderStatusType {
  isProviderEnabled: boolean;
  id: number;
  title: DataProviderStatusTypeTitle;
}

export enum DataProviderStatusTypeTitle {
  AutomatedImport = 'Automated Import',
  ManualDataEntry = 'Manual Data Entry',
}

export enum DataProviderTitle {
  BundesnetzagenturDe = 'Bundesnetzagentur.de',
  OpenChargeMapContributors = 'Open Charge Map Contributors',
}

export interface Connection {
  id: number;
  connectionTypeID: number;
  connectionType: ConnectionType;
  reference: null | string;
  statusTypeID: number | null;
  statusType: StatusType | null;
  levelID: number | null;
  level: Level | null;
  amps: number | null;
  voltage: number | null;
  powerKW: number | null;
  currentTypeID: number | null;
  currentType: CurrentType | null;
  quantity: number | null;
  comments: null | string;
}

export interface ConnectionType {
  formalName: FormalName | null;
  isDiscontinued: boolean | null;
  isObsolete: boolean | null;
  id: number;
  title: string;
}

export enum FormalName {
  BS1363TypeG = 'BS1363 / Type G',
  Cee74 = 'CEE 7/4',
  IEC603093Pin = 'IEC 60309 3-pin',
  IEC621962 = 'IEC 62196-2',
  IEC621962Type2 = 'IEC 62196-2 Type 2',
  IEC621963ConfigurationAA = 'IEC 62196-3 Configuration AA',
  IEC621963ConfigurationFF = 'IEC 62196-3 Configuration FF',
  IECTypeMSANS1641IS12932005 = 'IEC Type M (SANS 164-1, IS 1293:2005)',
  NotSpecified = 'Not Specified',
  SaeJ17722009 = 'SAE J1772-2009',
}

export interface Level {
  comments: Comments;
  isFastChargeCapable: boolean;
  id: number;
  title: LevelTitle;
}

export enum Comments {
  Over2KWUsuallyNonDomesticSocketType = 'Over 2 kW, usually non-domestic socket type',
  The40KWAndHigher = '40KW and Higher',
  Under2KWUsuallyDomesticSocketTypes = 'Under 2 kW, usually domestic socket types',
}

export enum LevelTitle {
  Level1LowUnder2KW = 'Level 1 : Low (Under 2kW)',
  Level2MediumOver2KW = 'Level 2 : Medium (Over 2kW)',
  Level3HighOver40KW = 'Level 3:  High (Over 40kW)',
}

export interface CurrentType {
  description: Description;
  id: number;
  title: CurrentTypeTitle;
}

export enum Description {
  AlternatingCurrentSinglePhase = 'Alternating Current - Single Phase',
  AlternatingCurrentThreePhase = 'Alternating Current - Three Phase',
  DirectCurrent = 'Direct Current',
}

export enum CurrentTypeTitle {
  ACSinglePhase = 'AC (Single-Phase)',
  ACThreePhase = 'AC (Three-Phase)',
  Dc = 'DC',
}

export interface StatusType {
  isOperational: boolean | null;
  isUserSelectable: boolean;
  id: number;
  title: StatusTypeTitle;
}

export enum StatusTypeTitle {
  Operational = 'Operational',
  PlannedForFutureDate = 'Planned For Future Date',
  Unknown = 'Unknown',
}
