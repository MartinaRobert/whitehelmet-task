# WhitehelmetTask

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.19.
node version 20.19.2
npm version 11.4.1

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Architecture

- `app/core`: interceptors and loader.
- `app/shared`: Reusable components ,main layout and shared module.
- `app/auth`: login component , service and guard.
- `app/attractions , app/pet-sales , app/users`: Contains the main components and there services.
- Uses Angular Material for UI components.
- Uses `BehaviorSubject` in AuthService for reactive login state.
