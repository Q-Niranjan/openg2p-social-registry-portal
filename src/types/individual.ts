export interface RegIdType {
  id_type?: string;
  value?: string;
  expiry_date?: string; 
}


export interface IndividaulType {
  addl_name?: string;
  given_name?: string;
  family_name?: string;
  email?: string;
  phone?: string;
  gender?: string;
  birthdate?: string; 
  birth_place?: string;
  reg_ids?: RegIdType[];
}
