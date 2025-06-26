export interface Profile {
	id?: number;
	sub?: string;
	given_name?: string;
	addl_name?: string;
	family_name?: string;
	gender?: string;
	address?: string;
	birthdate?: string;
	birth_place?: string;
	email?: string;
	phone_numbers?: Array<{
	  phone_no: string;
	  date_collected?: string;
	}>;
	picture?: string;
	notification_preference?: string;
	ids?: Array<{
	  id_type: string;
	  value: string;
	  expiry_date: string | null;
	}>;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	bank_ids?: Array<any>;
  }
