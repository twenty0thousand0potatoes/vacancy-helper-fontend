import React, { useState, useEffect } from 'react';
import { Job } from './JobTable';

type ModalFormProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<Job, '_id'>) => void;
  initialData?: Omit<Job, '_id'>;
};

const ModalForm: React.FC<ModalFormProps> = ({ isOpen, onClose, onSubmit, initialData }) => {
  const initialFormState: Omit<Job, '_id'> = {
    company: '',
    position: '',
    status: '',
    salaryRange: '',
    note: '',
    ...initialData,
  };

  const [formState, setFormState] = useState<Omit<Job, '_id'>>(initialFormState);

  useEffect(() => {
    if (initialData) {
      setFormState({ ...initialFormState, ...initialData });
    }
  }, [initialData]);

  const handleInputChange = (field: keyof Omit<Job, '_id'>) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleClose = () => {
    setFormState(initialFormState);
    onClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formState);
    handleClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              {initialData ? 'Редактировать вакансию' : 'Добавить вакансию'}
            </h5>
            <button type="button" className="btn-close" onClick={handleClose}></button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="company" className="form-label">Компания</label>
                <input
                  type="text"
                  id="company"
                  value={formState.company}
                  onChange={handleInputChange('company')}
                  className="form-control"
                  placeholder="Введите название компании"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="position" className="form-label">Позиция</label>
                <input
                  type="text"
                  id="position"
                  value={formState.position}
                  onChange={handleInputChange('position')}
                  className="form-control"
                  placeholder="Введите должность"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="status" className="form-label">Статус</label>
                <input
                  type="text"
                  id="status"
                  value={formState.status}
                  onChange={handleInputChange('status')}
                  className="form-control"
                  placeholder="Введите статус"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="salaryRange" className="form-label">Зарплатный диапазон</label>
                <input
                  type="text"
                  id="salaryRange"
                  value={formState.salaryRange}
                  onChange={handleInputChange('salaryRange')}
                  className="form-control"
                  placeholder="Введите зарплату"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="note" className="form-label">Примечания</label>
                <textarea
                  id="note"
                  value={formState.note}
                  onChange={handleInputChange('note')}
                  className="form-control"
                  placeholder="Дополнительная информация"
                />
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={handleClose}>
                Отмена
              </button>
              <button type="submit" className="btn btn-primary">
                Сохранить
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ModalForm;
