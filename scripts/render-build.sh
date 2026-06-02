#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "${ROOT_DIR}"

HUGO_VERSION="${HUGO_VERSION:-0.162.1}"

install_hugo() {
  local target="${HOME}/.local/hugo/hugo"
  if [[ -x "${target}" ]] && "${target}" version | grep -q "v${HUGO_VERSION}"; then
    echo "Hugo ${HUGO_VERSION} already installed: $("${target}" version)"
    export PATH="${HOME}/.local/hugo:${PATH}"
    return
  fi

  echo "Installing Hugo Extended ${HUGO_VERSION}..."
  local archive="hugo_extended_${HUGO_VERSION}_linux-amd64.tar.gz"
  curl -sLJO "https://github.com/gohugoio/hugo/releases/download/v${HUGO_VERSION}/${archive}"
  mkdir -p "${HOME}/.local/hugo"
  tar -C "${HOME}/.local/hugo" -xf "${archive}"
  rm "${archive}"
  export PATH="${HOME}/.local/hugo:${PATH}"
  echo "Installed: $(hugo version)"
}

echo "==> Initializing git submodules"
git submodule update --init --recursive

install_hugo

echo "==> Installing Node dependencies"
npm ci --no-fund

BASE_URL="${RENDER_EXTERNAL_URL:-/}"
if [[ "${BASE_URL}" != */ ]]; then
  BASE_URL="${BASE_URL}/"
fi

echo "==> Building Hugo site (baseURL=${BASE_URL})"
hugo --gc --minify --baseURL "${BASE_URL}"

echo "==> Generating résumé PDF"
npm run generate-resume-pdf

echo "==> Build complete"
