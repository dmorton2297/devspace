import { SET_PROJECTS, ADD_PROJECT } from '../actions/projectsActions';

const projectsReducer = (projects = [], action) => {
    switch (action.type) {
        case SET_PROJECTS:
            return ([
                ...action.payload
            ]);
        case ADD_PROJECT:
            return ([
                ...projects,
                action.payload
            ]);
        default: 
            return projects;
    };
};

export default projectsReducer;