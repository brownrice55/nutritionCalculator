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

    let proteinMinPer = this.getProteinMinPer(age);
    let kalium = this.getKalium(age, gender);
    let ca = this.getCa(age, gender);
    let mg = this.getMg(age, gender);
    let p = this.getP(gender);
    let fe = this.getFe(age, gender);
    let zn = this.getZn(age, gender);
    let cu = this.getCu(gender);
    let mn = this.getMn(gender);
    let se = this.getSe(gender);
    let mo = this.getMo(gender);
    let vitaminA = this.getVitaminA(age, gender);
    let vitaminE = this.getVitaminE(age, gender);
    let vitaminB1 = this.getVitaminB1(age, gender);
    let vitaminB2 = this.getVitaminB2(age, gender);
    let niacin = this.getNiacin(age, gender);
    let vitaminB6 = this.getVitaminB6(age, gender);
    let folicacid = this.getFolicacid(age);
    let pantothenicacid = this.getPantothenicacid(age, gender);
    let dietaryfiber = this.getDietaryfiber(age, gender);

    let setData = amountOfEnergy + '_' + proteinMinPer + '_' + kalium + '_' + ca + '_' + mg + '_' + p + '_' + fe + '_' + zn + '_' + cu + '_' + mn + '_' + se + '_' + mo + '_' + vitaminA + '_' + vitaminE + '_' + vitaminB1 + '_' + vitaminB2 + '_' + niacin + '_' + vitaminB6 + '_' + folicacid + '_' + pantothenicacid + '_' + dietaryfiber;

    localStorage.setItem('amountOfEnergy', JSON.stringify(setData));

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

    let errorCnt = 0;
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
      errorCnt++;
    }
    if(aArray[0][1]>272) {
      this.firstSettingsAttentionEls[1].innerHTML = '272cm以下で入力してください。';
      errorCnt++;
    }
    if(aArray[0][2]>500) {
      this.firstSettingsAttentionEls[2].innerHTML = '500kg以下で入力してください。';
      errorCnt++;
    }

    for(let cnt=1,len=aArray[0].length;cnt<len;++cnt) {
      if(aArray[0][cnt]==0) {
        this.firstSettingsAttentionEls[cnt].innerHTML = aArray[1][cnt] + 'を入力してください。';
        errorCnt++;
      }
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


  ///　1日に必要なタンパク質の量の最小の%
  FirstSettings.prototype.getProteinMinPer = function(aAge) {
    // https://www.mhlw.go.jp/content/10904750/000586553.pdf#page=133　に沿って取得
    let min = 0;
    if(aAge<50) {
      return 13;
    }
    else if(aAge<65) {
      return 14;
    }
    else {
      return 15;
    }
  };


  ///　1日に必要なカリウム
  FirstSettings.prototype.getKalium = function(aAge, aGender) {
    // https://www.mhlw.go.jp/content/10904750/000586553.pdf#page=283
    if(aGender==1) {//男性
      if(aAge<75) {
        return 3000;
      }
      else {
        return 2800;
      }
    }
    else {
      if(aAge<75) {
        return 2600;
      }
      else {
        return 2400;
      }
    }
  };


  ///　1日に必要なカルシウムの量
  FirstSettings.prototype.getCa = function(aAge, aGender) {
    // https://www.mhlw.go.jp/content/10904750/000586553.pdf#page=287
    if(aGender==1) {//男性
      if(aAge<30) {
        return 789;
      }
      else if(aAge<50) {
        return 738;
      }
      else if(aAge<65) {
        return 737;
      }
      else if(aAge<75) {
        return 769;
      }
      else {
        return 720;
      }
    }
    else {
      if(aAge<30) {
        return 661;
      }
      else if(aAge<50) {
        return 660;
      }
      else if(aAge<65) {
        return 667;
      }
      else if(aAge<75) {
        return 652;
      }
      else {
        return 620;
      }
    }

  };


  ///　1日に必要なマグネシウムの量
  FirstSettings.prototype.getMg = function(aAge, aGender) {
    // https://www.mhlw.go.jp/content/10904750/000586553.pdf#page=316
    if(aGender==1) {//男性
      if(aAge<30) {
        return 340;
      }
      else if(aAge<65) {
        return 370;
      }
      else if(aAge<75) {
        return 350;
      }
      else {
        return 320;
      }
    }
    else {
      if(aAge<30) {
        return 270;
      }
      else if(aAge<65) {
        return 290;
      }
      else if(aAge<75) {
        return 280;
      }
      else {
        return 260;
      }
    }

  };


  ///　1日に必要なリンの量
  FirstSettings.prototype.getP = function(aGender) {
    // https://www.mhlw.go.jp/content/10904750/000586553.pdf#page=317
    if(aGender==1) {//男性
      return 1000;
    }
    else {
      return 800;
    }

  };


  ///　1日に必要な鉄の量
  FirstSettings.prototype.getFe = function(aAge, aGender) {
    // https://www.mhlw.go.jp/content/10904750/000586553.pdf#page=373
    if(aGender==1) {//男性
      return '7.5-50';
    }
    else {
      if(aAge<50) {
        return '6.5-10.5-40';
      }
      else if(aAge<65) {
        return '6.5-11.0-40';
      }
      else {
        return '6.0-0-40';
      }
    }
    return 0;
  };


  ///　1日に必要な亜鉛の量
  FirstSettings.prototype.getZn = function(aAge, aGender) {
    // https://www.mhlw.go.jp/content/10904750/000586553.pdf#page=374
    if(aGender==1) {//男性
      if(aAge<30) {
        return '11-40';
      }
      else if(aAge<65) {
        return '11-45';
      }
      else {
        return '11-40';
      }
    }
    else {
      if(aAge<75) {
        return '8-35';
      }
      else {
        return '8-30';
      }
    }

  };


  ///　1日に必要な銅の量
  FirstSettings.prototype.getCu = function(aGender) {
    // https://www.mhlw.go.jp/content/10904750/000586553.pdf#page=375
    if(aGender==1) {//男性
      return '0.9-7';
    }
    else {
      return '0.7-7';
    }

  };


  ///　1日に必要な銅の量
  FirstSettings.prototype.getMn = function(aGender) {
    // https://www.mhlw.go.jp/content/10904750/000586553.pdf#page=376
    if(aGender==1) {//男性
      return '4.0-11';
    }
    else {
      return '3.5-11';
    }

  };


  ///　1日に必要なセレンの量
  FirstSettings.prototype.getSe = function(aGender) {
    // https://www.mhlw.go.jp/content/10904750/000586553.pdf#page=378
    if(aGender==1) {//男性
      return '30-450';
    }
    else {
      return '25-350';
    }

  };


  ///　1日に必要なモリブデンの量
  FirstSettings.prototype.getMo = function(aGender) {
    // https://www.mhlw.go.jp/content/10904750/000586553.pdf#page=380
    if(aGender==1) {//男性
      return '30-600';
    }
    else {
      return '25-500';
    }

  };


  ///　1日に必要なビタミンAの量
  FirstSettings.prototype.getVitaminA = function(aAge, aGender) {
    // https://www.mhlw.go.jp/content/10904750/000586553.pdf#page=212
    if(aGender==1) {//男性
      if(aAge<30) {
        return 850;
      }
      else if(aAge<65) {
        return 900;
      }
      else if(aAge<75) {
        return 850;
      }
      else {
        return 800;
      }
    }
    else {
      if(aAge<30) {
        return 650;
      }
      else if(aAge<75) {
        return 700;
      }
      else {
        return 650;
      }
    }

  };


  ///　1日に必要なビタミンEの量
  FirstSettings.prototype.getVitaminE = function(aAge, aGender) {
    // https://www.mhlw.go.jp/content/10904750/000586553.pdf#page=214
    if(aGender==1) {//男性
      if(aAge<30) {
        return '6.0-850';
      }
      else if(aAge<50) {
        return '6.0-900';
      }
      else if(aAge<75) {
        return '7.0-850';
      }
      else {
        return '6.5-750';
      }
    }
    else {
      if(aAge<30) {
        return '5.0-650';
      }
      else if(aAge<50) {
        return '5.5-700';
      }
      else if(aAge<65) {
        return '6.0-700';
      }
      else {
        return '6.5-650';
      }
    }

  };


  ///　1日に必要なビタミンB1の量
  FirstSettings.prototype.getVitaminB1 = function(aAge, aGender) {
    // https://www.mhlw.go.jp/content/10904750/000586553.pdf#page=264
    if(aGender==1) {//男性
      if(aAge<50) {
        return 1.4;
      }
      else if(aAge<75) {
        return 1.3;
      }
      else {
        return 1.2;
      }
    }
    else {
      if(aAge<75) {
        return 1.1;
      }
      else {
        return 0.9;
      }
    }

  };


  ///　1日に必要なビタミンB2の量
  FirstSettings.prototype.getVitaminB2 = function(aAge, aGender) {
    // https://www.mhlw.go.jp/content/10904750/000586553.pdf#page=265
    if(aGender==1) {//男性
      if(aAge<50) {
        return 1.6;
      }
      else if(aAge<75) {
        return 1.5;
      }
      else {
        return 1.3;
      }
    }
    else {
      if(aAge<75) {
        return 1.2;
      }
      else {
        return 1.0;
      }
    }
  };


  ///　1日に必要なナイアシンの量
  FirstSettings.prototype.getNiacin = function(aAge, aGender) {
    // https://www.mhlw.go.jp/content/10904750/000586553.pdf#page=266
    if(aGender==1) {//男性
      if(aAge<30) {
        return '15-300';
      }
      else if(aAge<50) {
        return '15-350';
      }
      else if(aAge<65) {
        return '14-350';
      }
      else if(aAge<75) {
        return '14-300';
      }
      else {
        return '13-300';
      }
    }
    else {
      if(aAge<30) {
        return '11-250';
      }
      else if(aAge<50) {
        return '12-250';
      }
      else if(aAge<75) {
        return '11-250';
      }
      else {
        return '10-250';
      }
    }
  };


  ///　1日に必要なビタミンB6の量
  FirstSettings.prototype.getVitaminB6 = function(aAge, aGender) {
    // https://www.mhlw.go.jp/content/10904750/000586553.pdf#page=267
    if(aGender==1) {//男性
      if(aAge<30) {
        return '1.4-55';
      }
      else if(aAge<50) {
        return '1.4-60';
      }
      else if(aAge<65) {
        return '1.4-55';
      }
      else {
        return '1.4-50';
      }
    }
    else {
      if(aAge<65) {
        return '1.1-45';
      }
      else {
        return '1.1-40';
      }
    }
  };


  ///　1日に必要な葉酸の量
  FirstSettings.prototype.getFolicacid = function(aAge) {
    // https://www.mhlw.go.jp/content/10904750/000586553.pdf#page=269
    if(aAge<30) {
      return '240-900';
    }
    else if(aAge<65) {
      return '240-1,000';
    }
    else {
      return '240-900';
    }
  };


  ///　1日に必要なパントテン酸の量
  FirstSettings.prototype.getPantothenicacid = function(aAge, aGender) {
    // https://www.mhlw.go.jp/content/10904750/000586553.pdf#page=270
    if(aGender==1) {
      if(aAge<50) {
        return 5;
      }
      else {
        return 6;
      }
    }
    else {
      return 5;
    }
  };



  ///　1日に必要な食物繊維の量
  FirstSettings.prototype.getDietaryfiber = function(aAge, aGender) {
    // https://www.mhlw.go.jp/content/10904750/000586553.pdf#page=172
    if(aGender==1) {
      if(aAge<65) {
        return 21;
      }
      else {
        return 20;
      }
    }
    else {
      if(aAge<65) {
        return 18;
      }
      else {
        return 17;
      }
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
    this.result = document.querySelector('.js-nutritionDataResult');
    this.amountOfEnergy = JSON.parse(localStorage.getItem('amountOfEnergy')) || '';
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
    let isUpdate = false;

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

    // その日初めてのアクセスでは無い場合はreturn;
    let firstAccessData = JSON.parse(localStorage.getItem('firstAccess')) || '';
    if(this.todayMs==firstAccessData) {
      return;
    }

    // weeklyMenuListArrayの古いデータ（１週間以上前）は破棄する
    // 今日以外であればpushして、最後にweeklyMenuListArrayのデータをまとめて全部チェックする

    if(this.todaysMenuList.length) {
      diffMs = this.todayMs - this.todaysMenuList[0][2];

      // 今日のデータではない時
      if(diffMs) {
        weeklyMenuListArray.push(this.todaysMenuList);
        // 今日のストレージは空にしておく
        localStorage.setItem('todaysMenuList', JSON.stringify(''));
        isUpdate = true;
      }

    }

    // weeklyMenuListArrayの全部のデータをチェックして、1週間以内の時はweeklyのローカルストレージに格納
    for(let cnt=0,len=weeklyMenuListArray.length;cnt<len;++cnt) {
      diffMs = this.todayMs - weeklyMenuListArray[cnt][0][2];
      if(diffMs>604800000) {
        weeklyMenuListArray.splice(cnt,1);
        isUpdate = true;
      }
    }

    if(isUpdate) {
      localStorage.setItem('weeklyMenuList', JSON.stringify(weeklyMenuListArray));
      localStorage.setItem('firstAccess', JSON.stringify(this.todayMs));
      location.reload();
    }
    else {
      return;
    }

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
      let menuSettingEl = document.querySelector('.js-menuSetting select');

      // ローカルストレージの今日のデータを全部渡す
      // データが無い時は（[4]が空の時）、削除しますか？の表示を出す　***後で

      let menuIndex = String(menuSettingEl.value).split('-')[1];
      let array4Data = (this.todaysMenuList[menuIndex][4]) ? this.todaysMenuList[menuIndex][4] + '_' : '';
      array4Data += this.categoryMenuEls[0].children[0].value + '-' + this.categoryMenuEls[1].children[0].value + '-' + ingredientsWeightEl.children[0].value;
      this.todaysMenuList[menuIndex][4] = array4Data;

      localStorage.setItem('todaysMenuList', JSON.stringify(this.todaysMenuList));

      this.setGetAndShowNutrientsListData();

      this.categoryMenuEls[0].children[0].value = 1;
      this.categoryMenuEls[1].children[0].innerHTML = showOptionSubcategoryData[0];
      ingredientsWeightEl.children[0].value = '';
      event.stopImmediatePropagation();
    }

  };


  /// 栄養素のデータを表示
  Menus.prototype.setGetAndShowNutrientsListData = function() {
    this.sendPath = 'todaysMenu=' + this.todaysMenuList + '&amountOfEnergy=' + this.amountOfEnergy;
    this.phpName = '/addMenus.php';
    this.getAndShowNutrientsListData();
  };


  /// 栄養素のデータを表示
  Menus.prototype.getAndShowNutrientsListData = function() {

    let xhr = new XMLHttpRequest();

    xhr.open('POST', this.phpName);
    xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
    xhr.send(this.sendPath);

    xhr.onreadystatechange = function() {
      if (xhr.readyState===4 && xhr.status===200) {
        this.result.innerHTML = xhr.responseText;
        this.afterShowNutritionData();
      }
    }.bind(this);
  };


  /// 栄養素のデータ　表示後に行うこと
  Menus.prototype.afterShowNutritionData = function() {
    let nutrientsListEls = document.querySelectorAll('.js-nutrientsList');
    nutrientsListEls.forEach((elm) => {
      if(elm) {
        elm.addEventListener('click', this.showNutrientsListData.bind(this));
      }
    });

    let deleteListEls = document.querySelectorAll('.js-deleteList');
    deleteListEls.forEach((elm) => {
      if(elm) {
        elm.addEventListener('click', this.deleteNutrientsListData.bind(this));
      }
    });
  };


  /// 栄養素のデータ　材料を削除
  Menus.prototype.deleteNutrientsListData = function() {

    let deleteListIndexArray = String(event.target.parentNode.dataset.index).split('-');

    // ローカルストレージから削除して再度取得して表示
    let cnt3 = 0;
    let ingredientsArray = [];
    let tempIngredients =  '';
    //deleteListIndexが0-0-0の場合最初の0は朝食など別　次の0はメニュー別　次の0は材料別のインデックス値
    for(let cnt=0,len=this.whenArray.length;cnt<len;++cnt) {
      cnt3 = 0;
      if(cnt==deleteListIndexArray[0]) {
        for(let cnt2=0,len2=this.todaysMenuList.length;cnt2<len2;++cnt2) {
          if(this.todaysMenuList[cnt2][1]==parseInt(deleteListIndexArray[0])+1) {
            if(cnt3==deleteListIndexArray[1]) {
              ingredientsArray = this.todaysMenuList[cnt2][4].split('_');
              ingredientsArray.splice(deleteListIndexArray[2], 1);
              if(ingredientsArray.length>0) {
                for(let cnt4=0,len4=ingredientsArray.length;cnt4<len4;++cnt4) {
                  if(tempIngredients) {
                    tempIngredients += '_';
                  }
                  tempIngredients += ingredientsArray[cnt4];
                }
                this.todaysMenuList[cnt2][4] = tempIngredients;
              }
              else {
                this.todaysMenuList[cnt2][4] = '';
              }
              localStorage.setItem('todaysMenuList', JSON.stringify(this.todaysMenuList));
              if(ingredientsArray.length<1) {
                event.preventDefault();
                this.result.innerHTML = '';
              }
              else {
                this.setGetAndShowNutrientsListData();
              }
              break;
            }
            ++cnt3;
          }
        }
      }
    }

  };


  /// 栄養素のデータ　アコーディオン開閉
  Menus.prototype.showNutrientsListData = function() {
    let nutrientsListData = event.target.parentNode.querySelector('.js-nutrientsListData');
    nutrientsListData.classList.toggle('disp--none');
  };


  /// 材料のサブカテゴリーを変更
  Menus.prototype.changeSubCategory = function() {
    let index = event.target.value;
    this.categoryMenuEls[1].children[0].innerHTML = showOptionSubcategoryData[(index-1)];
  };

  // WeeklyMenu
  const WeeklyMenu = function() {
    this.initialize.apply(this, arguments);
  };


  /// 初期化
  WeeklyMenu.prototype.initialize = function(aTodaysMs, aWhenArray, aGetAndShowNutrientsListData, aAmountOfEnergy) {
    this.weeklyMenuList = JSON.parse(localStorage.getItem('weeklyMenuList')) || [];
    this.todaysMs = aTodaysMs;
    this.whenArray = aWhenArray;
    this.getAndShowNutrientsListData = aGetAndShowNutrientsListData;
    this.amountOfEnergy = aAmountOfEnergy;
  };


  /// 実行
  WeeklyMenu.prototype.run = function() {
    this.setEvent();
  };


  ///　イベントを設定
  WeeklyMenu.prototype.setEvent = function() {
    let diff = 0;
    let howManyDays = 0;
    let cnt5 = 0;
    let weeklyData = document.querySelectorAll('.js-weeklyData');
    let showWeeklyData = '';

    for(let cnt=0,len=weeklyData.length;cnt<len;++cnt) {//日付ごとに表示
      showWeeklyData = '';
      for(let cnt2=0,len2=this.weeklyMenuList.length;cnt2<len2;++cnt2) {
        diff = this.todaysMs-this.weeklyMenuList[cnt2][0][2];
        howManyDays = diff/86400000;// 1日　86400000
        if(weeklyData[cnt].dataset.index==howManyDays) {//差分でその日に入れるデータを特定
          showWeeklyData += '<dl class="menuDetails">';
          for(let cnt3=0,len3=this.whenArray.length;cnt3<len3;++cnt3) {//朝食、昼食ごとに表示
            cnt5 = 0;
            for(let cnt4=0,len4=this.weeklyMenuList[cnt2].length;cnt4<len4;++cnt4) {//1日のデータを見る
              if(this.weeklyMenuList[cnt2][cnt4] && this.weeklyMenuList[cnt2][cnt4][1]==(cnt3+1)) {
                if(!cnt5) {
                  showWeeklyData += '<dt class="menuDetails__dt">' + this.whenArray[cnt3] + '</dt><dd class="menuDetails__dd">';
                }
                showWeeklyData += '<div><span class="icon icon--close"></span><span class="js-weeklyMenu" data-index="' + cnt2 + '-' + cnt4 + '">' + this.weeklyMenuList[cnt2][cnt4][0] + '</span><ul class="disp--none">';
                showWeeklyData += '</ul></div>';
                ++cnt5;
              }
            }
          }
          showWeeklyData += '</dd><dt class="js-showTotalData" class="menuDetails__showTotalData" data-index=' + cnt2 + '><span class="icon icon--close"></span>栄養素の合計を表示</dt><dd class="disp--none"></dd></dl>';
        }
      }
      weeklyData[cnt].innerHTML = showWeeklyData;
    }

    let weeklyMenuEls = document.querySelectorAll('.js-weeklyMenu');
    weeklyMenuEls.forEach((elm) => {
      if(elm) {
        elm.addEventListener('click', this.showWeeklyMenuIngredients.bind(this));
      }
    });

    let showTotalDataEls = document.querySelectorAll('.js-showTotalData');
    showTotalDataEls.forEach((elm) => {
      if(elm) {
        elm.addEventListener('click', this.showWeeklyMenuTotalData.bind(this));
      }
    });
  };


  ///　材料を表示
  WeeklyMenu.prototype.showWeeklyMenuIngredients = function() {
    let indexArray = event.target.dataset.index.split('-');
    this.result = event.target.nextSibling;
    event.target.previousSibling.classList.toggle('icon--close');
    this.result.classList.toggle('disp--none');
    this.sendPath = 'ingredientsData=' + this.weeklyMenuList[indexArray[0]][indexArray[1]][4];
    this.phpName = '/addIngredients.php';
    this.getAndShowNutrientsListData();
    this.isIngredients = 1;
  };


  ///　栄養素の合計を表示
  WeeklyMenu.prototype.showWeeklyMenuTotalData = function() {
    let index = event.target.dataset.index;
    this.result = event.target.nextSibling;
    event.target.children[0].classList.toggle('icon--close');
    this.result.classList.toggle('disp--none');
    this.sendPath = 'thisDaysData=' + this.weeklyMenuList[index] + '&amountOfEnergy=' + this.amountOfEnergy;
    this.phpName = '/addTotalNutrients.php';
    this.getAndShowNutrientsListData();
    this.isIngredients = 0;
  };


  ///　栄養素データを表示後に行うこと
  WeeklyMenu.prototype.afterShowNutritionData = function() {
    if(this.isIngredients) {//材料の表示
      //open closeの挙動を追加

    }
    else {//栄養素の合計の表示

    }

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

    let firstSettings = new FirstSettings();
    firstSettings.run();
    let menus = new Menus();
    menus.run();
    let weeklyMenu = new WeeklyMenu(menus.todayMs, menus.whenArray, menus.getAndShowNutrientsListData, menus.amountOfEnergy);
    weeklyMenu.run();

  });

}());
