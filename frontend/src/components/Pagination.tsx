interface Props {
  page: number;
  totalPageNum: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export const Pagination: React.FC<Props> = ({
  page,
  setPage,
  totalPageNum,
}: Props) => {
  const getPage = (i: number) => {
    setPage(i);
  };

  const handleBack = () => {
    if (page === 1) {
      return;
    }
    setPage((currentPage) => currentPage - 1);
  };

  const handleForward = () => {
    if (page === totalPageNum) {
      return;
    }
    setPage((currentPage) => currentPage + 1);
  };

  return (
    <div>
      <a href="#" onClick={handleBack}>
        &laquo;
      </a>
      {[Array(totalPageNum)].map((item, i) => (
        <span>
          <a key={i} onClick={() => getPage(i + 1)}>
            {i + 1}
          </a>
          <span>-</span>
        </span>
      ))}
      <a href="#" onClick={handleForward}>
        &raquo;
      </a>
    </div>
  );
};
