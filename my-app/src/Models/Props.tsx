import { BankDetails } from "./BankDetailsInterface";

export interface BanksListProps {
	banks: BankDetails[];
}
export interface BankDetailsProps {
	bank: BankDetails;
}
export interface PaginationProps {
	pageCount: number;
	activePage: number;
	changePageNumber: (activePage: number) => void;
}