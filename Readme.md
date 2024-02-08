# routematch

[![Go Reference](https://pkg.go.dev/badge/github.com/matthewmueller/routematch.svg)](https://pkg.go.dev/github.com/matthewmueller/routematch)

A simple route to path matcher. The parser was extracted from [livebud/mux](https://github.com/livebud/mux).

## Features

- Uses a [radix trie](https://en.wikipedia.org/wiki/Radix_tree) for better performance
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
  matcher.Insert("/", "index.html")
  matcher.Insert("/users/{id}", "users/show.html")
  matcher.Insert("/posts/{post_id}/comments/{id}", "posts/comments/show.html")
  matcher.Insert("/fly/{from}-{to}", "fly/routes.html")
  matcher.Insert("/v{major|[0-9]+}.{minor|[0-9]+}", "version.html")
  matcher.Insert("/{owner}/{repo}/{branch}/{path*}", "repo.html")
  match, _ := matcher.Match("/matthewmueller/routematch/main/routematch.go")
  fmt.Println(match.Path) // repo.html
  fmt.Println(match.Route.String()) // /{owner}/{repo}/{branch}/{path*}
  fmt.Println(match.Slots[0].Key, match.Slots[0].Value) // owner matthewmueller
  fmt.Println(match.Slots[1].Key, match.Slots[1].Value) // repo routematch
  // ...
}
```

## Contributors

- Matt Mueller ([@mattmueller](https://twitter.com/mattmueller))

## License

MIT
