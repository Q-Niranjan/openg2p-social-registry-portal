import { RegIdType } from "./individual";

export interface GroupMemberType {
  name?: string;
  email?: string;
  phone?: string;
  birthdate?: string; // ISO date string (e.g., "2025-06-17")
  birth_place?: string;
  gender?: string;
  membership_kinds?: string[];
}

export interface GroupDetailsType {
  name?: string;
  email?: string;
  phone?: string;
  registration_date?: string; // ISO date string
  address?: string;
  group_kind?: string; // default = "Family", handle this in code
  reg_ids?: RegIdType[];
}



