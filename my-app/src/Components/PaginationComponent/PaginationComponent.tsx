import { FC, useEffect, useState } from "react";
import { Pagination } from "react-bootstrap";
import { PaginationProps } from "../../Models/Props";

const PaginationComponent: FC<PaginationProps> = (props) => {

	const [pageNumbers, setPageNumbers] = useState<number[]>([]);

	useEffect(() => {
		setPages();
	}, [props.pageCount]);

	/**
	 * Sets the array of pages for paginator
	 */
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
		} else {
			setPageNumbers([]);
		}
	};

	/**
	 * Emits the event to parent to set the active page
	 * @param page Selected page
	 */
	const onPageChange = (page: number) => {
		props.changePageNumber(page);
	};

	/**
	 * Sets the page to next page and emits event to parent
	 */
	const onNextPage = () => {
		if (props.activePage + 1 <= props.pageCount) {
			if (props.activePage + 1 > pageNumbers[pageNumbers.length - 1]) {
				let pages = pageNumbers;
				pages = pages.map((page: number) => page + 1);
				setPageNumbers(pages);
			}
			props.changePageNumber(props.activePage + 1);
		}
	};

	/**
	 * Sets the page to previous page and emits event to parent
	 */
	const onPreviousPage = () => {
		if (props.activePage - 1 >= 0) {
			if (props.activePage - 1 < pageNumbers[0]) {
				let pages = pageNumbers;
				pages = pages.map((page: number) => page - 1);
				setPageNumbers(pages);
			}
			props.changePageNumber(props.activePage - 1);
		}
	};

	/**
	 * Sets the page to first page and emits event to parent
	 */
	const onFirstPage = () => {
		setPages();
		props.changePageNumber(1);
	};

	/**
	 * Sets the page to last page and emits event to parent
	 */
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
