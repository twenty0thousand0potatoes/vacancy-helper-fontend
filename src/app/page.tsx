'use client';

import React, { useState, useEffect } from 'react';
import JobTable, { Job } from '../components/JobTable';
import ModalForm from '../components/ModalForm';
import { getJobs, createJob, updateJob, deleteJob } from '@/api/api';

const Home = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editJob, setEditJob] = useState<Job | null>(null);
  const [currentPage, setCurrentPage] = useState(1); 
  const [totalPages, setTotalPages] = useState(1);   

  const fetchJobs = async (page: number, pageSize: number) => {
    try {
      const data = await getJobs(page, pageSize);
      setJobs(data.jobs);
      setTotalPages(data.totalPages); 
      return data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Error fetching jobs:', error.message);
      } else {
        console.error('Unknown error fetching jobs:', error);
      }
      return { jobs: [], totalPages: 1 };
    }
  };

  useEffect(() => {
    fetchJobs(currentPage, 10); 
  }, [currentPage]);

  return (
    <div className="container py-5">
      <div className="card shadow-lg">
        <div className="card-body">
          <h1 className="card-title text-center mb-4">Трекер вакансий</h1>
          <button
            className="btn btn-success w-100 mb-4"
            onClick={() => setIsModalOpen(true)}
          >
            Добавить вакансию
          </button>
          <JobTable
            jobs={jobs}
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={(page) => setCurrentPage(page)} 
            onEdit={(job) => {
              setEditJob(job);
              setIsModalOpen(true);
            }}
            onDelete={async (id) => {
              await deleteJob(id);
              await fetchJobs(currentPage, 10); 
            }}
          />
        </div>
      </div>

      <ModalForm
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditJob(null);
        }}
        onSubmit={async (job) => {
          if (editJob) {
            await updateJob({ ...job, _id: editJob._id });
          } else {
            await createJob(job);
          }
          await fetchJobs(currentPage, 10); 
        }}
        initialData={editJob || undefined}
      />
    </div>
  );
};

export default Home;
