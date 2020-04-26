/**
 * Validates a string against a URL
 * @param {string} input - The string we are testing
 * @returns {boolean} - true/false for validity of string as url 
 */
const validURL = (input) => {
    const pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return !!pattern.test(input);
}

/**
 * Checks validity of string as URL
 * @param {string} input - Input string we are testing
 * @returns {boolean} - true/false based on validity of string and url 
 */
const validEmail = (input) => {
    const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return !!pattern.test(String(input).toLowerCase());
}

/**
 * 
 * @param {string} input - The string we are testing
 * @returns {boolean} - true/false for validity of tag as string
 */
const validTags = (input) => {
    console.log('IN here');
    const val = input.split(',');
    val.forEach(x => {
        console.log(`X:   ${x}`);
        if (!x || x.length === 0) {
            console.log('Not valid');
            return false;
        }
    });

    console.log('returning true');
    return true;
}

/**
 * Validates a project
 * @param {object} state - State object we are validating
 * @returns {object} - Object containing info on the validity of the project.
 */
export const validateProject = (state) => {
    const validation = {
        name: true, description: true,
        github: true, website: true,
        projectLink: true, tags: true,
        demoVideo: true
    };
    if (state.name === '' || state.name.length >= 40) validation.name = false;
    if (state.description === '') validation.description = false;
    if (state.github !== '' && !validURL(state.github)) validation.github = false;
    if (state.website !== '' && !validURL(state.website)) validation.website = false;
    if (state.demoVideo !== '' && !validURL(state.demoVideo)) validation.demoVideo = false;
    if (state.projectLink !== '' && !validURL(state.website)) validation.projectLink = false;
    if (state.tags !== '' && !validTags(state.tags)) validation.tags = false;

    const results = Object.keys(validation).filter(x => !validation[x]);
    return { isValid: results.length === 0, results }
};

/**
 * Validates a blog post
 * @param {object} state - blog post we are validating
 * @returns {object} - Object containing info on the validity of the blog post.
 */
export const validateBlogPost = (state) => {
    const validation = {
        title: true, description: true,
        image: true, tags: true, text: true
    };
    if (state.title === '' || state.title.length >= 60) validation.title = false;
    if (state.description === '') validation.description = false;
    if (state.image === '') validation.image = false;
    if (state.tags !== '' && !validTags(state.tags)) validation.tags = false;
    if (state.text === '') validation.text = false;

    const results = Object.keys(validation).filter(x => !validation[x]);
    return { isValid: results.length === 0, results }
}

/**
 * Validates a profile
 * @param {object} state - Profile state we are validating 
 * @returns {object} - Object containing info on the validity of the profile.
 */
export const validateProfile = (state) => {
    const validation = {
        title: true, company: true, email: true,
        summary: true, github: true, linkedin: true
    };
    if (state.title === '' || state.title.length >= 80) validation.title = false;
    if (state.email === '' ||!validEmail(state.email)) validation.email = false;
    if (state.summary === '' || state.summary.length >= 250) validation.summary = false;
    if (state.github !== '' && !validURL(state.github)) validation.github = false;
    if (state.linkedin !== '' && !validURL(state.linkedin)) validation.linkedin = false;

    const results = Object.keys(validation).filter(x => !validation[x]);
    return { isValid: results.length === 0, results }
}

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