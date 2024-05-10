# Unify CMS

Unify CMS is a lightweight, headless CMS. It focuses primarily on simplicity and ease-of-use: from concise terminology to efficient API design.

## Project structure

The application is split into two parts: the server/API, and the UI/web interface.

The server/API is responsible for providing programmatic interfaces to access and modify the content on the site. It also serves a static build
of the web interface.

The web interface is a visual representation of the content stored on the server. It interacts with the server using internal APIs.

## Installation

1. Ensure you've got and are using atleast Node 20.11. If you haven't:
    1. Install [NVM](https://github.com/coreybutler/nvm-windows)
    2. Open a new terminal/powershell
    3. Run `nvm install 20.11`
    4. Run `nvm use 20.11`
2. Install yarn: `npm i -g yarn`
3. Navigate to the root of the project
4. Install all dependencies: `yarn install`

## How to use

If you want to use Unify with your application, you'll need to create a build of it. To do this:

1. Ensure you've installed the project, as per **[Installation](#installation)**
2. Navigate to the root of the project
3. Run `yarn build`

This will produce a build of the CMS at `[project-root]/build`. You can then copy/move this build to an existing project to integrate it.

Once this is done, you'll need to install the dependencies for it:

4. Navigate to the newly-created build
5. Install the dependencies: `yarn install`
6. Launch the CMS with `yarn start`

## Terminologies

There are two pairs of crucial terminologies to understand: what's meant by "**schema**" and "**content**", as well as "**single**" and "**collection**".

### Schema

_Schemas_ define the structure of content, and what content can be created.

They specify what fields should be present, along with their names, types and several other properties. They can be created and modified using the schemas editor. They're stored directly in JSON files (to allow schemas to be added to repositories).

### Content

_Content_ refers to data that follows a schema.

It can be created and modified using the content editor. It's stored in the database and served over the public API.

### Single

_Singles_ refer to schemas that only have one unique set of content associated with it: it can only be consumed once.

This is intended to be used for unique content items, such as a page on the site.

### Collection

_Collections_ refer to schemas that can have multiple sets of content associated with it: it can be consumed many times (by collection items).

This is intended for multiple content items which all share the same properties, such as a collection of users.

## Missing/TODO features

-   User accounts and security
-   A media manager with the ability to upload and reference media
-   Ability to create objects in schemas
-   Ability to create 'components': creating child objects within schemas
-   Proper JSON schema formatting: https://json-schema.org
-   Ability to reference other singles or collections within singles/collection items
-   Several configuration options, including CORS management, ability to change port in frontend
-   Logging when accessing api routes, editing schemas, etc.
