export class Language {
  constructor(koreaDataList, englishDataList) {
    this.koreaDataList = koreaDataList;
    this.englishDataList = englishDataList;
    this.language = localStorage.getItem('language');
    console.log(this.koreaDataList);
    this.getResources();
  }

  getResources(kdata, edata) {
    this.setData(kdata, edata);
    if (this.language === 'en') {
      return this.englishDataList.dataList;
    }
    if (this.language === 'ko') {
      return this.koreaDataList.dataList;
    }
  }
  setData(kdata, edata) {
    this.koreaDataList = kdata;
    this.englishDataList = edata;
  }
  setLanguage(language) {
    localStorage.setItem('language', language);
  }
  getLanguage() {
    return this.language;
  }
  toggleLanguage() {
    this.setLanguage(!this.language);
  }
}
