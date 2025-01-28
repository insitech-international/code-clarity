export default class DataFetcher {
  constructor(config) {
    this.API_BASE_URL = config.API_BASE_URL || "http://127.0.0.1:8000";
    this.STATIC_BASE_URL = config.STATIC_BASE_URL || "https://insitech-international.github.io/code-clarity/static/data";
    this.DEVELOPMENT_MODE = config.DEVELOPMENT_MODE || false;

    console.log("DataFetcher initialized:", {
      API_BASE_URL: this.API_BASE_URL,
      STATIC_BASE_URL: this.STATIC_BASE_URL,
      DEVELOPMENT_MODE: this.DEVELOPMENT_MODE,
      environment: this.DEVELOPMENT_MODE ? "development" : "production",
    });
  }

  async fetchData(apiPath, staticPath = null, type = null, params = null) {
    // Determine the appropriate static folder based on the type
    const staticFolder = type === "questions" ? "questions" : type === "solutions" ? "solutions" : "";

    // Validate the path and type
    if (staticPath && !staticFolder) {
      throw new Error("Invalid static type provided. Must be 'questions' or 'solutions'.");
    }

    if (this.DEVELOPMENT_MODE) {
      // Development mode: API fetch only
      if (!apiPath) throw new Error("API path is required in development mode");

      try {
        const response = await fetch(`${this.API_BASE_URL}${apiPath}`, { ...(params && { params }) });
        if (!response.ok) throw new Error("API request failed");
        return await response.json();
      } catch (error) {
        console.error("API request failed:", error);
        throw error;
      }
    }

    // Production mode: API or Static fallback
    try {
      if (apiPath) {
        const response = await fetch(`${this.API_BASE_URL}${apiPath}`, { ...(params && { params }) });
        if (response.ok) return await response.json();
      }
    } catch (apiError) {
      console.warn("API fetch failed, falling back to static files:", apiError);
    }

    // Fallback to static
    if (staticPath) {
      const staticURL = `${this.STATIC_BASE_URL}/${staticFolder}/${staticPath}`;
      try {
        const response = await fetch(staticURL);
        if (!response.ok) throw new Error(`Static file fetch failed: ${response.status}`);
        return response.headers.get("content-type")?.includes("application/json")
          ? await response.json()
          : await response.text();
      } catch (staticError) {
        console.error("Static file error:", staticError);
        throw new Error(`Unable to load static data from ${staticURL}`);
      }
    }

    throw new Error("No valid path provided");
  }
}
