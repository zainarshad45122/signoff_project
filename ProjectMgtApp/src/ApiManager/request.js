import { getValue } from '../helper/storageWrapper';

export const loginAPI = 'project/login.php';
export const updateJobCustomFields = 'updateJobCustomFields.php?updatedBy=delivery';
export const saveJobTimeDetail =  'saveJobTimeDetail.php';
export const getSupervisorJobs = 'project/getSupervisorJobs.php'
export const getAllProjects = 'project/getAllProjects.php';
export const getProjectJobs = 'project/getProjectJobs.php';
export const getTrackerDetail = 'project/getTrackerDetail.php';

export const getBaseUrl = async () => {
    const server = await getValue('serverName');
    const baseUrl = `http://${server}/api/` 
    return baseUrl;
 }