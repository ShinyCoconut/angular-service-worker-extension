# angular-service-worker-extension
Angular Service Worker Extension for Web Push Notification Automatic Handling

- Register the custom SW in app.module.ts imports:
  - `ServiceWorkerModule.register('service-worker.js', { enabled: environment.production }),`
- Add it to assets array in angular.json:
  - `"src/service-worker.js"`
