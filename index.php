<html lang="ja">
	<head>
		<title>栄養素計算</title>
	  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
		<link rel="stylesheet" type="text/css" href="/dist/css/index.css">
	</head>
  <body>
	<section class="container">
		<h1>栄養素計算</h1>
		<section class="js-sections">
		<?php
			// 基本設定
			include './script/inc/_incFirstSettings.php';
		?>
		</section>
		<section class="js-sections">
		<?php
			// メニューの入力
			include './script/inc/_incMenu.php';
		?>
		</section>
		<footer class="footer">
			<p>このアプリの制作者は、医療や栄養学の専門家ではありません。</p>
			<p>18歳以上が対象です。妊婦さんやご病気の方などは、お医者さんなどの専門家の指示の従ってください。</p>
			<p>栄養素の計算には<a href="https://www.mext.go.jp/a_menu/syokuhinseibun/mext_01110.html" target="_blank" rel="nofollow">日本食品標準成分表2020年版（八訂）</a>のデータを使わせていただいています。</p>
			<p>基礎代謝量の推定式は、<a href="https://www.mhlw.go.jp/stf/newpage_08517.html" target="_blank" rel="nofollow">「日本人の食事摂取基準（2020年版）」策定検討会報告書（PDF）</a>のp.72に記載の式を使わせていただいています。</p>
		</footer>
	</section>
	<script src="src/js/index.js"></script>
	</body>
</html>
