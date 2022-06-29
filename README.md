# MongoDB Atlas Static Site Search

This project is a website search engine and index that uses MongoDB Atlas
to perform search on static websites. It's goal is to be similar to
[Algolia Docsearch](https://docsearch.algolia.com/).

## Overview

The project consists of a couple of different pieces to perform site search with
Atlas Search. These components are:

1. Site scraper. Use Atlas Triggers/other serverless functions to scrape a website to create
   indexable data in database.
1. Search index. Use Atlas Search.
1. HTTP API to query search index and get search results.
   Use Atlas HTTPS Endpoints.
1. Frontend search component. Probably a pre-built react component,
   [like Material Search Autocomplete](https://mui.com/material-ui/react-autocomplete/).

## Development Guide

Currently this project just exists within one Atlas project. There is only 1 version
of the project as of now. So any changes you deploy will go right to 'prod' of this
prototype.

The configuration of the App Services App exists in the `app-services` directory
of this repository. All changes should be made there, and then deployed using the
`realm-cli`.

To edit the Atlas Search index, you must do so within the Atlas project.
If you would like to work on the Search index, request access from Ben Perlmutter (@mongodben).

## Post-Prototype Roadmap

This'll be built out once the prototype phase advances.

- [ ] Working prototype of Atlas Static Site Search. Works on one website, baked into the config.
- [ ] Make project fully configurable using infrastructure as code and have clear deployment process.
- [ ] User facing documentation on how to use and set up (ideally on a documentation site using
      Atlas Static Site Search 🙂)
- [ ] Create development/testing environments, and CI/CD to move between environments.
