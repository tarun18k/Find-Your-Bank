import { FC, useEffect, useState } from "react";
import { Pagination } from "react-bootstrap";
interface PaginationProps {
	pageCount: number;
	activePage: number;
	changePageNumber: (activePage: number) => void;
}
const PaginationComponent: FC<PaginationProps> = (props) => {

	const [pageNumbers, setPageNumbers] = useState<number[]>([]);

	useEffect(() => {
		setPages();
	}, [props.pageCount]);

	const setPages = () => {
		if (props.pageCount > 0) {
			const pages: number[] = [];
			if (props.pageCount <= 5) {
				for (let number = 1; number <= props.pageCount; number++) {
					pages.push(number);
				}
			} else {
				for (let number = 1; number <= 5; number++) {
					pages.push(number);
				}
			}
			setPageNumbers(pages);
		}
	};

	const onPageChange = (page: number) => {
		props.changePageNumber(page);
	};

	const onNextPage = () => {
		if (props.activePage + 1 <= props.pageCount) {
			if (props.activePage + 1 > pageNumbers[pageNumbers.length - 1]) {
				let pages = pageNumbers;
				pages = pages.map((page: number) => page + 1);
				console.log(pages);
				setPageNumbers(pages);
			}
			props.changePageNumber(props.activePage + 1);
		}
	};

	const onPreviousPage = () => {
		if (props.activePage - 1 >= 0) {
			if (props.activePage - 1 < pageNumbers[0]) {
				let pages = pageNumbers;
				pages = pages.map((page: number) => page - 1);
				console.log(pages);
				setPageNumbers(pages);
			}
			props.changePageNumber(props.activePage - 1);
		}
	};

	const onFirstPage = () => {
		setPages();
		props.changePageNumber(1);
	};

	const onLastPage = () => {
		let count = props.pageCount;
		if (count > 5) {
			const pages: number[] = [];
			for (let i = 4; i >= 0; i--) {
				pages[i] = count;
				count = count - 1;
			}
			setPageNumbers(pages);
		}
		props.changePageNumber(props.pageCount);
	};

	return (
		<Pagination>
			{ props.pageCount > 5 && (
				<Pagination.First onClick={ onFirstPage } />
			) }
			{ props.pageCount > 5 && (
				<Pagination.Prev onClick={ onPreviousPage } />
			) }
			{ pageNumbers.map((item: number) => (
				<Pagination.Item
					key={ item }
					active={ item === props.activePage }
					onClick={ (e) => {
						onPageChange(item);
					} }>
					{ item }
				</Pagination.Item>
			)) }
			{ props.pageCount > 5 && <Pagination.Next onClick={ onNextPage } /> }
			{ props.pageCount > 5 && <Pagination.Last onClick={ onLastPage } /> }
		</Pagination>
	);
};

export default PaginationComponent;
