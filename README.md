# My Portfolio

## Guide to Deploy to GitHub Pages

1. Install the `gh-pages` package:
  - using npm
    ```sh
    npm install gh-pages --save-dev
    ```
  - using yarn 
    ```sh
    yarn add --dev gh-pages
    ```

2. Update your `package.json`:

    ```json
    {
      "homepage": "http://your-username.github.io/my-portfolio",
      "scripts": {
        "predeploy": "npm run build",
        "deploy": "gh-pages -d build"
      }
    }
    ```

3. Deploy your site:
  - npm
    ```sh
    npm run deploy
    ```
  - yarn
    ```sh
    yarn deploy
    ```

4. Your portfolio should now be accessible at `http://your-username.github.io/my-portfolio`.

Replace `your-username` with your actual GitHub username.

## Email js documentation
- [docs](https://www.emailjs.com/docs/examples/reactjs/)
- [Admin Dashboard](https://dashboard.emailjs.com/admin)
