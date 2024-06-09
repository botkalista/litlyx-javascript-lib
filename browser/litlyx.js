
const scriptElem = document.querySelector('script[data-project]');


if (scriptElem) {
    const project_id = scriptElem.getAttribute('data-project');

    if (project_id) {
        const newLib = document.createElement('script');
        newLib.src = "https://cdn.jsdelivr.net/gh/litlyx/litlyx-js/browser/litlyx.js";
        newLib.setAttribute('data-project', 'project_id');
        document.body.appendChild(newLib)
        newLib.onload = () => {
            Lit.init(project_id);
        }
    }

} else {
    const newLib = document.createElement('script');
    newLib.src = "https://cdn.jsdelivr.net/gh/litlyx/litlyx-js/browser/litlyx.js";
    document.body.appendChild(newLib)
    newLib.onload = () => { }
}
