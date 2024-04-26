1. From inside the `mern-blog` folder in VSCode
   1. `npm create vite@latest`
2. Choose the options as applicable:
   1. Project Name: `client`
   2. Framework: React
   3. Variant: JavaScript + SWC
3. Above step will create the vite react project but we need to install the dependencies
4. `cd client`
5. `npm install`
6. Google "tailwind css vite react" and do below steps:
   1. Intall React (already done)
   2. Install Tailwind CSS, Postcss and autoprefixer and then generate `tailwind.config.js` and `postcss.config.js` files:
      1. `npm install -D tailwindcss postcss autoprefixer`
      2. `npx tailwindcss init -p` - this will generate the `tailwind.config.js` and `postcss.config.js`
            ```
            Created Tailwind CSS config file: tailwind.config.js
            Created PostCSS config file: postcss.config.js
            ```
   3. Configure the template file paths (files like js, ts, jsx, tsx etc. that can have tailwind classes defined in them) in `tailwind.config.js`
        ```
        /** @type {import('tailwindcss').Config} */
        export default {
        content: [
            "./index.html",
            "./src/**/*.{js,ts,jsx,tsx}",
        ],
        theme: {
            extend: {},
        },
        plugins: [],
        }
        ```
   4. Add `@tailwind` directives to our CSS - replace everything in the `client/src/index.css` with the below 3 lines:
        @tailwind base;
        @tailwind components;
        @tailwind utilities;
   5. Before we start the build process we can delete some unnecessary files :
      1. App.css
      2. public/vite.svg
      3. src/assets/react.svg
      4. Remove links of above deleted files in `client/index.html` and also change the <`title>` to "MERN Blog"
      5. Remove everything from `App.jsx` and replace with `rfce`
   6. Start build process - `npm run dev`
      1. Click on `http://localhost:5173`
   7. We can now start using Tailwind in our project
   8. Install `Tailwind CSS Intellisense` for ease of use.
