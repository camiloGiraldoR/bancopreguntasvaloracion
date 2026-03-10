/**
 * Service to fetch and parse skill descriptions from local Markdown files.
 */

const groupToFileMap = {
    'Java': 'java',
    'Object Oriented Programming': 'oop',
    'Core Design Principles': 'core_design',
    'Architecture Principles': 'architecture',
    'Cloud for developers': 'cloud',
    'Java SQL': 'sql',
    'Data Structures': 'data_structures',
    'Java Persistence': 'persistence',
    'Java Frameworks': 'frameworks',
    'JVM': 'jvm',
    'Functional Programming': 'functional',
    'REST': 'rest',
    'Testing for developers': 'testing',
    'No SQL': 'nosql'
    ,
    'Microservices Patterns': 'microservices_patterns'
};

/**
 * Fetches the description for a specific skill within a group.
 * @param {string} groupName - The name of the skill group (e.g., 'Java').
 * @param {string} skillName - The specific skill name (e.g., 'Types and Wrappers').
 * @param {string} lang - Language code ('en' or 'es').
 * @returns {Promise<string>} The markdown content of the skill's description.
 */
export const getLocalSkillDescription = async (groupName, skillName, lang = 'es') => {
    const fileName = groupToFileMap[groupName];
    if (!fileName) {
        console.warn(`No mapping found for group: "${groupName}"`);
        return `Error: No se encontró mapeo para el grupo "${groupName}".`;
    }

    try {
        const path = `${import.meta.env.BASE_URL}docs/skills/${fileName}_${lang}.md`.replace(/\/+/g, '/');
        const response = await fetch(path);
        if (!response.ok) throw new Error(`File not found: ${path}`);

        const text = await response.text();

        // Match the section starting with ## [Something] Skill Name [Something] until the next ## or end of file
        // We use a regex that handles special characters in skillName
        // This allows matching "## 1. Tipos y Wrappers (Types and Wrappers)" with "Types and Wrappers"
        const escapedSkillName = skillName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(`## [^\\n]*${escapedSkillName}[^\\n]*\\n([\\s\\S]*?)(?=\\n##|$)`, 'i');

        const match = text.match(regex);

        if (match) {
            // match[1] contains the captured content (without the header)
            return match[1].trim();
        }

        return `No se encontró la descripción específica para **${skillName}** en el archivo \`${fileName}_${lang}.md\`.`;
    } catch (error) {
        console.error("Error fetching skill description:", error);
        return "Error al cargar la descripción. Por favor verifica que el archivo exista en `public/docs/skills/`.";
    }
};
