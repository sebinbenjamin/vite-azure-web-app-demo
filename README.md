## Securing API Keys in Frontend Applications

When working with frontend applications, it's important to understand that any environment variables exposed to the frontend, such as API keys, can potentially be viewed by anyone who has access to the application's code in the browser. While using a `.env` file and **GitHub Secrets** helps manage these keys during development and deployment, it's essential to consider additional security measures:

**1. Use API Keys with Limited Permissions:**

If possible, restrict the API keys to specific actions and limit their scope. For example, only allow access to specific endpoints or resources that are necessary for your frontend application.

**2. Consider Proxying API Requests:**

Instead of calling external APIs directly from the frontend, consider using a server-side proxy. This way, the API key remains hidden on the server, and the frontend only communicates with your server, not the third-party API directly.

**3. Monitor and Rotate API Keys:**

Regularly monitor the usage of your API keys for any unusual activity. Rotate API keys periodically to reduce the risk of them being compromised.

## Setting Up Environment Variables

In this project, you'll need to configure environment variables to store sensitive information, such as API keys. This is achieved using a `.env` file in your project root directory.

### Step 1: Create a `.env` File

In the root directory of your project, create a file named `.env`. Make sure you add it to `.gitignore`. This file will store your environment variables. For example:

```bash
VITE_WEATHER_API_KEY=your-weather-api-key
```

Replace `your-weather-api-key` with the actual API key obtained from the weather service you are using.

### Step 2: Access Environment Variables in Your Code

In your React components, you can access these environment variables using `import.meta.env`. Here's an example of how to use the `VITE_WEATHER_API_KEY` in your app:

```javascript
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
```

### Step 3: Configure GitHub Actions for CI/CD with Azure Static Web Apps

If you're deploying this application using Azure Static Web Apps and GitHub Actions, you'll need to ensure that the environment variables are correctly passed during the build process.

1. **Store API Key in GitHub Secrets**:  
   In your GitHub repository, go to `Settings > Security > Secrets and variables > Actions` and add a new repository secret named `VITE_WEATHER_API_KEY`. This secret should hold the value of your weather API key.

2. **Update GitHub Actions Workflow**:  
   Modify your GitHub Actions workflow file (`.github/workflows/your-workflow-file.yml`) to include the environment variable. Here's an example:

```yaml
   name: Azure Static Web Apps CI/CD

   jobs:
     build_and_deploy_job:
      name: Build and Deploy Job
       steps:
         - uses: actions/checkout@v3
           with:
             submodules: true
             lfs: false
          . . .
          . . .
         - name: Build And Deploy
           id: builddeploy
           uses: Azure/static-web-apps-deploy@v1
           env:
             VITE_WEATHER_API_KEY: ${{ secrets.VITE_WEATHER_API_KEY }}
           with:
             azure_static_web_apps_api_token: ${{ secrets.AZURE_STATIC_WEB_APPS_API_TOKEN_WITTY_PEBBLE_04EA3D600 }}
             output_location: "dist" # Built app content directory
          . . .
          . . .
```
## Build settings
### Setting `output_location` for Vite vs. Create React App

The `output_location` parameter in the GitHub Actions workflow specifies where the built files are located after the build process completes. This is important for deployment, as Azure Static Web Apps needs to know where to find the files to serve.

- **For Vite Projects**:  
  Vite outputs the built files to the `dist` directory by default. Therefore, set `output_location` to `"dist"` in your GitHub Actions workflow.

  ```yaml
  output_location: 'dist' # For Vite projects
  ```

- **For Create React App (CRA) Projects**:  
  Create React App outputs the built files to the `build` directory. Therefore, set `output_location` to `"build"` in your GitHub Actions workflow.

  ```yaml
  output_location: 'build' # For Create React App projects
  ```

By following these steps, you ensure that your environment variables are securely handled and correctly passed during the build and deployment process, and that your app is deployed correctly depending on the build tool you're using.

## Additional Resources

- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)
- [Azure Static Web Apps Documentation](https://learn.microsoft.com/en-us/azure/static-web-apps/build-configuration?tabs=github-actions#environment-variables)
- [GitHub Actions and Secrets](https://docs.github.com/en/actions/security-for-github-actions/security-guides/using-secrets-in-github-actions#creating-secrets-for-a-repository)
- [Managing API keys in frontend](https://www.quicknode.com/guides/quicknode-products/endpoint-security/front-end-best-practices)
