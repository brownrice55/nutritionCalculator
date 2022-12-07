<?php

  function getSelectCategory() {
    $selectOptionIngredientsArray = ['穀類', 'いも及びでん粉類', '砂糖及び甘味類', '豆類', '種実類', '野菜類', '果実類', 'きのこ類', '藻類', '魚介類', '肉類', '鶏卵', '乳類', '油脂類', '菓子類', 'し好飲料', '調味料及び香辛料', '調理済み流通食品類'];

    $showSelectOptionIngredients = '<select name="menu">';
    for($cnt=0;$cnt<count($selectOptionIngredientsArray);++$cnt) {
      $showSelectOptionIngredients .= '<option value="' . ($cnt+1) . '">' . $selectOptionIngredientsArray[$cnt] . '</option>';
    }
    $showSelectOptionIngredients .= '</select>';

    return $showSelectOptionIngredients;
  }


  function getSelectSubcategory($aNo) {
    $path = 'script/csv/i' . $aNo . '.csv';
    $fp = fopen($path, 'r');
    $result = '';
    while ($data = fgetcsv($fp, 1024)) {
      if(is_numeric($data[1])) {
        $result .= '<option value=' . $data[1] . '>' . $data[3] . '</option>';
      }
    }
    fclose ($fp);
    return $result;
  }



?>
