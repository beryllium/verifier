VERIFIER.DEREF.LINK
===================

Provides a static HTML page that reads query strings and turns them into copy-pastable fields.

WHY?
====

I was writing a command-line utility that needed to interface with two separate OAuth1.0a-based APIs,
and I found the process to be not quite user-friendly. There was a particularly big gap in the step
of generating a Request token. The user would have to open a link in their browser, confirm the
permissions request, and then the browser would need to be sent to a callback URL to capture the
oauth_verifier value.

But CLI tools do not have a callback URL.

VERIFIER intends to be a generic callback URL destination.

HOW?
====

This sculpin-based project can be built using Composer. Make sure you also have `yarn` installed.

```php
composer install
yarn install
composer build
```

This will create the necessary HTML and JS assets to render the page, writing them into the
`output_prod` directory. That directory can then be synchronized to a web server for hosting.