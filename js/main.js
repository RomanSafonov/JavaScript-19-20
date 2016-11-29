(function() {
  var str = localStorage.getItem('key');

  /*
      Error handling for JSON.parse, returning either the result
      or the caught error object.
  */
  function parseLodash(str) {
    return _.attempt(JSON.parse.bind(null, str));
  }
  var arr = parseLodash(str);

  /*
      Массив скиллов (поле skills) всех людей,
      не должно быть повторяющихся скиллов,
      так же они должны быть отсортированы по алфавиту;
  */
  var skillsArr = (_.uniq(_.flattenDeep(_.map(arr, 'skills')))).sort(function(a, b) {
    var nameA = a.toLowerCase(),
      nameB = b.toLowerCase();
    if (nameA < nameB) //sort string ascending
      return -1;
    if (nameA > nameB)
      return 1;
    return 0; //default return value (no sorting)
  });


/*
    Массив имен (поле name) людей,
    отсортированных в зависимости от количества их друзей (friends)
*/
var namesArr = _.sortBy(arr, 'friends.length');
namesArr = _.map(namesArr, 'name');

/*
    Массив всех друзей всех пользователей,
    не должно быть повторяющихся людей. Отсортирован.
*/
var matesArr = (_.flattenDeep(_.map(arr, 'friends')));
var homiesArr = new Array (matesArr.length);
for (var i = 0; i < matesArr.length; i++) {
 homiesArr[i] = _.nth(matesArr, i).name;
}
homiesArr = (_.uniq(homiesArr)).sort(function(a, b) {
  var nameA = a.toLowerCase(),
    nameB = b.toLowerCase();
  if (nameA < nameB) //sort string ascending
    return -1;
  if (nameA > nameB)
    return 1;
  return 0; //default return value (no sorting)
});

// Вывод данных в браузер. test1,2,3
toHTML(skillsArr, 'test__p1');
toHTML(namesArr, 'test__p2');
toHTML(homiesArr, "test__p3");


//    Функция отображения данных в браузере.
function toHTML (arr, idOfField) {
  this.bArr = arr;
  this.idName = idOfField;
  var aStr = "<ul>";
  for (var i = 0; i < bArr.length; i++) {
    aStr += "<li>" + bArr[i] + "</li>";
  }
  aStr += "</ul>";
  var elem = document.getElementById(idName);
  elem.insertAdjacentHTML("beforeEnd", aStr);
}
// end of function the document.ready
})();
