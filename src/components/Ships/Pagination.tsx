import React from 'react';

import * as S from './styles';
import { StyledButton } from 'components/Global/styles';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (currentPage: number) => number;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, setCurrentPage }) => {
  return (
    <S.Pagination>
      <div>
        Page {currentPage} of {totalPages}
      </div>
      {currentPage > 1 && (
        <StyledButton
          onClick={() => {
            setCurrentPage(currentPage - 1);
          }}
        >
          Previous
        </StyledButton>
      )}
      {currentPage < totalPages && (
        <StyledButton
          onClick={() => {
            setCurrentPage(currentPage + 1);
          }}
        >
          Next
        </StyledButton>
      )}
    </S.Pagination>
  );
};

export default Pagination;
