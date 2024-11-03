# Self deployment

## Requirement

- [Docker Engine](https://docs.docker.com/engine).

- Issued SSL certificate.

## Run workflow

- Crate new `ssl-cert/` folder to store SSL certificate under _root_ folder.

- Inside `ssl-cert/` should include two files: _certificate_
  file and _private key_ file.

- Change path to SSL files in `.github/ssl-cert.yaml`.

- Under **root folder**, run command:

```bash
docker compose -f .github/docker-compose.yaml up -d
```

- To stop, under **root folder**, run command:

```bash
docker compose -f .github/docker-compose.yaml down
```
