# routematch

[![Go Reference](https://pkg.go.dev/badge/github.com/matthewmueller/routematch.svg)](https://pkg.go.dev/github.com/matthewmueller/routematch)

A simple route to path matcher. It uses the same parser as [livebud/mux](https://github.com/livebud/mux).

## Features

- Trie-based router for better performance
- Supports required, optional, regexp and wildcard slots
- Smart slot delimiters (e.g. can match `/{from}-{to}`)
- Well-tested with 100s of tests

## Install

```sh
go get github.com/matthewmueller/routematch
```

## Example

```go
package main

import (
	"net/http"

	"github.com/matthewmueller/routematch"
)

func main() {
  matcher := routematch.New()
  matcher := routematch.New()
  matcher.Insert("/", "index.html")
  matcher.Insert("/users/{id}", "users/show.html")
  matcher.Insert("/posts/{post_id}/comments/{id}", "posts/comments/show.html")
  matcher.Insert("/fly/{from}-{to}", "fly/routes.html")
  matcher.Insert("/v{major|[0-9]+}.{minor|[0-9]+}", "version.html")
  matcher.Insert("/{owner}/{repo}/{branch}/{path*}", "repo.html")
  match, err := matcher.Match("/matthewmueller/routematch/main/routematch.go")
  match.
}
```

## Contributors

- Matt Mueller ([@mattmueller](https://twitter.com/mattmueller))

## License

MIT
