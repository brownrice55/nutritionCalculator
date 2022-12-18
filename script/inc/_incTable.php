<table class="table">
  <thead>
  <tr>
    <th>項目</th>
    <th>今日</th>
    <th>一日の推奨・目安量</th>
  </tr>
  </thead>
  <tbody>

<?php
  include './script/inc/_incArray.php';
	$showResultTableData = '';
  $referenceUrlHead = '<a href="https://www.mhlw.go.jp/content/10904750/000586553.pdf#page=';
	$referenceUrlFoot = '" target="_bank" rel="nofollow">厚生労働省「日本人の食事摂取基準（2020年版）」</a>P.';

  for($cnt=0;$cnt<count($nutrientsArray);++$cnt) {
    $referenceUrl = (isset($nutrientsReferenceArray[$cnt]) && is_numeric($nutrientsReferenceArray[$cnt])) ? '<small><br>' . $referenceUrlHead . $nutrientsReferenceArray[$cnt] . $referenceUrlFoot . $nutrientsReferenceArray[$cnt] . '</small>' : '';

    $showResultTableData .= '<tr>
    <th>' . $nutrientsJaArray[$cnt] . '</th>
    <td>' . $getTotalData[$nutrientsArray[$cnt]] . $nutrientsUnitArray[$cnt] . '</td>';
    $showResultTableData .= '<td>' . $nutrientsDayArray[$cnt] . $referenceUrl . '</td></tr>';
  }
  print $showResultTableData;
?>
	</tbody>
</table>
