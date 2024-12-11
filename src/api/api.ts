import { Job } from '../components/JobTable';

const API_URL = 'https://vacancy-helper-backend.onrender.com/api/jobs';

export const getJobs = async (page: number, pageSize: number): Promise<{ jobs: Job[], totalPages: number }> => {
  const response = await fetch(`${API_URL}?page=${page}&pageSize=${pageSize}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json', 
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch jobs');
  }

  return await response.json(); 
};

export const createJob = async (job: Omit<Job, '_id'>): Promise<Job> => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json', 
    },
    body: JSON.stringify(job), 
  });

  if (!response.ok) {
    throw new Error('Failed to create job');
  }

  return await response.json();
};

export const updateJob = async (job: Job): Promise<Job> => {
  const response = await fetch(`${API_URL}/${job._id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json', 
    },
    body: JSON.stringify(job), 
  });

  if (!response.ok) {
    throw new Error('Failed to update job');
  }

  return await response.json();
};

export const deleteJob = async (_id: string): Promise<void> => {
  const response = await fetch(`${API_URL}/${_id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json', 
    },
  });

  if (!response.ok) {
    throw new Error('Failed to delete job');
  }
};
