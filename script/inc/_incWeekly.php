<div class="form js-menu">

  <div class="form__setting">
    <button class="js-toMenus">今日のメニュー</button>
    <button class="js-toFirstSettings">初期設定</button>
  </div>

  <?php
    $targetTime = strtotime($today);
    $showWeeklyMenu = '<h2 class="h2Title">' . date('m月d日', strtotime('-7 day', $targetTime)) . '〜' . date('m月d日', strtotime('-1 day', $targetTime)) . 'のメニュー</h2>';

    for($cnt=1;$cnt<=7;++$cnt) {
      $showWeeklyMenu .= '<div class="form__dl">
        <h3>' . date('m月d日', strtotime('-' . $cnt . ' day', $targetTime)) . 'のメニュー</h3>
        <div class="js-weeklyData" data-index=' . $cnt . '></div>
      </div>';
    }
    print $showWeeklyMenu;
  ?>


</div>
