# enroute

[![Go Reference](https://pkg.go.dev/badge/github.com/matthewmueller/enroute.svg)](https://pkg.go.dev/github.com/matthewmueller/enroute)

A simple route-to-path matcher. The parser was extracted from [livebud/mux](https://github.com/livebud/mux).

## Features

- Uses a [radix trie](https://en.wikipedia.org/wiki/Radix_tree) for better performance
- Supports required, optional, regexp and wildcard slots
- Smart slot delimiters (e.g. can match `/{from}-{to}`)
- Well-tested with 100s of tests

## Install

```sh
go get github.com/matthewmueller/enroute
```

## Example

```go
package main

import (
	"net/http"

	"github.com/matthewmueller/enroute"
)

func main() {
  r := enroute.New()
  r.Insert("/", "index.html")
  r.Insert("/users/{id}", "users/show.html")
  r.Insert("/posts/{post_id}/comments/{id}", "posts/comments/show.html")
  r.Insert("/fly/{from}-{to}", "fly/routes.html")
  r.Insert("/v{major|[0-9]+}.{minor|[0-9]+}", "version.html")
  r.Insert("/{owner}/{repo}/{branch}/{path*}", "repo.html")
  match, _ := r.Match("/matthewmueller/enroute/main/enroute.go")
  fmt.Println(match.Path) // repo.html
  fmt.Println(match.Route.String()) // /{owner}/{repo}/{branch}/{path*}
  fmt.Println(match.Slots[0].Key, match.Slots[0].Value) // owner matthewmueller
  fmt.Println(match.Slots[1].Key, match.Slots[1].Value) // repo enroute
  // ...
}
```

## Contributors

- Matt Mueller ([@mattmueller](https://twitter.com/mattmueller))

## License

MIT
