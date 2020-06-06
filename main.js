#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { camelCase } = require('camel-case');
const ucfirst = require('ucfirst');
const [providedComponentName] = process.argv.slice(2);

if (!providedComponentName || !providedComponentName.trim()) {
  console.log(
    '\n\nComponent name not provided.\nPlease check `npx quick-react-scss --help`.\n\n',
  );
  process.exit(1);
}

if (providedComponentName.trim() === '--help') {
  console.log(`
  "quick-react-scss" guide

  quick-react-scss [component-name]
    - Create styles/[component-name].module.scss
      This contains above code
            .[component-name] {

            }

    - Create components/[component-name].tsx
      This contains above code
            import style from "../style/[component-name].module.scss";

            const [component-name]: React.FC = () => {
                return <div className={style.[component-name]}></div>
            }
  `);

  process.exit(1);
}

const className = camelCase(providedComponentName);
const componentName = ucfirst(className);

function preparePath(basePath) {
  const cwd = process.cwd();
  const resultPath = path.join(cwd, basePath);
  fs.mkdirSync(path.dirname(resultPath), { recursive: true });
  return resultPath;
}

fs.writeFileSync(
  preparePath(`components/${componentName}.tsx`),
  `import style from "../style/${componentName}.module.scss";

const ${componentName}: React.FC = () => {
    return <div className={style.${className}}></div>
}`,
);

fs.writeFileSync(
  preparePath(`styles/${componentName}.module.scss`),
  `.${className} {

}`,
);
