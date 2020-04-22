import { SET_PROJECTS, ADD_PROJECT, DELETE_PROJECT, UPDATE_PROJECT } from '../actions/projectsActions';

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
        case DELETE_PROJECT:
            return projects.filter(x => x.id !== action.payload.id)
        case UPDATE_PROJECT:
            const index = projects.findIndex(x => x.id === action.payload.id);
            console.log(index);
            const _projects = projects;
            _projects[index] = action.payload;
            return ([
                ..._projects
            ]);
        default: 
            return projects;
    };
};

export default projectsReducer;