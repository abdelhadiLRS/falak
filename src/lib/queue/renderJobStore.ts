const jobsStore = new Map<string, any>();

export async function getRecentRenderJobs(limit = 10) {
  return Array.from(jobsStore.values()).slice(-limit);
}

export async function getRenderJob(id: string) {
  return jobsStore.get(id) || null;
}

export async function updateRenderJob(id: string, data: any) {
  const existing = jobsStore.get(id) || { id };
  const updated = { ...existing, ...data };
  jobsStore.set(id, updated);
  return updated;
}

export async function requestRenderJobCancellation(id: string) {
  const job = jobsStore.get(id);
  if (job) {
    job.status = 'cancelled';
    jobsStore.set(id, job);
  }
  return job;
}
