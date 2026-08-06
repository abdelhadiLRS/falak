class SimpleRenderQueue {
  private jobs: Map<string, any> = new Map();

  async add(name: string, data: any, options?: any) {
    const jobId = 'job_' + Date.now();
    const job = {
      id: jobId,
      name,
      data,
      opts: options,
      status: 'completed',
      timestamp: Date.now(),
    };
    this.jobs.set(jobId, job);
    return job;
  }

  async getJob(id: string) {
    return this.jobs.get(id) || null;
  }
}

<<<<<<< HEAD
export const renderQueue = new SimpleRenderQueue();
=======
export const renderQueue = new SimpleRenderQueue();
>>>>>>> f692b1b (edited)
