const API_KEY =
  "IYGDdhPpF1Ahblq%2BGJowCliS%2BoiBPwTAaslr5d0eAbu7JShoeZjGmuugLXQr8kHsH3G7SKCubwx0GDXMYEs%2Bcw%3D%3D";
async function getData() {
  const url = `http://apis.data.go.kr/B552061/schoolzoneChild/getRestSchoolzoneChild?ServiceKey=${API_KEY}&searchYearCd=2017&siDo=11&guGun=680&type=json&numOfRows=10&pageNo=1`;
  const response = await fetch(url);
  const data = await response.json(); //api 부를때 기본적인 명령어
  console.log("data", data);

  const locations = data.items.item.map((spot) => [
    spot.spot_nm,
    spot.la_crd,
    spot.lo_crd,
  ]);
  console.log("locations", locations);
  //데이터를 받았으니 맵을 그려주면 된다
  drawMap(locations);
}
//구글지도에서 위치별로 마크찍는 함수
function drawMap(locations) {
  //매개변수의 형태
  //locations=[["지역이름",위도,경도],
  //            ["지역이름", 위도, 경도]
  //              ]

  //맵 생성(맵 위치)
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 13,
    center: new google.maps.LatLng(locations[0][1], locations[0][2]),
    mapTypeId: google.maps.MapTypeId.ROADMAP,
  });
  const infowindow = new google.maps.InfoWindow();
  let marker, i;
  //로케이션별로 마크 생성
  for (i = 0; i < locations.length; i++) {
    marker = new google.maps.Marker({
      position: new google.maps.LatLng(locations[i][1], locations[i][2]),
      map: map,
    });
    //마크를 클릭했을때 보여주는 정보
    google.maps.event.addListener(
      marker,
      "click",
      (function (marker, i) {
        return function () {
          infowindow.setContent(locations[i][0]);
          infowindow.open(map, marker);
        };
      })(marker, i)
    );
  }
}
getData();
