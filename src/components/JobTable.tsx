import React from 'react';

export interface Job {
  _id: string;
  company: string;
  position: string;
  salaryRange: string;
  status: string;
  note: string;
}

type JobTableProps = {
  jobs: Job[]; 
  totalPages: number; 
  currentPage: number; 
  onPageChange: (page: number) => void; 
  onEdit: (job: Job) => void;
  onDelete: (_id: string) => void;
};


const JobTable: React.FC<JobTableProps> = ({ 
  jobs, 
  totalPages, 
  currentPage, 
  onPageChange, 
  onEdit, 
  onDelete 
}) => {
  if (jobs.length === 0) {
    return (
      <div className="alert alert-info text-center" role="alert">
        Пока нет данных для отображения.
      </div>
    );
  }

  return (
    <div>
      <div className="table-responsive">
        <table className="table table-striped table-bordered w-100">
          <thead className="thead-light">
            <tr>
              <th>Компания</th>
              <th>Позиция</th>
              <th>Зарплатный диапазон</th>
              <th>Статус</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job) => (
              <tr key={job._id}>
                <td>{job.company}</td>
                <td>{job.position}</td>
                <td>{job.salaryRange}</td>
                <td>{job.status}</td>
                <td>
                  <button
                    className="btn btn-primary btn-sm me-2"
                    onClick={() => onEdit(job)}
                  >
                    Редактировать
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => onDelete(job._id)}
                  >
                    Удалить
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        <button
          className="btn btn-secondary btn-sm me-2"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Назад
        </button>
        <span>{`Страница ${currentPage} из ${totalPages}`}</span>
        <button
          className="btn btn-secondary btn-sm ms-2"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Вперед
        </button>
      </div>
    </div>
  );
};
export default JobTable;
