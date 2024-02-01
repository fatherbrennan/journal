# Changelog

All notable changes to "Journal" will be documented in this file.

## [2.0.0] - 2024-02-01

### Added

- SQLite database in favour of existing removed JSON database.
- Pagination in searchable pages to increase performance.
- Two item filters to Log (Journal) page which allows for filtering between a specific date range (before and after).
- Item filter on Contacts page which gives the ability to hide inactive contacts (default behanviour).

### Changed

- Better search and syntax highlighting on hits.
- Behaviour of To Do items has changed to:
  - Checked subitem becomes greyed out and moves to bottom of related subitems.
  - Checked item becomes greyed out, along with all related subitems, and moves to bottom of items.
  - Checked items cannot be edited whilst in checked state.
  - Checked items can be unchecked.
  - Checked items can be deleted.

### Removed

- Support for existing JSON database. Can manually migrate existing JSON database using `scripts/generateMigrationSqlFromJson.ts` script.
- Unused `uuid` package.

### Fixed

- Fix spelling of 'Todo' to 'To Do' globally.

## [1.0.0] - 2023-05-07

### Added

- Add sorting functionality on Dashboard, Contacts and Library pages.

## [0.1.0] - 2023-05-06

- ✌ Initial beta release!
