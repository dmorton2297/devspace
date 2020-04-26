/**
 * Validates a project
 * @param {object} state - State object we are validating
 * @returns {object} - Object containing info on the validity of the addProject form 
 */
export const validateProject = (state) => {
    const validURL = (str) => {
        const pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
            '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
        return !!pattern.test(str);
    }

    const validation = {
        name: true, description: true,
        github: true, website: true,
        projectLink: true, tags: true,
        demoVideo: true
    };
    if (state.name === '' || state.name.length > 40) validation.name = false;
    if (state.description === '') validation.description = false;
    if (state.github !== '' && !validURL(state.github)) validation.github = false;
    if (state.website !== '' && !validURL(state.website)) validation.website = false;
    if (state.demoVideo !== '' && !validURL(state.demoVideo)) validation.demoVideo = false;
    if (state.projectLink !== '' && !validURL(state.website)) validation.projectLink = false;
    if (state.tags !== '') {
        const val = state.tags.split(',');
        val.forEach(x => {
            if (!x || x.length === 0) {
                validation.tags = false;
                return;
            }
        });
    };


    const results = Object.keys(validation).filter(x => !validation[x]);
    return { isValid: results.length === 0, results }
};

/**
 * 
 * @param {string} label - Label associated to an <input> 
 * @param {*} invalid - List of invalid entires from validation call
 */
export const isInvalid = (label, invalid) => {
    if (invalid.find(x => x === label)) {
        return true;
    }
    return false;
}