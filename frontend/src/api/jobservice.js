import API from './axios';

// Get All Jobs (With optional title/location/category search filters)
export className JobService {
  static async getAllJobs(params = {}) {
    const response = await API.get('/job/get', { params });
    return response.data;
  }

  static async getJobById(jobId) {
    const response = await API.get(`/job/get/${jobId}`);
    return response.data;
  }

  static async applyJob(jobId) {
    const response = await API.post(`/application/apply/${jobId}`);
    return response.data;
  }
}