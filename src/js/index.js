(function() {

  'use strict';

  // FirstSettings
  const FirstSettings = function() {
    this.initialize.apply(this, arguments);
  };


  /// 初期化
  FirstSettings.prototype.initialize = function() {
    this.firstSettingsDdEls = document.querySelectorAll('.js-firstSettings dd');
    this.firstSettingsBtnEl = document.querySelector('.js-firstSettingsBtn');
    this.firstSettingsAttentionEls = document.querySelectorAll('.js-firstSettings .js-attention');
  };


  /// 実行
  FirstSettings.prototype.run = function() {
    this.setEvent();
  };


  ///　イベントを設定
  FirstSettings.prototype.setEvent = function() {

    this.firstSettingsBtnEl.addEventListener('click', this.getValue.bind(this));

    let toMenuBtn = document.querySelector('.js-toMenu');
    toMenuBtn.addEventListener('click', this.backToMenu.bind(this));

  };


  ///　データの取得
  FirstSettings.prototype.getValue = function() {

    let age = this.firstSettingsDdEls[0].children[0].children[0].value;
    let height = this.firstSettingsDdEls[2].children[0].children[0].value;
    let weight = this.firstSettingsDdEls[3].children[0].children[0].value;
    let attentionArray = [];

    let checkInputedArray = [];
    checkInputedArray[0] = [age, height, weight];
    checkInputedArray[1] = ['年齢', '身長', '体重'];
    let errorCnt = this.checkInputedData(checkInputedArray);

    if(errorCnt) {
      return;
    }


    let genderEls = this.firstSettingsDdEls[1].querySelectorAll('input');
    let gender = this.getRadioValue(genderEls);


    let momentumEls = this.firstSettingsDdEls[4].querySelectorAll('input');
    let momentum = this.getRadioValue(momentumEls);

    let formula = this.firstSettingsDdEls[5].children[0].children[0].value;

    let bmrData = this.getBMR(formula, age, gender, height, weight);
    let amountOfEnergy = Math.round(bmrData * momentum);

    localStorage.setItem('amountOfEnergy', JSON.stringify(amountOfEnergy));

    let sectionsEls = document.querySelectorAll('.js-sections');
    sectionsEls[0].classList.add('disp--none');
    sectionsEls[1].classList.remove('disp--none');

    // フォームのvalueを初期値に戻しておく
    this.firstSettingsDdEls[0].children[0].children[0].value = '';
    this.firstSettingsDdEls[2].children[0].children[0].value = '';
    this.firstSettingsDdEls[3].children[0].children[0].value = '';
    this.firstSettingsDdEls[5].children[0].children[0].value = 1;

  };


  ///　初期設定の入力チェック
  FirstSettings.prototype.checkInputedData = function(aArray) {

    let errorCnt = 0
    for(let cnt=0,len=aArray[0].length;cnt<len;++cnt) {
      if(!aArray[0][cnt]) {
        this.firstSettingsAttentionEls[cnt].innerHTML = aArray[1][cnt] + 'を入力してください。';
        errorCnt++;
      }
      else if(isNaN(aArray[0][cnt])) {
        this.firstSettingsAttentionEls[cnt].innerHTML = '半角数字で入力してください。';
        errorCnt++;
      }
      else {
        this.firstSettingsAttentionEls[cnt].innerHTML = '';
      }
    }

    if(aArray[0][0]<18) {
      this.firstSettingsAttentionEls[0].innerHTML = '18歳以上が対象です。';
    }

    return errorCnt;

  };


  ///　推定式に当てはめて基礎代謝量を得る
  FirstSettings.prototype.getBMR = function(aFormula, aAge, aGender, aHeight, aWeight) {

    // 国立健康・栄養研究所
    // (0.0481×W+0.0234×H-0.0138×A-0.4235)×1,000/4.186
    // (0.0481×W+0.0234×H-0.0138×A-0.9708)×1,000/4.186
    let bmr = 0;
    let ageNo = 0;

    if(aFormula==1) {
      bmr = (aGender==1) ? 0.4235 : 0.9708;
      return ((0.0481*aWeight)+(0.0234*aHeight)-(0.0138*aAge)-bmr)*1000/4.186;
    }

    // Harris-Benedict
    // 66.4730+13.7516×W+5.0033×H-6.7550×A
    // 655.0955+9.5634×W+1.8496×H-4.6756×A
    if(aFormula==2) {
      if(aGender==1) {
        return 66.4730+(13.7516*aWeight)+(5.0033*aHeight)-(6.7550*aAge);
      }
      else {
        return 655.0955+(9.5634*aWeight)+(1.8496*aHeight)-(4.6756*aAge);
      }
    }

    if(aFormula==3 || aFormula==4) {
      if(aAge<=29) {
        ageNo = 1;
      }
      else if(aAge<=59) {
        ageNo = 2;
      }
      else {
        ageNo = 3;
      }
    }

    // Schofield
    // 18〜29
    // (0.063×W+2.896)×1,000/4.186
    // (0.062×W+2.036)×1,000/4.186
    // 30〜59
    // (0.048×W+3.653)×1,000/4.186
    // (0.034×W+3.538)×1,000/4.186
    // 60 以上
    // (0.049×W+2.459)×1,000/4.186
    // (0.038×W+2.755)×1,000/4.186
    if(aFormula==3) {
      if(ageNo==1) {
        bmr = (aGender==1) ? (0.063*aWeight+2.896) : (0.062*aWeight+2.036);
      }
      else if(ageNo==2) {
        bmr = (aGender==1) ? (0.048*aWeight+3.653) : (0.034*aWeight+3.538);
      }
      else {
        bmr = (aGender==1) ? (0.049*aWeight+2.459) : (0.038*aWeight+2.755);
      }
      return bmr*1000/4.186;
    }

    // FAO/WHO/UNU
    // 18〜29
    // (64.4×W-113.0×H/100+3,000)/4.186
    // (55.6×W+1,397.4×H/100+148)/4.186
    // 30〜59
    // (47.2×W+66.9×H/100+3,769)/4.186
    // (36.4×W+104.6×H/100+3,619)/4.186
    // 60 以上
    // (36.8×W+4,719.5×H/100-4,481)/4.186
    // (38.5×W+2,665.2×H/100-1,264)/4.186
    if(aFormula==4) {
      if(ageNo==1) {
        bmr = (aGender==1) ? (64.4*aWeight-113.0*aHeight/100+3000) : (55.6*aWeight+1397.4*aHeight/100+148);
      }
      else if(ageNo==2) {
        bmr = (aGender==1) ? (47.2*aWeight+66.9*aHeight/100+3769) : (36.4*aWeight+104.6*aHeight/100+3619);
      }
      else {
        bmr = (aGender==1) ? (36.8*aWeight+4719.5*aHeight/100-4481) : (38.5*aWeight+2665.2*aHeight/100-1264);
      }
      return bmr/4.186;
    }

  };


  ///　データの取得
  FirstSettings.prototype.getRadioValue = function(aEls) {
    for(let cnt=0,len=aEls.length;cnt<len;++cnt) {
      if(aEls[cnt].checked) {
        return aEls[cnt].value;
      }
    }
  };


  ///　元の画面に戻るのボタンの設定
  FirstSettings.prototype.backToMenu = function() {
    let sectionsEls = document.querySelectorAll('.js-sections');
    sectionsEls[0].classList.add('disp--none');
    sectionsEls[1].classList.remove('disp--none');
  };


  /// Menus
  const Menus = function() {
    this.initialize.apply(this, arguments);
  };


  /// 初期化
  Menus.prototype.initialize = function() {
    this.dateEl = document.querySelector('.js-date');
    this.menuSections = document.querySelectorAll('.js-menu');
    this.menuDdEls = this.menuSections[0].querySelectorAll('dd');
    this.toFirstSettingsBtnEls = document.querySelectorAll('.js-toFirstSettings');
    this.todaysMenuList = JSON.parse(localStorage.getItem('todaysMenuList')) || [];
    this.whenArray = ['朝食', 'ブランチ', '昼食', '間食', '夕食', '夜食'];
  };


  /// 実行
  Menus.prototype.run = function() {
    this.setEvent();
  };


  ///　イベントを設定
  Menus.prototype.setEvent = function() {
    this.setStorage();
    this.backTo2ndMenuBtnEl = document.querySelector('.js-backTo2ndMenuBtn');
    this.selectMenuPanel();
  };


  /// メニュー画面の選択
  Menus.prototype.selectMenuPanel = function() {
    if(this.todaysMenuList.length) {//次の画面
      this.show2ndMenu();
      // 入力画面から詳細メニューに戻るボタン
      this.backTo2ndMenuBtnEl.classList.remove('disp--none');
    }
    else {//最初の画面
      this.show1stMenu();
      this.backTo2ndMenuBtnEl.classList.add('disp--none');
    }
  };

  /// ローカルストレージのセット
  Menus.prototype.setStorage = function() {

    let weeklyMenuListArray = JSON.parse(localStorage.getItem('weeklyMenuList')) || [];
    let today = new Date(document.querySelector('.js-date').dataset.date);
    this.todayMs = today.getTime();
    let diffMs = 0;

    // weeklyMenuListArrayの古いデータ（１週間以上前）は破棄する
    // 今日以外であればpushして、最後にweeklyMenuListArrayのデータをまとめて全部チェックする

    if(this.todaysMenuList.length) {
      diffMs = this.todayMs - this.todaysMenuList[0][2];

      // 今日のデータではない時
      if(diffMs) {
        weeklyMenuListArray.push(this.todaysMenuList);
        // 今日のストレージは空にしておく
        localStorage.setItem('todaysMenuList', JSON.stringify(''));
      }

    }

    // weeklyMenuListArrayの全部のデータをチェックして、1週間以内の時はweeklyのローカルストレージに格納
    for(let cnt=0,len=weeklyMenuListArray.length;cnt<len;++cnt) {
      diffMs = this.todayMs - weeklyMenuListArray[cnt][0][2];
      if(diffMs>604800000) {
        weeklyMenuListArray.splice(cnt,1);
      }
    }

    localStorage.setItem('weeklyMenuList', JSON.stringify(weeklyMenuListArray));

    let toWeeklyMenuEls = document.querySelectorAll('.js-toWeeklyMenu');
    for(let cnt=0,len=toWeeklyMenuEls.length;cnt<len;++cnt) {
      if(weeklyMenuListArray.length) {
        toWeeklyMenuEls[cnt].classList.remove('disp--none');
      }
      else {
        toWeeklyMenuEls[cnt].classList.add('disp--none');
      }
    }

    toWeeklyMenuEls.forEach((elm) => {
      if(elm) {
        elm.addEventListener('click', this.showWeeklyMenu.bind(this));
      }
    });

  };


  /// メニューを設定
  Menus.prototype.setMenus = function() {

    // メニュー
    let menu = this.menuDdEls[0].children[0].children[0].value;
    let menuAttention = this.menuSections[0].querySelector('.js-attention');
    if(!menu) {
      menuAttention.innerHTML = 'メニュー名を入力してください。';
      return;
    }

    // いつ食べる？
    let when = this.menuDdEls[1].children[0].children[0].value;

    let menuData = [menu,when,this.todayMs,1];

    let isNewMenu = true;

    if(this.todaysMenuList.length) {
      for(let cnt=0,len=this.todaysMenuList.length;cnt<len;++cnt) {
        this.todaysMenuList[cnt][3] = 0;
        if(!this.todaysMenuList[cnt][4]) {
          this.todaysMenuList[cnt][4] = '';
        }
        if(menuData[0]==this.todaysMenuList[cnt][0] && menuData[1]==this.todaysMenuList[cnt][1] && menuData[2]==this.todaysMenuList[cnt][2]) {
          isNewMenu = false;
        }
      }
    }

    if(isNewMenu) {
      this.todaysMenuList.push(menuData);
    }

    // this.todaysMenuListを配列に変換してソート
    this.todaysMenuList.sort( (a, b) => {
      return a[1] - b[1];
    });

    localStorage.setItem('todaysMenuList', JSON.stringify(this.todaysMenuList));

    this.menuDdEls[0].children[0].children[0].value = '';
    menuAttention.innerHTML = '';
    this.show2ndMenu();
    event.stopImmediatePropagation();

  };


  /// 基本設定を表示
  Menus.prototype.showFirstSettings = function() {

    let sectionsEls = document.querySelectorAll('.js-sections');
    sectionsEls[0].classList.remove('disp--none');
    sectionsEls[1].classList.add('disp--none');

  };


  /// 最初のメニュー設定を表示
  Menus.prototype.show1stMenu = function() {

    this.menuSections[0].classList.remove('disp--none');
    this.menuSections[1].classList.add('disp--none');
    this.menuSections[2].classList.add('disp--none');

    let menuBtnEl = document.querySelector('.js-menuBtn');
    menuBtnEl.addEventListener('click', this.setMenus.bind(this));
    this.toFirstSettingsBtnEls[0].addEventListener('click',this.showFirstSettings.bind(this));

    this.backTo2ndMenuBtnEl.addEventListener('click', this.show2ndMenu.bind(this));
  };


  /// 詳細入力のメニューを設定
  Menus.prototype.show2ndMenu = function() {

    this.menuSections[0].classList.add('disp--none');
    this.menuSections[1].classList.remove('disp--none');
    this.menuSections[2].classList.add('disp--none');
    this.toFirstSettingsBtnEls[1].addEventListener('click',this.showFirstSettings.bind(this));

    this.categoryMenuEls = document.querySelectorAll('.js-category');
    this.categoryMenuEls[1].children[0].innerHTML = showOptionSubcategoryData[0];
    this.categoryMenuEls[0].children[0].addEventListener('change', this.changeSubCategory.bind(this));

    let showTodaysMenuListArray = '';
    let selected = '';

    for(let cnt=0,len=this.todaysMenuList.length;cnt<len;++cnt) {
      selected = (this.todaysMenuList[cnt][3]) ? ' selected' : '';

      showTodaysMenuListArray += '<option value="' + this.todaysMenuList[cnt][0] + '-' + cnt + '"' + selected + ' data-index=' + cnt + '>' + this.todaysMenuList[cnt][0] + '（' + this.whenArray[(this.todaysMenuList[cnt][1]-1)] + '）</option>';
    }
    showTodaysMenuListArray += '<option value="addNewMenu">新しいメニューを追加する</option>';


    // 前の画面で入力したメニューを設定
    let menuSettingEl = document.querySelector('.js-menuSetting select');
    menuSettingEl.innerHTML = showTodaysMenuListArray;
    menuSettingEl.addEventListener('change', this.addNewMenu.bind(this));

    // 栄養素データを更新する
    let menuRegisterBtnEl = document.querySelector('.js-menuRegisterBtn');
    menuRegisterBtnEl.addEventListener('click', this.getNutrientsData.bind(this));

  };


  /// 詳細入力のメニューを設定
  Menus.prototype.addNewMenu = function() {
    let value = event.target.value;
    if(value=='addNewMenu') {
      event.target.selectedIndex = 0;
      this.show1stMenu();
      this.backTo2ndMenuBtnEl.classList.remove('disp--none');
    }
  };


  /// 過去1週間のメニューを表示
  Menus.prototype.showWeeklyMenu = function() {

    this.menuSections[0].classList.add('disp--none');
    this.menuSections[1].classList.add('disp--none');
    this.menuSections[2].classList.remove('disp--none');

    this.toFirstSettingsBtnEls[2].addEventListener('click',this.showFirstSettings.bind(this));

    let toMenusBtnEl = document.querySelector('.js-toMenus');
    toMenusBtnEl.addEventListener('click', this.selectMenuPanel.bind(this));

  };


  /// 栄養素データなどを取得
  Menus.prototype.getNutrientsData = function() {

    event.preventDefault();

    let ingredientsWeightEl = document.querySelector('.js-ingredientsWeight');

    if(!ingredientsWeightEl.children[0].value) {
      ingredientsWeightEl.children[2].innerHTML = '分量を入力してください。';
      return;
    }
    else if(isNaN(ingredientsWeightEl.children[0].value)) {
      ingredientsWeightEl.children[2].innerHTML = '半角数字で入力してください。';
      return;
    }
    else {

      // PHPで計算して返す
      let result = document.querySelector('.js-nutritionDataResult');

      let menuSettingEl = document.querySelector('.js-menuSetting select');

      // ローカルストレージの今日のデータを全部渡す
      // データが無い時は（[4]が空の時）、削除しますか？の表示を出す　***後で

      let menuIndex = String(menuSettingEl.value).split('-')[1];
      console.log(menuIndex);
      let array4Data = (this.todaysMenuList[menuIndex][4]) ? this.todaysMenuList[menuIndex][4] + '_' : '';
      array4Data += this.categoryMenuEls[0].children[0].value + '-' + this.categoryMenuEls[1].children[0].value + '-' + ingredientsWeightEl.children[0].value;
      this.todaysMenuList[menuIndex][4] = array4Data;

      localStorage.setItem('todaysMenuList', JSON.stringify(this.todaysMenuList));

      let xhr = new XMLHttpRequest();
      let sendPath = 'todaysMenu=' + this.todaysMenuList;

      xhr.open('POST', '/addMenus.php');
      xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
      xhr.send(sendPath);


      xhr.onreadystatechange = function() {
        if (xhr.readyState===4 && xhr.status===200) {
          result.innerHTML = xhr.responseText;
          ingredientsWeightEl.children[0].value = '';
        }
      }
      this.categoryMenuEls[0].children[0].value = 1;
      event.stopImmediatePropagation();

    }


  };


  /// 材料のサブカテゴリーを変更
  Menus.prototype.changeSubCategory = function() {
    let index = event.target.value;
    this.categoryMenuEls[1].children[0].innerHTML = showOptionSubcategoryData[(index-1)];
  };


  window.addEventListener('DOMContentLoaded', function() {

    let sectionsEls = document.querySelectorAll('.js-sections');
    let toMenuBtnEl = document.querySelector('.js-toMenu');
    let amountOfEnergy = JSON.parse(localStorage.getItem('amountOfEnergy')) || '';

    if(amountOfEnergy) {
      sectionsEls[0].classList.add('disp--none');
      sectionsEls[1].classList.remove('disp--none');
      toMenuBtnEl.classList.remove('disp--none');
    }
    else {
      sectionsEls[0].classList.remove('disp--none');
      sectionsEls[1].classList.add('disp--none');
      toMenuBtnEl.classList.add('disp--none');
    }

    let menus = new Menus();
    menus.run();
    let firstSettings = new FirstSettings();
    firstSettings.run();

  });

}());
