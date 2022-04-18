export interface PersonModel {
  document_person: string;
  address_person: string;
  first_name_person: string;
  last_name_person: string;
  phone_person: string;
  postal_code_person: number;
}

export interface GuidePersonModel {
  id_guide?: string;
  address_addressee?: string;
  assigned_route?: string;
  destination_city?: string;
  destination_regional?: string;
  document_addressee?: string;
  document_sender?: string;
  origin_city?: string;
  origin_regional?: string;
}
