import { db, doc, getDoc, collection, getDocs, setDoc } from '../firebaseConfig';

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

const fetchComponentData = async (walletId, projectId, component) => {
  try {
    const docRef = doc(db, `projects/${walletId}/projectData/${projectId}/Content/Text/content/${component}`);
    const docSnap = await getDoc(docRef);
    console.log('Fetched data:', docSnap.data());
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching component data:", error);
    throw error;
  }
};

const saveComponentData = async (walletId, projectId, componentName, data) => {
  try {
    const docRef = doc(db, `projects/${walletId}/projectData/${projectId}/components`, componentName);
    await setDoc(docRef, data, { merge: true });
    console.log(`Saved ${componentName} data for project ${projectId}`);
  } catch (error) {
    console.error(`Error saving ${componentName} data:`, error);
  }
};


export { fetchComponentData, fetchProjects, saveComponentData };
