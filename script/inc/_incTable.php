<table class="table">
  <thead>
  <tr>
    <th>項目</th>
    <th><?php print $thToday?></th>
    <th>一日の推奨・目安量</th>
  </tr>
  </thead>
  <tbody>

<?php
  include './script/inc/_incArray.php';

  $amountOfEnergy = $_POST['amountOfEnergy'];
  $amountOfEnergyArray = explode('_', $amountOfEnergy);
  $feDataArray = explode('-', $amountOfEnergyArray[6]);
  $znDataArray = explode('-', $amountOfEnergyArray[7]);
  $cuDataArray = explode('-', $amountOfEnergyArray[8]);
  $mnDataArray = explode('-', $amountOfEnergyArray[9]);
  $seDataArray = explode('-', $amountOfEnergyArray[10]);
  $moDataArray = explode('-', $amountOfEnergyArray[11]);
  $vitaminEDataArray = explode('-', $amountOfEnergyArray[13]);
  $niacinDataArray = explode('-', $amountOfEnergyArray[16]);
  $vitaminB6DataArray = explode('-', $amountOfEnergyArray[17]);
  $folicacidDataArray = explode('-', $amountOfEnergyArray[18]);

  if(count($feDataArray)==2 || $feDataArray[1]==0) {
    $showFeData = $feDataArray[0] . 'mg<br><small>耐容上限量' . $feDataArray[1] . 'mg</small>';
  }
  else {
    $showFeData = '月経無し' . $feDataArray[0] . 'mg<br>月経有り' . $feDataArray[1] . 'mg<br><small>耐容上限量' . $feDataArray[2] . 'mg</small>';
  }


  $nutrientsDayArray = array(
    '<span>' . $amountOfEnergyArray[0] . '</span>kcal',
    '',
    '約' . round($amountOfEnergyArray[0]*$amountOfEnergyArray[1]/100/4) . '〜' . round($amountOfEnergyArray[0]*20/100/4) . 'g<br><small>摂取エネルギーの' . $amountOfEnergyArray[1] . '～20%<br>1gあたり4kcalで計算</small>',
    '約' . round($amountOfEnergyArray[0]*0.2/9) . '〜' . round($amountOfEnergyArray[0]*0.3/9) . 'g<br><small>摂取エネルギーの20～30％<br>1gあたり9kcalで計算</small>',
    '約' . round($amountOfEnergyArray[0]*0.2/4) . '〜' . round($amountOfEnergyArray[0]*0.3/4) . 'g<br><small>摂取エネルギーの50～65％<br>1gあたり9kcalで計算</small>',$amountOfEnergyArray[2] . 'mg',$amountOfEnergyArray[3] . 'mg',$amountOfEnergyArray[4] . 'mg',$amountOfEnergyArray[5] . 'mg<br><small>耐容上限量3,000mg</small>',
    $showFeData,
    $znDataArray[0] . 'mg<br><small>耐容上限量' . $znDataArray[1] . 'mg</small>',
    $cuDataArray[0] . 'mg<br><small>耐容上限量' . $cuDataArray[1] . 'mg</small>',
    $mnDataArray[0] . 'mg<br><small>耐容上限量' . $mnDataArray[1] . 'mg</small>',
    '130μg<br><small>耐容上限量3,000μg</small>',
    $seDataArray[0] . 'μg<br><small>耐容上限量' . $seDataArray[1] . 'μg</small>',
    '10μg<br><small>耐容上限量500μg</small>',
    $moDataArray[0] . 'μg<br><small>耐容上限量' . $moDataArray[1] . 'μg</small>',
    $amountOfEnergyArray[12] . 'μgRAE<br><small>耐容上限量2,700mg</small>',
    '8.5μg<br><small>耐容上限量100μg</small>',
    $vitaminEDataArray[0] . 'μg<br><small>耐容上限量' . $vitaminEDataArray[1] . 'μg</small>',
    '150μg',
    $amountOfEnergyArray[14] . 'mg',
    $amountOfEnergyArray[15] . 'mg',
    $niacinDataArray[0] . 'mgNE<br><small>耐容上限量' . $niacinDataArray[1] . 'mgNE</small>',
    $vitaminB6DataArray[0] . 'mg<br><small>耐容上限量' . $vitaminB6DataArray[1] . 'mg</small>',
    '2.4μg',
    $folicacidDataArray[0] . 'μg<br><small>耐容上限量' . $folicacidDataArray[1] . 'μg</small>',
    $amountOfEnergyArray[19] . 'mg',
    '50μg',
    '100mg',
    $amountOfEnergyArray[20] . 'g以上',
    '6g未満'
  );

	$showResultTableData = '';
  $referenceUrlHead = '<a href="https://www.mhlw.go.jp/content/10904750/000586553.pdf#page=';
	$referenceUrlFoot = '" target="_bank" rel="nofollow">厚生労働省「日本人の食事摂取基準（2020年版）」</a>P.';

  for($cnt=0;$cnt<count($nutrientsArray);++$cnt) {
    $referenceUrl = (isset($nutrientsReferenceArray[$cnt]) && is_numeric($nutrientsReferenceArray[$cnt])) ? '<small><br>' . $referenceUrlHead . ($nutrientsReferenceArray[$cnt]+7) . $referenceUrlFoot . $nutrientsReferenceArray[$cnt] . '</small>' : '';

    $showResultTableData .= '<tr>
    <th>' . $nutrientsJaArray[$cnt] . '</th>
    <td>' . $getTotalData[$nutrientsArray[$cnt]] . $nutrientsUnitArray[$cnt] . '</td>';
    $showResultTableData .= '<td>' . $nutrientsDayArray[$cnt] . $referenceUrl . '</td></tr>';
  }
  print $showResultTableData;
?>
	</tbody>
</table>
