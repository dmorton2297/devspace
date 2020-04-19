import { SET_PROJECTS } from '../actions/projectsActions';

const projectsReducer = (projects = [], action) => {
    switch (action.type) {
        case SET_PROJECTS:
            return ([
                ...action.payload
            ]);
        default: 
            return projects;
    };
};

export default projectsReducer;