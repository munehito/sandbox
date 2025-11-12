import pandas as pd
from pathlib import Path

def convert_jpx_xlsx_to_csv(xlsx_path: str, csv_path: str | None = None) -> str:
  xlsx_path = Path(xlsx_path)
  if csv_path is None:
      csv_path = xlsx_path.with_suffix(".csv")
  else:
      csv_path = Path(csv_path)

  # Excelを読み込み（今回のファイル構造だと header=None で一旦全部読むのが無難）
  df_raw = pd.read_excel(xlsx_path, header=None)

  # 5行目（0始まりで index=4）がヘッダ行になっているので、そこをカラム名にする
  header_row = df_raw.iloc[4]

  # データ部分（6行目以降 = index>=5）
  df = df_raw.iloc[5:].copy()
  df.columns = header_row

  # コード列の特定（"コード" を含む列名を探す）
  code_cols = [c for c in df.columns if isinstance(c, str) and "コード" in c]
  if not code_cols:
      raise ValueError("コード列が見つかりませんでした")
  code_col = code_cols[0]

  # 数字だけに限定せず、「コードが入っている行」を全部採用
  df = df[df[code_col].notna()]

  # 完全空行除去
  df = df.dropna(how="all")

  # CSVとして保存（UTF-8 BOM付きにしたいなら encoding="utf-8-sig"）
  df.to_csv(csv_path, index=False, encoding="utf-8-sig")

  return str(csv_path)

if __name__ == "__main__":
  out = convert_jpx_xlsx_to_csv("kessan.xlsx")
  print("saved:", out)
