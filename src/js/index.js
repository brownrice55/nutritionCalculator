(function() {

  'use strict';

  // Conditions
  const Conditions = function() {
    this.initialize.apply(this, arguments);
  };


  /// 初期化
  Conditions.prototype.initialize = function() {
    this.condtionsDdEls = document.querySelectorAll('.js-conditions dd');
    this.condtionsBtnEl = document.querySelector('.js-condtionsBtn');
  };


  /// 実行
  Conditions.prototype.run = function() {
    this.setEvent();
  };


  ///　イベントを設定
  Conditions.prototype.setEvent = function() {

    this.condtionsBtnEl.addEventListener('click', this.getValue.bind(this));

  };


  ///　データの取得
  Conditions.prototype.getValue = function() {

    let age = this.condtionsDdEls[0].children[0].children[0].value;

    let genderEls = this.condtionsDdEls[1].querySelectorAll('input');
    let gender = this.getRadioValue(genderEls);

    let height = this.condtionsDdEls[2].children[0].children[0].value;
    let weight = this.condtionsDdEls[3].children[0].children[0].value;

    let momentumEls = this.condtionsDdEls[4].querySelectorAll('input');
    let momentum = this.getRadioValue(momentumEls);

    let formula = this.condtionsDdEls[5].children[0].children[0].value;

    let bmrData = this.getBMR(formula, age, gender, height, weight);
    let amountOfEnergy = Math.round(bmrData * momentum);

    localStorage.setItem('amountOfEnergy', JSON.stringify(amountOfEnergy));

    let sectionsEls = document.querySelectorAll('.js-sections');
    sectionsEls[0].classList.add('disp--none');
    sectionsEls[1].classList.remove('disp--none');
  };


  ///　推定式に当てはめて基礎代謝量を得る
  Conditions.prototype.getBMR = function(aFormula, aAge, aGender, aHeight, aWeight) {

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
  Conditions.prototype.getRadioValue = function(aEls) {
    for(let cnt=0,len=aEls.length;cnt<len;++cnt) {
      if(aEls[cnt].checked) {
        return aEls[cnt].value;
      }
    }
  };



  /// Menus
  const Menus = function() {
    this.initialize.apply(this, arguments);
  };


  /// 初期化
  Menus.prototype.initialize = function() {
    this.dateEl = document.querySelector('.js-date');
    this.menuDdEls = document.querySelectorAll('.js-menu dd');
    this.menuSections = document.querySelectorAll('.js-menu');
    this.settingsBtnEls = document.querySelectorAll('.js-firstSettings');
    this.today = document.querySelector('.js-date').dataset.date;
    this.todaysMenuList = JSON.parse(localStorage.getItem('todaysMenuList')) || [];
    this.isTodaysMenu = JSON.parse(localStorage.getItem('isTodaysMenu')) || false;
  };


  /// 実行
  Menus.prototype.run = function() {
    this.setEvent();
  };


  ///　イベントを設定
  Menus.prototype.setEvent = function() {
    if(this.isTodaysMenu) {//次の画面
      this.show2ndMenu();
    }
    else {//最初の画面
      this.show1stMenu();
    }
  };


  /// メニューを設定
  Menus.prototype.setMenus = function() {

    // メニュー
    let menu = this.menuDdEls[0].children[0].children[0].value;

    // いつ食べる？
    let when = this.menuDdEls[1].children[0].children[0].value;

    let menuData = menu + ':' + this.today;

    if(this.todaysMenuList[(when-1)]==undefined || !this.todaysMenuList[(when-1)]) {
      this.todaysMenuList[(when-1)] = '';
    }
    if(this.todaysMenuList[(when-1)]) {
      this.todaysMenuList[(when-1)] += '&';
    }
    this.todaysMenuList[(when-1)] += menuData;

    localStorage.setItem('todaysMenuList', JSON.stringify(this.todaysMenuList));
    localStorage.setItem('isTodaysMenu', JSON.stringify('true'));

    this.menuDdEls[0].children[0].children[0].value = '';
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

    let menuBtnEl = document.querySelector('.js-menuBtn');
    menuBtnEl.addEventListener('click', this.setMenus.bind(this));
    this.settingsBtnEls[0].addEventListener('click',this.showFirstSettings.bind(this));

  };


  /// 詳細入力のメニューを設定
  Menus.prototype.show2ndMenu = function() {

    this.menuSections[0].classList.add('disp--none');
    this.menuSections[1].classList.remove('disp--none');
    this.settingsBtnEls[1].addEventListener('click',this.showFirstSettings.bind(this));

    this.categoryMenuEls = document.querySelectorAll('.js-category');
    this.categoryMenuEls[1].children[0].innerHTML = showOptionSubcategoryData[0];
    this.categoryMenuEls[0].children[0].addEventListener('change', this.changeSubCategory.bind(this));

    let menuSettingEl = document.querySelector('.js-menuSetting');
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
    }
  };


  /// 栄養素データなどを取得
  Menus.prototype.getNutrientsData = function() {

  };


  /// 材料のサブカテゴリーを変更
  Menus.prototype.changeSubCategory = function() {
    let index = event.target.value;
    this.categoryMenuEls[1].children[0].innerHTML = showOptionSubcategoryData[(index-1)];
  };


  window.addEventListener('DOMContentLoaded', function() {

    let sectionsEls = document.querySelectorAll('.js-sections');
    let amountOfEnergy = JSON.parse(localStorage.getItem('amountOfEnergy')) || [];

    if(amountOfEnergy) {
      sectionsEls[0].classList.add('disp--none');
      sectionsEls[1].classList.remove('disp--none');
    }
    else {
      sectionsEls[0].classList.remove('disp--none');
      sectionsEls[1].classList.add('disp--none');
    }

    let menus = new Menus();
    menus.run();
    let conditions = new Conditions();
    conditions.run();

  });


}());
