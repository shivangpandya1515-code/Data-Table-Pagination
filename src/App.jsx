import { useEffect, useState } from "react";

function App() {
  const API = "http://localhost:3000/students";

  const [allData, setAllData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage, setDataPerPage] = useState(5);

  useEffect(() => {
    fetch(API)
      .then((response) => response.json())
      .then((data) => {
        setAllData(data);
      });
  }, []);

  const lastIndex = currentPage * dataPerPage;
  const firstIndex = lastIndex - dataPerPage;

  const currentData = allData.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(allData.length / dataPerPage);

  const changePage = (page) => {
    setCurrentPage(page);
  };

  const changeRows = (e) => {
    setDataPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  return (
    <>
      <div className="container mt-5">
        <h2 className="text-center">Student Data Management</h2>

        <p className="text-center text-muted">
          Data Table Pagination
        </p>

        <table className="table table-bordered table-hover text-center mt-4">

          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>DSA</th>
              <th>Maths</th>
              <th>DBMS</th>
              <th>Networking</th>
            </tr>
          </thead>

          <tbody>
            {currentData.map((student) => (
              <tr key={student.id}>
                <td>{student.id}</td>
                <td>{student.name}</td>
                <td>{student.dsa}</td>
                <td>{student.maths}</td>
                <td>{student.dbms}</td>
                <td>{student.networking}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="d-flex justify-content-between align-items-center">
          <div>
            <span className="me-2">Rows per page:</span>

            <select className="form-select d-inline-block" style={{ width: "80px" }} value={dataPerPage}
              onChange={changeRows}>
              <option value="5">5</option>
              <option value="25">25</option>
              <option value="50">50</option>
            </select>
          </div>

          <div className="d-flex align-items-center gap-2">

            <span>
              {firstIndex + 1} - {Math.min(lastIndex, allData.length)}
              {" "}of {allData.length}
            </span>

            <button className="btn btn-secondary" 
              disabled={currentPage === 1}
              onClick={() => changePage(currentPage - 1)}>
              &lt;
            </button>

            <button className="btn btn-primary"
              disabled={currentPage === totalPages}
              onClick={() => changePage(currentPage + 1)}>
              &gt;
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;