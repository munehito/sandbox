#!/usr/bin/env zsh
set -euo pipefail

if [[ $# -lt 1 ]]; then
  echo "Usage: $0 <extension-folder> [output-zip-path]"
  exit 1
fi

folder="$1"
if [[ ! -d "$folder" ]]; then
  echo "Error: '$folder' is not a directory."
  exit 2
fi

# 絶対パスに変換
folder="$(cd "$folder" && pwd)"
base="$(basename "$folder")"
timestamp="$(date +%Y%m%d_%H%M%S)"

if [[ ${2:-} == "" ]]; then
  out="$(dirname "$folder")/${base}.${timestamp}.zip"
else
  out="$2"
fi

# 出力先がフォルダ内だと zip が空になる可能性があるのでチェック
if [[ "${out%/*}" = "$folder" ]]; then
  echo "Warning: output zip is inside the source folder. Use a path outside the folder."
  exit 3
fi

# 作業ディレクトリを拡張フォルダに移して中身を圧縮（parentディレクトリを含めない）
cd "$folder"

# 実行（.DS_Store と __MACOSX を除外、-X で余計な属性を入れない）
zip -r -X "$out" . -x "*/.DS_Store" "__MACOSX/*"

echo "Created: $out"
