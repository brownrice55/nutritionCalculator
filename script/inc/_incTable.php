<table class="table">
	<thead>
	<tr>
		<th>項目</th>
		<th>今日</th>
		<th>一日の推奨・目安量</th>
	</tr>
	</thead>
	<tbody>
	<tr>
		<th>摂取エネルギー</th>
		<td>kcal</td>
		<td></td>
	</tr>
	<tr>
		<th>たんぱく質</th>
		<td>g</td>
		<td></td>
	</tr>
	<tr>
		<th>脂質</th>
		<td>g</td>
		<td></td>
	</tr>
	<tr>
		<th>炭水化物</th>
		<td>g</td>
		<td></td>
	</tr>

<?php
	$tableTitleArray = array('食塩又は食塩相当量','ビタミンA<br>（レチノール活性当量）','ビタミンC','ビタミンD','ビタミンE','カルシウム','マグネシウム','鉄','ヨウ素','葉酸',
		'ビタミンB1','ビタミンB2','ビタミンB6','ビタミンB12','食物繊維','カリウム');
	$tableTodayArray = array('salt','vitaminA','vitaminC','vitaminD','vitaminE','ca','mg','fe','iodine','folicacid','vitaminB1','vitaminB2','vitaminB6','vitaminB12','dietaryfiber','k');
	$tableUnitArray = array('g','μg','mg','μg','mg','mg','mg','mg','μg','μg','mg','mg','mg','μg','g','mg');
	$showResultTableData = '';

	for($cnt=0;$cnt<15;++$cnt) {
		$showResultTableData .= '<tr>
		<th>' . $tableTitleArray[$cnt] . '</th>
		<td>' . $tableUnitArray[$cnt] . '</td>';
		$showResultTableData .= '</td></tr>';
	}
	print $showResultTableData;
?>
	</tbody>
</table>
