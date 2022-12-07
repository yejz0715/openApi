const API_KEY =
  "IYGDdhPpF1Ahblq%2BGJowCliS%2BoiBPwTAaslr5d0eAbu7JShoeZjGmuugLXQr8kHsH3G7SKCubwx0GDXMYEs%2Bcw%3D%3D";
async function getData() {
  const url = `http://apis.data.go.kr/B552061/schoolzoneChild/getRestSchoolzoneChild?ServiceKey=${API_KEY}&searchYearCd=2015&siDo=11&guGun=320&type=json&numOfRows=10&pageNo=1`;
  const response = await fetch(url);
  const data = await response.json(); //api 부를때 기본적인 명령어
  console.log("data", data);
}
getData();
