export enum STATUS_ENUM {
  CREATED = 0,
  IN_REGIONAL = 1,
  CLASIFICATION = 2,
  ON_REPART = 3,
  CANCELED = 4,
  REJECTED_BY_DOCUMENTATION_ERROR = 5,
  REJECTED_BY_CUSTOMER_DOES_NOT_FOUND = 6
}

export interface GuideModel {
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
