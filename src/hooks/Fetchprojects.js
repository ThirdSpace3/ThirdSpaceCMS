import { db, collection, getDocs } from '../firebaseConfig';

const fetchProjects = async (walletId) => {
  try {
    const projectsCollection = collection(db, 'projects', walletId, 'projectData');
    const projectSnapshot = await getDocs(projectsCollection);
    const projectsList = projectSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return projectsList;
  } catch (error) {
    console.error('Error fetching projects:', error);
    throw error;
  }
};

export default fetchProjects;
