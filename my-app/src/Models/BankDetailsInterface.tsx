export interface BankDetails {
	ifsc: string;
	bank_id: string;
	branch: string;
	address: string;
	city: string;
	district: string;
	state: string;
	bank_name: string;
}

export interface Fields {
	city: string;
	data: any;
}
export interface Cache {
	currentCity: string;
	fields: Fields[];
}