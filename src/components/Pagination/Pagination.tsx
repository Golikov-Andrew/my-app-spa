import { useAppDispatch } from "../../app/hooks";
import type { setCurrentCatalogPage } from "../../app/slices/catalogSlice";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  switchCatalogPage: typeof setCurrentCatalogPage;
};

function Pagination({
  currentPage,
  totalPages,
  switchCatalogPage,
}: PaginationProps) {
  let pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  const dispatch = useAppDispatch();

  return (
    <nav aria-label="Pagination">
      <ul className="pagination justify-content-center gap-2">
        {pages.map((page) => (
          <li key={page}>
            <button
              className={
                currentPage === page ? "btn btn-danger" : "page-link btn link-danger"
              }
              onClick={()=>{dispatch(switchCatalogPage(page)) }}
            >
              {page}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Pagination;
