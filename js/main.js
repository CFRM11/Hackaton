// component-loader.js

async function loadComponent(element) {
    const componentName = element.dataset.component;
    if (!componentName) return;

    try {
        const response = await fetch(`./components/${componentName}.html`);
        if (!response.ok) throw new Error(`No se encontró el componente: ${componentName}`);

        const html = await response.text();
        element.innerHTML = html;

        // Ejecutar scripts dentro del componente cargado
        element.querySelectorAll("script").forEach(oldScript => {
            const newScript = document.createElement("script");
            [...oldScript.attributes].forEach(attr => newScript.setAttribute(attr.name, attr.value));
            newScript.textContent = oldScript.textContent;
            oldScript.replaceWith(newScript);
        });

    } catch (error) {
        console.error(`Error cargando "${componentName}":`, error);
        element.innerHTML = `<p style="color:red;">Error al cargar componente: ${componentName}</p>`;
    }
}

async function loadAllComponents() {
    const elements = document.querySelectorAll("[data-component]");
    await Promise.all([...elements].map(loadComponent));
}

// Cargar al iniciar el DOM
document.addEventListener("DOMContentLoaded", loadAllComponents); t 