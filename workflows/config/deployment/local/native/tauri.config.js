// This is a simplified Tauri config.
// The `build.devPath` and `build.distDir` are the key parts
// that connect Tauri to your SvelteKit build output.

export default {
    build: {
        // URL of the dev server
        devPath: 'http://localhost:5173',
        // Path to the static build output
        distDir: '../../../../src/dist', // Adjust path relative to the tauri src dir
        beforeBuildCommand: 'pnpm build',
    },
    window: {
        title: 'Langy - Tech Knowledge Platform',
        width: 1200,
        height: 800,
    },
    app: {
        identifier: 'com.langy.desktop',
        // ... other app settings
    },
};