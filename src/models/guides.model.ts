import { PersonModel, GuidePersonModel } from './person.model';

export enum STATUS_ENUM {
  CREATED = 0,
  IN_REGIONAL = 1,
  CLASSIFICATION = 2,
  IN_DISTRIBUTION = 3,
  GUIDE_DELIVERED = 4,
  CANCELED = 5,
  USER_NOY_FOUND = 6,
  DOCUMENTATION_ERROR = 7
}

export interface GuideViewModel {
  id_guide: string;
  status_guide: STATUS_ENUM;
  date_admission: Date;
  notes_guide: string;
  content_guide: string;
  units_in_guide: number;
  weight_in_guide: number;
  volume_in_guide: number;
  weight_payment_guide: number;
  declared_value_guide: number;
  service_value_guide: number;
  freight_guide: number;
  other_cost_guide: number;
  origin_regional: string;
  origin_city: string;
  destination_city: string;
  destination_regional: string;
  address_addressee_in_guide: string;
  document_sender: string;
  first_name_sender: string;
  last_name_sender: string;
  address_sender: string;
  phone_sender: string;
  postal_code_sender: string;
  document_addressee: string;
  first_name_addressee: string;
  last_name_addressee: string;
  address_addressee: string;
  phone_addressee: string;
  postal_code_addressee: string;
  assigned_route: string;
}

export interface GuideModel {
  id_guide?: string;
  content_guide?: string;
  date_admission?: Date;
  declared_value_guide?: number;
  freight_guide?: number;
  notes_guide?: string;
  other_cost_guide?: number;
  service_value_guide?: number;
  status_guide?: number;
  units_in_guide?: number;
  volume_in_guide?: number;
  weight_in_guide?: number;
  weight_payment_guide?: number;
}

export interface GuideObject {
  id?: string;
  addressee?: PersonModel;
  guide?: GuideModel;
  guide_person?: GuidePersonModel;
  sender?: PersonModel;
}
