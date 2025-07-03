# タグを使って分類した動画を、HTMLに一覧表示します。

unless ARGV[0]
  p '引数はありません'
  exit
end

dir_name = ARGV[0]
unless Dir.exist?(dir_name)
  p dir_name + 'はありません'
  exit
end

files = []
%x(cd #{dir_name}; tag).split("\n").each{|line|
  file = {
    mtime: nil,
    name: nil,
    tags: nil,
  }
  (file[:name], file[:tags]) = line.split()
  file[:mtime] = File.mtime(dir_name + file[:name])
  if file[:tags]
    file[:tags] = file[:tags].split(',')
  else
    file[:tags] = []
  end
  files << file
}

# <script language="JavaScript"><!--
# function setUrl(url)
# {
# document.check.location.href = url;
# }
# // --></script>
# <iframe name="check" frameborder=1></iframe>

print <<'HTML'
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8" />
  <title>タイトル</title>
</head>
<body>
<center>
<table border="1">
HTML

files.sort_by{|file| file[:mtime]}.reverse.each{|file|
  html_tags = ''
  ext_tags = []
  file[:tags].each{|tag|
    case tag
    when 'レッド'
      color = 'red'
    when 'レッド'
      color = 'crimson'
    when 'オレンジ'
      color = 'orange'
    when 'イエロー'
      color = 'yellow'
    when 'グリーン'
      color = 'green'
    when 'グリーン'
      color = 'darkgreen'
    when 'ブルー'
      color = 'blue'
    when 'パープル'
      color = 'purple'
    when 'グレイ'
      color = 'gray'
    else
      ext_tags << tag
    end

    if color
      html_tags << %(\n      <div style="background-color: #{color}">#{tag}</div>)
      # html_tags << %(\n      <div style="color: #{color}">#{tag}</div>)
    else
      html_tags << %(\n      <div>#{tag}</div>)
    end
  }

  # <td><form><input type="button" value="check" onClick="setUrl('https://onejav.com/torrent/#{file[:name].downcase}');"></form></td>

  down = file[:name].downcase
  case down
  when /^fc2-ppv-.*/
    url = down
  else
    url = down.gsub('-', '')
  end
print <<"HTML"
  <tr>
    <td><a target="_blank" href="https://onejav.com/torrent/#{url}">#{file[:name]}</a></td>
    <td>#{html_tags}
    </td>
    <td>#{file[:mtime]}</td>
  </tr>
HTML
}

print <<'HTML'
</table>
</center>
</body>
</html>
HTML
