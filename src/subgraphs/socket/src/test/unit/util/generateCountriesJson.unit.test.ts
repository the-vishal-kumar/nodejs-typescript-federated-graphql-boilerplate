import { generateCountriesJson } from '../../../util';

describe('generateCountriesJson', () => {
  test('for Germany', () => {
    const content = `DE; DEU; 276; GM; Germany; Germany; Germany; Germany; Allemagne; Allemagne; Alemania; Germany; the Federal Republic of Germany; Allemagne (l'); la République Fédérale d'Allemagne; Alemania; la República Federal de Alemania; Германия; Федеративая Республика Германия; Deutschland; Bundesrepublik Deutschland (die); Germany; Germany; Federal Republic of Germany; Deutschland; Bundesrepublik Deutschland; Germany; Germany; Federal Republic of Germany; Germania; Germania; Repubblica federale di Germania; Saksamaa; Saksamaa Liitvabariik; ; 1; Berlin; Berlin; Berlin; Berlin; Berlin; Берлин; Berlin; 52.5166666667; 13.4; 52.47; 13.62; EU; ; 150; 155; de; 81305856; 2012; German(s); German; 49; D; 348672; 8350; 357022; 51; 9; 55.05; 47.27; 15.03; 5.87; ; destatis.de; ; postdirekt.de`;
    const expectedCountriesJson = JSON.stringify(
      {
        DE: {
          name: 'Germany',
          topLeft: [5.87, 55.05],
          bottomRight: [15.03, 47.27],
        },
      },
      null,
      2,
    );
    const countriesJson = generateCountriesJson(content);
    expect(countriesJson).toEqual(expectedCountriesJson);
  });

  test('for India', () => {
    const content = `IN; IND; 356; IN; India; India; India; India; Inde; Inde; India; India; the Republic of India; Inde (l'); la République de l'Inde; India (la); la República de la India; Индия; Республика Индия; India[en]/Bhārat[hi]; the Republic of India[en]/Bhāratīya Gaṇarājya[hi]; India; India; Republic of India; Bharat; Bharatiya Ganarajya; India; India; Republic of India; India; India; Repubblica dell'India; India; India Vabariik; ; 1; New Delhi; New Delhi[en]/Naī Dillī[hi]; New Delhi; New Delhi; Nueva Delhi; Нью-Дели; New Delhi; 28.6; 77.2; 28.66; 77.13; AS; ; 142; 34; hi,en; 1205073612; 2012; Indian(s); Indian; 91; IND; 2973193; 314070; 3287263; 20; 77; 35.99; 6.75; 97.4; 68.17; india.gov.in; mospi.nic.in; ; indiapost.org`;
    const expectedCountriesJson = JSON.stringify(
      {
        IN: {
          name: 'India',
          topLeft: [68.17, 35.99],
          bottomRight: [97.4, 6.75],
        },
      },
      null,
      2,
    );
    const countriesJson = generateCountriesJson(content);
    expect(countriesJson).toEqual(expectedCountriesJson);
  });
});
