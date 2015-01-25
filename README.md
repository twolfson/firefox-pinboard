# firefox-pinboard

Pinboard extension for Firefox

`firefox-pinboard` was built to provide an "Already bookmarked" image on already bookmarked pages. It is forked from the official Firefox Pinboard extension from:

https://pinboard.in/extensions/firefox/pinboardff.xpi

> Proof of fork exists in version `0.1.0` where we download, rename to `.zip`, and extract

// TODO: Figure out versioning for .rdf file

// TODO: When changing tabs, update image again

// TODO: Implement security procedure to pages to verify we don't send any sensitive GET data (not sure how we achieve this but it's critical)

// TODO: Document workflow (`npm run dev`)

// TODO: Get proper 'visited' image

// TODO: Try to move extension as a bootstrapped one

## Getting Started
Install the module with: `npm install firefox-pinboard`

```javascript
var firefox_pinboard = require('firefox-pinboard');
firefox_pinboard.awesome(); // "awesome"
```

## Documentation
_(Coming soon)_

## Examples
_(Coming soon)_

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint via `npm run lint`.

### Development
For fast iteration, we prefer to get an automatic reupload when a change occurs. For this, we currently leverage `listen-spawn` with a Sublime Text `sublime-request` hook into the [Extension Auto-Installer add-on][]. To start the watch task, run

```bash
npm run dev
```

// TODO: Build watch -> build -> request toolchain

[Extension Auto-Installer add-on]: https://addons.mozilla.org/en-US/firefox/addon/autoinstaller/

## Donating
Support this project and [others by twolfson][gratipay] via [gratipay][].

[![Support via Gratipay][gratipay-badge]][gratipay]

[gratipay-badge]: https://cdn.rawgit.com/gratipay/gratipay-badge/2.x.x/dist/gratipay.png
[gratipay]: https://www.gratipay.com/twolfson/

## License
As of Jan 28 2014, Todd Wolfson has released this repository and all contents after the `0.1.0` release to the public domain.

It has been released under the [UNLICENSE][].

[UNLICENSE]: UNLICENSE

Original rights for `0.1.0` belong to http://pinboard.in/.

https://twitter.com/Pinboard/status/358763963485405184
