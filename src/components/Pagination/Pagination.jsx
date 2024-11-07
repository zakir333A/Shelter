import React, { useCallback } from 'react';
import './Pagination.css'; 

const PageLink = React.memo(({ page, currentPage, onPageChange }) => {
  return (
    <a
      className={`pagination-link ${currentPage === page ? 'current' : ''}`} 
      href="#" 
      title={`Page ${page}`} 
      onClick={(e) => {
        e.preventDefault();
        onPageChange(page);
      }}
    >
      {page}
    </a>
  );
});

function Pagination({ currentPage, setCurrentPage, totalPages }) {
  const handlePageChange = useCallback((page) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      setCurrentPage(page);

      window.scrollTo({
        top: 0,
        behavior: 'smooth', 
      });
    }
  }, [currentPage, setCurrentPage, totalPages]);

  return (
    <div className="pagination-container">
      <nav className="pagination" aria-label="Pagination">
        <a 
          className={`pagination-link previous ${currentPage === 1 ? 'disabled' : ''}`} 
          href="#" 
          title="Previous Page"
          onClick={(e) => {
            e.preventDefault();
            if (currentPage > 1) {
              handlePageChange(currentPage - 1);
            }
          }}
        >
          <svg className="icon" viewBox="0 0 256 512" aria-hidden="true">
            <path d="M238.475 475.535l7.071-7.07c4.686-4.686 4.686-12.284 0-16.971L50.053 256 245.546 60.506c4.686-4.686 4.686-12.284 0-16.971l-7.071-7.07c-4.686-4.686-12.284-4.686-16.97 0L10.454 247.515c-4.686 4.686-4.686 12.284 0 16.971l211.051 211.05c4.686 4.686 12.284 4.686 16.97-.001z" />
          </svg>
        </a>

  
        {[...Array(totalPages)].map((_, index) => (
          <PageLink 
            key={index} 
            page={index + 1} 
            currentPage={currentPage} 
            onPageChange={handlePageChange} 
          />
        ))}

        <a 
          className={`pagination-link next ${currentPage === totalPages ? 'disabled' : ''}`} 
          href="#" 
          title="Next Page"
          onClick={(e) => {
            e.preventDefault();
            if (currentPage < totalPages) {
              handlePageChange(currentPage + 1);
            }
          }}
        >
          <svg className="icon" viewBox="0 0 256 512" aria-hidden="true">
            <path d="M17.525 36.465l-7.071 7.07c-4.686 4.686-4.686 12.284 0 16.971L205.947 256 10.454 451.494c-4.686 4.686-4.686 12.284 0 16.971l7.071 7.07c4.686 4.686 12.284 4.686 16.97 0l211.051-211.05c4.686-4.686 4.686-12.284 0-16.971L34.495 36.465c-4.686-4.687-12.284-4.687-16.97 0z" />
          </svg>
        </a>
      </nav>
    </div>
  );
}

export default Pagination;
