<?php
if(isset($_POST)) {
  extract($_POST);
  $getTodaysMenuArray = explode(',', $_POST['todaysMenu']);

  function arrangeMenuArray($aGetTodaysMenuArray) {
    $cnt2 = 0;
    $todaysMenuArray = array();
    $todaysMenuArray4 = array();

    if(is_array($aGetTodaysMenuArray)) {
      for($cnt=0;$cnt<count($aGetTodaysMenuArray);++$cnt) {
        if($cnt && $cnt%5==0) {
          ++$cnt2;
        }
        if($cnt%5==4) {
          $getTodaysMenuArray4 = explode('_', $aGetTodaysMenuArray[$cnt]);
          for($cnt3=0;$cnt3<count($getTodaysMenuArray4);++$cnt3) {
            $tempTodaysMenuArray4 = explode('-', $getTodaysMenuArray4[$cnt3]);
            array_push($todaysMenuArray4, $tempTodaysMenuArray4);
          }
          $todaysMenuArray[$cnt2][] = $todaysMenuArray4;

        }
        else {
          $todaysMenuArray[$cnt2][] = $aGetTodaysMenuArray[$cnt];
        }
      }
    }
    else {
      return;
    }

    $todaysMenuArrayByCategory = array();
    if(is_array($todaysMenuArray)) {
      for($cnt=0;$cnt<count($todaysMenuArray);++$cnt) {
        $todaysMenuArrayByCategory[($todaysMenuArray[$cnt][1]-1)][] = $todaysMenuArray[$cnt];
      }
    }
    return $todaysMenuArrayByCategory;
  }


  function getData($aCategory, $aSubCategory) {
    $fp = fopen("script/csv/i$aCategory.csv", "r");
    while ($data = fgetcsv($fp, 1024)) {
      if (($data[1])==$aSubCategory) {
        return $data;
      }
    }
    fclose ($fp);
  }

  $arrangeMenuArray = arrangeMenuArray($getTodaysMenuArray);
  if($arrangeMenuArray) {
    $whenArray = array('朝食', 'ブランチ', '昼食', '間食', '夕食', '夜食');
    $showMenuData = '';

    for($cnt=0;$cnt<6;++$cnt) {
      if(isset($arrangeMenuArray[$cnt][0])) {
        $showMenuData .= '<dl class="menuDetails"><dt class="menuDetails__dt">' . $whenArray[$cnt] . '</dt><dd>';
        for($cnt2=0;$cnt2<count($arrangeMenuArray[$cnt]);++$cnt2) {
        $showMenuData .= '<div class="menuDetails__container"><p>' . $arrangeMenuArray[$cnt][$cnt2][0] . '</p><ul>';
          for($cnt3=0;$cnt3<count($arrangeMenuArray[$cnt][$cnt2][4]);++$cnt3) {
            $getData = getData($arrangeMenuArray[$cnt][$cnt2][4][$cnt3][0], $arrangeMenuArray[$cnt][$cnt2][4][$cnt3][1]);
            $showMenuData .= '<li>' . $getData[3] . ' ' . $arrangeMenuArray[$cnt][$cnt2][4][$cnt3][2] . 'g</li>';
            // 各栄養素の表示と足し算 ***後で
          }
          $showMenuData .= '</ul></div>';
        }
        $showMenuData .= '</dd></dl>';
      }
    }
    print $showMenuData;
  }
  else {
    return;
  }

}


?>



  <div style="background:#fff; margin:20px;">

    <?php
      // 基本設定
      include './script/inc/_incTable.php';
    ?>

  </div>
