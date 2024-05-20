# Frontend Technical Test - Superheroes Management SPA

## Project Overview

This project involves creating a Single Page Application (SPA) using the latest Long-Term Support (LTS) version of Angular. The application is designed to manage superheroes, with a focus on project structure, format, optimization, and code typing. The project should be built with scalability in mind, allowing for future growth.

## Features and Requirements

### General Requirements
- Use the latest LTS version of Angular.
- The project should be prepared for potential future growth.

### Views and Navigation
1. **Filter and List View**
   - **Hero Name Filter**: An input field to filter heroes by name, with efficient event handling to minimize filter triggers.
   - **Edit Button**: Navigates to the edit page with the selected hero's data.
   - **New Hero Button**: Navigates to the hero creation page.
   - **Hero Names**: Display filtered hero names with the first letter capitalized.
   - **Delete Button**: Confirms deletion of a hero and removes it upon confirmation.

2. **Create / Edit View**
   - **Form**: Contains fields necessary for hero creation/editing.
   - **Navigation**: Redirects to the hero list after creating/editing a hero.
   - **Hero Name**: Display in uppercase in the form.

### Additional Elements
- **Service**: Data can be mocked or connected to an API. If data is within the service, API calls should be simulated using observables.
- **Loader**: Display a loader when fetching data to inform the user of the loading process.
- **Notifications**: Inform users about actions such as creation, modification, deletion, or errors.

### Bonus Points
- **Visual Library**: Use a visual library like Angular Material.
- **Tests**: Include unit and integration tests.
- **Reactive Programming**: Implement reactive programming practices.
- **Component Modularization**: Modularize components effectively.

## Project Structure

```plaintext
heroes-search/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │     └──views/
│   │   │         └──heroes/
│   │   │             ├── hero-list/
│   │   │             ├── hero-card/
│   │   │             └── hero-create-edit/
│   │   ├── services/
│   │   ├── types/
│   │   ├── app.module.ts
│   │   └── app-routing.module.ts
│   ├── assets/
│   ├── environments/
│   └── index.html
├── angular.json
├── firebase.json
├── package.json
└── README.md
```

## Setup and Installation

1. **Clone the repository**
   ```sh
   git clone https://github.com/EduardoPereyra/heroes-search
   cd heroes-search
   ```

2. **Install dependencies**
   ```sh
   npm install
   ```

3. **Run the application**
   ```sh
   ng serve
   ```
   The application will be accessible at `http://localhost:4200/`.

## Usage

- **Filter Heroes**: Use the input field on the list view to filter heroes by name.
- **Create a New Hero**: Click the "New Hero" button to navigate to the creation form.
- **Edit a Hero**: Click the "Edit" button next to a hero to navigate to the edit form.
- **Delete a Hero**: Click the "Delete" button and confirm to remove a hero.
- **Notifications**: View notifications for actions like create, edit, delete, and errors.

## Testing

Run unit tests:
```sh
ng test
```

## License

This project is licensed under the MIT License.
```
